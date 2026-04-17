/* ============================================
   VIDEO CONTROLLER
   Scroll-mode visibility + deck-mode active slide sync
   ============================================ */

export function initVideoController() {
  const deckMode = document.documentElement.classList.contains('deck-mode');
  const videos = document.querySelectorAll('video:not(.hover-video-player):not(#transition-video)');

  if (!videos.length) return;

  function tryPlay(video) {
    video.play().catch(() => {
      // Autoplay blocked - silent fail
    });
  }

  videos.forEach((video) => {
    video.setAttribute('preload', 'metadata');
  });

  if (deckMode) {
    function syncDeckVideos(activeId) {
      const activeSection = activeId ? document.getElementById(activeId) : null;

      videos.forEach((video) => {
        const section = video.closest('.section[id]');
        const isActive = activeSection ? section === activeSection : !section || section.id === 'hero';

        if (isActive) {
          tryPlay(video);
        } else {
          video.pause();
        }
      });
    }

    const initialId = window.location.hash.replace('#', '') || document.querySelector('.section[id]')?.id;
    syncDeckVideos(initialId);

    window.addEventListener('deckchange', (event) => {
      syncDeckVideos(event.detail?.activeId);
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          tryPlay(video);
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );

  videos.forEach((video) => {
    observer.observe(video);
  });
}
