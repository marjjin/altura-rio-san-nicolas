// Componente para mostrar la tabla de registros históricos de San Nicolás
import React, { useEffect, useState } from "react";

function TablaSanNicolas() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h1>Histórico de Alturas - San Nicolás</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Fecha</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Hora</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Altura (m)</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Variación</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>Tendencia</th>
            <th style={{ border: "1px solid #ccc", padding: 6 }}>
              Observaciones
            </th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {r.fecha}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>{r.hora}</td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {r.altura}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {r.variacion}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {r.tendencia}
              </td>
              <td style={{ border: "1px solid #ccc", padding: 6 }}>
                {r.observaciones}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaSanNicolas;
