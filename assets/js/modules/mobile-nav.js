/* MobileNav — bottom tab bar (mobile only). */
import { $, $$, on } from '../lib/dom.js';
import { els } from '../lib/elements.js';
import * as Drawer from './drawer.js';

let items = [];

function setActive(id) {
  items.forEach(x => x.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

export function init() {
  items = $$('.mobile-nav-item');
  if (!items.length) return;

  const wire = (id, handler) => on($('#' + id), 'click', handler);

  wire('mobileNavMain',   () => { setActive('mobileNavMain');   Drawer.closeAll(); });
  wire('mobileNavNew',    () => { setActive('mobileNavNew');    Drawer.closeAll(); });
  wire('mobileNavSearch', () => { setActive('mobileNavSearch'); Drawer.closeAll(); });

  wire('mobileNavLeft', () => {
    const opened = Drawer.toggle(els.panelLeft);
    setActive(opened ? 'mobileNavLeft' : 'mobileNavMain');
  });

  wire('mobileNavRight', () => {
    const opened = Drawer.toggle(els.panelRight);
    setActive(opened ? 'mobileNavRight' : 'mobileNavMain');
  });
}
