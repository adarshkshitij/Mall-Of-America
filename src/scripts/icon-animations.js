import gsap from 'gsap';

/**
 * GSAP SVG Icon Animation Engine
 * Creates high-end micro-interactions for the Mall of America Sales Deck
 */
export function initIconAnimations() {
  const capabilityCards = document.querySelectorAll('.events__capability');
  const contactCards = document.querySelectorAll('.contact__card');

  // Unified controller for all interactive cards
  [...capabilityCards, ...contactCards].forEach(card => {
    const icon = card.querySelector('svg');
    if (!icon) return;

    // Create unique timelines for specific icons based on their classes/structure
    const tl = gsap.timeline({ paused: true });

    // 1. Microphone (Performing Arts)
    const micPath = icon.querySelector('.anim-mic');
    if (micPath) {
      tl.to(micPath, { y: -2, duration: 0.3, ease: 'power2.out' })
        .to(micPath, { scale: 1.05, duration: 0.2, transformOrigin: 'center center' }, 0);
    }

    // 2. Rocket (Product Launches)
    const rocketBody = icon.querySelector('.anim-rocket');
    const rocketThrust = icon.querySelector('.anim-thrust');
    if (rocketBody) {
      tl.to(rocketBody, { y: -5, x: 2, duration: 0.4, ease: 'back.out(2)' })
        .to(rocketThrust, { opacity: 1, scaleY: 1.5, duration: 0.2, repeat: -1, yoyo: true }, 0);
    }

    // 3. Building (Exposition)
    const windowLights = icon.querySelectorAll('.anim-window');
    if (windowLights.length > 0) {
      tl.staggerTo(windowLights, 0.3, { fill: 'var(--color-accent)', opacity: 1 }, 0.1);
    }

    // 4. Star (Activations)
    const starCore = icon.querySelector('.anim-star');
    if (starCore) {
      tl.to(starCore, { rotation: 180, scale: 1.2, duration: 0.6, ease: 'expo.out', transformOrigin: 'center center' });
    }

    // 5. Store (Lease)
    const storeDoor = icon.querySelector('.anim-door');
    if (storeDoor) {
      tl.to(storeDoor, { scaleX: 0, transformOrigin: 'left center', duration: 0.4, ease: 'power2.inOut' });
    }

    // 6. Handshake (Sponsorship)
    const handLeft = icon.querySelector('.anim-hand-left');
    const handRight = icon.querySelector('.anim-hand-right');
    if (handLeft && handRight) {
      tl.from(handLeft, { x: -5, opacity: 0, duration: 0.4 }, 0)
        .from(handRight, { x: 5, opacity: 0, duration: 0.4 }, 0);
    }

    // 7. Ticket (Venue)
    const ticketDash = icon.querySelector('.anim-dash');
    if (ticketDash) {
      tl.from(ticketDash, { strokeDashoffset: 20, duration: 0.5, ease: 'power1.inOut' });
    }

    // Trigger on card hover
    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());
  });
}
