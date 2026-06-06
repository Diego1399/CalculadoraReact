# CLAUDE.md — CalculadoraReact

Reference document for Claude Code and Figma MCP integration. Describes codebase conventions, design system, and how to map Figma designs to code.

---

## Project Overview

A React calculator app bootstrapped with **Create React App (CRA)**. Currently implements a classic iOS-style calculator layout with basic digit/operator display logic. The project is in early/incomplete state — `calculate.js` and `display.js` contain stubs.

**Live dev server:** `npm start` (port 3000 by default)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18.3.1 (functional components + hooks) |
| Language | JavaScript (no TypeScript) |
| Styling | Plain CSS files (co-located with components or global) |
| Build System | Create React App / react-scripts 5.0.1 (Webpack under the hood) |
| Routing | react-router-dom 6.24.1 (imported but not yet used) |
| Testing | Jest + @testing-library/react |

---

## Project Structure

```
src/
├── App.js              # Root component — composes Header + Classic
├── App.css             # App-level styles (button sizing, layout)
├── index.js            # React entry point (ReactDOM.createRoot)
├── index.css           # Global body/font reset
├── logo.svg            # Default CRA logo (unused in production UI)
├── components/
│   ├── header.js       # <Header> — static heading bar
│   ├── classic.js      # <Classic> — full calculator grid with state
│   └── buttons/
│       └── button.js   # <Button> — reusable button primitive
└── logic/
    ├── isNumber.js     # Utility: regex test for digit characters
    ├── calculate.js    # (stub) Core arithmetic logic
    └── display.js      # (stub) Display string update logic
```

---

## Component Architecture

### Patterns in use

- **Functional components** with `useState` for local state.
- **Props-down / callbacks-up**: `Classic` owns state, passes `handleClick` down to `Button`.
- No context, no Redux, no external state manager.
- No TypeScript; props are plain JS, no PropTypes defined.

### Button primitive (`src/components/buttons/button.js`)

```jsx
export default function Button(props) {
    const handleClick = () => props.handleClick(props.name);
    return (
        <div>
            <button onClick={handleClick}>{props.name}</button>
        </div>
    );
}
```

- `name` — the label string rendered and passed back on click.
- `handleClick` — callback receiving `name` as its argument.
- Wrapped in a `<div>` for layout spacing inside the `<table>` grid.

### Classic layout (`src/components/classic.js`)

Grid is a raw HTML `<table>` with 5 rows × 4 columns. Operator symbols used as button names:

| Symbol | Role |
|---|---|
| `AC` | Clear all |
| `±` | Toggle sign |
| `%` | Percent |
| `÷` | Division |
| `*` | Multiplication |
| `-` | Subtraction |
| `+` | Addition |
| `=` | Evaluate |
| `.` | Decimal point |
| `''` (empty) | Placeholder (bottom-left) |

---

## Styling Approach

### Methodology: Plain CSS (no modules, no CSS-in-JS)

- **Global reset** — `src/index.css`: body margin, system font stack.
- **App-level styles** — `src/App.css`: layout, button size, logo animation.
- **No component-scoped CSS** — all class names are global. Risk of collision as the project grows.
- **No CSS custom properties (variables)** — values are hardcoded.

### Current hardcoded design values

```css
/* src/App.css */
button {
    width: 100px;
    height: 100px;
    font-size: 50px;
}

.App-header {
    background-color: white;
    font-size: calc(10px + 2vmin);
}
```

### Responsive design

Only `vmin`-based font sizing is used. No media queries for calculator layout. The `<table>` layout does not adapt to narrow viewports.

---

## Design Token Status

**There are no design tokens defined.** When integrating Figma designs, define tokens as CSS custom properties in `src/index.css` or a new `src/tokens.css`:

```css
/* Recommended token structure to adopt */
:root {
    /* Colors */
    --color-bg: #1c1c1e;
    --color-btn-number: #333335;
    --color-btn-operator: #ff9f0a;
    --color-btn-special: #a5a5a5;
    --color-display-text: #ffffff;

    /* Sizing */
    --btn-size: 80px;
    --btn-font-size: 32px;
    --btn-border-radius: 50%;
    --btn-gap: 12px;

    /* Typography */
    --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
    --font-size-display: 72px;
    --font-size-btn: 32px;
}
```

---

## Icon System

**No icon library is used.** Icons/symbols are plain Unicode characters passed as `name` props to `<Button>`. When adding icons from Figma:

1. Prefer SVG components in `src/components/icons/` over `<img>` tags.
2. Export SVGs from Figma as React components (SVGR pattern):
   ```jsx
   // src/components/icons/DivideIcon.js
   export default function DivideIcon() {
       return <svg viewBox="0 0 24 24">...</svg>;
   }
   ```
3. Keep the `name` prop on `<Button>` as the semantic identifier; swap the display child to use icon components as needed.

---

## Asset Management

- Assets live in `src/` and are imported directly via ES module imports (handled by CRA/Webpack).
- `src/logo.svg` is the only current asset; it is unused in the calculator UI.
- No `public/` asset references beyond the default CRA `index.html`.
- No CDN. No image optimization pipeline.

**Figma export guidance:** Export assets as SVG when possible. Place in `src/assets/` and import inline.

---

## Figma MCP Integration Rules

### Design-to-code mapping

| Figma element | Code target |
|---|---|
| Button component | `src/components/buttons/button.js` |
| Calculator grid frame | `src/components/classic.js` — replace `<table>` with CSS Grid |
| Display area | `<h1>{value}</h1>` in `classic.js` — extract to its own component |
| Header bar | `src/components/header.js` |
| Color styles | CSS custom properties in `src/index.css` |
| Text styles | CSS custom properties + `font-family`/`font-size` tokens |
| Spacing/gap values | CSS custom properties for `--btn-gap`, `--btn-size`, etc. |

### Layout recommendation when implementing Figma designs

Replace the `<table>` grid with CSS Grid for accurate Figma layout mapping:

```jsx
/* Replace <table> in classic.js with: */
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, var(--btn-size))', gap: 'var(--btn-gap)' }}>
    <Button name='AC' handleClick={handleClick} />
    {/* ... */}
</div>
```

### Component extraction to do before Figma integration

The display area is inline in `classic.js`. Extract before syncing designs:

```jsx
// src/components/Display.js
export default function Display({ value, result }) {
    return (
        <div className="display">
            <span className="display__result">{result}</span>
            <span className="display__value">{value}</span>
        </div>
    );
}
```

---

## Build & Development Commands

```bash
npm start       # Dev server on localhost:3000
npm test        # Jest watch mode
npm run build   # Production build to /build
```

No eject has been run. Webpack config is managed by react-scripts.

---

## Known Incomplete Areas

- `src/logic/display.js` — returns `undefined` (body is empty after variable declaration).
- `src/logic/calculate.js` — all logic is commented out.
- `src/components/header.js` — hardcoded Spanish placeholder text ("Este es el header").
- Bottom-left button has an empty `name=''` — acts as a blank placeholder.
- `result` state in `classic.js` is set but never updated (commented call to `calculate`).
