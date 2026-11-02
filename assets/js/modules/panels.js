/* Panels — desktop collapse/expand for the left and right panels. */
import { on, isMobile } from '../lib/dom.js';
import { els } from '../lib/elements.js';
import * as Drawer from './drawer.js';

export function init() {
  on(els.leftPanelHd, 'click', () => {
    if (isMobile()) return Drawer.closeAll();
    els.panelLeft.classList.toggle('collapsed');
  });

  on(els.rightPanelHd, 'click', () => {
    if (isMobile()) return Drawer.closeAll();
    els.panelRight.classList.toggle('collapsed');
  });

  on(els.rightCollapseTab, 'click', () => {
    els.panelRight && els.panelRight.classList.remove('collapsed');
  });
}
