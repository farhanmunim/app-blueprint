/* ============================================================================
   Design-system page · interactive specimens
   Tuning knobs, tabs/segmented demos, menu, dialog, toast, loading button.
   Silently no-ops on pages without these elements.
   ============================================================================ */
(function () {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const TOAST_MS = 3200;
  const LOADING_MS = 1400;

  /* Tuning — set a global knob on :root and echo the value. */
  function initTuning() {
    const root = document.documentElement;
    const knobs = $$('[data-knob]');
    if (!knobs.length) return;
    const defaults = knobs.map(k => k.defaultValue);
    const apply = (input) => {
      const value = input.value + input.dataset.unit;
      root.style.setProperty(input.dataset.knob, value);
      input.closest('.ds-tune__row').querySelector('code').textContent = `${input.dataset.knob}: ${value}`;
    };
    knobs.forEach(k => k.addEventListener('input', () => apply(k)));
    $('#tuning-reset')?.addEventListener('click', () => {
      knobs.forEach((k, i) => { k.value = defaults[i]; root.style.removeProperty(k.dataset.knob); k.closest('.ds-tune__row').querySelector('code').textContent = `${k.dataset.knob}: ${defaults[i]}${k.dataset.unit}`; });
    });
  }

  /* Tabs + segmented — single-select groups. */
  function initGroups() {
    const wire = (group, itemSel, attr) => $$(group).forEach(g => {
      $$(itemSel, g).forEach(item => item.addEventListener('click', () => {
        $$(itemSel, g).forEach(x => x.setAttribute(attr, String(x === item)));
      }));
    });
    wire('[data-group="tabs"]', '.tabs__tab', 'aria-selected');
    wire('[data-group="segmented"]', '.segmented__item', 'aria-pressed');
  }

  /* Dropdown menu — click to toggle, outside click / Escape to close. */
  function initMenu() {
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

  /* Dialog — native <dialog>; close button, backdrop click, Escape. */
  function initDialog() {
    const dialog = $('#demoDialog');
    if (!dialog) return;
    $('#dialog-demo')?.addEventListener('click', () => dialog.showModal());
    $$('[data-close]', dialog).forEach(b => b.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  }

  /* Toast — appended to the live region, removed after a delay. */
  function initToast() {
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

  /* Loading button demo. */
  function initLoading() {
    const btn = $('#loading-demo');
    if (!btn) return;
    btn.addEventListener('click', () => {
      btn.classList.add('is-loading');
      setTimeout(() => btn.classList.remove('is-loading'), LOADING_MS);
    });
  }

  function boot() { initTuning(); initGroups(); initMenu(); initDialog(); initToast(); initLoading(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
