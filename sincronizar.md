# Sincronizar deseos, canciones y confirmaciones

Los datos van a vivir en una hoja de cálculo de Google, con un script pequeño que hace de intermediario. Gratis, sin servidor, y ustedes ven todo en la hoja.

---

## Si te sale "No se puede abrir el archivo en estos momentos"

Es el error más común de Apps Script y **no tiene nada que ver con tu hoja**. Pasa cuando estás con varias cuentas de Google abiertas a la vez: la hoja es de una cuenta y Google intenta abrir el editor con otra.

Prueba en este orden:

1. **Ventana de incógnito.** Abre una, entra solo con el correo nuevo, abre la hoja desde ahí y prueba Extensiones → Apps Script. Esto lo resuelve el 90% de las veces.
2. **Cerrar todas las sesiones.** En google.com, foto de perfil → Cerrar sesión en todas las cuentas. Vuelve a entrar solo con la del correo nuevo.
3. **Cambiar el número en la dirección.** Si la URL del editor lleva `/u/0/`, cámbialo a `/u/1/` y recarga. Prueba con 1, 2, 3.
4. Si nada funciona, usa el **camino B** de abajo, que se salta el menú Extensiones por completo.

---

## Camino A: desde la hoja

1. Con el correo nuevo, entra en **sheets.google.com** y crea una hoja en blanco. Llámala `Boda María y Adam`.
2. Menú **Extensiones → Apps Script**.
3. Borra el `function myFunction() {}` que aparece.
4. Abre `apps-script.gs` del ZIP, copia todo y pégalo. Deja `ID_HOJA` vacío.
5. Guarda con el disquete.
6. Sigue en **Publicar el script**, más abajo.

## Camino B: script suelto (si el A falla)

1. Crea igualmente la hoja en **sheets.google.com** y llámala `Boda María y Adam`.
2. Copia su **id**: está en la dirección de la hoja, entre `/d/` y `/edit`.
   `docs.google.com/spreadsheets/d/`**`1a2B3c4D5e6F...`**`/edit`
3. Ve a **script.google.com** y pulsa **Nuevo proyecto**.
4. Borra lo que haya y pega el contenido de `apps-script.gs`.
5. En la primera línea de código, pega el id:
   ```js
   const ID_HOJA = "1a2B3c4D5e6F...";
   ```
6. Guarda.

---

## Probar antes de publicar

En el editor, arriba, hay un desplegable de funciones. Elige **probar** y pulsa **Ejecutar**.

- Google va a pedir permisos. Acepta. Va a salir un aviso de que la app no está verificada: entra en *Configuración avanzada → Ir a (nombre del proyecto)* y continúa. Es tu propio script.
- Si sale bien, en la hoja aparecen tres pestañas nuevas (deseos, canciones, rsvp) y un deseo de prueba. Borra esa fila cuando quieras.

Si esto funciona, el resto va a funcionar.

## Publicar el script

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. En el engranaje elige **Aplicación web**.
3. Rellena:
   - Descripción: `Boda`
   - **Ejecutar como: Yo**
   - **Quién tiene acceso: Cualquier usuario** ← el paso que todo el mundo falla
4. **Implementar** y copia la **URL de la aplicación web**. Termina en `/exec`.
5. Pégala en el `index.html`, en el bloque `EDITA AQUÍ`:

```js
const API = "https://script.google.com/macros/s/AKfy.../exec";
```

6. Sube el archivo a GitHub. Listo.

### Comprobar que quedó bien

Pega la URL `/exec` en el navegador. Tiene que salir algo así:

```json
{"deseos":[],"canciones":[],"rsvp":[]}
```

Si en vez de eso pide iniciar sesión o da error, el acceso quedó en "Solo yo": vuelve a Implementar → Gestionar implementaciones y cámbialo.

---

## Cómo queda

- Deseos, canciones y confirmaciones se guardan en la hoja, en tres pestañas.
- Todos ven las mismas notas en el corcho.
- La app se refresca al entrar en Deseos o Playlist, y cada 45 segundos mientras estés ahí.
- Cada invitado puede borrar solo su propia nota.
- Ustedes borran cualquier fila directamente en la hoja y desaparece de la app.
- El panel de los novios lee de la hoja: las cifras son reales.

**El Google Forms ya no hace falta.** El RSVP escribe directo en la hoja.

## Si cambias el script después

Hay que volver a implementar, si no Google sigue sirviendo la versión vieja:
Implementar → Gestionar implementaciones → el lápiz → Versión: **Nueva** → Implementar. La URL no cambia.

## Privacidad

La URL del script está dentro del `index.html`, así que quien mire el código fuente podría escribir en la hoja. Para una boda es un riesgo aceptable y es lo que hacen casi todas las webs de boda. Los mensajes marcados como privados no salen nunca en el corcho: solo en la hoja y en el panel.
