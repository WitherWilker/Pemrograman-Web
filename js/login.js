/* =========================================================
   login.js — logika khusus login.html
   Tab Masuk/Daftar ditangani oleh main.js (data-tab-target).
   File ini hanya menangani simulasi submit form.
   ========================================================= */

document.querySelectorAll('.login-form').forEach((form) => {
  form.addEventListener('submit', () => {
    const isDaftar = form.getAttribute('data-tab-panel') === 'daftar';
    alert(isDaftar
      ? 'Pendaftaran berhasil disimulasikan. Hubungkan form ini ke backend untuk membuat akun sungguhan.'
      : 'Login berhasil disimulasikan. Hubungkan form ini ke backend untuk autentikasi sungguhan.');
  });
});
