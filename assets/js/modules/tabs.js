/* Tabs — click-to-activate within a tab group.
   To add a group, append a { tab, group } selector pair. */
import { $$, on } from '../lib/dom.js';

const GROUPS = [
  { tab: '.right-tab', group: '.right-tabs' },
];

function activate(tab, tabSelector, groupSelector) {
  const parent = tab.closest(groupSelector);
  if (!parent) return;
  $$(tabSelector, parent).forEach(x => x.classList.remove('active'));
  tab.classList.add('active');
}

export function init() {
  GROUPS.forEach(({ tab, group }) => {
    $$(tab).forEach(t => on(t, 'click', () => activate(t, tab, group)));
  });
}
