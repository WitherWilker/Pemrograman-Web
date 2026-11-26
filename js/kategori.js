/* kategori.js — filter kategori, pencarian, harga, rating, urutan */
const qs = new URLSearchParams(location.search);
const catSlug = qs.get('cat') || '';
const query = (qs.get('q') || '').toLowerCase();
const state = { sort: 'relevan', rate: 0, mall: false, min: 0, max: Infinity };
const curCat = CATEGORIES.find((c) => c.slug === catSlug);

document.getElementById('crumb').innerHTML = '<a href="index.html">Beranda</a><span>&rsaquo;</span>' +
  (curCat ? curCat.name : query ? 'Hasil pencarian "' + qs.get('q') + '"' : 'Semua Kategori');

document.getElementById('cat-list').innerHTML =
  `<li><a href="kategori.html" class="${!catSlug ? 'active' : ''}">Semua Kategori <small>(${PRODUCTS.length})</small></a></li>` +
  CATEGORIES.map((c) => `<li><a href="kategori.html?cat=${c.slug}" class="${c.slug === catSlug ? 'active' : ''}">${c.name} <small>(${PRODUCTS.filter((p) => p.cat === c.slug).length})</small></a></li>`).join('');

function apply() {
  const list = PRODUCTS.filter((p) =>
    (!catSlug || p.cat === catSlug) && (!query || p.name.toLowerCase().includes(query)) &&
    p.price >= state.min && p.price <= state.max && p.rating >= state.rate && (!state.mall || p.mall));
  if (state.sort === 'terbaru') list.sort((a, b) => b.id - a.id);
  if (state.sort === 'terlaris') list.sort((a, b) => b.soldN - a.soldN);
  if (state.sort === 'harga-asc') list.sort((a, b) => a.price - b.price);
  if (state.sort === 'harga-desc') list.sort((a, b) => b.price - a.price);
  renderProductGrid('kategori-grid', list);
  document.getElementById('result-count').textContent = list.length + ' produk' + (curCat ? ' di ' + curCat.name : '');
  document.getElementById('kat-empty').style.display = list.length ? 'none' : 'flex';
  document.getElementById('kategori-grid').style.display = list.length ? '' : 'none';
}

document.querySelectorAll('.sort-btn').forEach((btn) => btn.addEventListener('click', () => {
  document.querySelectorAll('.sort-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  state.sort = btn.dataset.sort;
  apply();
}));
document.getElementById('apply-price').addEventListener('click', () => {
  state.min = parseInt(document.getElementById('pmin').value, 10) || 0;
  state.max = parseInt(document.getElementById('pmax').value, 10) || Infinity;
  apply();
});
document.querySelectorAll('input[name="rate"]').forEach((r) => r.addEventListener('change', () => { state.rate = +r.value; apply(); }));
document.getElementById('f-mall').addEventListener('change', (e) => { state.mall = e.target.checked; apply(); });
apply();
