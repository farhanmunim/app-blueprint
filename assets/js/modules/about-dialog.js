/* About dialog — native <dialog>. Opens from the footer; closes via the close
   button, backdrop click, or Escape (native). */
export function init() {
  const dialog = document.getElementById('aboutModal');
  const trigger = document.getElementById('aboutTrigger');
  const closeBtn = document.getElementById('aboutClose');
  if (!dialog || !trigger) return;

  trigger.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  });
  closeBtn?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}
