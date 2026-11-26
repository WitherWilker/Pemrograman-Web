/* produk-detail.js — halaman detail dirender dari ?id= sesuai produk yang diklik */
const root = document.getElementById('pd-root');
const p = getProduct(+new URLSearchParams(location.search).get('id'));

if (!p) {
  root.innerHTML = '<section class="section-card empty-state" style="margin-top:16px;"><p>Produk tidak ditemukan.</p><a href="index.html" class="btn btn-primary">Kembali ke Beranda</a></section>';
} else {
  const c = catOf(p);
  let variant = c.vo[0];
  const stock = 40 + ((p.id * 37) % 360);
  const reviews = Math.max(12, Math.round(p.soldN * 0.05));
  const stars = '&#9733;'.repeat(Math.round(p.rating));
  const cities = ['Jakarta Barat', 'Surabaya', 'Bandung', 'Malang', 'Semarang'];
  document.title = p.name + ' — BelanjaKu';

  root.innerHTML = `
  <p class="breadcrumb"><a href="index.html">Beranda</a><span>&rsaquo;</span><a href="kategori.html?cat=${c.slug}">${c.name}</a><span>&rsaquo;</span>${p.name}</p>

  <section class="product-detail section-card">
    <div class="pd-gallery">
      <div class="pd-main-image"><img id="pd-main-img" src="${productImg(p, 0)}" alt="${p.name}"></div>
      <div class="pd-thumbs">${[0, 1, 2, 3].map((v) => `<img src="${productImg(p, v)}" alt="Foto ${v + 1}" class="${v ? '' : 'active'}">`).join('')}</div>
    </div>
    <div class="pd-info">
      <h1 class="pd-title">${p.mall ? '<span class="product-badge-mall">Mall</span>' : ''}${p.name}</h1>
      <div class="pd-rating-row">
        <span class="pd-rating-score">${p.rating}</span><span class="pd-stars">${stars}</span>
        <span class="pd-divider">|</span><span>${reviews.toLocaleString('id-ID')} Penilaian</span>
        <span class="pd-divider">|</span><span>${fmtSold(p.soldN)} Terjual</span>
      </div>
      <div class="pd-price-box">
        <span class="pd-price">${formatRupiah(p.price)}</span>
        <span class="pd-price-old">${formatRupiah(p.oldPrice)}</span>
        <span class="pd-discount-tag">-${p.discount}%</span>
      </div>
      <div class="pd-promo-box">
        <span class="pd-promo-label">Voucher Toko</span>
        <span class="pd-voucher">Diskon 10rb</span><span class="pd-voucher">Gratis Ongkir</span>
      </div>
      <div class="pd-variant">
        <span class="pd-variant-label">${c.vl}</span>
        <div class="pd-variant-options">${c.vo.map((o, i) => `<button type="button" class="variant-btn${i ? '' : ' active'}">${o}</button>`).join('')}</div>
      </div>
      <div class="pd-variant">
        <span class="pd-variant-label">Jumlah</span>
        <div class="qty-stepper">
          <button type="button" data-step="dec">&minus;</button>
          <input type="number" id="pd-qty" value="1" min="1" max="${stock}">
          <button type="button" data-step="inc">+</button>
        </div>
        <span class="pd-stock">Stok tersedia: ${stock}</span>
      </div>
      <div class="pd-actions">
        <button type="button" class="btn btn-outline" id="btn-cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          Masukkan Keranjang
        </button>
        <button type="button" class="btn btn-primary" id="btn-buy">Beli Sekarang</button>
        <button type="button" class="btn btn-ghost" id="pd-fav"></button>
      </div>
    </div>
  </section>

  <section class="section-card" style="margin-top:16px;" data-tab-group>
    <div class="tabs">
      <button class="tab-btn active" data-tab-target="deskripsi">Deskripsi Produk</button>
      <button class="tab-btn" data-tab-target="ulasan">Ulasan (${reviews.toLocaleString('id-ID')})</button>
    </div>
    <div class="pd-panel" data-tab-panel="deskripsi">
      <h3>Detail Produk</h3>
      <ul class="pd-spec-list">
        <li><span>Kategori</span><span>${c.name}</span></li>
        <li><span>Toko</span><span>${c.store}</span></li>
        <li><span>Kondisi</span><span>Baru</span></li>
        <li><span>Berat</span><span>${200 + ((p.id * 53) % 1300)} gram</span></li>
        <li><span>Garansi</span><span>${p.mall ? '1 tahun garansi resmi' : '7 hari garansi toko'}</span></li>
        <li><span>Dikirim dari</span><span>${cities[p.id % 5]}</span></li>
      </ul>
      <p class="pd-description-text">${p.name} dari ${c.store}. ${c.blurb} Stok selalu diperbarui dan pesanan dikemas rapi sebelum dikirim.</p>
    </div>
    <div class="pd-panel" data-tab-panel="ulasan" style="display:none;">
      ${[['Andi P.', 'Barang sesuai deskripsi, kualitas bagus untuk harga segini. Pengiriman cepat!'],
         ['Siti R.', 'Packing rapi dan aman, penjual responsif. Pasti beli lagi, terima kasih!'],
         ['Budi S.', 'Sesuai ekspektasi, worth it banget dibanding toko lain.']].map(([n, t]) => `
      <div class="review-item">
        <div class="review-head"><span class="review-avatar">${n[0]}</span>
          <div><p class="review-name">${n}</p><p class="pd-stars" style="font-size:12px;">&#9733;&#9733;&#9733;&#9733;&#9733;</p></div></div>
        <p class="review-text">${t}</p>
      </div>`).join('')}
    </div>
  </section>

  <section class="section section-card">
    <div class="section-head"><h2 class="section-title">Produk Serupa</h2>
      <a href="kategori.html?cat=${c.slug}" class="section-link">Lihat Semua &rsaquo;</a></div>
    <div class="product-grid" id="similar-grid"></div>
  </section>`;

  renderProductGrid('similar-grid', PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 5));

  const qtyInput = document.getElementById('pd-qty');
  const qty = () => Math.min(stock, Math.max(1, parseInt(qtyInput.value, 10) || 1));
  const favBtn = document.getElementById('pd-fav');
  const paintFav = () => { favBtn.textContent = getFav().includes(p.id) ? '♥ Tersimpan' : '♡ Simpan'; };
  paintFav();

  root.querySelectorAll('.pd-thumbs img').forEach((img) => img.addEventListener('click', () => {
    root.querySelectorAll('.pd-thumbs img').forEach((i) => i.classList.remove('active'));
    img.classList.add('active');
    document.getElementById('pd-main-img').src = img.src;
  }));
  root.querySelectorAll('.variant-btn').forEach((btn) => btn.addEventListener('click', () => {
    root.querySelectorAll('.variant-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    variant = btn.textContent;
  }));
  document.getElementById('btn-cart').addEventListener('click', () => {
    addToCart(p.id, qty(), variant);
    toast('Ditambahkan ke keranjang');
  });
  document.getElementById('btn-buy').addEventListener('click', () => {
    addToCart(p.id, qty(), variant);
    location.href = 'keranjang.html';
  });
  favBtn.addEventListener('click', () => { const on = toggleFav(p.id); paintFav(); toast(on ? 'Ditambahkan ke favorit' : 'Dihapus dari favorit'); });
}
