/* ============================================================================
   Theme bootstrap — classic (non-module) script, loaded synchronously in <head>
   so the theme is set BEFORE first paint (no flash of the wrong theme).

   Order: saved choice → OS light preference → dark.
   The storage key must match THEME_STORAGE_KEY in modules/theme.js.
   ========================================================================== */
(function () {
  try {
    var stored = localStorage.getItem('app-theme');
    var theme = stored || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {}
})();
