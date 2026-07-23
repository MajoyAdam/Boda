# Publicar la app de la boda

Mismo camino que la de Biarritz: **GitHub → Vercel**. Pero cuentas nuevas, con el correo nuevo.

## 1. Correo

Crea el correo primero, porque las dos cuentas siguientes van a colgar de él.
Algo del estilo `adamymajo2027@gmail.com`. Compártelo con ellos: si tú desapareces del mapa, ellos pueden entrar.

## 2. Cuenta de GitHub

1. github.com → *Sign up* con el correo nuevo.
2. Nombre de usuario: `adamymajo` o similar.
3. *New repository* → nombre `boda`, visibilidad **Public**, marca *Add a README*.
4. Dentro del repo: *Add file → Upload files* → arrastra `boda-adam-majo.html`.
5. **Importante**: renómbralo a `index.html`. Sin ese nombre el navegador no lo carga solo.
6. *Commit changes*.

## 3. Cuenta de Vercel

1. vercel.com → *Sign up* → **Continue with GitHub** (usa la cuenta nueva).
2. *Add New… → Project* → importa el repo `boda`.
3. Framework preset: **Other**. No toques nada más.
4. *Deploy*. En treinta segundos tienes `boda-adamymajo.vercel.app`.

Cada vez que subas una versión nueva del archivo a GitHub, Vercel la publica sola.

## 4. Dominio propio (opcional, ~12 € al año)

Queda mucho mejor en una invitación impresa.

1. Compra `adamymajo.com` en Namecheap, OVH o Gandi.
2. En Vercel: *Project → Settings → Domains* → añade el dominio.
3. Vercel te da dos registros DNS. Cópialos en el panel del registrador.
4. Espera entre diez minutos y unas horas.

## 5. Lo que falta conectar

| Qué | Cómo | Estado |
|---|---|---|
| RSVP real | Google Forms vinculado a Sheets, con el correo nuevo | pendiente del link de tu amiga |
| Playlist | Spotify colaborativa, pegar link en `URL_SPOTIFY` | pendiente, ejemplo por ahora |
| Cámara desechable | Crear el evento en Lense o JoinMyMoment y pegar el link en `URL_FOTOS` | pendiente |
| WhatsApp de Adam | Añadir segundo botón | pendiente |
| Autobús | Confirmar si lo habrá | pendiente |

Todo eso se cambia en las diez líneas del bloque `EDITA AQUÍ`, al principio del `<script>`. No hace falta tocar nada más.

## 6. Antes de mandarla a los invitados

- Abre el link en un móvil de verdad, no solo en el ordenador.
- Prueba los tres idiomas.
- Cambia el PIN del panel: ahora es `2404`, o sea la fecha de la boda. Adivinable.
- Comprueba que el botón de la cámara abra el álbum correcto.
- Pide a dos personas que hagan un RSVP de prueba y bórralos después.
