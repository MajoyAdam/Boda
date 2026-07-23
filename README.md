# Boda de María y Adam · 24 de abril de 2027

Domaine Sainte-Raphine, Fargues-Saint-Hilaire (Burdeos).

App de una sola página con menú: cada sección es una pantalla aparte. Sin dependencias ni compilación.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app entera: estructura, estilos, textos en tres idiomas y lógica |
| `manifest.json` | Permite instalarla en la pantalla de inicio del celular |
| `sw.js` | Actualización automática y funcionamiento sin señal |
| `icon-192.png` / `icon-512.png` / `favicon.png` | Iconos |
| `og.jpg` | Imagen que aparece al compartir el link por WhatsApp |
| `img/portada.jpg` | La portada de la pantalla de inicio |
| `img/flor-*.png` | Las seis flores prensadas del fondo |
| `img/corcho.jpg` | La textura del corcho de los deseos |
| `img/album/foto-01…12.jpg` | El álbum de ellos dos |

**Las carpetas `img/` y `img/album/` se suben tal cual.** El resto va suelto en la raíz.

## Las doce pantallas

Inicio · Confirmar · El día · Cómo llegar · Hoteles · Burdeos · Vestuario · Ellos dos · Deseos · Playlist · Fotos · Dudas

Cada una tiene su dirección propia: `.../#hoteles`, `.../#deseos`, etc. Se pueden mandar por WhatsApp directamente.

## Qué se edita

Todo junto, al principio del `<script>` en `index.html`:

```js
const FECHA_BODA   = "2027-04-24T16:00:00";
const URL_FOTOS    = "...";   // link de la cámara desechable
const ID_SPOTIFY   = "...";   // solo el id de la playlist
const WHATSAPP     = "...";   // número sin + ni espacios
const PIN_NOVIOS   = "2404";  // CAMBIAR
const NUM_ALBUM    = 12;      // cuántas fotos tiene el álbum
const FORM_ID      = "";      // Google Form del RSVP
```

Los hoteles y las recomendaciones de Burdeos están en las listas `HOTELES` y `BURDEOS`, justo debajo. Cada entrada lleva nombre, descripción en los tres idiomas y link.

Los textos están en el objeto `T`, con las claves `es`, `en` y `fr`. Si cambias una frase, cámbiala en los tres.

## Añadir fotos al álbum

Guarda la foto en `img/album/` con el nombre `foto-13.jpg`, `foto-14.jpg`, etc., y sube `NUM_ALBUM` al número nuevo.

## Panel de los novios

En la pantalla de Dudas, abajo, con código. **Es un panel de consulta rápida, no una caja fuerte**: el código está escrito en el archivo. Los datos serios viven en el Google Sheet.

## Modo post-boda

36 horas después de la ceremonia la portada cambia sola. Hay un botón abajo para verlo antes.

## Actualización automática

`sw.js` va en modo *red primero*: cada vez que alguien abre la app se descarga la última versión, y la caché solo entra si no hay señal.

Cuando subas un cambio importante, sube también el número de `const CACHE = "boda-v3"` a `boda-v4`. Eso obliga a todos los celulares a recargar la versión nueva.
