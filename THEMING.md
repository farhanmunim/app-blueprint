# Theming

App Blueprint's design language follows the farhan.app UI library
(<https://ui-library.farhan.app/>): layered CSS, semantic tokens, dark and light
themes, Geist + JetBrains Mono. Open `design-system.html` for every token and component.

## File map

```
assets/css/
  main.css               entry: declares layer order, @imports everything below
  theme.css              YOUR overrides — un-layered, imported last, always wins
  tokens/                (layer: tokens)
    scales.css           spacing, type, radius, motion, sizing, z-index + the 3 global knobs
    semantic.css         what a component *means*: --radius-control, --card-pad, …
    layout.css           app chrome dimensions: topbar, panels, footer
    colours.css          dark (default) and light themes
    status.css           status tints derived with color-mix()
  base/
    fonts.css            self-hosted Geist + JetBrains Mono
    elements.css         (layer: base) reset, element defaults, focus ring, reduced motion
  components/            (layer: primitives) one file per component family
  layout/                (layer: shell) app frame, topbar, side panels, footer, mobile nav
  pages/                 (layer: pages) one file per page, linked by that page only
```

Every page loads `main.css`, then its own file(s) from `pages/`. Un-layered CSS beats all
layers, so `theme.css` never needs `!important`.

## Re-skinning

Only touch `assets/css/theme.css`:

```css
/* Global knobs — re-scale everything at once */
:root {
  --space-unit: 3.5px;   /* density   (4px default)  */
  --radius-scale: .75;   /* roundness (1 default; 0 = square) */
  --type-scale: 1.05;    /* text size */
}

/* Brand accent, per theme */
[data-theme="dark"]  { --accent: #7dd3fc; --on-accent: #0b1220; }
[data-theme="light"] { --accent: #0369a1; --on-accent: #ffffff; }

/* Re-point a whole category */
:root { --radius-control: var(--radius-xs); }  /* square buttons + inputs */
```

## Rules

1. Components use **semantic tokens only** (`--surface`, `--text-muted`, `--radius-card`).
   No raw hex/rgb/hsl outside `11-theme.css` and `theme.css`.
2. Spacing, type, radius and motion come from the scales — no magic px.
3. Light and dark ship together. Never bolt dark mode on with overrides.
4. Status colours (`--success`, `--warning`, `--danger`, `--info`, `--violet`) are for
   chips, dots and alerts — use the `*-subtle` / `*-border` tints for fills.
5. Need a scoped dark/light block on a light/dark page? Add `data-theme="dark"` to that element.

## Theme switching

`<html data-theme="dark|light">`. A tiny blocking script (`assets/js/theme-init.js`) in each `<head>` sets it before
first paint: saved choice (`localStorage["app-theme"]`) → OS light preference → dark.
`assets/js/theme-init.js` does the pre-paint step; `assets/js/modules/theme.js` wires the `#themeToggle` button.

## Starting a new project from the blueprint

1. Copy `assets/` and the page shells you need.
2. Replace the placeholder "Acme Inc." branding, logo mark and favicon.
3. Set the brand accent in `assets/css/theme.css`.
4. Build pages from the components; add page-specific styles in a new `assets/css/pages/<page>.css` wrapped in `@layer pages { … }`.
