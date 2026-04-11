/* ============================================
   RETAIL CAROUSEL
   Draggable horizontal scroll carousel
   ============================================ */

export function initRetailCarousel() {
  const track = document.querySelector('.retail-carousel__track');
  if (!track) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX;
  let touchScrollLeft;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX - track.offsetLeft;
    touchScrollLeft = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - touchStartX) * 1.5;
    track.scrollLeft = touchScrollLeft - walk;
  }, { passive: true });

  // Make the track scrollable
  track.style.overflowX = 'auto';
  track.style.scrollBehavior = 'smooth';
  track.style.scrollbarWidth = 'none'; // Firefox
  track.style.msOverflowStyle = 'none'; // IE
}
