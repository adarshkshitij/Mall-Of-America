/* ============================================
   DATA BARS
   Animated progress bars for sponsorship data
   ============================================ */

export function initDataBars() {
  const bars = document.querySelectorAll('.sponsorship__data-fill[data-width], .data-bar__fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-width');
          setTimeout(() => {
            entry.target.style.width = `${targetWidth}%`;
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((bar) => observer.observe(bar));
}
