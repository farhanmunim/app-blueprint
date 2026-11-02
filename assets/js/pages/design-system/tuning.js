/* Tuning — sliders set a global knob on :root and echo the value. */
import { $, $$ } from '../../lib/dom.js';

const label = (input, value) => {
  input.closest('.ds-tune__row').querySelector('code').textContent = `${input.dataset.knob}: ${value}`;
};

export function init() {
  const root = document.documentElement;
  const knobs = $$('[data-knob]');
  if (!knobs.length) return;
  const defaults = knobs.map(k => k.defaultValue);

  knobs.forEach(k => k.addEventListener('input', () => {
    const value = k.value + k.dataset.unit;
    root.style.setProperty(k.dataset.knob, value);
    label(k, value);
  }));

  $('#tuning-reset')?.addEventListener('click', () => {
    knobs.forEach((k, i) => {
      k.value = defaults[i];
      root.style.removeProperty(k.dataset.knob);
      label(k, defaults[i] + k.dataset.unit);
    });
  });
}
