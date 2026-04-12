import gsap from 'gsap';

/**
 * GSAP Cinematic Transitions - "Iris Focus Bloom" Style
 * An organic transition involving an expanding circle mask and a focus-pull (blur to sharp)
 */
export const transitions = {
  isTransitioning: false,
  
  videoMap: {
    'property': '/videos/intros/intro-property.mp4',
    'retail': '/videos/intros/intro-retail.mp4',
    'luxury': '/videos/intros/intro-luxury.mp4',
    'dining': '/videos/intros/intro-dining.mp4',
    'entertainment': '/videos/intros/intro-entertainment.mp4',
    'events': '/videos/intros/intro-events.mp4',
    'contact': '/videos/intros/intro-contact.mp4',
  },

  init() {
    const skipBtn = document.getElementById('skip-transition');
    const muteBtn = document.getElementById('mute-transition');
    const video = document.getElementById('transition-video');

    if (skipBtn) {
      skipBtn.addEventListener('click', () => this.completeTransition());
    }

    if (muteBtn && video) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.style.background = video.muted ? 'rgba(255,255,255,0.1)' : 'var(--color-accent)';
      });
    }

    if (video) {
      video.onended = () => this.completeTransition();
    }
  },

  wipe(targetId, lenis, callback) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentCallback = callback;
    this.currentLenis = lenis;

    const wipeLayer = document.getElementById('transition-wipe');
    const theatre = document.querySelector('.transition-theatre');
    const video = document.getElementById('transition-video');
    const targetElement = document.getElementById(targetId);

    if (!wipeLayer || !targetElement || !video) {
      this.isTransitioning = false;
      return;
    }

    // Set video source
    const videoSrc = this.videoMap[targetId] || this.videoMap['property'];
    video.src = videoSrc;
    video.load();

    const tl = gsap.timeline();

    // 1. Background recedes & blurs
    document.body.classList.add('is-transitioning-content');

    // 2. Fade in Theatre Backdrop
    tl.set(wipeLayer, { pointerEvents: 'all' });
    tl.to(wipeLayer, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    });

    // 3. Cinematic Iris Focus Bloom
    tl.add(() => {
      // User gesture triggered this wipe, so we can try sound
      video.muted = false; 
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });

      if (lenis) lenis.scrollTo(targetElement, { immediate: true });
    });

    // Animate the Video Reveal
    tl.to(video, {
      clipPath: 'circle(150% at 50% 50%)',
      filter: 'blur(0px) brightness(1)',
      scale: 1,
      duration: 1.8,
      ease: 'expo.inOut' // Smooth, non-linear expansion
    }, "-=0.4");

    tl.to(theatre, { opacity: 1, duration: 0.5 }, "-=1.8");
  },

  completeTransition() {
    const wipeLayer = document.getElementById('transition-wipe');
    const theatre = document.querySelector('.transition-theatre');
    const video = document.getElementById('transition-video');

    if (this.tl_exit) this.tl_exit.kill();

    this.tl_exit = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false;
        document.body.classList.remove('is-transitioning-content');
        if (this.currentCallback) this.currentCallback();
        video.pause();
        video.src = "";
        
        // Reset video styles for next time
        gsap.set(video, { 
          clipPath: 'circle(0% at 50% 50%)', 
          filter: 'blur(40px) brightness(1.2)', 
          scale: 1.1 
        });
        gsap.set(wipeLayer, { pointerEvents: 'none' });
      }
    });

    // Ease Out naturally
    this.tl_exit.to(theatre, { opacity: 0, scale: 0.95, duration: 0.8, ease: 'power2.in' })
              .to(wipeLayer, { opacity: 0, duration: 0.6 }, "-=0.4");
  }
};
