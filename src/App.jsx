// Componente principal de la app. Permite seleccionar un puerto y muestra la altura correspondiente.
// Usa fetch para obtener los datos del backend y React para el filtrado y renderizado.
import React, { useEffect, useState } from "react";

function App() {
  // Estado para almacenar los datos de todos los puertos
  const [alturas, setAlturas] = useState([]);
  // Estado para el puerto seleccionado
  const [puertoSeleccionado, setPuertoSeleccionado] = useState("");

  // Cargar datos al montar el componente
  useEffect(() => {
    fetch("http://localhost:3001/api/alturas")
      .then((res) => res.json())
      .then((data) => {
        setAlturas(data);
        // Selecciona San Nicolás por defecto si existe
        const existeSanNicolas = data.find((a) =>
          a.puerto.toLowerCase().includes("san nicol"),
        );
        if (existeSanNicolas) {
          setPuertoSeleccionado(existeSanNicolas.puerto);
        }
      })
      .catch((err) => console.error("Error al obtener alturas:", err));
  }, []);

  // Filtrar solo los puertos/ciudades reales (donde la altura sea un número válido)
  const alturasValidas = alturas.filter(
    (a) => a.altura && !isNaN(parseFloat(a.altura.replace(",", "."))),
  );
  // Obtener lista única de puertos válidos para el selector
  const puertos = Array.from(new Set(alturasValidas.map((a) => a.puerto)));

  // Filtrar datos según el puerto seleccionado
  const alturaPuerto = alturasValidas.find(
    (a) => a.puerto === puertoSeleccionado,
  );

  return (
    <div
      style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h1>Altura del Río</h1>
      <label>
        Selecciona un puerto:
        <select
          value={puertoSeleccionado}
          onChange={(e) => setPuertoSeleccionado(e.target.value)}
          style={{ marginLeft: 8 }}
        >
          <option value="">-- Elegir --</option>
          {puertos.map((puerto) => (
            <option key={puerto} value={puerto}>
              {puerto}
            </option>
          ))}
        </select>
      </label>
      {puertoSeleccionado && alturaPuerto && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <h2>{alturaPuerto.puerto}</h2>
          <p>
            <strong>Altura:</strong> {alturaPuerto.altura} m
          </p>
          <p>
            <strong>Hora:</strong> {alturaPuerto.hora}
          </p>
          <p>
            <strong>Tendencia:</strong> {alturaPuerto.tendencia}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
