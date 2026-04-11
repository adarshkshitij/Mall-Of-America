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

// Modules
import { initPreloader } from './scripts/preloader.js';
import { initNavigation } from './scripts/navigation.js';
import { initAnimations } from './scripts/animations.js';
import { initVideoController } from './scripts/video-controller.js';
import { initRetailCarousel } from './scripts/carousel.js';
import { initCounters } from './scripts/counters.js';
import { initDataBars } from './scripts/data-bars.js';
import { initCursor } from './scripts/cursor.js';

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
  initCursor();
});
