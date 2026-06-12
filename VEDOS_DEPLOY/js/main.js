/* ═══════════════════════════════════════════════
   SERVIS KÖSTLER – MAIN JS
═══════════════════════════════════════════════ */

/* ─── OZNAMOVACÍ BANNER – konfigurace ────────────
   enabled: true  → banner se zobrazí na webu
   enabled: false → banner je skrytý
   text: { cs: '...', de: '...' }
──────────────────────────────────────────────── */
const NOTICE = {
  enabled: false,
  text: {
    cs: 'Dnes jsem na odborném školení. K dispozici jsem od 17:00.',
    de: 'Heute bin ich auf einer Fachschulung. Ab 17:00 Uhr bin ich wieder erreichbar.'
  }
};

/* ─── SERVISNÍ OBLAST – datové pole pro kartičky měst ─
   Každý jazyk má vlastní seznam – NETRANSLUJEME česká města,
   DE verze zobrazuje německá příhraniční města.
──────────────────────────────────────────────── */
const serviceAreas = {
  cs: [
    'Karlovy Vary', 'Cheb', 'Sokolov', 'Mariánské Lázně',
    'Ostrov', 'Františkovy Lázně', 'Aš', 'Chodov',
    'Kraslice', 'Nejdek', 'Loket', 'Jáchymov'
  ],
  de: [
    'Hof', 'Selb', 'Marktredwitz', 'Wunsiedel',
    'Rehau', 'Plauen', 'Zwickau', 'Chemnitz',
    'Bayreuth', 'Weiden in der Oberpfalz',
    'Tirschenreuth', 'Annaberg-Buchholz', 'Aue-Bad Schlema'
  ]
};

/* ─── I18N ───────────────────────────────────── */
// Klíč sk_lang_v2 – starý sk_lang (browser-autodetekce) se záměrně ignoruje.
// Platné hodnoty: 'cs' | 'de'. Cokoliv jiného → výchozí 'cs'.
const _LANG_KEY = 'sk_lang_v2';
const _saved = localStorage.getItem(_LANG_KEY);
let currentLang = (_saved === 'cs' || _saved === 'de') ? _saved : 'cs';

function applyLang(lang) {
  const T = window.TRANSLATIONS;
  if (!T || !T[lang]) { console.warn('Translations not loaded for:', lang); return; }
  const t = T[lang];

  document.documentElement.lang = lang;

  if (t['meta.title']) document.title = t['meta.title'];

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t['meta.description']) metaDesc.content = t['meta.description'];

  const metaKw = document.querySelector('meta[name="keywords"]');
  if (metaKw && t['meta.keywords']) metaKw.content = t['meta.keywords'];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = t[el.dataset.i18nHtml];
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const val = t[el.dataset.i18nAlt];
    if (val !== undefined) el.alt = val;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const val = t[el.dataset.i18nAria];
    if (val !== undefined) el.setAttribute('aria-label', val);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const noticeTextEl = document.querySelector('.notice-banner-text');
  if (noticeTextEl && NOTICE.enabled) {
    noticeTextEl.textContent = NOTICE.text[lang] || NOTICE.text.cs;
  }

  currentLang = lang;

  const citiesGrid = document.getElementById('citiesGrid');
  if (citiesGrid && serviceAreas[lang]) {
    const pin = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/></svg>';
    citiesGrid.innerHTML = serviceAreas[lang]
      .map(city => `<div class="city-card">${pin}<span>${city}</span></div>`)
      .join('');
  }
}

(function () {
  'use strict';

  /* ─── NOTICE BANNER ─────────────────────────── */
  const noticeBanner = document.getElementById('noticeBanner');
  if (noticeBanner && NOTICE.enabled) {
    const textEl = noticeBanner.querySelector('.notice-banner-text');
    if (textEl) textEl.textContent = NOTICE.text[currentLang] || NOTICE.text.cs;
    noticeBanner.hidden = false;
    const h = noticeBanner.offsetHeight;
    document.documentElement.style.setProperty('--notice-h', h + 'px');
    document.body.classList.add('notice-visible');
  }

  /* ─── LOADING SCREEN ─────────────────────────── */
  const ls = document.getElementById('loadingScreen');
  if (ls) {
    const hide = () => ls.classList.add('ls-hidden');
    if (document.readyState === 'complete') {
      setTimeout(hide, 1100);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 1100));
    }
  }

  /* ─── STICKY HEADER ──────────────────────────── */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MOBILE BURGER MENU ─────────────────────── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    const closeMobileMenu = () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-nav-link, .btn').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && burger.classList.contains('open')) {
        closeMobileMenu();
        burger.focus();
      }
    });
  }

  /* ─── LANGUAGE SWITCHER ──────────────────────── */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      localStorage.setItem(_LANG_KEY, lang);
      applyLang(lang);
    });
  });

  applyLang(currentLang);

  /* ─── SMOOTH SCROLL ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = (header ? header.offsetHeight : 72) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── FADE IN ON SCROLL ──────────────────────── */
  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll(
      '.service-card, .why-card, .hiw-step, .city-card, .area-stat-card, .brand-card, .action-card, .testimonial-card, .cta-badge'
    );
    fadeEls.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ─── ACTIVE NAV HIGHLIGHT ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      }),
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(s => navObserver.observe(s));
  }

})();
