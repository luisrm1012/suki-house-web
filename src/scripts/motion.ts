// Animaciones de aparición al hacer scroll y fundido de fotos.
// Solo afecta a lo que está bajo el pliegue al cargar: el contenido visible
// de entrada no se oculta nunca (sin parpadeos y sin penalizar el LCP).

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Bloques que aparecen enteros. */
const REVEAL = [
  '.section-head',
  '.rooms-head',
  '.band',
  '.map',
  '.gallery',
  '.text',
  '.col > .card',
  '.inc > h2',
  '.before .title',
  '#habitaciones h2',
].join(',');

/** Contenedores cuyos hijos aparecen escalonados. */
const STAGGER = [
  '.props',
  'div.rooms',
  '.quotes',
  '.scores',
  '.before .grid',
  '.strip .list',
  '.checklist',
  '.inc > ul',
  '.room-list',
].join(',');

function setup() {
  if (reduce || !('IntersectionObserver' in window)) return;
  const root = document.documentElement;
  const fold = window.innerHeight * 0.92;
  const below = (el: Element) => el.getBoundingClientRect().top > fold;

  const targets = new Set<HTMLElement>();
  const main = document.querySelector('main');
  if (!main) return;

  main.querySelectorAll<HTMLElement>(STAGGER).forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      const el = child as HTMLElement;
      if (!below(el)) return;
      el.style.setProperty('--i', String(i));
      targets.add(el);
    });
  });
  main.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
    if (!below(el)) return;
    // si ya va dentro de un elemento escalonado, no lo duplicamos
    for (const t of targets) if (t.contains(el) || el.contains(t)) return;
    targets.add(el);
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add('is-in');
        io.unobserve(el);
        // al terminar, devolvemos el control de transiciones al componente (hovers)
        const delay = Math.min(Number(el.style.getPropertyValue('--i') || 0), 6) * 90;
        window.setTimeout(() => {
          el.removeAttribute('data-reveal');
          el.classList.remove('is-in');
        }, 900 + delay);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => {
    el.setAttribute('data-reveal', '');
    io.observe(el);
  });

  // Fundido de las fotos lazy que todavía no han cargado
  document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
    if (img.complete && img.naturalWidth > 0) return;
    img.setAttribute('data-fade', '');
    const done = () => img.classList.add('is-loaded');
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });

  root.classList.add('motion-ready');
}

setup();
