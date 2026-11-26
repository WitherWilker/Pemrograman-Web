/* app.js — perilaku global: nav kategori, pencarian, badge keranjang, favorit, toast */
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 1800);
}

(function () {
  const params = new URLSearchParams(location.search);
  const page = location.pathname.split('/').pop() || 'index.html';

  const nav = document.querySelector('.category-nav-inner');
  if (nav) {
    nav.innerHTML =
      `<a href="index.html" class="${page === 'index.html' ? 'active' : ''}">Beranda</a>` +
      CATEGORIES.map((c) => `<a href="kategori.html?cat=${c.slug}" class="${page === 'kategori.html' && params.get('cat') === c.slug ? 'active' : ''}">${c.name}</a>`).join('');
  }

  const form = document.querySelector('.search-form');
  if (form) {
    const input = form.querySelector('input');
    if (page === 'kategori.html' && params.get('q')) input.value = params.get('q');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      location.href = 'kategori.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  }

  updateBadge();

  document.addEventListener('click', (e) => {
    const b = e.target.closest('.wishlist-btn');
    if (!b) return;
    e.preventDefault();
    const id = +b.dataset.id;
    const on = toggleFav(id);
    b.classList.toggle('active', on);
    toast(on ? 'Ditambahkan ke favorit' : 'Dihapus dari favorit');
    document.dispatchEvent(new CustomEvent('favchange', { detail: { id, on } }));
  });
})();
