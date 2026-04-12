import lottie from 'lottie-web';

/**
 * Lottie Icon Manager
 * Handles initialization, hover loops, and performance optimization
 */
export function initLottieIcons() {
  const lottieContainers = document.querySelectorAll('.lottie-icon');
  
  lottieContainers.forEach(container => {
    const animationPath = container.getAttribute('data-animation-path');
    const loopOnHover = container.getAttribute('data-loop') !== 'false';
    
    const anim = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: animationPath
    });

    // Parent element for the hover trigger (usually the card)
    const trigger = container.closest('.events__capability') || container.closest('.contact__card');

    if (trigger) {
      trigger.addEventListener('mouseenter', () => {
        anim.setDirection(1);
        anim.play();
        if (loopOnHover) {
          anim.loop = true;
        }
      });

      trigger.addEventListener('mouseleave', () => {
        if (loopOnHover) {
          anim.loop = false;
        }
        // Either let it finish or stop
        // To make it feel responsive, we reverse it or just let it finish the cycle
      });
    }

    // Performance: Pause if not in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          anim.pause();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);
  });
}
