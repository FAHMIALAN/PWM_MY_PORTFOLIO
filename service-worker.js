const cacheName = "portfolio-cache-v1";

const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./mediaqueries.css",
  "./script.js",
  "./manifest.json",
  // Ikon
  "./assets/icons/icon-192x192.png",
  "./assets/icons/icon-512x512.png",
  "./assets/icons/icon-128x128.png",
  // Screenshot (jika dipakai)
  "./assets/screenshots/screenshot-desktop.png",
  "./assets/screenshots/screenshot-mobile.png",
  // Gambar profil & UI
  "./assets/profile-pic.png",
  "./assets/about-pic.png",
  "./assets/arrow.png",
  "./assets/linkedin.png",
  "./assets/github.png",
  "./assets/email.png",
  "./assets/education.png",
  "./assets/experience.png",
  "./assets/instagram.png",
  "./assets/telp.png",
  // Logo skill (frontend & backend)
  "./assets/html.png",
  "./assets/css.png",
  "./assets/java.png",
  "./assets/javascript.png",
  "./assets/php.png",
  "./assets/kotlin.png",
  "./assets/dart.png",
  "./assets/python.png",
  "./assets/bootstrap.png",
  "./assets/codeigniter.png",
  "./assets/laravel.png",
  "./assets/nodejs.png",
  "./assets/flutter.png",
  "./assets/socket-io.png",
  // Gambar project
  "./assets/mlayusports.png",
  "./assets/ecommerce.png",
  "./assets/livetracking.png",
  "./assets/madangseek.jpg",
  "./assets/showroom.png",
  "./assets/rmbebek.png"
];

// Instalasi cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("✅ Caching all assets");
      return cache.addAll(assets);
    })
  );
});

// Aktivasi service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      )
    )
  );
});

// Fetch offline fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
