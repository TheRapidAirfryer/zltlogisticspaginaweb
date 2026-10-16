import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Páginas del sitio. Para agregar una, crea el .html en la raíz y súmalo aquí.
const paginas = ["index", "nosotros", "casillero", "servicios", "tarifas", "rastreo", "preguntas", "contacto", "terminos"];

// Reemplaza <!-- @include nombre --> por el contenido de partials/nombre.html (cabecera y pie compartidos)
function incluirPartes() {
  return {
    name: "incluir-partes",
    // Recarga el navegador al editar un archivo de partials/
    handleHotUpdate({ file, server }) {
      if (file.includes("/partials/") || file.includes("\\partials\\")) server.ws.send({ type: "full-reload" });
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, nombre) =>
          readFileSync(resolve(__dirname, "partials", `${nombre}.html`), "utf-8")
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [incluirPartes()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(paginas.map((p) => [p, resolve(__dirname, `${p}.html`)])),
    },
  },
});
