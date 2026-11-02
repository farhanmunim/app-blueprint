/* Nav — sidebar nav-item active state. */
import { $$, on, isMobile } from '../lib/dom.js';
import * as Drawer from './drawer.js';

export function init() {
  $$('.nav-item').forEach(item => on(item, 'click', () => {
    $$('.nav-item').forEach(x => x.classList.remove('active'));
    item.classList.add('active');
    if (isMobile()) Drawer.closeAll();
  }));
}
