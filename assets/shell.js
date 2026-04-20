/* Shared shell: header, footer, whatsapp FAB, tweaks, reveal */

const WHATSAPP_NUMBER = '584141234567'; // placeholder Venezuela
const WHATSAPP_TEXT = encodeURIComponent('Hola Juan Vicente, me gustaría recibir asesoría sobre un seguro.');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

const NAV_LINKS = [
  { href: 'index.html', label: 'Inicio' },
  { href: 'nosotros.html', label: 'Nosotros' },
  { href: 'servicios.html', label: 'Seguros' },
  { href: 'cotiza.html', label: 'Cotiza' },
  { href: 'faq.html', label: 'FAQ' },
  { href: 'contacto.html', label: 'Contacto' },
];

function currentPage() {
  const path = location.pathname.split('/').pop() || 'index.html';
  return path;
}

function renderHeader() {
  const host = document.getElementById('site-header');
  if (!host) return;
  const cur = currentPage();
  host.innerHTML = `
  <a class="skip-link" href="#main-content">Saltar al contenido principal</a>
    <header class="header" id="header">
      <div class="container nav">
        <a href="index.html" class="logo" aria-label="Juan Vicente Aguilar">
          <span class="logo-mark">JA</span>
          <span class="logo-text">
            Juan Vicente Aguilar
            <small>Corredor de seguros</small>
          </span>
        </a>
        <nav class="nav-links" aria-label="Principal">
          ${NAV_LINKS.map(l => `<a href="${l.href}" class="${cur === l.href ? 'active' : ''}">${l.label}</a>`).join('')}
        </nav>
        <div class="nav-cta">
          <a href="cotiza.html" class="btn btn-primary btn-sm">
            Cotizar ahora
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <button class="nav-toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileDrawer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
      ${NAV_LINKS.map(l => `<a href="${l.href}">${l.label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`).join('')}
      <a href="cotiza.html" class="btn btn-primary mobile-cta" style="justify-content:center; padding: 16px 22px;">Cotizar ahora</a>
    </div>
  `;

  // scroll border
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile toggle
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer');
  toggle?.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    drawer.setAttribute('aria-hidden', String(!isOpen));
    toggle.querySelector('svg').innerHTML = isOpen
      ? '<path d="M6 6l12 12M6 18L18 6"/>'
      : '<path d="M4 7h16M4 12h16M4 17h16"/>';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.querySelector('svg').innerHTML = '<path d="M4 7h16M4 12h16M4 17h16"/>';
    document.body.style.overflow = '';
  }));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      toggle.querySelector('svg').innerHTML = '<path d="M4 7h16M4 12h16M4 17h16"/>';
      document.body.style.overflow = '';
    }
  });
}

function renderFooter() {
  const host = document.getElementById('site-footer');
  if (!host) return;
  host.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo">
              <span class="logo-mark">JA</span>
              <span class="logo-text">
                Juan Vicente Aguilar
                <small>Corredor de seguros</small>
              </span>
            </div>
            <p>Asesoría profesional e independiente en seguros para personas, familias y empresas en Venezuela. Cotización, emisión, renovación y acompañamiento ante siniestros.</p>
          </div>
          <div class="footer-col">
            <h4>Servicios</h4>
            <ul>
              <li><a href="servicios.html#salud">Salud</a></li>
              <li><a href="servicios.html#auto">Auto y RCV</a></li>
              <li><a href="servicios.html#vida">Vida</a></li>
              <li><a href="servicios.html#viajes">Viajes</a></li>
              <li><a href="servicios.html#hogar">Hogar y Comercio</a></li>
              <li><a href="servicios.html#empresas">Empresas</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Compañía</h4>
            <ul>
              <li><a href="nosotros.html">Sobre Juan Vicente</a></li>
              <li><a href="faq.html">Preguntas frecuentes</a></li>
              <li><a href="cotiza.html">Cotiza tu seguro</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li>Caracas, Venezuela</li>
              <li><a href="tel:+584141234567">+58 414 123 4567</a></li>
              <li><a href="mailto:asesoria@jvaguilar.com">asesoria@jvaguilar.com</a></li>
              <li>Lun – Vie · 8:30 am – 6:00 pm</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Juan Vicente Aguilar — Corredor de seguros. Todos los derechos reservados.</span>
          <span>Registro SUDEASEG · RIF V-00.000.000-0</span>
        </div>
      </div>
    </footer>
  `;
}

function renderWhatsapp() {
  const host = document.getElementById('site-fab');
  if (!host) return;
  host.innerHTML = `
    <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" class="whatsapp-fab" aria-label="Chatea por WhatsApp">
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.2c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.63.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.34 0 1.38 1 2.72 1.14 2.91.14.19 1.98 3.02 4.8 4.23.67.29 1.19.46 1.6.59.67.21 1.28.18 1.77.11.54-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33zM16 5.33A10.66 10.66 0 0 0 6.92 21.4L5.33 26.67l5.43-1.57A10.67 10.67 0 1 0 16 5.33zm0 19.37a8.7 8.7 0 0 1-4.4-1.2l-.32-.19-3.22.93.94-3.14-.21-.33A8.7 8.7 0 1 1 16 24.7z"/>
      </svg>
      <span class="whatsapp-label">Escríbenos por WhatsApp</span>
    </a>
  `;
}

/* Tweaks */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#0A1F44"
}/*EDITMODE-END*/;

const BRAND_PRESETS = [
  { name: 'Azul marino',   value: '#0A1F44' },
  { name: 'Verde bosque',  value: '#1E3A2F' },
  { name: 'Negro ébano',   value: '#111418' },
  { name: 'Azul eléctrico',value: '#1E4FD8' },
  { name: 'Vino tinto',    value: '#5C1A2B' },
  { name: 'Cobre',         value: '#8A4B2A' },
];

function applyTweaks(state) {
  const color = state.primaryColor || TWEAK_DEFAULTS.primaryColor;
  document.documentElement.style.setProperty('--brand', color);
  // derive hover
  const hover = shade(color, -8);
  document.documentElement.style.setProperty('--brand-700', hover);
}

function shade(hex, percent) {
  const h = hex.replace('#','');
  const r = parseInt(h.substr(0,2),16);
  const g = parseInt(h.substr(2,2),16);
  const b = parseInt(h.substr(4,2),16);
  const adj = (c) => Math.max(0, Math.min(255, Math.round(c + (percent/100)*255)));
  return '#' + [adj(r),adj(g),adj(b)].map(c=>c.toString(16).padStart(2,'0')).join('');
}

let tweakState = { ...TWEAK_DEFAULTS };

function renderTweaks() {
  // Listen FIRST
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') showTweaks(true);
    if (d.type === '__deactivate_edit_mode') showTweaks(false);
  });
  // Then announce
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}

  const el = document.createElement('div');
  el.className = 'tweaks-panel';
  el.id = 'tweaksPanel';
  el.innerHTML = `
    <h5>Color primario de marca</h5>
    <div class="tweaks-swatches">
      ${BRAND_PRESETS.map(p => `
        <button class="tweaks-swatch ${p.value === tweakState.primaryColor ? 'active' : ''}"
          data-color="${p.value}"
          style="background:${p.value}"
          title="${p.name}"></button>
      `).join('')}
    </div>
  `;
  document.body.appendChild(el);
  el.querySelectorAll('.tweaks-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.getAttribute('data-color');
      tweakState.primaryColor = c;
      applyTweaks(tweakState);
      el.querySelectorAll('.tweaks-swatch').forEach(b => b.classList.toggle('active', b === btn));
      try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { primaryColor: c } }, '*'); } catch {}
    });
  });

  applyTweaks(tweakState);
}

function showTweaks(v) {
  const p = document.getElementById('tweaksPanel');
  if (p) p.classList.toggle('visible', v);
}

/* Reveal on scroll */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderWhatsapp();
  renderTweaks();
  initReveal();
});
