/* Theme — light/dark toggle, persisted to localStorage.
   The initial theme is applied before paint by theme-init.js (same storage key). */
import { $, on } from '../lib/dom.js';

const THEME_STORAGE_KEY = 'app-theme';

function current() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function set(theme) {
  const next = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch (_) {}
}

export function init() {
  const btn = $('#themeToggle');
  if (!btn) return;
  on(btn, 'click', () => set(current() === 'dark' ? 'light' : 'dark'));
}
