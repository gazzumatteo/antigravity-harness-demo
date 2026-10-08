# ACME Inc — DESIGN.md

> AI-readable design system for all ACME Inc digital products: websites, web apps, portals, mobile apps, landing pages.
> Drop this file in your project root. Any AI coding agent will generate UI matching ACME Inc's brand.

---

## 1. Visual Theme & Atmosphere

ACME Inc is a technology company focused on AI, Fractional CTO services, and human empowerment through technology. The visual identity is **warm minimalism on dark canvas** — premium but approachable, technical but human.

**Mood**: Quiet confidence. A blacksmith's workshop, not a neon-lit startup. Gold on black, not blue on white.

**Canvas**: Light-first. Warm white backgrounds with amber accents and rich black typography. Dark mode available as alternative.

**Character**: Essential, autorevole, caldo, concreto, visionario. Never: corporate, cold, generic, academic, aggressive.

**Reference aesthetic**: Apple's dark mode meets a luxury watchmaker. Clean geometry, generous whitespace, warm metallics.

---

## 2. Color Palette & Roles

### Light mode (default)

| Role | Name | HEX | Usage |
|------|------|-----|-------|
| `--background` | White Warm | `#FAFAF8` | Page background |
| `--surface` | White | `#FFFFFF` | Cards, modals |
| `--surface-hover` | Gray Light | `#F5F4F0` | Hovered cards |
| `--surface-raised` | Gray Warm | `#EEEDEA` | Tooltips, dropdowns, popovers |
| `--border` | Border Light | `#E0DED8` | Borders, dividers |
| `--border-subtle` | Border Faint | `#ECEAE4` | Subtle dividers between sections |
| `--text-primary` | Rich Black | `#1A1A18` | Headings, body text |
| `--text-secondary` | Muted Gray | `#8A8A80` | Captions, labels, tagline |
| `--text-tertiary` | Muted Light | `#B0AEA6` | Placeholders, hints |
| `--accent` | Amber | `#C8891A` | Primary CTA, links, highlights |
| `--accent-hover` | Amber Dark | `#A06E12` | Hovered accent elements |
| `--accent-muted` | Amber Dim | `#BA7517` | Secondary accent |
| `--accent-surface` | Amber BG | `rgba(200, 137, 26, 0.06)` | Accent tinted backgrounds |
| `--success` | Green | `#0D6E56` | Success states |
| `--warning` | Amber | `#BA7517` | Warning states |
| `--error` | Coral | `#C2553A` | Error states, destructive actions |
| `--info` | Teal | `#0D6E56` | Informational states |

### Dark mode

| Role | Name | HEX | Usage |
|------|------|-----|-------|
| `--background` | Deep Background | `#141210` | Page background, app shell |
| `--surface` | Rich Black | `#1A1A18` | Cards, modals, elevated surfaces |
| `--surface-hover` | Charcoal | `#242220` | Hovered cards, active states |
| `--surface-raised` | Dark Warm | `#2A2826` | Tooltips, dropdowns, popovers |
| `--border` | Border | `#3A3A2E` | Borders, dividers, separators |
| `--border-subtle` | Border Subtle | `#2E2E24` | Subtle dividers between sections |
| `--text-primary` | Warm White | `#EAE4DA` | Headings, body text, primary content |
| `--text-secondary` | Muted Warm | `#8A8474` | Captions, labels, secondary info, tagline |
| `--text-tertiary` | Muted Deep | `#5E5A50` | Placeholders, disabled text, hints |
| `--accent` | Gold | `#F5A623` | Primary CTA, links, highlights, active states |
| `--accent-hover` | Gold Light | `#FFBA42` | Hovered accent elements |
| `--accent-muted` | Amber Dim | `#BA7517` | Secondary accent, borders on accent elements |
| `--accent-surface` | Amber BG | `rgba(245, 166, 35, 0.08)` | Accent tinted backgrounds (badges, tags) |
| `--success` | Green | `#5DCAA5` | Success states, positive indicators |
| `--warning` | Amber | `#EF9F27` | Warning states (same as accent) |
| `--error` | Coral | `#E07A5F` | Error states, destructive actions |
| `--info` | Teal | `#5DCAA5` | Informational states |

### Rules

- Accent (amber/gold) is NEVER used as a full background fill. It is always an accent: text, icons, borders, small highlights.
- Light mode is the default for all ACME Inc products. Dark mode is opt-in.
- Never use pure black `#000000` — always use the warm blacks from the palette.
- Never use pure white `#FFFFFF` as text on dark backgrounds — always use `--text-primary` (#EAE4DA).
- Background hierarchy: `--background` → `--surface` → `--surface-raised`. Maximum 3 levels.

---

## 3. Typography

### Font Stack

```css
--font-sans: 'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace;
```

Inter is the primary typeface. Load weights 400 (Regular) and 500 (Medium) only. No bold (700), no light (300).

### Type Scale

| Token | Size | Weight | Line-height | Letter-spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `--text-display` | 48px | 500 | 1.1 | -1.5px | Hero headlines |
| `--text-h1` | 36px | 500 | 1.2 | -1px | Page titles |
| `--text-h2` | 28px | 500 | 1.3 | -0.5px | Section headings |
| `--text-h3` | 22px | 500 | 1.35 | -0.3px | Subsection headings |
| `--text-h4` | 18px | 500 | 1.4 | 0 | Card titles, labels |
| `--text-body` | 16px | 400 | 1.7 | 0 | Body text, paragraphs |
| `--text-body-sm` | 14px | 400 | 1.6 | 0 | Secondary body, form labels |
| `--text-caption` | 12px | 400 | 1.5 | +0.3px | Captions, metadata |
| `--text-overline` | 11px | 400 | 1.4 | +2.5px | Overlines, taglines (always UPPERCASE) |
| `--text-mono` | 14px | 400 | 1.5 | 0 | Code, technical values |

### Rules

- The wordmark "ACME Inc" always uses ACME uppercase and Inc title case. Never ACME Corp, Acme Inc, or ACME alone.
- The tagline "HUMANS · TECHNOLOGY · PROGRESS" uses `--text-overline` style. Separator is middle dot `·` (U+00B7), never bullet `•`, dash `-`, or pipe `|`.
- Headings never use weight 700. Maximum weight is 500 (Medium).
- Body text line-height is 1.7 — generous for readability.
- No font size below 11px anywhere.

---

## 4. Spacing & Layout

### Spacing Scale

```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

### Layout

- **Max content width**: 1200px for marketing pages, 1440px for app dashboards.
- **Page padding**: 24px (mobile), 48px (tablet), 64px (desktop).
- **Section spacing**: 96px–128px between major sections on marketing pages.
- **Card grid**: 12-column grid, 24px gap. Cards span 4 columns (desktop), 6 columns (tablet), 12 columns (mobile).
- **Container**: Always centered, `margin: 0 auto`.

### Responsive breakpoints

```
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
```

---

## 5. Component Styles

### Buttons

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| Primary | `--accent` | `#1A1A18` | none | Main CTA — one per visible section |
| Secondary | transparent | `--text-primary` | 1px `--border` | Supporting actions |
| Ghost | transparent | `--text-secondary` | none | Tertiary actions, links |
| Danger | `--error` | `#FFFFFF` | none | Destructive actions |

```css
button {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}
button:hover { opacity: 0.85; }
button:disabled { opacity: 0.4; cursor: not-allowed; }
```

- Primary buttons use dark text on accent background for contrast.
- Maximum one Primary button per visible viewport section.
- Icon-only buttons: 40×40px, border-radius 8px.

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.card:hover {
  border-color: var(--border);
  background: var(--surface-hover);
}
```

- Cards never have drop shadows. Elevation is communicated through background color shift and border.
- Interactive cards get a subtle hover state with border and background transition.

### Inputs

```css
input, textarea, select {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: var(--text-primary);
  transition: border-color 0.15s ease;
}
input:focus {
  border-color: var(--accent);
  outline: none;
  box-shadow: 0 0 0 3px var(--accent-surface);
}
input::placeholder { color: var(--text-tertiary); }
```

### Badges / Tags

```css
.badge {
  background: var(--accent-surface);
  color: var(--accent);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.3px;
}
```

### Navigation

- Top navbar: `--surface` background, 64px height, logo left, nav items right.
- Navbar blur: `backdrop-filter: blur(12px)` with `--surface` at 80% opacity.
- Active nav link: `--accent` color. Inactive: `--text-secondary`.
- Mobile: hamburger menu, slide-in panel from right, `--surface` background.

### Tables

```css
table { width: 100%; border-collapse: collapse; }
th {
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.3px;
  text-transform: uppercase;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}
td {
  padding: 14px 16px;
  font-size: 14px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-subtle);
}
tr:hover td { background: var(--surface-hover); }
```

### Dividers

```css
hr {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: 32px 0;
}
```

---

## 6. Elevation & Depth

ACME Inc does NOT use drop shadows for elevation. Depth is communicated through:

1. **Background color layering**: `--background` → `--surface` → `--surface-raised`
2. **Border presence**: elevated elements get `1px solid var(--border-subtle)`
3. **Backdrop blur**: for overlays and floating elements

```css
/* Level 0 — Page background */
.level-0 { background: var(--background); }

/* Level 1 — Cards, sections */
.level-1 { background: var(--surface); border: 1px solid var(--border-subtle); }

/* Level 2 — Dropdowns, tooltips, modals */
.level-2 {
  background: var(--surface-raised);
  border: 1px solid var(--border);
}

/* Overlay — Modal backdrop */
.overlay { background: rgba(20, 18, 16, 0.7); backdrop-filter: blur(8px); }
```

Exception: a single, very subtle shadow is allowed for sticky headers and floating action buttons:
```css
.sticky-shadow { box-shadow: 0 1px 0 var(--border-subtle); }
```

---

## 7. Iconography

- **Icon library**: Lucide React (`lucide-react`) — line icons, 1.5px stroke weight.
- **Default icon size**: 20px. Small: 16px. Large: 24px.
- **Icon color**: inherits text color. Accent icons use `--accent`.
- **Icon-only buttons**: 40×40px, `border-radius: 8px`, centered icon.
- **Never use filled/solid icons** — always outline/line style.
- **Never use emoji as icons** in UI — use Lucide equivalents.

---

## 8. Motion & Animation

**Philosophy**: Motion is functional, not decorative. Transitions communicate state changes, not personality.

```css
--transition-fast: 0.1s ease;
--transition-base: 0.15s ease;
--transition-slow: 0.25s ease;
--transition-page: 0.3s ease;
```

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Button hover | opacity, background | 0.15s | ease |
| Card hover | border-color, background | 0.15s | ease |
| Input focus | border-color, box-shadow | 0.15s | ease |
| Dropdown open | opacity, transform | 0.2s | ease-out |
| Modal open | opacity, transform | 0.25s | ease-out |
| Page transition | opacity | 0.3s | ease |
| Tooltip show | opacity | 0.1s | ease |

### Rules

- No spring physics, no bounce, no elastic easing.
- No animation on page load except hero section fade-in.
- Respect `prefers-reduced-motion`: wrap all animations in `@media (prefers-reduced-motion: no-preference)`.
- Maximum animation duration: 0.3s. If it needs longer, reconsider the interaction.

---

## 9. Design Guardrails

### DO

- Use light mode as default for all ACME Inc products. Offer dark mode as alternative.
- Keep generous whitespace — let elements breathe.
- Use amber/gold only as accent — text, icons, small highlights, CTAs.
- Use `Inter` for all text. Use `JetBrains Mono` for code/technical values.
- Maintain the warm, organic feel — warm blacks, warm whites, warm grays.
- Keep border-radius consistent: 8px for small elements (buttons, inputs, badges), 12px for cards and larger surfaces.
- Use the symbol mark (human figure) as favicon and app icon on dark background.

### DON'T

- Never use pure black (#000000) or pure white (#FFFFFF).
- Never use amber/gold as a full-area background fill.
- Never use drop shadows (except the single exception for sticky headers).
- Never use gradients on surfaces. Flat solid colors only.
- Never use rounded corners larger than 16px.
- Never use decorative animations, parallax scrolling, or scroll-triggered effects.
- Never use stock photography with people in suits shaking hands, holographic UI mockups, or generic "AI brain" imagery.
- Never use font weight 700 (Bold). Maximum is 500 (Medium).
- Never use the words "consulting", "consultant", "synergy", "leverage", "end-to-end", or "best-in-class" in any ACME Inc UI copy.

### Logo Usage in UI

- **Favicon**: Symbol mark dark on `#1A1A18` background, 32×32px.
- **App icon**: Symbol mark dark on `#1A1A18` background, rounded corners (platform native).
- **Navbar**: Logo compact (symbol + wordmark), height 32px, left-aligned.
- **Footer**: Logo complete (symbol + wordmark + tagline), centered or left-aligned.
- **Loading state**: Symbol mark, subtle pulse animation on the amber circle.

### Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text (≥18px).
- All interactive elements must have visible focus states (accent ring).
- All images must have alt text.
- Keyboard navigation must work for all interactive elements.
- Minimum touch target: 44×44px on mobile.

---

*ACME Inc — HUMANS · TECHNOLOGY · PROGRESS*
*Version 1.0 — April 2026*
