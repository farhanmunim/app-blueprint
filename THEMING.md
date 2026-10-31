# Theming

App Blueprint's design language follows the farhan.app UI library
(<https://ui-library.farhan.app/>): layered CSS, semantic tokens, dark and light
themes, Geist + JetBrains Mono. Open `design-system.html` for every token and component.

## File map

| File | Layer | Purpose |
| --- | --- | --- |
| `css/00-layers.css` | — | Declares layer order: `tokens, base, primitives, shell, pages` |
| `css/05-fonts.css` | — | Self-hosted Geist + JetBrains Mono (`fonts/*.woff2`) |
| `css/10-tokens.css` | tokens | Scales: spacing, type, radius, motion, sizing, z-index, app layout |
| `css/11-theme.css` | tokens | Colour: dark (`:root`) and light (`[data-theme="light"]`), status tints |
| `css/20-base.css` | base | Reset, element defaults, focus ring, reduced motion |
| `css/30-primitives.css` | primitives | Buttons, chips, forms, cards, tables, alerts, tabs, menus, dialogs… |
| `css/40-shell.css` | shell | Topbar, side panels, footer, mobile nav |
| `css/50-pages.css` | pages | Canvas wireframe, changelog, design-system page |
| `css/theme.css` | **un-layered** | Your project overrides — always wins |

Load order in every page `<head>` is the table order. Un-layered CSS beats all layers,
so `theme.css` never needs `!important`.

## Re-skinning

Only touch `css/theme.css`:

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

`<html data-theme="dark|light">`. A tiny inline script in each `<head>` sets it before
first paint: saved choice (`localStorage["app-theme"]`) → OS light preference → dark.
`js/app.js` wires the `#themeToggle` button.

## Starting a new project from the blueprint

1. Copy `css/`, `fonts/`, `js/app.js` and the page shells you need.
2. Replace the placeholder "Acme Inc." branding, logo mark and favicon.
3. Set the brand accent in `css/theme.css`.
4. Build pages from the primitives; add page-specific styles in `50-pages.css` (or your own file in the `pages` layer).
