const cacheName = "portfolio-cache-v2"; // Nama cache versi saat ini

const assets = [ // Daftar semua file yang akan disimpan (di-cache)
  "./",
  "./index.html",
  "./style.css",
  "./mediaqueries.css",
  "./script.js",
  "./manifest.json",
  // Ikon aplikasi
  "./assets/icons/icon-192x192.png",
  "./assets/icons/icon-512x512.png",
  // Screenshot halaman
  "./assets/screenshots/screenshot-desktop.png",
  "./assets/screenshots/screenshot-mobile.png",
  // Gambar profil dan tampilan
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
  // Ikon skill (frontend/backend/tools)
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
  "./assets/React.png",
  "./assets/Vue.png",
  "./assets/Tailwind.png",
  // Gambar project
  "./assets/mlayusports.png",
  "./assets/ecommerce.png",
  "./assets/livetracking.png",
  "./assets/ngemong.png",
  "./assets/coffeshop.png",
  "./assets/qrdine.png",
  "./assets/madangseek.jpg",
  "./assets/showroom.png",
  "./assets/rmbebek.png",
  // Dokumen
  "./assets/CV_Lamaran_Kerja_Fahmi_BE.pdf"
];

// ✅ Instalasi cache saat pertama kali service worker didaftarkan
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName) // Buka cache berdasarkan nama
      .then(cache => {
        console.log("✅ Caching all assets");
        return cache.addAll(assets); // Tambahkan semua file ke dalam cache
      })
  );
});

// ✅ Aktivasi service worker dan hapus cache lama jika ada
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => // Ambil semua nama cache yang ada
      Promise.all(
        keys
          .filter(key => key !== cacheName) // Hanya ambil yang bukan cache terbaru
          .map(key => caches.delete(key)) // Hapus cache lama
      )
    )
  );
});

// ✅ Intersepsi permintaan (fetch) dan layani dari cache jika offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request) // Coba cocokkan request dengan cache
      .then(response => response || fetch(event.request)) // Jika tidak ada di cache, ambil dari internet
  );
});
