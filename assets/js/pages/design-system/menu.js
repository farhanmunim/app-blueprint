/* Dropdown menu specimen — click to toggle; outside click or Escape closes. */
import { $ } from '../../lib/dom.js';

export function init() {
  const wrap = $('#menu-demo');
  if (!wrap) return;
  const trigger = $('button[aria-haspopup]', wrap);
  const menu = $('.menu', wrap);
  const setOpen = (open) => { menu.hidden = !open; trigger.setAttribute('aria-expanded', String(open)); };

  trigger.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', () => setOpen(false));
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}
