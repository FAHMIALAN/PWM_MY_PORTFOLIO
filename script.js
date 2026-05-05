// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links"); // Ambil elemen menu dropdown
  const icon = document.querySelector(".hamburger-icon"); // Ambil elemen icon hamburger
  menu.classList.toggle("open"); // Tambah/hapus class "open" untuk menampilkan/menyembunyikan menu
  icon.classList.toggle("open"); // Tambah/hapus class "open" pada ikon untuk animasi toggle
}

// Daftarkan Service Worker
if ('serviceWorker' in navigator) { // Cek apakah browser mendukung service worker
  window.addEventListener('load', () => { // Jalankan saat halaman selesai dimuat
    navigator.serviceWorker.register('./service-worker.js') // Register file service-worker.js
      .then(reg => console.log('✅ Service Worker registered:', reg.scope)) // Jika berhasil, tampilkan log dan scope
      .catch(err => console.error('❌ SW registration failed:', err)); // Jika gagal, tampilkan error
  });
}

// Tombol Install App
let deferredPrompt; // Variabel global untuk menyimpan event beforeinstallprompt
const installBtn = document.getElementById('installBtn'); // Ambil elemen tombol install

// Pastikan tombol ada sebelum lanjut
if (installBtn) {
  window.addEventListener('beforeinstallprompt', (e) => { // Saat browser siap menawarkan instalasi PWA
    e.preventDefault(); // Mencegah prompt muncul otomatis
    deferredPrompt = e; // Simpan event-nya untuk dipanggil nanti
    console.log('✅ beforeinstallprompt triggered');

    // Tampilkan tombol install ke user
    installBtn.style.display = 'block'; // Tampilkan tombol install

    installBtn.addEventListener('click', () => { // Saat user klik tombol install
      installBtn.style.display = 'none'; // Sembunyikan tombol
      deferredPrompt.prompt(); // Tampilkan prompt install dari browser
      deferredPrompt.userChoice.then(choice => { // Tunggu hasil pilihan user
        if (choice.outcome === 'accepted') { // Jika user klik "install"
          console.log('✅ User accepted the install prompt');
        } else { // Jika user menutup prompt
          console.log('❌ User dismissed the install prompt');
        }
        deferredPrompt = null; // Reset event agar tidak dipakai ulang
      });
    });
  });
}
