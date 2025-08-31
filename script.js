
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
/* =======================
   HOVER LINDO: tilt 3D
   ======================= */
(function enableTilt() {
  const cards = document.querySelectorAll('.photo-item');
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      const rotX = clamp(((y - r.height/2) / r.height) * -10, -10, 10);
      const rotY = clamp(((x - r.width/2)  / r.width)  *  10, -10, 10);

      card.style.setProperty('--rx', `${rotX}deg`);
      card.style.setProperty('--ry', `${rotY}deg`);
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', `0deg`);
      card.style.setProperty('--ry', `0deg`);
      card.style.setProperty('--mx', `50%`);
      card.style.setProperty('--my', `50%`);
    });
  });
})();

/* =========================================
   ZOOM SUAVE al abrir/cerrar (clases CSS)
   ========================================= */
(function enhanceModalAnimation() {
  const modal = document.getElementById('mediaModal');
  if (!modal) return;

  // Envuelve tus funciones si ya existen
  const _open = window.openMediaModal;
  const _close = window.closeMediaModal;

  // Guardamos la última tarjeta origen (para potenciales mejoras)
  let lastTile = null;
  document.addEventListener('click', (e) => {
    const tile = e.target.closest('.photo-item');
    if (tile) lastTile = tile;
  }, true);

function openMediaModal(el, type){
  const modal = document.getElementById('mediaModal');
  const img   = document.getElementById('modalImage');
  const vid   = document.getElementById('modalVideo');
  const ctrls = document.getElementById('videoControls');

  // Abre con clase (permite transición)
  modal.classList.add('open');
  document.body.style.overflow='hidden';

  if(type==='image'){
    ctrls.style.display='none';
    vid.style.display='none';
    img.style.display='block';
    img.src = el.src;
    img.alt = el.alt || '';
  }else{
    img.style.display='none';
    vid.style.display='block';
    ctrls.style.display='flex';
    // Copiar fuentes del video
    vid.innerHTML = el.innerHTML;
    vid.load();
    setupVideoControls();
  }
}

function closeMediaModal(){
  const modal = document.getElementById('mediaModal');
  const vid   = document.getElementById('modalVideo');

  try{ vid.pause(); }catch(_){}
  modal.classList.remove('open');   // cierra con transición
  document.body.style.overflow='auto';
}})();


/* =========================================
   Bonus: teclado y click fuera ya los tienes,
   pero añade una leve animación al botón rojo
   ========================================= */
(function pulseCloseBtn(){
  const btn = document.querySelector('.modal-close');
  if (!btn) return;
  btn.addEventListener('mouseenter', () => btn.animate(
    [{ transform: 'scale(1)' },{ transform: 'scale(1.06)' },{ transform: 'scale(1)' }],
    { duration: 280, easing: 'ease' }
  ));
})();
