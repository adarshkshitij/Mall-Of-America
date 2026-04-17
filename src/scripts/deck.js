import gsap from 'gsap';

function getParam(name) {
  try {
    return new URL(window.location.href).searchParams.get(name);
  } catch {
    return null;
  }
}

function normalizeSectionId(raw) {
  if (!raw) return '';
  return String(raw).replace(/^#/, '').trim();
}

export function initDeck() {
  const mode = (getParam('mode') || '').toLowerCase();
  const isDeckMode = mode !== 'scroll';
  const isPresenter = getParam('present') === '1';
  const sections = [...document.querySelectorAll('.section[id]')];

  if (!isDeckMode) {
    document.documentElement.classList.remove('deck-mode');
    document.documentElement.classList.add('scroll-mode');
    return {
      isDeckMode: false,
      getActiveId: () => normalizeSectionId(window.location.hash),
      show: () => {},
      next: () => {},
      prev: () => {},
    };
  }

  document.documentElement.classList.remove('scroll-mode');
  document.documentElement.classList.add('deck-mode');
  document.documentElement.classList.toggle('presenter-mode', isPresenter);

  let transitionOverlay = document.querySelector('.deck-transition-overlay');
  if (!transitionOverlay) {
    transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'deck-transition-overlay';
    transitionOverlay.innerHTML = '<div class="deck-transition-overlay__sheen"></div>';
    document.body.appendChild(transitionOverlay);
  }

  // Build a horizontal "deck track" so sections slide left/right like a Digideck.
  const main = document.querySelector('main');
  const wrapper = document.getElementById('main-wrapper') || main;
  const existingTrack = document.getElementById('deck-track');
  const track = existingTrack || document.createElement('div');
  track.id = 'deck-track';
  track.className = 'deck-track';

  if (!existingTrack) {
    const firstSection = sections[0];
    if (firstSection && firstSection.parentElement) {
      firstSection.parentElement.insertBefore(track, firstSection);
    } else if (wrapper) {
      wrapper.appendChild(track);
    } else {
      document.body.appendChild(track);
    }

    sections.forEach((section) => track.appendChild(section));
  }

  const order = sections.map((s) => s.id);
  const prevButton = document.getElementById('deck-prev');
  const nextButton = document.getElementById('deck-next');
  const prevEdgeButton = document.getElementById('deck-prev-edge');
  const nextEdgeButton = document.getElementById('deck-next-edge');
  const moreButton = document.getElementById('deck-more');
  const overflowHint = document.getElementById('deck-overflow-hint');
  const pageLabel = document.getElementById('deck-current-page');
  const status = document.getElementById('deck-status');
  const heroHint = document.getElementById('hero-hint-text');
  let activeId = '';
  let activeIndex = 0;
  let touchStartX = 0;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragActive = false;
  let dragPointerId = null;

  if (heroHint) {
    heroHint.textContent = 'Use arrows or swipe';
  }

  function getSectionLabel(sectionId) {
    const navLink = document.querySelector(`.nav__link[data-section="${sectionId}"]`);
    if (navLink?.textContent?.trim()) {
      return navLink.textContent.trim();
    }

    const section = document.getElementById(sectionId);
    const heading = section?.querySelector('.section-title, .hero__title');
    if (heading?.textContent?.trim()) {
      return heading.textContent.replace(/\s+/g, ' ').trim();
    }

    return sectionId ? sectionId.charAt(0).toUpperCase() + sectionId.slice(1) : '';
  }

  function updateUi() {
    const activeSection = document.getElementById(activeId);
    const overflow = activeSection ? activeSection.scrollHeight - activeSection.clientHeight > 28 : false;
    const canScrollMore = activeSection ? activeSection.scrollTop + activeSection.clientHeight < activeSection.scrollHeight - 24 : false;

    if (pageLabel) {
      pageLabel.textContent = getSectionLabel(activeId);
    }

    if (status) {
      const current = String(activeIndex + 1).padStart(2, '0');
      const total = String(order.length).padStart(2, '0');
      status.textContent = `${current} / ${total}`;
    }

    if (prevButton) prevButton.disabled = activeIndex === 0;
    if (nextButton) nextButton.disabled = activeIndex === order.length - 1;
    if (prevEdgeButton) prevEdgeButton.disabled = activeIndex === 0;
    if (nextEdgeButton) nextEdgeButton.disabled = activeIndex === order.length - 1;

    sections.forEach((section) => {
      section.classList.toggle('section--overflowing', section === activeSection && overflow);
      section.classList.toggle('section--can-scroll-more', section === activeSection && canScrollMore);
      section.classList.toggle('section--scrolled', section === activeSection && overflow && !canScrollMore);
    });

    if (moreButton) {
      moreButton.hidden = !overflow;
      moreButton.textContent = canScrollMore ? 'Scroll' : 'Top';
      moreButton.setAttribute('aria-label', canScrollMore ? 'Scroll within slide' : 'Back to top of slide');
    }

    if (overflowHint) {
      overflowHint.hidden = !overflow || !canScrollMore;
    }
  }

  function animateOverlay(direction) {
    const fromX = direction >= 0 ? '100%' : '-100%';
    const toX = direction >= 0 ? '-100%' : '100%';

    gsap.killTweensOf(transitionOverlay);
    gsap.killTweensOf(transitionOverlay.firstElementChild);

    const timeline = gsap.timeline();
    timeline.set(transitionOverlay, { display: 'block', opacity: 0 });
    timeline.set(transitionOverlay.firstElementChild, { x: fromX, opacity: 0.9 });
    timeline.to(transitionOverlay, { opacity: 1, duration: 0.15, ease: 'power2.out' });
    timeline.to(transitionOverlay.firstElementChild, {
      x: '0%',
      duration: 0.35,
      ease: 'power3.out',
    });
    timeline.to(transitionOverlay.firstElementChild, {
      x: toX,
      duration: 0.55,
      ease: 'power4.inOut',
    });
    timeline.to(transitionOverlay, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        transitionOverlay.style.display = 'none';
      },
    }, '-=0.18');
  }

  function animateSection(section) {
    if (!section) return;

    const revealTargets = section.querySelectorAll(
      '.hero__badge, .hero__title-line, .hero__subtitle, .hero__actions .btn, .section-label, .section-title span, .section-subtitle, .stat-card, .retail-card, .luxury__card, .dining__card, .attraction, .events__capability, .events__highlight-card, .sponsorship__tier, .contact__card'
    );

    gsap.killTweensOf(revealTargets);
    gsap.fromTo(
      revealTargets,
      { y: 36, opacity: 0, filter: 'blur(12px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.045,
        ease: 'power3.out',
        clearProps: 'filter,opacity,transform',
      }
    );

    const mediaTargets = section.querySelectorAll('img, video');
    gsap.killTweensOf(mediaTargets);
    gsap.fromTo(
      mediaTargets,
      { scale: 1.08, opacity: 0.82 },
      { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out', clearProps: 'transform,opacity' }
    );
  }

  function show(id, { updateHash = true } = {}) {
    const nextId = normalizeSectionId(id);
    if (!nextId || !document.getElementById(nextId)) return;
    if (nextId === activeId) return;

    const previousIndex = activeIndex;
    activeId = nextId;
    activeIndex = Math.max(0, order.indexOf(activeId));
    document.documentElement.style.setProperty('--deck-index', String(activeIndex));

    if (updateHash) history.replaceState(null, '', `#${activeId}`);

    const activeSection = document.getElementById(activeId);
    if (activeSection) {
      activeSection.scrollTo({ top: 0, behavior: 'auto' });
    }

    animateOverlay(activeIndex >= previousIndex ? 1 : -1);
    animateSection(activeSection);
    document.documentElement.dataset.deckPrevIndex = String(activeIndex);
    updateUi();
    window.dispatchEvent(new CustomEvent('deckchange', { detail: { activeId, activeIndex } }));
  }

  function showFromHash() {
    const fromHash = normalizeSectionId(window.location.hash);
    if (fromHash && document.getElementById(fromHash)) return show(fromHash, { updateHash: false });
    if (order[0]) show(order[0], { updateHash: true });
  }

  function step(delta) {
    const next = order[activeIndex + delta];
    if (next) show(next);
  }

  function onKeyDown(e) {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') step(1);
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') step(-1);
    if (e.key === 'Home') show(order[0]);
    if (e.key === 'End') show(order[order.length - 1]);
  }

  function onTouchStart(e) {
    touchStartX = e.touches[0]?.clientX || 0;
  }

  function onTouchEnd(e) {
    const endX = e.changedTouches[0]?.clientX || 0;
    const delta = endX - touchStartX;
    if (Math.abs(delta) < 60) return;
    step(delta < 0 ? 1 : -1);
  }

  function canStartDrag(target) {
    return !target.closest('a, button, input, textarea, select, label');
  }

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (!canStartDrag(e.target)) return;

    dragActive = true;
    dragPointerId = e.pointerId;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    document.documentElement.classList.add('deck-is-dragging');
  }

  function onPointerUp(e) {
    if (!dragActive || e.pointerId !== dragPointerId) return;

    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    dragActive = false;
    dragPointerId = null;
    document.documentElement.classList.remove('deck-is-dragging');

    if (Math.abs(dx) < 90) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.2) return;

    step(dx < 0 ? 1 : -1);
  }

  function onPointerCancel(e) {
    if (e.pointerId !== dragPointerId) return;
    dragActive = false;
    dragPointerId = null;
    document.documentElement.classList.remove('deck-is-dragging');
  }

  function scrollWithinSlide() {
    const activeSection = document.getElementById(activeId);
    if (!activeSection) return;

    const canScrollMore = activeSection.scrollTop + activeSection.clientHeight < activeSection.scrollHeight - 24;
    if (canScrollMore) {
      activeSection.scrollBy({ top: Math.max(activeSection.clientHeight * 0.72, 320), behavior: 'smooth' });
      return;
    }

    activeSection.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onWheel(e) {
    if (e.target.closest('.deck-controls, .deck-edge-nav, .mobile-menu, .nav, a, button')) return;

    const activeSection = document.getElementById(activeId);
    if (!activeSection) return;

    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);

    if (absX > absY + 10 && absX > 18) {
      e.preventDefault();
      step(e.deltaX > 0 ? 1 : -1);
      return;
    }

    if (absY > 2) {
      const maxScroll = activeSection.scrollHeight - activeSection.clientHeight;
      if (maxScroll > 24) {
        e.preventDefault();
        activeSection.scrollTop += e.deltaY;
        updateUi();
      }
    }
  }

  window.addEventListener('hashchange', showFromHash);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  track.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('pointercancel', onPointerCancel, { passive: true });
  window.addEventListener('wheel', onWheel, { passive: false });

  prevButton?.addEventListener('click', () => step(-1));
  nextButton?.addEventListener('click', () => step(1));
  prevEdgeButton?.addEventListener('click', () => step(-1));
  nextEdgeButton?.addEventListener('click', () => step(1));
  moreButton?.addEventListener('click', scrollWithinSlide);

  sections.forEach((section) => {
    section.addEventListener('scroll', () => {
      if (section.id !== activeId) return;
      updateUi();
    }, { passive: true });
  });

  showFromHash();

  return {
    isDeckMode: true,
    getActiveId: () => activeId,
    show,
    next: () => step(1),
    prev: () => step(-1),
  };
}
