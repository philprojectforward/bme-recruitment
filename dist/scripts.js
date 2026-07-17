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

  if (form && formStatus) {
    form.addEventListener('submit', function (e) {
      const honey = form.querySelector('input[name="website"]');
      if (honey && honey.value) {
        e.preventDefault();
        return;
      }
      formStatus.textContent = 'Sending your enquiry...';
      formStatus.className = 'form-status';
    });
  }
})();
