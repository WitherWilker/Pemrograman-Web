/* favorit.js — daftar favorit dari localStorage */
const grid = document.getElementById('favorit-grid');
function renderFav() {
  const items = getFav().map(getProduct).filter(Boolean);
  grid.innerHTML = items.map(renderProductCard).join('');
  document.getElementById('fav-count').textContent = items.length;
  document.getElementById('favorit-empty').style.display = items.length ? 'none' : 'flex';
  grid.closest('.section-card').style.display = items.length ? 'block' : 'none';
}
document.addEventListener('favchange', renderFav);
renderFav();
