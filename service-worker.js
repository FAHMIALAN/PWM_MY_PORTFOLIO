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

// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Daftarkan Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('✅ Service Worker registered:', reg.scope))
      .catch(err => console.error('❌ SW registration failed:', err));
  });
}

// Tombol Install App
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

if (installBtn) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('✅ beforeinstallprompt triggered');

    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
          console.log('✅ User accepted the install prompt');
        } else {
          console.log('❌ User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  });
}
