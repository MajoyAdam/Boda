/**
 * Servidor de la app de la boda.
 * Guarda deseos, canciones y confirmaciones en una hoja de cálculo.
 * Instrucciones completas en sincronizar.md
 *
 * DOS FORMAS DE USARLO:
 *  A) Script creado desde la hoja (Extensiones → Apps Script):
 *     deja ID_HOJA vacío.
 *  B) Script creado suelto en script.google.com:
 *     pega abajo el id de la hoja. Está en su URL, entre /d/ y /edit:
 *     docs.google.com/spreadsheets/d/ESTO_DE_AQUI/edit
 */

const ID_HOJA = "";   // <- solo si creaste el script suelto

const HOJAS = {
  deseos:    ["id", "fecha", "nombre", "texto", "privado"],
  canciones: ["id", "fecha", "tema", "artista"],
  rsvp:      ["id", "fecha", "nombre", "asiste", "acompanantes", "bus", "comida", "nota"]
};

function libroDeCalculo() {
  return ID_HOJA ? SpreadsheetApp.openById(ID_HOJA) : SpreadsheetApp.getActiveSpreadsheet();
}

function hoja(nombre) {
  const libro = libroDeCalculo();
  let h = libro.getSheetByName(nombre);
  if (!h) {
    h = libro.insertSheet(nombre);
    h.appendRow(HOJAS[nombre]);
    h.setFrozenRows(1);
  }
  return h;
}

function leerHoja(nombre) {
  const h = hoja(nombre);
  const filas = h.getDataRange().getValues();
  if (filas.length < 2) return [];
  const cabeceras = filas[0];
  return filas.slice(1).map(function (fila) {
    const obj = {};
    cabeceras.forEach(function (c, i) { obj[c] = fila[i]; });
    if (obj.privado === "sí" || obj.privado === true) obj.privado = true;
    else if (nombre === "deseos") obj.privado = false;
    return obj;
  });
}

function responder(datos) {
  return ContentService
    .createTextOutput(JSON.stringify(datos))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return responder({
    deseos:    leerHoja("deseos"),
    canciones: leerHoja("canciones"),
    rsvp:      leerHoja("rsvp")
  });
}

function doPost(e) {
  const bloqueo = LockService.getScriptLock();
  bloqueo.waitLock(20000);
  try {
    const p = JSON.parse(e.postData.contents);

    if (p.accion === "anadir") {
      const h = hoja(p.tipo);
      const d = p.datos;
      const fecha = new Date();
      if (p.tipo === "deseos") {
        h.appendRow([d.id, fecha, d.nombre, d.texto, d.privado ? "sí" : "no"]);
      } else if (p.tipo === "canciones") {
        h.appendRow([d.id, fecha, d.tema, d.artista]);
      } else if (p.tipo === "rsvp") {
        h.appendRow([d.id, fecha, d.nombre, d.asiste, d.acompanantes, d.bus, d.comida, d.nota]);
      }
      return responder({ ok: true, id: d.id });
    }

    if (p.accion === "borrar") {
      const h = hoja(p.tipo);
      const ids = h.getRange(1, 1, h.getLastRow(), 1).getValues();
      for (let i = ids.length - 1; i >= 1; i--) {
        if (String(ids[i][0]) === String(p.id)) h.deleteRow(i + 1);
      }
      return responder({ ok: true });
    }

    return responder({ ok: false, error: "accion desconocida" });
  } catch (err) {
    return responder({ ok: false, error: String(err) });
  } finally {
    bloqueo.releaseLock();
  }
}

/**
 * Ejecuta esta función una vez (botón ▶ arriba, con "probar" seleccionado)
 * para comprobar que el script encuentra la hoja y para dar los permisos.
 * Si funciona, crea las tres pestañas y escribe un deseo de prueba.
 */
function probar() {
  const nombre = libroDeCalculo().getName();
  hoja("deseos").appendRow(["prueba", new Date(), "Prueba", "Si lees esto, funciona. Borra esta fila.", "no"]);
  hoja("canciones");
  hoja("rsvp");
  Logger.log("Conectado a: " + nombre);
}
