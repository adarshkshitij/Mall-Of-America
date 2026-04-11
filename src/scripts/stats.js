import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes count-up animations for statistical numbers.
 * Elements should have .stat-card__number class and data-target attribute.
 */
export function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-card__number');
  
  stats.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const suffix = stat.getAttribute('data-suffix') || '';
    const prefix = stat.getAttribute('data-prefix') || '';
    const decimals = parseInt(stat.getAttribute('data-decimal') || '0');
    
    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      innerText: target,
      duration: 2,
      snap: { innerText: decimals === 0 ? 1 : 1 / Math.pow(10, decimals) },
      ease: 'power2.out',
      onUpdate: function() {
        const val = parseFloat(stat.innerText).toFixed(decimals);
        stat.innerText = prefix + val + suffix;
      }
    });
  });
}
