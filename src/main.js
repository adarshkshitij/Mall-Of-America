/* ============================================
   MAIN ENTRY POINT
   Mall of America — Interactive Sales Deck
   ============================================ */

// Styles
import './styles/tokens.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/sections.css';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 2,
});

// Expose lenis for debugging
window.lenis = lenis;

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize app
initPreloader(() => {
  initNavigation(lenis);
  initAnimations(lenis);
  initVideoController();
  initRetailCarousel();
  initCounters();
  initDataBars();
});
