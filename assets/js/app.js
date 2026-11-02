/* ============================================================================
   App Blueprint · shell entry (ES module, deferred by default)
   ----------------------------------------------------------------------------
   Loaded on every page. Each module silently no-ops when its elements are
   missing, so the same entry serves the app shell, the changelog and the
   design-system page.

     modules/drawer.js        mobile off-canvas drawers + scroll lock
     modules/panels.js        desktop collapse/expand of side panels
     modules/tabs.js          tab groups
     modules/nav.js           sidebar active item
     modules/mobile-nav.js    bottom tab bar
     modules/theme.js         light/dark toggle
     modules/about-dialog.js  footer About dialog
   ========================================================================== */
import * as Drawer from './modules/drawer.js';
import * as Panels from './modules/panels.js';
import * as Tabs from './modules/tabs.js';
import * as Nav from './modules/nav.js';
import * as MobileNav from './modules/mobile-nav.js';
import * as Theme from './modules/theme.js';
import * as AboutDialog from './modules/about-dialog.js';

[Drawer, Panels, Tabs, Nav, MobileNav, Theme, AboutDialog].forEach(module => module.init());
