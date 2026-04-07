// Componente para mostrar la tabla de registros históricos de San Nicolás (fecha/hora y altura)
import React, { useEffect, useState } from "react";
import "./historial.css";
import GraficoAltura from "./GraficoAltura.jsx";

function TablaSanNicolasSimple() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Filtros de rango
  const [rango, setRango] = useState("7d"); // 7d, 1m, 6meses, 1y

  useEffect(() => {
    fetch("http://localhost:3001/api/alturas")
      .then((res) => res.json())
      .then((data) => {
        setRegistros(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al obtener los datos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando datos...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  // Panel último dato profesional
  const ultimo = registros[0];
  const anterior = registros[1];
  let variacion = null;
  let color = "#333";
  if (ultimo && anterior) {
    const altUltimo = parseFloat(ultimo.altura.replace(",", "."));
    const altAnterior = parseFloat(anterior.altura.replace(",", "."));
    variacion = altUltimo - altAnterior;
    color = variacion > 0 ? "#2ecc40" : variacion < 0 ? "#ff4136" : "#888";
  }

  // Filtrar registros según el rango seleccionado
  const ahora = new Date();
  let desde = new Date();
  if (rango === "7d") desde.setDate(ahora.getDate() - 7);
  else if (rango === "1m") desde.setMonth(ahora.getMonth() - 1);
  else if (rango === "6meses") desde.setMonth(ahora.getMonth() - 6);
  else if (rango === "1y") desde.setFullYear(ahora.getFullYear() - 1);

  // Los datos vienen ordenados del más nuevo al más viejo, así que filtramos por fecha
  const registrosFiltrados = registros.filter((r) => {
    // Fecha puede venir como "2026-04-06 00:00"
    const fecha = r.fechaHora.split(" ")[0];
    const fechaObj = new Date(fecha);
    return fechaObj >= desde;
  });

  return (
    <div className="contenedor-historico">
      <div className="panel-ultimo-dato">
        <div className="panel-ultimo-titulo">Último dato</div>
        {ultimo && (
          <>
            <div className="panel-ultimo-icono-valor">
              <span className="panel-ultimo-icono" style={{ color }}>
                {variacion > 0 ? "⬆️" : variacion < 0 ? "⬇️" : "⏸️"}
              </span>
              <div className="panel-ultimo-valor" style={{ color }}>
                {ultimo.altura} <span className="panel-ultimo-mts">m</span>
              </div>
            </div>
            <div className="panel-ultimo-fecha">
              <span>Fecha/hora:</span> {ultimo.fechaHora}
            </div>
            {variacion !== null && (
              <div className="panel-ultimo-variacion" style={{ color }}>
                {variacion > 0
                  ? "Subió"
                  : variacion < 0
                    ? "Bajó"
                    : "Sin cambio"}
                <span className="panel-ultimo-variacion-num">
                  ({variacion > 0 ? "+" : ""}
                  {variacion.toFixed(2)} m)
                </span>
              </div>
            )}
            <div className="panel-ultimo-detalle">
              <div>Comparado con la medición anterior.</div>
              <div>Actualizado automáticamente.</div>
            </div>
          </>
        )}
      </div>
      <div className="titulo-historico">Histórico de Alturas - San Nicolás</div>
      <div className="filtros-rango">
        <span style={{ marginRight: 8 }}>Historial de registros:</span>
        <label>
          <input
            type="radio"
            name="rango"
            value="7d"
            checked={rango === "7d"}
            onChange={() => setRango("7d")}
          />{" "}
          7 Días
        </label>
        <label>
          <input
            type="radio"
            name="rango"
            value="1m"
            checked={rango === "1m"}
            onChange={() => setRango("1m")}
          />{" "}
          1 Mes
        </label>
        <label>
          <input
            type="radio"
            name="rango"
            value="6meses"
            checked={rango === "6meses"}
            onChange={() => setRango("6meses")}
          />{" "}
          6 Meses
        </label>
        <label>
          <input
            type="radio"
            name="rango"
            value="1y"
            checked={rango === "1y"}
            onChange={() => setRango("1y")}
          />{" "}
          1 Año
        </label>
      </div>
      <GraficoAltura registros={registrosFiltrados} />
      <table className="tabla-historico">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Altura</th>
          </tr>
        </thead>
        <tbody>
          {registrosFiltrados.map((r, i) => (
            <tr key={i}>
              <td>{r.fechaHora}</td>
              <td>{r.altura}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaSanNicolasSimple;
