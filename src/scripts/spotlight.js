/**
 * Spotlight Hover Effect (Flashlight)
 * Tracks mouse position relative to card and updates CSS variables.
 */
export function initSpotlight(selector = '.spotlight-card') {
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
