/* products-data.js — data produk, kategori, helper keranjang & favorit (dipakai semua halaman) */
const CATEGORIES = [
  { k:'e',  slug:'elektronik',     name:'Elektronik',     icon:'📱', g:['#dbeafe','#93c5fd'], fg:'#1e3a8a', store:'Gadget Corner Official', vl:'Warna',  vo:['Hitam','Putih','Biru'], blurb:'Perangkat elektronik berkualitas dengan performa stabil, hemat daya, dan aman untuk pemakaian harian.' },
  { k:'fp', slug:'fashion-pria',   name:'Fashion Pria',   icon:'👔', g:['#e0e7ff','#a5b4fc'], fg:'#312e81', store:'Gentleman Wardrobe',     vl:'Ukuran', vo:['S','M','L','XL'],       blurb:'Bahan nyaman dan jahitan rapi, cocok untuk aktivitas kerja, kuliah, maupun santai.' },
  { k:'fw', slug:'fashion-wanita', name:'Fashion Wanita', icon:'👗', g:['#fce7f3','#f9a8d4'], fg:'#831843', store:'Bella Style Studio',     vl:'Varian', vo:['Standar','Premium'],    blurb:'Desain kekinian dengan material berkualitas, nyaman dipakai seharian dan mudah dipadupadankan.' },
  { k:'kc', slug:'kecantikan',     name:'Kecantikan',     icon:'💄', g:['#ffe4e6','#fda4af'], fg:'#881337', store:'Glow Beauty Lab',        vl:'Varian', vo:['Reguler','Paket Hemat'],blurb:'Formula lembut dan aman untuk kulit, sudah terdaftar BPOM, cocok untuk perawatan rutin.' },
  { k:'rt', slug:'rumah-tangga',   name:'Rumah Tangga',   icon:'🏠', g:['#dcfce7','#86efac'], fg:'#14532d', store:'Rumah Nyaman Store',     vl:'Warna',  vo:['Putih','Hitam','Abu-abu'], blurb:'Perlengkapan rumah yang awet, praktis, dan membuat aktivitas sehari-hari jadi lebih mudah.' },
  { k:'hb', slug:'hobi-koleksi',   name:'Hobi & Koleksi', icon:'🎨', g:['#fef3c7','#fcd34d'], fg:'#78350f', store:'Hobbyist Hub',           vl:'Varian', vo:['Standar','Premium'],    blurb:'Teman terbaik untuk mengisi waktu luang, cocok untuk pemula maupun kolektor.' },
  { k:'ib', slug:'ibu-bayi',       name:'Ibu & Bayi',     icon:'🍼', g:['#cffafe','#67e8f9'], fg:'#164e63', store:'Baby Happy Mart',        vl:'Varian', vo:['Standar','Isi Banyak'], blurb:'Aman untuk si kecil, bebas bahan berbahaya, dan nyaman digunakan setiap hari.' },
  { k:'or', slug:'olahraga',       name:'Olahraga',       icon:'⚽', g:['#ffedd5','#fdba74'], fg:'#7c2d12', store:'Sporty Arena',           vl:'Warna',  vo:['Hitam','Biru','Merah'], blurb:'Perlengkapan olahraga kuat dan nyaman untuk mendukung latihan di rumah maupun di lapangan.' },
];

// [kategori, nama, harga, harga coret, rating, terjual, ikon, mall]
const RAW = [
  ['e','Earphone Bluetooth TWS Wireless Bass',65000,120000,4.9,25000,'🎧',1],
  ['e','Powerbank 20000mAh Fast Charging',135000,220000,4.9,4100,'🔋',0],
  ['e','Smartwatch Fitness Tracker Layar AMOLED',175000,400000,4.7,9600,'⌚',1],
  ['e','Keyboard Mechanical RGB Gaming',285000,450000,4.8,3300,'⌨️',0],
  ['e','Mouse Wireless Silent Click',55000,95000,4.8,8900,'🖱️',0],
  ['e','Speaker Bluetooth Portable Waterproof',149000,260000,4.7,5400,'🔊',1],
  ['e','Webcam Full HD 1080p dengan Mic',185000,320000,4.6,1200,'🎥',0],
  ['fp','Kaos Polos Cotton Combed 30s Unisex',45000,75000,4.9,12000,'👕',1],
  ['fp','Kemeja Flanel Kotak Lengan Panjang',55000,100000,4.6,2300,'👔',0],
  ['fp','Jaket Hoodie Oversize Cotton Fleece',89000,160000,4.7,5200,'🧥',1],
  ['fp','Celana Chino Slim Fit Pria',95000,170000,4.7,3800,'👖',0],
  ['fp','Sepatu Sneakers Sport Pria Original',189000,350000,4.8,3200,'👟',0],
  ['fp','Topi Baseball Cap Polos Adjustable',29000,55000,4.8,6100,'🧢',0],
  ['fw','Dress Midi Floral Wanita Korean Style',119000,210000,4.8,4700,'👗',1],
  ['fw','Tas Selempang Kulit Sintetis Waterproof',79000,150000,4.7,890,'👜',0],
  ['fw','Sepatu Heels Block Wanita Nyaman 5cm',99000,180000,4.6,2100,'👠',0],
  ['fw','Kacamata Fashion Anti Radiasi Wanita',39000,80000,4.7,3500,'👓',0],
  ['fw','Hijab Pashmina Ceruty Babydoll',35000,60000,4.9,15000,'🧕',1],
  ['fw','Kalung Stainless Anti Karat Liontin',49000,95000,4.8,2600,'📿',0],
  ['kc','Set Skincare Wajah Glowing Paket Hemat',99000,180000,4.8,7800,'🧴',1],
  ['kc','Lipstik Matte Tahan Lama 24 Jam',39000,70000,4.8,9400,'💄',0],
  ['kc','Parfum Body Mist Tahan Lama 100ml',38000,65000,4.9,11000,'🌸',1],
  ['kc','Sunscreen SPF 50 PA++++ Gentle',59000,110000,4.9,13000,'☀️',1],
  ['kc','Masker Wajah Sheet Mask Isi 10',45000,80000,4.7,5600,'🧖',0],
  ['kc','Hair Dryer Mini Lipat 2 Kecepatan',79000,150000,4.6,1900,'💨',0],
  ['rt','Rice Cooker Mini Serbaguna 1.2L',149000,260000,4.8,1500,'🍚',1],
  ['rt','Botol Minum Tumbler Stainless 1 Liter',42000,70000,4.8,3400,'🥤',0],
  ['rt','Lampu LED Meja Belajar Touch Dimmer',48000,85000,4.8,2900,'💡',0],
  ['rt','Set Panci Anti Lengket 5 Pcs',199000,350000,4.7,1300,'🍳',1],
  ['rt','Bantal Guling Silikon Premium 2 Pcs',69000,120000,4.8,4200,'🛏️',0],
  ['rt','Vacuum Cleaner Mini Wireless',159000,280000,4.6,1700,'🧹',1],
  ['hb','Gitar Akustik Pemula 38 Inci Lengkap',349000,550000,4.8,980,'🎸',0],
  ['hb','Puzzle Jigsaw 1000 Pcs Pemandangan',65000,110000,4.9,2200,'🧩',0],
  ['hb','Set Alat Lukis Cat Air 36 Warna',55000,95000,4.8,3100,'🎨',0],
  ['hb','Action Figure Anime Koleksi 15cm',89000,160000,4.7,1600,'🦸',1],
  ['hb','Kamera Analog Retro Film 35mm',245000,400000,4.6,730,'📷',0],
  ['hb','Paket Novel Fiksi Best Seller 3 Buku',99000,170000,4.9,5100,'📚',0],
  ['ib','Mainan Edukasi Anak Balok Kayu',35000,60000,4.9,6700,'🧱',0],
  ['ib','Botol Susu Bayi Anti Kolik 240ml',55000,95000,4.9,4400,'🍼',1],
  ['ib','Baju Bayi Jumper Set Isi 3 Pcs',75000,130000,4.8,3900,'👚',0],
  ['ib','Stroller Bayi Lipat Ringan',899000,1400000,4.7,420,'🚼',1],
  ['ib','Tas Ransel Sekolah Anak Karakter',85000,150000,4.8,2800,'🎒',0],
  ['or','Matras Yoga Anti Slip 8mm',62000,110000,4.9,1100,'🧘',0],
  ['or','Dumbbell Set Adjustable 10kg',219000,380000,4.8,1400,'🏋️',0],
  ['or','Raket Badminton Carbon Set 2 Pcs',159000,270000,4.7,2000,'🏸',1],
  ['or','Bola Sepak Size 5 Standar Match',99000,170000,4.8,3000,'⚽',0],
  ['or','Sepatu Lari Ringan Breathable',175000,320000,4.7,4600,'🏃',1],
  ['or','Sarung Tinju Boxing Gloves 12oz',129000,230000,4.6,860,'🥊',0],
];

const PRODUCTS = RAW.map((r, i) => {
  const c = CATEGORIES.find((x) => x.k === r[0]);
  return { id: i + 1, cat: c.slug, name: r[1], price: r[2], oldPrice: r[3], discount: Math.round((1 - r[2] / r[3]) * 100),
           rating: r[4], soldN: r[5], icon: r[6], mall: !!r[7] };
});

const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const catOf = (p) => CATEGORIES.find((c) => c.slug === p.cat);
const formatRupiah = (n) => 'Rp' + n.toLocaleString('id-ID');
const fmtSold = (n) => n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '').replace('.', ',') + 'rb' : String(n);

/* Gambar produk: ilustrasi SVG dibuat dari ikon + nama produk, jadi selalu sesuai dan tanpa internet */
function productImg(p, v = 0) {
  const c = catOf(p);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c.g[0]}'/><stop offset='1' stop-color='${c.g[1]}'/></linearGradient></defs><rect width='300' height='300' fill='url(#g)'/><circle cx='${[150,90,220,150][v]}' cy='${[140,80,230,100][v]}' r='${[105,130,90,150][v]}' fill='#fff' fill-opacity='.4'/><text x='150' y='${[172,150,190,200][v]}' font-size='${[130,110,150,90][v]}' text-anchor='middle'>${p.icon}</text><text x='150' y='278' font-size='15' font-weight='bold' text-anchor='middle' fill='${c.fg}' font-family='Arial,sans-serif'>${p.name.split(' ').slice(0, 3).join(' ')}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* Penyimpanan lokal: keranjang & favorit */
const LS = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};
const getCart = () => LS.get('bk_cart', []);
const saveCart = (c) => { LS.set('bk_cart', c); updateBadge(); };
function addToCart(id, qty, variant) {
  const cart = getCart();
  const row = cart.find((r) => r.id === id && r.v === variant);
  if (row) row.qty += qty; else cart.push({ id, qty, v: variant });
  saveCart(cart);
}
const getFav = () => LS.get('bk_fav', []);
function toggleFav(id) {
  let f = getFav();
  const on = !f.includes(id);
  f = on ? [...f, id] : f.filter((x) => x !== id);
  LS.set('bk_fav', f);
  return on;
}
function updateBadge() {
  document.querySelectorAll('.icon-badge').forEach((b) => {
    const n = getCart().length;
    b.textContent = n;
    b.style.display = n ? 'flex' : 'none';
  });
}

function renderProductCard(p) {
  const fav = getFav().includes(p.id);
  return `
    <a href="produk-detail.html?id=${p.id}" class="product-card">
      <div class="product-thumb">
        <img src="${productImg(p)}" alt="${p.name}" loading="lazy">
        <span class="product-discount">-${p.discount}%</span>
        <button class="wishlist-btn${fav ? ' active' : ''}" data-id="${p.id}" type="button" aria-label="Tambah ke favorit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
        </button>
      </div>
      <div class="product-info">
        <p class="product-name">${p.mall ? '<span class="product-badge-mall">Mall</span>' : ''}${p.name}</p>
        <p class="product-price">${formatRupiah(p.price)}<span class="product-price-old">${formatRupiah(p.oldPrice)}</span></p>
        <div class="product-meta">
          <span class="product-rating">&#9733; ${p.rating}</span>
          <span>Terjual ${fmtSold(p.soldN)}</span>
        </div>
      </div>
    </a>`;
}

function renderProductGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = products.map(renderProductCard).join('');
}
