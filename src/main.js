/* ============================================
   MAIN ENTRY POINT
   Mall of America — Interactive Sales Deck
   ============================================ */

// Styles
import './styles/tokens.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/sections.css';
import { transitions } from './scripts/transitions.js';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Modules
import { initPreloader } from './scripts/preloader.js';
import { initDeck } from './scripts/deck.js';
import { initNavigation } from './scripts/navigation.js';
import { initAnimations } from './scripts/animations.js';
import { initVideoController } from './scripts/video-controller.js';
import { initRetailCarousel } from './scripts/carousel.js';
import { initStatsCounter } from './scripts/stats.js';
import { initDataBars } from './scripts/data-bars.js';
import { initIconAnimations } from './scripts/icon-animations.js';
import { initCursor } from './scripts/cursor.js';
import { initSpotlight } from './scripts/spotlight.js';
import { initHoverVideos } from './scripts/hover-videos.js';

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
  const deck = initDeck();
  initNavigation(lenis, deck);
  transitions.init();
  initAnimations(lenis);
  initVideoController();
  initRetailCarousel();
  initStatsCounter();
  initDataBars();
  initIconAnimations();
  initCursor();
  
  // High-end spotlight effects for interactive cards
  initSpotlight('.events__capability, .sponsorship__tier');
  
  // Awwwards-style Hover Video integration
  initHoverVideos();
});
