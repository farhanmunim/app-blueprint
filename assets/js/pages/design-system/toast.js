/* Toast specimen — appended to the live region, removed after a delay. */
import { $ } from '../../lib/dom.js';

const TOAST_MS = 3200;

export function init() {
  const region = $('#toastRegion');
  const btn = $('#toast-demo');
  if (!region || !btn) return;

  btn.addEventListener('click', () => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg><span>Changes saved</span>';
    region.appendChild(toast);
    setTimeout(() => toast.remove(), TOAST_MS);
  });
}
