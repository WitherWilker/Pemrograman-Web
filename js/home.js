/* home.js — logika beranda */
renderProductGrid('flash-sale-grid', [...PRODUCTS].sort((a, b) => b.discount - a.discount).slice(0, 5));

document.querySelector('.quick-categories').innerHTML = CATEGORIES.map((c) =>
  `<a href="kategori.html?cat=${c.slug}" class="quick-cat"><span class="qc-icon" style="background:linear-gradient(135deg,${c.g[0]},${c.g[1]})">${c.icon}</span><span>${c.name}</span></a>`).join('');

// Satu section per kategori
document.getElementById('cat-sections').innerHTML = CATEGORIES.map((c) => `
  <section class="section section-card">
    <div class="section-head">
      <h2 class="section-title">${c.name}</h2>
      <a href="kategori.html?cat=${c.slug}" class="section-link">Lihat Semua &rsaquo;</a>
    </div>
    <div class="product-grid" id="grid-${c.slug}"></div>
  </section>`).join('');
CATEGORIES.forEach((c) => renderProductGrid('grid-' + c.slug, PRODUCTS.filter((p) => p.cat === c.slug).slice(0, 5)));

// Rekomendasi: terlaris dulu, muat bertahap
const recs = [...PRODUCTS].sort((a, b) => b.soldN - a.soldN);
let shown = 10;
const recGrid = document.getElementById('recommendation-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
function showRecs() {
  recGrid.innerHTML = recs.slice(0, shown).map(renderProductCard).join('');
  if (shown >= recs.length) { loadMoreBtn.textContent = 'Semua produk telah ditampilkan'; loadMoreBtn.disabled = true; }
}
loadMoreBtn.addEventListener('click', () => { shown += 10; showRecs(); });
showRecs();

// Hitung mundur flash sale
const cd = document.getElementById('flash-countdown');
let remaining = 2 * 3600 + 14 * 60 + 37;
const pad = (n) => String(n).padStart(2, '0');
setInterval(() => {
  remaining = remaining > 0 ? remaining - 1 : 2 * 3600;
  cd.textContent = pad(Math.floor(remaining / 3600)) + ':' + pad(Math.floor((remaining % 3600) / 60)) + ':' + pad(remaining % 60);
}, 1000);
