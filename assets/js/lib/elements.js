/* Shell elements, looked up once. Any of these may be null on pages without a shell. */
import { $ } from './dom.js';

export const els = {
  overlay:          $('#overlay'),
  panelLeft:        $('#panelLeft'),
  panelRight:       $('#panelRight'),
  leftPanelHd:      $('#leftPanelHd'),
  rightPanelHd:     $('#rightPanelHd'),
  rightCollapseTab: $('#rightCollapseTab'),
};
