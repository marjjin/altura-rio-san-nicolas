// Este módulo se encarga de hacer el scraping de la página de Prefectura Naval y extraer la tabla de alturas de los ríos.
// Devuelve un array de objetos, cada uno representando un puerto con su altura y otros datos relevantes.

import axios from "axios";
import * as cheerio from "cheerio";

const URL =
  "https://contenidosweb.prefecturanaval.gob.ar/alturas/?page=historico&tiempo=7&id=300";

/**
 * Obtiene y parsea la tabla de alturas de ríos desde la web de Prefectura Naval.
 * @returns {Promise<Array<{ puerto: string, altura: string, hora: string, tendencia: string }>>}
 */

async function getAlturas() {
  try {
    console.log("[scraper] Iniciando scraping de Prefectura Naval...");
    // Descarga el HTML de la página
    const { data } = await axios.get(URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9",
        Connection: "keep-alive",
      },
      timeout: 10000, // 10 segundos
    });
    console.log("[scraper] HTML descargado, procesando tabla...");
    const $ = cheerio.load(data);

    const alturas = [];

    // Buscar la tabla de histórico y extraer todas las filas de datos
    const filas = $("table tr");
    console.log(`[scraper] Filas encontradas: ${filas.length}`);
    filas.each((i, row) => {
      const cols = $(row).find("td");
      if (i < 5) {
        // Log de las primeras filas para depuración
        const textoFila = cols
          .map((j, col) => $(col).text().trim())
          .get()
          .join(" | ");
        console.log(`[scraper] Fila ${i}: ${textoFila}`);
      }
      if (cols.length === 2) {
        const fechaHora = $(cols[0]).text().trim();
        const altura = $(cols[1]).text().trim();
        alturas.push({ fechaHora, altura });
      }
    });
    // Devolver todas las mediciones (todas las filas de la tabla)
    return alturas;
  } catch (error) {
    console.error("[scraper] Error durante el scraping:", error);
    throw error;
  }
}

export { getAlturas };
