/* Drawer — mobile off-canvas for the left/right panels, plus body scroll lock. */
import { on } from '../lib/dom.js';
import { els } from '../lib/elements.js';

function syncScrollLock() {
  const anyOpen =
    (els.panelLeft  && els.panelLeft.classList.contains('mobile-open')) ||
    (els.panelRight && els.panelRight.classList.contains('mobile-open'));
  document.body.classList.toggle('drawer-open', !!anyOpen);
}

export function closeAll() {
  els.panelLeft  && els.panelLeft.classList.remove('mobile-open');
  els.panelRight && els.panelRight.classList.remove('mobile-open');
  els.overlay    && els.overlay.classList.remove('visible');
  syncScrollLock();
}

/** Toggle one drawer (closing the other). Returns true when it ended up open. */
export function toggle(panel) {
  if (!panel || !els.overlay) return;
  const isOpen = panel.classList.contains('mobile-open');
  closeAll();
  if (!isOpen) {
    panel.classList.add('mobile-open');
    els.overlay.classList.add('visible');
    syncScrollLock();
  }
  return !isOpen;
}

export function init() {
  if (!els.overlay) return;
  on(els.overlay, 'click', closeAll);
}
