/* ============================================
   SCROLL ANIMATIONS
   GSAP + ScrollTrigger powered reveal animations
   ============================================ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations(lenis) {
  // Sync ScrollTrigger with Lenis
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
  }

  // ---- Hero Entrance ----
  const heroTimeline = gsap.timeline({ delay: 0.5 });

  heroTimeline
    .from('.hero__badge', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from('.hero__title-line', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
    }, '-=0.4')
    .from('.hero__subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .from('.hero__actions', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .from('.hero__scroll-indicator', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.2');

  // ---- Hero parallax on scroll ----
  gsap.to('.hero__video', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // ---- Generic section reveals ----
  const revealElements = document.querySelectorAll(
    '.section-label, .section-title, .section-subtitle, ' +
    '.split-feature__media, .split-feature__content, ' +
    '.luxury__card, .dining__card, ' +
    '.events__capability, .events__highlight-card, .events__cta-section, ' +
    '.sponsorship__tier, ' +
    '.contact__title, .contact__subtitle, .contact__card'
  );

  revealElements.forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ---- Stats cards stagger ----
  gsap.from('.stat-card', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.stats-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // ---- Attraction alternate slides ----
  document.querySelectorAll('.attraction').forEach((attraction) => {
    const isReverse = attraction.classList.contains('attraction--reverse');

    gsap.from(attraction.querySelector('.attraction__media'), {
      opacity: 0,
      x: isReverse ? 60 : -60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: attraction,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    gsap.from(attraction.querySelector('.attraction__content'), {
      opacity: 0,
      x: isReverse ? -60 : 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: attraction,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ---- Attraction stats stagger ----
  document.querySelectorAll('.attraction__stats').forEach(statsContainer => {
    gsap.from(statsContainer.children, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: statsContainer,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ---- Events hero parallax ----
  const eventsHeroImg = document.querySelector('.events__hero img');
  if (eventsHeroImg) {
    gsap.to(eventsHeroImg, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.events__hero',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // ---- Contact title reveal ----
  gsap.from('.contact__title span', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact__title',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // ---- Refresh on resize ----
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
}
