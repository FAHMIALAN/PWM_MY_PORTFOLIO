const cacheName = "portfolio-cache-v1"; // Nama cache versi saat ini

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
  "./assets/icons/icon-128x128.png",
  // Screenshot halaman (jika digunakan di manifest atau preview)
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
  // Ikon skill (frontend/backend)
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


// 🔁 Toggle Hamburger Menu (untuk tampilan mobile)
function toggleMenu() {
  const menu = document.querySelector(".menu-links"); // Ambil elemen menu
  const icon = document.querySelector(".hamburger-icon"); // Ambil ikon hamburger
  menu.classList.toggle("open"); // Tambah/hapus class open agar menu tampil/sembunyi
  icon.classList.toggle("open"); // Tambah/hapus animasi toggle ikon
}

// 🔧 Daftarkan Service Worker di halaman utama (client-side)
if ('serviceWorker' in navigator) { // Pastikan browser mendukung SW
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js') // Daftarkan SW dari file ini
      .then(reg => console.log('✅ Service Worker registered:', reg.scope)) // Jika berhasil
      .catch(err => console.error('❌ SW registration failed:', err)); // Jika gagal
  });
}

// 📦 Tombol Install Aplikasi (PWA)
let deferredPrompt; // Simpan event install agar bisa dipanggil nanti
const installBtn = document.getElementById('installBtn'); // Ambil tombol install dari DOM

// Pastikan tombol tersedia
if (installBtn) {
  window.addEventListener('beforeinstallprompt', (e) => { // Saat browser siap menginstall
    e.preventDefault(); // Cegah prompt default dari browser
    deferredPrompt = e; // Simpan event
    console.log('✅ beforeinstallprompt triggered');

    installBtn.style.display = 'block'; // Tampilkan tombol install ke user

    installBtn.addEventListener('click', () => { // Saat user klik tombol install
      installBtn.style.display = 'none'; // Sembunyikan tombol
      deferredPrompt.prompt(); // Tampilkan prompt install dari browser

      // Tunggu respon user terhadap prompt
      deferredPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
          console.log('✅ User accepted the install prompt'); // User setuju install
        } else {
          console.log('❌ User dismissed the install prompt'); // User batal install
        }
        deferredPrompt = null; // Reset setelah digunakan
      });
    });
  });
}
