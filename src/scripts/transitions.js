import gsap from 'gsap';

/**
 * GSAP Cinematic Transitions with Video Intros
 * Handles the "Video Trailer" effect for section navigation
 */
export const transitions = {
  isTransitioning: false,
  
  // Map of Section IDs to their respective Intro Videos
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
        muteBtn.classList.toggle('is-unmuted', !video.muted);
        // Simple SVG swap or color change could go here
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

    // Set video source based on target section
    const videoSrc = this.videoMap[targetId] || this.videoMap['property'];
    video.src = videoSrc;
    video.load();

    const tl = gsap.timeline();

    // 1. Entrance: Wipe up
    tl.to(wipeLayer, {
      y: '0%',
      duration: 0.8,
      ease: 'power4.inOut'
    });

    // 2. Play Video
    tl.to(theatre, {
      opacity: 1,
      duration: 0.5,
      onStart: () => {
        // Nav click is a user gesture, we can try to unmute
        video.muted = false; 
        video.play().catch(e => {
          console.log("Autoplay with sound blocked, falling back to muted");
          video.muted = true;
          video.play();
        });
      }
    });

    // 3. Teleport under the cover
    tl.add(() => {
      if (lenis) {
        lenis.scrollTo(targetElement, { immediate: true });
      } else {
        targetElement.scrollIntoView();
      }
    }, "-=0.2");
  },

  completeTransition() {
    const wipeLayer = document.getElementById('transition-wipe');
    const theatre = document.querySelector('.transition-theatre');
    const video = document.getElementById('transition-video');

    if (this.tl_exit) this.tl_exit.kill();

    this.tl_exit = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false;
        if (this.currentCallback) this.currentCallback();
        video.pause();
        video.src = ""; // Clear source to save memory
      }
    });

    this.tl_exit.to(theatre, { opacity: 0, duration: 0.4 })
              .to(wipeLayer, { y: '-100%', duration: 0.8, ease: 'power4.inOut' })
              .set(wipeLayer, { y: '100%' });
  }
};
