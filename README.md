# App Blueprint

A pixel-perfect web app shell — topbar, collapsible navigation, inspector panel, mobile
drawer shell, changelog and a living design-system page. It is the starting point and
design-language basis for new web apps (see `THEMING.md`). Vanilla HTML, CSS and JS: no
framework, no bundler, no dependencies. Deployed to Cloudflare Pages from GitHub.

## Run locally

Any static server works. Port `8080` by convention:

```bash
npx serve . -l 8080
```

(JavaScript uses native ES modules, so open it over HTTP — `file://` won't work.)

## Structure

```
index.html              App shell (canvas wireframe, side panels, mobile nav)
changelog.html          Release notes page
design-system.html      Living reference: tokens + every component
THEMING.md              How to re-skin the design language
claude.md               Project rules

assets/
  fonts/                Geist + JetBrains Mono (self-hosted woff2)
  css/
    main.css            Entry: layer order + imports of everything shared
    theme.css           Per-project overrides (un-layered, wins over everything)
    tokens/             Scales, semantic aliases, app layout, colours (dark/light), status tints
    base/               @font-face, reset + element defaults
    components/         buttons, forms, chips, cards, tables, tabs, menus, dialog, feedback, …
    layout/             app frame, topbar, side panels, footer, mobile nav
    pages/              canvas, changelog, design-system (+ token specimens)
  js/
    theme-init.js       Classic script in <head>: applies the theme before first paint
    app.js              Shared entry (ES module) — boots the modules below
    lib/                dom helpers, shell element lookup
    modules/            drawer, panels, tabs, nav, mobile-nav, theme, about-dialog
    pages/              design-system.js entry + design-system/ specimens
```

### Conventions

- **Pages in the root, everything else in `assets/`.** Keeps URLs clean on Cloudflare Pages.
- **CSS cascade layers**: `tokens → base → primitives → shell → pages`, declared once in
  `main.css`. Component files contain plain CSS; the layer is applied by the `@import`.
  Page files wrap their own rules in `@layer pages { … }`.
- **Tokens only.** No raw colours, spacing or radii outside `assets/css/tokens/` and `theme.css`.
- **One concern per file**, kebab-case names. New CSS file → `@import` it in `main.css`
  (or link it from its page). New JS module → import it from an entry. No orphans.
- **No inline `<script>` / `<style>`** in pages.

## Deploy

Push to `main`; Cloudflare Pages builds from GitHub. There is no build step — the
repo root is the site root.

## Environment variables

None. This is a static site with no backend.
