/* =========================================================
   main.js — perilaku yang dipakai bersama di semua halaman:
   - toggle tombol wishlist (hati) pada product card
   - switch tab (dipakai di akun.html & pesanan.html)
   - stepper jumlah barang (dipakai di keranjang.html)
   ========================================================= */

// Switch tab: elemen dengan [data-tab-target] mengaktifkan
// panel dengan id yang sama pada grup [data-tab-group] terdekat
document.addEventListener('click', function (e) {
  const tabBtn = e.target.closest('[data-tab-target]');
  if (!tabBtn) return;

  const group = tabBtn.closest('[data-tab-group]');
  if (!group) return;

  const targetId = tabBtn.getAttribute('data-tab-target');

  group.querySelectorAll('[data-tab-target]').forEach((b) => b.classList.remove('active'));
  tabBtn.classList.add('active');

  group.querySelectorAll('[data-tab-panel]').forEach((panel) => {
    panel.style.display = panel.getAttribute('data-tab-panel') === targetId ? '' : 'none';
  });
});

// Stepper jumlah barang (tombol - dan +) di halaman keranjang
document.addEventListener('click', function (e) {
  const stepBtn = e.target.closest('[data-step]');
  if (!stepBtn) return;

  const wrapper = stepBtn.closest('.qty-stepper');
  const input = wrapper ? wrapper.querySelector('input') : null;
  if (!input) return;

  let value = parseInt(input.value, 10) || 1;
  const dir = stepBtn.getAttribute('data-step');

  value = dir === 'inc' ? value + 1 : Math.max(1, value - 1);
  input.value = value;

  input.dispatchEvent(new Event('change'));
});
