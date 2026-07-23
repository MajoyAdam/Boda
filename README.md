# Boda de María y Adam · 24 de abril de 2027

Domaine Sainte-Raphine, Fargues-Saint-Hilaire (Burdeos).

Página única, sin dependencias ni compilación. Se abre tal cual.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app entera: estructura, estilos, textos en tres idiomas y lógica |
| `manifest.json` | Permite instalarla en la pantalla de inicio del móvil |
| `sw.js` | Hace que funcione sin señal el día de la boda |
| `icon-192.png` / `icon-512.png` | Icono de la app |
| `favicon.png` | Icono de la pestaña del navegador |
| `og.jpg` | Imagen que aparece al compartir el link por WhatsApp |
| `img/portada.jpg` | La portada de la página principal |
| `img/flor-*.png` | Las seis flores prensadas del fondo |

**La carpeta `img/` se sube tal cual, como carpeta.** El resto van sueltos en la raíz.

## Qué se edita

Todo lo que cambia está junto, al principio del `<script>` en `index.html`:

```js
const FECHA_BODA   = "2027-04-24T16:00:00";
const URL_FOTOS    = "...";   // link de la cámara desechable
const URL_SPOTIFY  = "...";   // playlist colaborativa
const WHATSAPP     = "...";   // número sin + ni espacios
const PIN_NOVIOS   = "2404";  // CAMBIAR: es la fecha de la boda
const TOPE_FOTOS   = 20;
const FORM_ID      = "";      // Google Form del RSVP
const CAMPOS       = { ... }; // los entry.XXXX de cada campo
```

Los textos de los tres idiomas están justo debajo, en el objeto `T`, con las claves `es`, `en` y `fr`. Si cambias una frase, cámbiala en los tres.

## Idiomas

Español, inglés y francés. Se cambia con las banderas arriba a la derecha. El idioma afecta a todo: menú, horario, formulario, preguntas frecuentes y el panel de los novios.

## Panel de los novios

Abajo del todo, botón *Panel de los novios*, con código. **Es un panel de consulta rápida, no una caja fuerte**: el código está escrito en el archivo y cualquiera que mire el código fuente lo ve. Los datos serios viven en el Google Sheet, que solo abren Adam y Majo con su cuenta.

## Modo post-boda

36 horas después de la ceremonia, la app se transforma sola: desaparecen el RSVP, la logística, los hoteles y el vestuario, y quedan las fotos, la playlist y el muro de deseos. Hay un botón abajo para verlo antes de tiempo.

## Publicar

Repo en GitHub → importar en Vercel → *Deploy*. Cada archivo que subas después se publica solo.


## Actualización automática

`sw.js` está en modo *red primero*: cada vez que alguien abre la app, se descarga la última versión y la caché solo entra en juego si no hay señal.

Cuando subas un cambio importante, sube también el número de `const CACHE = "boda-v2"` a `boda-v3`. Eso obliga a todos los celulares a recargar la versión nueva la próxima vez que la abran.
