/* Dialog specimen — native <dialog>; close button, backdrop click, Escape. */
import { $, $$ } from '../../lib/dom.js';

export function init() {
  const dialog = $('#demoDialog');
  if (!dialog) return;
  $('#dialog-demo')?.addEventListener('click', () => dialog.showModal());
  $$('[data-close]', dialog).forEach(b => b.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
}
