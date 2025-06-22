const cacheName = "portfolio-cache-v1";
const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./mediaqueries.css",
  "./script.js",
  "./manifest.json",
  "./assets/icons/icon-192x192.png",
  "./assets/icons/icon-512x512.png",
  // tambahkan semua gambar dari portofolio (profile-pic, arrow, dll)
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== cacheName).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
