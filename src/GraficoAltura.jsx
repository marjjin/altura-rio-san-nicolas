// Componente de gráfico de línea para alturas históricas
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function GraficoAltura({ registros }) {
  // Ordenar de más viejo a más nuevo (izquierda a derecha)
  const ordenados = [...registros].reverse();
  const labels = ordenados.map((r) => r.fechaHora);
  const data = ordenados.map((r) => parseFloat(r.altura.replace(",", ".")));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Altura (m)",
        data,
        borderColor: "#0a3d62",
        backgroundColor: "#60a3bc33",
        pointRadius: 2,
        tension: 0.2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Evolución Reciente de la Altura" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { display: false },
      y: { beginAtZero: false, ticks: { stepSize: 0.1 } },
    },
  };

  return (
    <div style={{ margin: "2rem 0", width: "100%", overflowX: "auto" }}>
      <div style={{ minWidth: 480 }}>
        <Line data={chartData} options={options} height={200} />
      </div>
    </div>
  );
}

export default GraficoAltura;
