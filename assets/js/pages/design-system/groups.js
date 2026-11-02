/* Tabs + segmented specimens — single-select groups. */
import { $$ } from '../../lib/dom.js';

function wire(groupSelector, itemSelector, attr) {
  $$(groupSelector).forEach(group => {
    $$(itemSelector, group).forEach(item => item.addEventListener('click', () => {
      $$(itemSelector, group).forEach(x => x.setAttribute(attr, String(x === item)));
    }));
  });
}

export function init() {
  wire('[data-group="tabs"]', '.tabs__tab', 'aria-selected');
  wire('[data-group="segmented"]', '.segmented__item', 'aria-pressed');
}
