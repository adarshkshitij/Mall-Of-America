/* ============================================
   VIDEO CONTROLLER
   Lazy load + autoplay/pause on visibility
   ============================================ */

export function initVideoController() {
  const videos = document.querySelectorAll('video');

  if (!videos.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay blocked — silent fail
          });
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );

  videos.forEach((video) => {
    // Set lazy loading attributes
    video.setAttribute('preload', 'metadata');
    observer.observe(video);
  });
}
