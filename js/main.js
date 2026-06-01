/* ═══════════════════════════════════════════════
   SERVIS KÖSTLER – MAIN JS
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── STICKY HEADER ──────────────────────────── */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── MOBILE BURGER MENU ─────────────────────── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('.mobile-nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Close on ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && burger.classList.contains('open')) {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        burger.focus();
      }
    });
  }

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
      '.service-card, .why-card, .response-step, .problem-item, .solution-steps li, .benefit, .brand-card, .stat-box'
    );
    fadeEls.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ─── CONTACT FORM ───────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn && submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn && submitBtn.querySelector('.btn-loading');

    function getEl(id) { return document.getElementById(id); }

    function showError(input, msg) {
      input.classList.add('error');
      const err = input.closest('.form-group')?.querySelector('.field-error');
      if (err) err.textContent = msg;
    }

    function clearError(input) {
      input.classList.remove('error');
      const err = input.closest('.form-group')?.querySelector('.field-error');
      if (err) err.textContent = '';
    }

    function validateForm() {
      let valid = true;
      const name = getEl('name');
      const phone = getEl('phone');
      const email = getEl('email');
      const message = getEl('message');
      const consent = getEl('consent');

      if (!name.value.trim()) {
        showError(name, 'Vyplňte prosím jméno.');
        valid = false;
      } else { clearError(name); }

      if (!phone.value.trim()) {
        showError(phone, 'Vyplňte prosím telefon.');
        valid = false;
      } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(phone.value.trim())) {
        showError(phone, 'Zadejte platné telefonní číslo.');
        valid = false;
      } else { clearError(phone); }

      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, 'Zadejte platnou e-mailovou adresu.');
        valid = false;
      } else { clearError(email); }

      if (!message.value.trim()) {
        showError(message, 'Vyplňte prosím popis.');
        valid = false;
      } else { clearError(message); }

      if (!consent.checked) {
        const err = consent.closest('.form-consent')?.querySelector('.field-error');
        if (err) err.textContent = 'Prosím potvrďte souhlas se zpracováním údajů.';
        valid = false;
      } else {
        const err = consent.closest('.form-consent')?.querySelector('.field-error');
        if (err) err.textContent = '';
      }

      return valid;
    }

    // Live validation
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('blur', () => {
        if (input.required && !input.value.trim()) {
          showError(input, 'Toto pole je povinné.');
        } else {
          clearError(input);
        }
      });
      input.addEventListener('input', () => clearError(input));
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateForm()) return;

      // Show loading state
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      try {
        // Formspree or similar endpoint – replace with actual endpoint
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Attempt submission via Formspree (configure with real endpoint)
        const endpoint = form.getAttribute('data-action') || 'https://formspree.io/f/xpwzeokj';
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          form.reset();
          if (successMsg) { successMsg.style.display = 'flex'; successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
        } else {
          throw new Error('Server error');
        }
      } catch {
        if (errorMsg) { errorMsg.style.display = 'flex'; errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
      }
    });
  }

  /* ─── ACTIVE NAV ON SCROLL ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === '#' + entry.target.id
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(s => navObserver.observe(s));
  }

})();
