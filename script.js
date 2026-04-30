/* =============================================================
   GRAFIBEE – script.js
   Vanilla JS: routing, hero canvas, carousel, cookie consent,
   mobile nav, footer year.
   ============================================================= */

'use strict';

/* ──────────────────────────────────────────────────────────────
   CLIENT-SIDE ROUTER
   ────────────────────────────────────────────────────────────── */

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

function navigateTo(path) {
  window.history.pushState({}, '', path);
  renderPage();
}

function renderPage() {
  const pathname = normalizePath(window.location.pathname);
  const hash = window.location.hash;

  const pageHome          = document.getElementById('page-home');
  const pagePrivacy       = document.getElementById('page-adatkezelesi');
  const pageImpresszum    = document.getElementById('page-impresszum');

  // Hide all pages first
  pageHome.hidden       = true;
  pagePrivacy.hidden    = true;
  pageImpresszum.hidden = true;

  if (pathname === '/adatkezelesi-tajekoztato') {
    pagePrivacy.hidden = false;
    window.scrollTo({ top: 0, behavior: 'auto' });

  } else if (pathname === '/impresszum') {
    pageImpresszum.hidden = false;
    window.scrollTo({ top: 0, behavior: 'auto' });

  } else {
    // Home (or any unmatched path)
    pageHome.hidden = false;
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (hash) {
      const targetId = hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }
}

// Handle browser back / forward
window.addEventListener('popstate', renderPage);

// Intercept clicks on elements with class js-nav
document.addEventListener('click', function (event) {
  const link = event.target.closest('.js-nav');
  if (!link) return;
  event.preventDefault();
  const href = link.dataset.href || link.getAttribute('href');
  if (!href) return;

  closeMobileMenu();

  // If it's a hash-anchor link and we're already on the home page,
  // smooth-scroll directly instead of going through the router
  // (the router would scroll to top first, which is jarring).
  const hashMatch = href.match(/^(?:\/)?#(.+)$/);
  if (hashMatch && normalizePath(window.location.pathname) === '/') {
    const targetEl = document.getElementById(hashMatch[1]);
    if (targetEl) {
      window.history.pushState({}, '', '/#' + hashMatch[1]);
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  }

  navigateTo(href);
});

/* ──────────────────────────────────────────────────────────────
   MOBILE NAVBAR
   ────────────────────────────────────────────────────────────── */

const mobileMenuBtn  = document.getElementById('mobile-menu-btn');
const mobileMenu     = document.getElementById('mobile-menu');
const iconMenu       = document.getElementById('icon-menu');
const iconClose      = document.getElementById('icon-close');

function closeMobileMenu() {
  mobileMenu.hidden = true;
  iconMenu.hidden   = false;
  iconClose.hidden  = true;
  mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

function openMobileMenu() {
  mobileMenu.hidden = false;
  iconMenu.hidden   = true;
  iconClose.hidden  = false;
  mobileMenuBtn.setAttribute('aria-expanded', 'true');
}

mobileMenuBtn.addEventListener('click', function () {
  if (mobileMenu.hidden) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
});

/* ──────────────────────────────────────────────────────────────
   HERO CANVAS PARTICLE ANIMATION
   ────────────────────────────────────────────────────────────── */

(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animationFrame;
  let particles = [];
  let particleCount = 80;

  function Particle(w, h) {
    this.x  = Math.random() * w;
    this.y  = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  Particle.prototype.update = function (w, h) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  };

  Particle.prototype.draw = function (ctx) {
    ctx.fillStyle = '#803BB2';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  function resizeCanvas() {
    const parent = canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : null;
    canvas.width  = rect ? rect.width  : window.innerWidth;
    canvas.height = rect ? rect.height : window.innerHeight;

    particleCount = window.innerWidth < 768 ? 40 : 80;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
  }

  function drawLines() {
    ctx.lineWidth = 0.3;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(128, 59, 178, ' + (0.22 * (1 - dist / 120)) + ')';
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) {
      p.update(canvas.width, canvas.height);
      p.draw(ctx);
    });
    drawLines();
    animationFrame = requestAnimationFrame(animate);
  }

  resizeCanvas();
  animate();

  window.addEventListener('resize', resizeCanvas);
})();

/* ──────────────────────────────────────────────────────────────
   HERO SCROLL BUTTONS
   ────────────────────────────────────────────────────────────── */

document.getElementById('btn-hero-contact').addEventListener('click', function () {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.getElementById('btn-hero-work').addEventListener('click', function () {
  document.getElementById('work').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ──────────────────────────────────────────────────────────────
   WORK CAROUSEL – 3D transform + wheel-to-horizontal-scroll
   ────────────────────────────────────────────────────────────── */

(function initCarousel() {
  const viewport = document.getElementById('work-carousel');
  if (!viewport) return;

  function calculateTransforms() {
    const scrollLeft   = viewport.scrollLeft;
    const viewportWidth = viewport.clientWidth;
    const center       = scrollLeft + viewportWidth / 2;
    const cylinderRadius = viewportWidth / Math.PI;

    const cards = viewport.querySelectorAll('.work-card');
    cards.forEach(function (card) {
      const cardLeft   = card.offsetLeft;
      const cardWidth  = card.offsetWidth;
      const cardCenter = cardLeft + cardWidth / 2;

      const distanceFromCenter = cardCenter - center;
      const angle = distanceFromCenter / cylinderRadius;

      const scale   = Math.cos(angle * 0.5) * 0.85 + 0.15;
      const rotateY = -angle * (180 / Math.PI) * 0.45;
      const opacity = Math.max(0.3, Math.cos(angle * 0.6));
      const z       = Math.cos(angle) * cylinderRadius - cylinderRadius;

      card.style.transform = 'scale(' + scale + ') rotateY(' + rotateY + 'deg) translateZ(' + z + 'px)';
      card.style.opacity   = opacity;
    });
  }

  viewport.addEventListener('wheel', function (event) {
    // Only hijack predominantly-vertical wheel events
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    viewport.scrollBy({ left: event.deltaY, behavior: 'smooth' });
  }, { passive: false });

  viewport.addEventListener('scroll', calculateTransforms);

  // Calculate initial transforms after layout
  requestAnimationFrame(calculateTransforms);
})();

/* ──────────────────────────────────────────────────────────────
   COOKIE CONSENT
   ────────────────────────────────────────────────────────────── */

var CONSENT_KEY     = 'grafibee-cookie-consent';
var CONSENT_VERSION = 1;
var CONSENT_TTL     = 180 * 24 * 60 * 60 * 1000; // 180 days in ms
var GA_ID           = 'G-FHE5R0K353';

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function setConsentDefault() {
  gtag('consent', 'default', {
    ad_storage:            'denied',
    ad_user_data:          'denied',
    ad_personalization:    'denied',
    analytics_storage:     'denied',
    functionality_storage: 'granted',
    security_storage:      'granted',
    wait_for_update:        500,
  });
}

function updateConsent(decision) {
  var status = decision === 'accepted' ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage:            'denied',
    ad_user_data:          'denied',
    ad_personalization:    'denied',
    analytics_storage:     status,
    functionality_storage: 'granted',
    security_storage:      'granted',
  });
}

function loadAnalytics() {
  if (!GA_ID || window.__grafibeeAnalyticsLoaded) return;

  var script   = document.createElement('script');
  script.src   = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  script.async = true;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_ID, {
    anonymize_ip:                      true,
    allow_google_signals:              false,
    allow_ad_personalization_signals:  false,
  });

  window.__grafibeeAnalyticsLoaded = true;
}

function getStoredConsent() {
  try {
    var raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    var parsed = JSON.parse(raw);
    var validDecision = parsed.decision === 'accepted' || parsed.decision === 'rejected';

    if (
      parsed.version !== CONSENT_VERSION ||
      !validDecision ||
      typeof parsed.savedAt !== 'number' ||
      Date.now() - parsed.savedAt > CONSENT_TTL
    ) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    return parsed;
  } catch (_) {
    localStorage.removeItem(CONSENT_KEY);
    return null;
  }
}

function saveConsentDecision(decision) {
  var consent = {
    version:  CONSENT_VERSION,
    decision: decision,
    savedAt:  Date.now(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  updateConsent(decision);
  if (decision === 'accepted') loadAnalytics();
}

// ── Initialize consent ──────────────────────────────────────
window.dataLayer = window.dataLayer || [];
setConsentDefault();

var storedConsent = getStoredConsent();
if (storedConsent) {
  updateConsent(storedConsent.decision);
  if (storedConsent.decision === 'accepted') loadAnalytics();
}

// ── Cookie banner visibility ──────────────────────────────
var cookieBanner = document.getElementById('cookie-banner');
if (!storedConsent) {
  cookieBanner.hidden = false;
}

document.getElementById('btn-accept-cookies').addEventListener('click', function () {
  saveConsentDecision('accepted');
  cookieBanner.hidden = true;
});

document.getElementById('btn-reject-cookies').addEventListener('click', function () {
  saveConsentDecision('rejected');
  cookieBanner.hidden = true;
});

document.getElementById('btn-open-cookie-settings').addEventListener('click', function () {
  cookieBanner.hidden = false;
});

document.getElementById('btn-cookie-privacy').addEventListener('click', function () {
  navigateTo('/adatkezelesi-tajekoztato');
  // Navigate away and hide the banner so the user can read the privacy page unobstructed.
  cookieBanner.hidden = true;
});

/* ──────────────────────────────────────────────────────────────
   FOOTER YEAR
   ────────────────────────────────────────────────────────────── */

var yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ──────────────────────────────────────────────────────────────
   INITIAL RENDER
   ────────────────────────────────────────────────────────────── */

// Add dark class (always dark)
document.documentElement.classList.add('dark');

// Render the correct page on load
renderPage();
