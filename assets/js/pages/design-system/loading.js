/* Loading-button specimen. */
import { $ } from '../../lib/dom.js';

const LOADING_MS = 1400;

export function init() {
  const btn = $('#loading-demo');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.classList.add('is-loading');
    setTimeout(() => btn.classList.remove('is-loading'), LOADING_MS);
  });
}
