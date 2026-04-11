/* ============================================
   NAVIGATION
   Non-linear nav controller with scroll spy,
   mobile menu, and scrolled state
   ============================================ */

export function initNavigation(lenis) {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');
  const sideDots = document.querySelectorAll('.side-nav__dot');
  const sections = document.querySelectorAll('.section[id]');

  // Import GSAP ScrollTrigger for refresh
  const { ScrollTrigger } = window.gsap || {};

  // --- Scrolled state ---
  function handleScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile menu toggle ---
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  // --- Smooth scroll to section (non-linear nav) ---
  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    // Close mobile menu if open
    if (mobileMenu?.classList.contains('open')) {
      toggle?.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 2,
        onComplete: () => {
          if (ScrollTrigger) ScrollTrigger.refresh();
        }
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Attach click handlers to all nav links
  [...navLinks, ...sideDots].forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
      if (sectionId) scrollToSection(sectionId);
    });
  });

  // --- Scroll spy: highlight active section ---
  function updateActiveSection() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    let activeId = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        activeId = section.id;
      }
    });

    if (!activeId) return;

    // Update nav links
    document.querySelectorAll('.nav__link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === activeId);
    });

    // Update side dots
    sideDots.forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('data-section') === activeId);
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  // --- Handle CTA links within sections ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.classList.contains('nav__link') || link.classList.contains('mobile-menu__link') || link.classList.contains('side-nav__dot')) return;

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        scrollToSection(href.replace('#', ''));
      }
    });
  });
}
