# Sitio web ZLT Logistics

WhatsApp de ZLT: +504 8894-7017 (en `src/sitio.js`, `partials/pie.html`, `contacto.html` y `servicios.html`).

Sitio de ZLT Logistics, courier que trae paquetes de Estados Unidos, China, México y otros países a Honduras.

## Cómo correrlo

Necesitas [Node.js](https://nodejs.org) 18 o más reciente.

```bash
npm install
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

Para generar la versión final para publicar: `npm run build` (queda en `dist/`).

## Estructura

- `index.html`, `nosotros.html`, `casillero.html`, `servicios.html`, `tarifas.html`, `rastreo.html`, `preguntas.html`, `contacto.html`, `terminos.html`: una por página.
- `partials/cabecera.html` y `partials/pie.html`: menú y pie compartidos por todas las páginas.
- `src/estilos.css`: estilos. Los colores de marca están al inicio (`--marca`, `--acento`).
- `src/sitio.js`: menú móvil, cotizador, rastreo de demostración y formularios por WhatsApp.
- `public/`: logo e imágenes.

## Datos pendientes del cliente

- Tarifas por libra (en `src/sitio.js`, `TARIFAS`, y la tabla de `tarifas.html`).
- Dirección de la bodega en Miami (`casillero.html`).
- Dirección, horarios y correo (`contacto.html`, `partials/pie.html`). Sucursal confirmada: San Pedro Sula (falta la dirección exacta).
- Sistema de rastreo (hoy `rastreo.html` es una demostración con la guía ZLT-260412).
- Testimonios reales (`index.html`).

## Logos de tiendas

Están en `public/tiendas/` (Amazon, eBay, Walmart, AliExpress, Nike y Target, tomados de Simple Icons). Para Shein, Temu, Best Buy y Mercado Libre guarda el logo oficial como `shein.svg`, `temu.svg`, `bestbuy.svg` y `mercadolibre.svg` en esa carpeta; mientras no existan, el sitio muestra el nombre.
