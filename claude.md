# CLAUDE.md — Web App Blueprint

This file is the single source of truth for every app built on top of this blueprint. Web apps, dashboards, admin panels, internal tools — whatever category — must start from this shell and adapt within the rules below. The goal is one consistent look and feel across every future project. Colours, icons, typography, and copy can change per project; **layout, spacing, primitives, and interaction patterns cannot**.

When in doubt, refer back to this file. Do not invent new patterns when an existing one fits.

---

## Philosophy

This is a **shell + design system**, not a page-builder or component library. The shell defines:

- A fixed app chrome: topbar, left panel (nav), centre canvas (main), right panel (inspector), bottom panel (console), app footer, mobile bottom-nav.
- A token-first CSS system where every value traces back to a named variable.
- Collapsible panels on desktop, off-canvas drawers on mobile, with a unified animation language.
- A neutral shadcn-aligned aesthetic that works for any app category.
- Light and dark themes out of the box.

The canvas area is intentionally blank — that's where your app-specific content goes. Everything else is reusable shell.

---

## File structure

```
/
├── index.html          Main app page (full shell: topbar + panels + canvas + footer + mobile-nav)
├── changelog.html      Content page pattern (topbar + main + footer only; no panels)
├── css/app.css         Single stylesheet. Tokens → base → primitives → shell → pages → responsive → dark.
└── js/app.js           Single modular controller. Auto-inits; silently no-ops when target elements are absent.
```

**Never inline more than a handful of lines of CSS or JS in an HTML file.** The only inline script allowed is the pre-paint theme bootstrap in `<head>`.

---

## Design tokens

All tokens live at the top of `css/app.css` in `:root`, split into two clearly-labelled sections:

### 1. THEME (override these to re-skin)

```css
:root {
  --primary: 240 5.9% 10%; /* brand surface (HSL triplet, no hsl() wrapper) */
  --primary-foreground: 0 0% 98%;
  --accent: 240 4.8% 95.9%;
  --info: 217 91% 50%; /* links, focus highlights */
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
  --radius: 0.5rem;
}
```

To reskin a project, override these on `:root` in that project's copy of `app.css` (or in a `<style>` block in its HTML). Never hard-code colours, radii, or font families anywhere else.

### 2. DERIVED TOKENS (generally don't edit)

Shadcn neutral palette (background, foreground, card, muted, border, ring, destructive), status colours (success, warning, info), radius scale (`--r-xs … --r-xl`, `--r-pill`), spacing scale (`--sp-1 … --sp-7`), typography scale (`--fs-xs … --fs-xl`), component heights (`--h-btn`, `--h-input`, `--h-nav`, `--h-row`, …), shadows (`--shadow-sm/md/lg`), transitions (`--t-fast`, `--t-panel`), and layout sizes (panel widths, topbar height, bottom panel height).

### Rules

- **Colours are HSL triplets** stored without the `hsl()` wrapper so opacity works: `background: hsl(var(--primary) / 0.15)`.
- **Every value uses a token.** No magic pixels, no ad-hoc hex codes. If a token doesn't exist for your need, add one to the appropriate section rather than hard-coding.
- **Radius ladder**: `--r-xs` (2px) → `--r-sm` (4px) → `--r-md` (6px) → `--r-lg` (8px, default) → `--r-xl` (12px) → `--r-pill` (fully round). Changing `--radius` rescales the whole ladder.
- **Spacing ladder**: `--sp-1 … --sp-7` (4 / 6 / 8 / 10 / 12 / 16 / 20). Use these for gaps, paddings, margins. Inline decimal pixels are forbidden.

---

## Shell layout

```
┌──────────────────────────────────────────────────────────┐
│  topbar (52px)       [logo][version] … [theme][Share][+] │
├──────────┬─────────────────────────────────┬─────────────┤
│          │  canvas-toolbar (44px)          │             │
│          ├─────────────────────────────────┤             │
│  left    │                                 │   right     │
│  panel   │  canvas-area                    │   panel     │
│  (240px) │  (main app content)             │   (300px)   │
│          │                                 │             │
│          ├─────────────────────────────────┤             │
│          │  bottom panel (200px, clamp dvh)│             │
├──────────┴─────────────────────────────────┴─────────────┤
│  app-footer (32px; wraps on mobile)                      │
└──────────────────────────────────────────────────────────┘

Mobile (≤640px):
  • left & right panels become off-canvas drawers (86vw, max 320/340px)
  • bottom panel hidden, replaced by 5-item mobile-nav
  • footer sits BELOW the mobile-nav (flex order)
```

### Topbar (every page)

- Always: logo (link to `index.html`) + version-pill (link to `changelog.html`) on the left.
- Always: theme toggle on the right, followed by page-specific CTAs.
- Primary action uses `.btn-primary`, secondary `.btn-outline`, tertiary `.btn-ghost`.
- Never more than three buttons on the right. Mark non-critical ones with `.hide-mobile`.
- No breadcrumbs, search, avatars, or notifications unless the project genuinely needs them — default is lean.

### Footer (every page)

Consistent set of links: **About · Changelog · Docs · Privacy** on the left, system status + "Built by Farhan" on the right. Never hidden on mobile — it wraps to multi-line and sits below the mobile-nav on pages that have one.

### Panels (main app pages only)

- Click the panel header or chevron to collapse / expand on desktop.
- On mobile, header click closes the drawer; the mobile-nav opens/closes drawers.
- Bottom panel collapses to just its tab bar.

---

## Component primitives

Use these. Do not make new ones unless nothing fits.

| Primitive     | Classes                                                                                                       | Usage                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Button        | `.btn` + `.btn-primary` \| `.btn-outline` \| `.btn-ghost`, modifiers `.btn-sm`, `.btn-icon`                   | Always use `<button>` or `<a>` with these classes. Works identically on anchors. |
| Chip / badge  | `.chip` + `.chip-accent` \| `.chip-brand` \| `.chip-green` \| `.chip-amber` \| `.chip-red` \| `.chip-outline` | Use `.chip-dot` inside for a leading status dot.                                 |
| Icon button   | `.icon-btn`                                                                                                   | 26×26 square, muted hover.                                                       |
| Input / field | `.field-row` + `.field-label` + `.field-val` with an `<input>` inside                                         | Focus ring uses `--ring`.                                                        |
| Avatar        | `.avatar` (topbar stacks) \| `.user-avatar` (panel footer) \| `.cl-author-avatar` (changelog)                 | Always a 2-letter uppercase initial.                                             |
| Version pill  | `.version-pill`                                                                                               | Always an anchor to `changelog.html`.                                            |
| Nav item      | `.nav-item` (+ `.active`, `.nav-indent`)                                                                      | Inside `.nav-section` with a `.nav-label` header.                                |
| Icon          | `<svg class="icon">` — always Lucide-style, 1.5/2px stroke, `currentColor` fill: none.                        | Sizes: `.icon` (16), `.icon-sm` (14), `.icon-xs` (12).                           |

---

## Icons

Always Lucide-style inline SVG. Consistent stroke width (2px), `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, colour via `currentColor`. Do **not** mix icon sets. Do **not** use emoji as icons.

---

## JavaScript framework

`js/app.js` is an IIFE that exposes `window.AppShell` with six modules:

| Module      | Responsibility                                                                   |
| ----------- | -------------------------------------------------------------------------------- |
| `Drawer`    | Mobile off-canvas for left/right panels, overlay, body scroll-lock.              |
| `Panels`    | Desktop collapse/expand for left, right, bottom panels.                          |
| `Tabs`      | Generic tab switcher for any declared group. Extend by pushing to `Tabs.groups`. |
| `Nav`       | Sidebar `.nav-item` active state.                                                |
| `MobileNav` | Bottom nav bar wiring (5 items: Home / Menu / New / Details / Search).           |
| `Theme`     | Light/dark toggle, persists to `localStorage` under `app-theme`.                 |

Each module silently no-ops when its target elements aren't present, so the same bundle works on the main app and on lightweight pages. To add interactivity, either extend an existing module or add a new one to the `boot()` list — never inline a `<script>` block in a page.

### Theme bootstrap

Every page must include the pre-paint inline script in `<head>`:

```html
<script>
  (function () {
    try {
      var stored = localStorage.getItem("app-theme");
      var theme = stored || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
    } catch (_) {}
  })();
</script>
```

This prevents flash of incorrect theme. Do not remove it.

---

## Responsive rules

- `height: 100dvh` with `100svh` and `100vh` fallbacks on `<body>`. Never use bare `vh` for full-viewport elements.
- `overscroll-behavior: none` on body; `contain` on drawers.
- Breakpoints:
  - **≤900px (tablet)**: hide search + avatar cluster, breadcrumb shrinks to last segment, canvas padding reduces.
  - **≤640px (mobile)**: show `.mobile-nav`, hide `.panel-bottom`, panels become off-canvas drawers, footer wraps and sits below the mobile-nav, `.hide-mobile` elements disappear, `.version-pill` hides.
  - **≤380px (small mobile)**: logo text collapses to just the mark, canvas padding minimal.
- Safe-area insets (`env(safe-area-inset-*)`) applied on topbar, mobile-nav, and footer for iOS notch/home-indicator handling.
- Bottom panel height is `min(200px, 34dvh)` — it never eats more than a third of the viewport on short screens.
- Tap targets on mobile nav rows are bumped to 40px.

---

## Dark mode

Official shadcn dark palette on `[data-theme="dark"]`. All downstream tokens resolve via `var()` references, so every component tracks the theme automatically. Per-component dark overrides exist only for the few hard-coded colours (canvas dot-grid, changelog hero background, a handful of border-2/text-3 aliases).

Adding new components: use tokens everywhere and dark mode will generally just work. Only add a `[data-theme="dark"]` override when you need a component to _change_ visually, not merely invert.

---

## Adding a new page

1. Copy the structure of `changelog.html` (for content pages) or `index.html` (for app pages with the full shell).
2. Include the pre-paint theme script, `<link rel="stylesheet" href="css/app.css">`, and `<script src="js/app.js" defer>`.
3. Keep the topbar and footer identical in structure and classes to other pages — only the page-specific CTAs change.
4. Use existing primitives; do not invent. If a genuinely new pattern is needed, add it to `app.css` under the appropriate section (usually `PAGE: <NAME>`), still composed from tokens.
5. Add any page-specific JS by creating a new module in `app.js` and adding it to `boot()`. Do not add inline scripts.

---

## Do / Don't

**Do**

- Use tokens for every colour, spacing, radius, font-size, shadow.
- Compose from existing primitives.
- Keep the topbar lean (logo + version + theme + ≤2 CTAs).
- Test at 1440 / 820 / 390 viewports and in both themes before shipping.
- Respect reduced-motion where animations exceed 200ms.

**Don't**

- Hard-code hex codes, pixel radii, bare `vh`, or font-families outside `:root`.
- Inline styles beyond the existing `style="background:#..."` swatches on per-instance avatars.
- Add inline `<script>` or `<style>` blocks beyond the pre-paint theme bootstrap.
- Introduce a new button, input, or badge variant without checking if a primitive already covers it.
- Break the topbar/footer contract — those must look and behave identically on every page at every breakpoint.
