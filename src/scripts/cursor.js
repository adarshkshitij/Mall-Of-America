import { gsap } from 'gsap';

export function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  const cursorText = document.querySelector('.cursor-text');

  if (!cursor || !follower) return;

  // Set initial state
  gsap.set([cursor, follower], { 
    opacity: 0,
    xPercent: -50,
    yPercent: -50
  });

  // Only hide the default cursor IF the custom one is ready
  document.body.classList.add('has-custom-cursor');

  // Move the cursor with the mouse
  const xCursorSetter = gsap.quickSetter(cursor, "x", "px");
  const yCursorSetter = gsap.quickSetter(cursor, "y", "px");
  
  const xFollowerSetter = gsap.quickSetter(follower, "x", "px");
  const yFollowerSetter = gsap.quickSetter(follower, "y", "px");

  let isFirstMove = true;

  window.addEventListener("mousemove", (e) => {
    if (isFirstMove) {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
      isFirstMove = false;
    }

    xCursorSetter(e.clientX);
    yCursorSetter(e.clientY);

    // Follower has a slight, smooth lag
    gsap.to({}, {
      duration: 0.1,
      onUpdate: () => {
        xFollowerSetter(e.clientX);
        yFollowerSetter(e.clientY);
      }
    });
  });

  // Handle Hovers
  const updateCursorState = (e) => {
    // 1. Always clear previous states first
    cursor.classList.remove('is-hovering', 'is-label');
    follower.classList.remove('is-hovering', 'is-label');
    cursorText.innerText = '';

    // 2. Find the relevant interactive target
    const target = e.target.closest('a, button, .nav__toggle, .side-nav__dot, [data-cursor], .retail-card, .events__highlight-card');
    
    if (!target) return;

    // 3. Priority: Check if target or any parent has a data-cursor label (e.g. DRAG/EXPLORE)
    const labelTarget = target.closest('[data-cursor]');
    const cursorType = labelTarget ? labelTarget.dataset.cursor : null;
    
    if (cursorType) {
      cursor.classList.add('is-label');
      follower.classList.add('is-label');
      cursorText.innerText = cursorType === 'drag' ? 'DRAG' : 'EXPLORE';
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    } else {
      // 4. Standard hover for links/buttons/cards without labels
      cursor.classList.add('is-hovering');
      follower.classList.add('is-hovering');
      gsap.set(cursor, { xPercent: 0, yPercent: 0 });
    }
  };

  const resetCursorState = () => {
    cursor.classList.remove('is-hovering', 'is-label');
    follower.classList.remove('is-hovering', 'is-label');
    cursorText.innerText = '';
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
  };

  // Use delegation for better performance
  window.addEventListener('mouseover', updateCursorState);
  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest) resetCursorState();
  });

  // Handle Dragging state for the carousel
  window.addEventListener('mousedown', (e) => {
    if (e.target.closest('[data-cursor="drag"]')) {
      follower.classList.add('is-dragging');
    }
  });
  
  window.addEventListener('mouseup', () => {
    follower.classList.remove('is-dragging');
  });

  // Handle cursor visibility when leaving/entering the window
  document.addEventListener('mouseleave', () => {
    gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
  });
}
