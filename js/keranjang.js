/* keranjang.js — keranjang dirender dari localStorage */
const box = document.getElementById('cart-items');
const selectAll = document.getElementById('select-all');

function rowHtml(r, i) {
  const p = getProduct(r.id);
  return `
  <div class="cart-row cart-item" data-idx="${i}" data-price="${p.price}">
    <label class="cart-checkbox">
      <input type="checkbox" class="item-check" checked>
      <img src="${productImg(p)}" alt="${p.name}">
      <span><a href="produk-detail.html?id=${p.id}">${p.name}</a><br><small>${catOf(p).vl}: ${r.v}</small></span>
    </label>
    <span class="cart-unit-price">${formatRupiah(p.price)}</span>
    <div class="qty-stepper">
      <button type="button" data-step="dec">&minus;</button>
      <input type="number" value="${r.qty}" min="1">
      <button type="button" data-step="inc">+</button>
    </div>
    <span class="cart-subtotal">${formatRupiah(p.price * r.qty)}</span>
    <button class="remove-btn" aria-label="Hapus item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
    </button>
  </div>`;
}

function recalc() {
  const cart = getCart();
  let total = 0, count = 0;
  box.querySelectorAll('.cart-item').forEach((row) => {
    const i = +row.dataset.idx;
    const qty = Math.max(1, parseInt(row.querySelector('.qty-stepper input').value, 10) || 1);
    cart[i].qty = qty;
    const sub = +row.dataset.price * qty;
    row.querySelector('.cart-subtotal').textContent = formatRupiah(sub);
    if (row.querySelector('.item-check').checked) { total += sub; count += 1; }
  });
  saveCart(cart);
  const disc = total > 0 ? 20000 : 0;
  document.getElementById('summary-subtotal').textContent = formatRupiah(total);
  document.getElementById('summary-total').textContent = formatRupiah(Math.max(total - disc, 0));
  document.getElementById('summary-count').textContent = count;
  document.getElementById('summary-count-2').textContent = count;
  document.getElementById('cart-n').textContent = cart.length;
  document.querySelectorAll('.summary-row').forEach((r) => {
    const s = r.querySelectorAll('span');
    if (s[0].textContent.includes('Total Diskon')) s[s.length - 1].textContent = '-' + formatRupiah(disc);
  });
}

function render() {
  const cart = getCart();
  box.innerHTML = cart.length ? cart.map(rowHtml).join('') :
    '<div class="empty-state"><p>Keranjangmu masih kosong. Yuk cari produk favoritmu!</p><a href="index.html" class="btn btn-primary">Mulai Belanja</a></div>';
  box.querySelectorAll('.item-check').forEach((cb) => cb.addEventListener('change', recalc));
  box.querySelectorAll('.qty-stepper input').forEach((inp) => { inp.addEventListener('change', recalc); inp.addEventListener('input', recalc); });
  box.querySelectorAll('.remove-btn').forEach((btn) => btn.addEventListener('click', () => {
    const c = getCart();
    c.splice(+btn.closest('.cart-item').dataset.idx, 1);
    saveCart(c);
    render();
  }));
  selectAll.checked = true;
  recalc();
}

selectAll.addEventListener('change', () => {
  box.querySelectorAll('.item-check').forEach((cb) => { cb.checked = selectAll.checked; });
  recalc();
});
render();
