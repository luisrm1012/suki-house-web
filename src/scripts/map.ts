// Mapas de Google con carga al hacer clic (sin cookies de Google antes de que la persona lo pida).
// Funciona con varias instancias de <MapEmbed> en la misma página.
// Si la persona ya pidió un mapa en esta sesión, los siguientes se cargan solos al acercarse al viewport.

const KEY = 'suki:maps-optin';

function hasOptedIn(): boolean {
  try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
}
function rememberOptIn(): void {
  try { sessionStorage.setItem(KEY, '1'); } catch { /* sin almacenamiento: no pasa nada */ }
}

function embedUrl(query: string, lang: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=${lang}&z=15&output=embed`;
}

function init(root: HTMLElement): void {
  const lang = root.dataset.lang || 'es';
  const titleTpl = root.dataset.titleTpl || 'Map of {name}';
  const txtLoading = root.dataset.txtLoading || '';
  const txtLoaded = root.dataset.txtLoaded || '';
  const status = root.querySelector<HTMLElement>('[data-status]');
  const panels = Array.from(root.querySelectorAll<HTMLElement>('.map-embed__panel'));
  const tabs = Array.from(root.querySelectorAll<HTMLElement>('[role="tab"]'));
  let iframe: HTMLIFrameElement | null = null;
  let loaded = false; // el usuario ya pidió el mapa en esta instancia

  const activePanel = () => panels.find((p) => !p.hidden) ?? panels[0];
  const stageOf = (p: HTMLElement) => p.querySelector<HTMLElement>('.map-embed__stage')!;
  const showBtnOf = (p: HTMLElement) => p.querySelector<HTMLButtonElement>('.map-embed__show');

  function setState(panel: HTMLElement, state: 'idle' | 'loading' | 'ready') {
    stageOf(panel).dataset.state = state;
    const btn = showBtnOf(panel);
    if (btn) {
      const busy = state !== 'idle';
      btn.disabled = busy;
      btn.setAttribute('aria-busy', busy ? 'true' : 'false');
      btn.textContent = busy ? txtLoading : btn.dataset.label || btn.textContent;
    }
  }

  /** Coloca (o mueve) el único iframe de la instancia en el panel y apunta a su lugar. */
  function mountFrame(panel: HTMLElement, focus: boolean) {
    const name = panel.dataset.name || '';
    const query = panel.dataset.query || '';
    const stage = stageOf(panel);

    // el panel que dejamos vuelve a estado de reposo
    panels.forEach((p) => { if (p !== panel) setState(p, 'idle'); });

    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.className = 'map-embed__frame';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '100%');
      iframe.setAttribute('frameborder', '0');
    }
    const frame = iframe;
    frame.onload = () => {
      if (frame.parentElement === stage) {
        setState(panel, 'ready');
        if (status) status.textContent = txtLoaded;
      }
    };
    frame.title = titleTpl.replace('{name}', name);
    setState(panel, 'loading');
    if (status) status.textContent = '';
    if (frame.parentElement !== stage) stage.appendChild(frame);
    frame.src = embedUrl(query, lang);
    if (focus) frame.focus({ preventScroll: true });
  }

  function load(focus: boolean) {
    loaded = true;
    mountFrame(activePanel(), focus);
  }

  // Clic en "Ver mapa" (cualquier panel)
  root.querySelectorAll<HTMLButtonElement>('.map-embed__show').forEach((btn) => {
    btn.addEventListener('click', () => {
      rememberOptIn();
      load(true);
    });
  });

  // Pestañas (patrón WAI-ARIA: activación automática, flechas, Inicio/Fin)
  function select(tab: HTMLElement, focus: boolean) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p) => { p.hidden = p.dataset.place !== tab.dataset.place; });
    if (focus) tab.focus();
    if (loaded) mountFrame(activePanel(), false);
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (e) => {
      const ev = e as KeyboardEvent;
      let next = -1;
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') next = (i + 1) % tabs.length;
      else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      else if (ev.key === 'Home') next = 0;
      else if (ev.key === 'End') next = tabs.length - 1;
      if (next < 0) return;
      ev.preventDefault();
      select(tabs[next], true);
    });
  });

  // Ya aceptó en esta sesión: cargar sin pedirlo cuando el mapa esté cerca de verse
  if (hasOptedIn()) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          if (!loaded) load(false);
        }
      }, { rootMargin: '300px 0px' });
      io.observe(root);
    } else {
      load(false);
    }
  }
}

document.querySelectorAll<HTMLElement>('[data-map-embed]').forEach(init);
