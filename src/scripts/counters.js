/* ============================================
   ANIMATED COUNTERS
   Scroll-triggered count-up animation
   ============================================ */

export function initCounters() {
  const counters = document.querySelectorAll('.stat-card__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-target'));
  const suffix = element.getAttribute('data-suffix') || '';
  const prefix = element.getAttribute('data-prefix') || '';
  const decimal = parseInt(element.getAttribute('data-decimal')) || 0;
  const duration = 2000; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    element.textContent = prefix + current.toFixed(decimal) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = prefix + target.toFixed(decimal) + suffix;
    }
  }

  requestAnimationFrame(update);
}
