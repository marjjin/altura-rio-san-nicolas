import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TablaSanNicolasSimple from "./TablaSanNicolasSimple";

// Renderiza la tabla histórica de San Nicolás como pantalla principal
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TablaSanNicolasSimple />
  </StrictMode>,
);
