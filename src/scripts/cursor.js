import { gsap } from 'gsap';

export function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (!cursor || !follower) return;

  // Move the cursor with the mouse
  // We use quickSetter for performance in mousemove events
  const xCursorSetter = gsap.quickSetter(cursor, "left", "px");
  const yCursorSetter = gsap.quickSetter(cursor, "top", "px");
  
  // Follower has a slight lag
  const xFollowerSetter = gsap.quickSetter(follower, "left", "px");
  const yFollowerSetter = gsap.quickSetter(follower, "top", "px");

  window.addEventListener("mousemove", (e) => {
    // Immediate cursor move
    xCursorSetter(e.clientX);
    yCursorSetter(e.clientY);

    // Lagged follower move
    gsap.to({}, {
      duration: 0.15,
      onUpdate: () => {
        xFollowerSetter(e.clientX);
        yFollowerSetter(e.clientY);
      }
    });
  });

  // Handle Hovers
  const hoverElements = document.querySelectorAll('a, button, .nav__toggle, .side-nav__dot, .retail-card');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering');
      follower.classList.add('is-hovering');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering');
      follower.classList.remove('is-hovering');
    });
  });

  // Handle Dragging state for the carousel
  const carousel = document.querySelector('.retail-track');
  if (carousel) {
    carousel.addEventListener('mousedown', () => {
      cursor.classList.add('is-dragging');
      follower.classList.add('is-dragging');
    });
    window.addEventListener('mouseup', () => {
      cursor.classList.remove('is-dragging');
      follower.classList.remove('is-dragging');
    });
  }

  // Handle cursor visibility when leaving/entering the window
  document.addEventListener('mouseenter', () => {
    gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
  });
  document.addEventListener('mouseleave', () => {
    gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
  });
}
