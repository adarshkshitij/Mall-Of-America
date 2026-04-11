/* ============================================
   PRELOADER
   ============================================ */

export function initPreloader(callback) {
  const preloader = document.getElementById('preloader');
  const barFill = document.querySelector('.preloader__bar-fill');
  let isDone = false;

  const finish = () => {
    if (isDone) return;
    isDone = true;
    
    // Clear interval if it's still running
    if (interval) clearInterval(interval);

    setTimeout(() => {
      preloader?.classList.add('hidden');
      document.body.style.overflow = '';
      callback?.();
    }, 500);
  };

  if (!preloader || !barFill) {
    finish();
    return;
  }

  // Lock body scroll initially
  document.body.style.overflow = 'hidden';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      barFill.style.width = '100%';
      finish();
    } else {
      barFill.style.width = `${progress}%`;
    }
  }, 120);

  // Safety timeout — always remove preloader after 4s
  setTimeout(finish, 4000);
}
