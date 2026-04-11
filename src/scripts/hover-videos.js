/**
 * Hover-to-Play Video Controller
 * Pauses and fades out videos by default. Plays and fades in when the parent card is hovered.
 */
export function initHoverVideos() {
  const cards = document.querySelectorAll('.hover-video-card');

  cards.forEach(card => {
    const video = card.querySelector('.hover-video-player');
    
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      // Add visual class to trigger CSS transitions explicitly if needed
      card.classList.add('is-hovering-video');
      
      // Play video programmatically
      video.play().catch(e => {
        console.warn('Hover video autoplay blocked by browser:', e);
      });
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-hovering-video');
      
      // Pause video when leaving to save resources
      video.pause();
    });
  });
}
