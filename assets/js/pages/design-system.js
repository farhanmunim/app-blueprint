/* ============================================================================
   Design-system page · interactive specimens (ES module entry)
   Loaded after js/app.js on design-system.html only.
   ========================================================================== */
import * as Tuning from './design-system/tuning.js';
import * as Groups from './design-system/groups.js';
import * as Menu from './design-system/menu.js';
import * as Dialog from './design-system/dialog.js';
import * as Toast from './design-system/toast.js';
import * as Loading from './design-system/loading.js';

[Tuning, Groups, Menu, Dialog, Toast, Loading].forEach(module => module.init());
