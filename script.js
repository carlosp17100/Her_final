
// ---- Fix de altura real del viewport para móviles ----
function setRealVh() {
  // Un "vh" = 1% de la altura real del viewport
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setRealVh();
window.addEventListener('resize', setRealVh, { passive: true });
window.addEventListener('orientationchange', setRealVh, { passive: true });

// ---- UI: ripple y navegación ----
document.addEventListener('DOMContentLoaded', () => {
  // Ripple en botones .btn
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - r.left) + 'px';
    ripple.style.top  = (e.clientY - r.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 620);
  });

  // Navegación para elementos con atributo data-go
  document.body.addEventListener('click', (e) => {
    const goEl = e.target.closest('[data-go]');
    if (!goEl) return;
    const url = goEl.getAttribute('data-go');
    if (url && !url.startsWith('#')) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = url;
    }
  });
});
