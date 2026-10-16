/* Sube este número cada vez que cambies algo importante.
   Al detectarlo, la app se actualiza sola en el celular de todos. */
const CACHE = "boda-v9";

const BASE = [
  "./", "./index.html", "./manifest.json",
  "./img/portada.png", "./img/corcho.jpg"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).catch(()=>{}));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Red primero: siempre se ve la última versión.
   La caché solo entra cuando no hay señal. */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const copia = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copia));
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
