(function () {
  'use strict';

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.hidden;
      mobileMenu.hidden = !isOpen;
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.hidden = true;
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Sticky nav shadow on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    });
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    revealElements.forEach(function (el) {
      el.classList.add('animate');
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Stagger cards
  const staggerCards = document.querySelectorAll('.value-card, .trade-card, .why-card');
  staggerCards.forEach(function (card, index) {
    card.style.transitionDelay = ((index % 6) * 80) + 'ms';
  });

  // Client form handling
  const form = document.getElementById('clientForm');
  const formStatus = document.getElementById('formStatus');
  const AGENCY_PHONE_DISPLAY = '0113 733 6301';
  const AGENCY_PHONE_TEL = '01137336301';

  if (form && formStatus) {
    const submitBtn = form.querySelector('button[type="submit"]');

    function showError(message) {
      formStatus.className = 'form-status error';
      formStatus.innerHTML = message +
        ' Please call us on <a href="tel:' + AGENCY_PHONE_TEL + '">' +
        AGENCY_PHONE_DISPLAY + '</a> and we\'ll help you straight away.';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: silently drop bot submissions.
      const honey = form.querySelector('input[name="website"]');
      if (honey && honey.value) {
        return;
      }

      // The API only supports name, email, phone, company, message and
      // service_requested. Map the trades/operatives/location fields into
      // service_requested and the message so none of that data is lost.
      const trades = Array.prototype.slice
        .call(form.querySelectorAll('input[name="trades"]:checked'))
        .map(function (cb) { return cb.value; });

      const operativesInput = form.querySelector('[name="number_of_operatives"]');
      const locationInput = form.querySelector('[name="project_location"]');
      const operatives = operativesInput ? operativesInput.value.trim() : '';
      const location = locationInput ? locationInput.value.trim() : '';

      const serviceParts = [];
      if (trades.length) serviceParts.push(trades.join(', '));
      if (operatives) serviceParts.push(operatives + ' operative(s)');
      const serviceField = form.querySelector('input[name="service_requested"]');
      if (serviceField) serviceField.value = serviceParts.join(' — ');

      const messageField = form.querySelector('[name="message"]');
      if (messageField) {
        const details = [];
        if (trades.length) details.push('• Trades needed: ' + trades.join(', '));
        if (operatives) details.push('• Number of operatives: ' + operatives);
        if (location) details.push('• Project location: ' + location);

        if (details.length) {
          const section = 'Project requirements:\n' + details.join('\n');
          const existing = messageField.value.trim();
          messageField.value = existing ? existing + '\n\n' + section : section;
        }
      }

      // These are not read by the API; unset their names so they are not sent.
      if (operativesInput) operativesInput.removeAttribute('name');
      if (locationInput) locationInput.removeAttribute('name');
      Array.prototype.slice
        .call(form.querySelectorAll('input[name="trades"]'))
        .forEach(function (cb) { cb.removeAttribute('name'); });

      formStatus.textContent = 'Sending your enquiry...';
      formStatus.className = 'form-status';
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(form)),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            form.hidden = true;
            formStatus.className = 'form-status success';
            formStatus.textContent =
              'Thanks — your enquiry has been sent. We\'ll be in touch shortly.';
          } else {
            showError('Sorry, something went wrong sending your enquiry.');
          }
        })
        .catch(function () {
          showError('Sorry, we couldn\'t send your enquiry.');
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
