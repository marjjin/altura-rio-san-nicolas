// Este archivo inicializa y configura el servidor Express para exponer la API de alturas de ríos.
// Importa las dependencias necesarias y define la ruta principal de la API.

import express from "express";
import cors from "cors";
import { getAlturas } from "./scraper.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Habilita CORS para permitir peticiones desde el frontend
app.use(cors());

// Ruta principal para obtener las alturas de todos los puertos
app.get("/api/alturas", async (req, res) => {
  try {
    const alturas = await getAlturas();
    res.json(alturas);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo datos de alturas" });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
