# SURFER — Build Notes & Design Rationale

This document logs all architectural, design, typographic, and implementation judgment calls made throughout the creation of the SURFER brand website.

---

## 1. Design & Aesthetic Decisions
- **Monochrome Integrity**: Adhered strictly to the locked monochrome token set (`#0A0A0A`, `#111111`, `#1C1C1C`, `#F5F4F0`, `#FAF9F6`, `#8A8A86`, `#D8D7D2`). No auxiliary accent colors, no gradients used decoratively, no tinted glass.
- **Zero Radius Principle**: Universal `border-radius: 0px` across all structural cards, imagery wrappers, and action buttons to convey architectural modern tailoring.
- **Micro-Textures**: In the deterministic `<PlaceholderImage>` component, we engineered a fine diagonal 45° SVG line pattern (`rgba(0,0,0,0.025)` over `--color-white-off` to `--color-white-warm`) giving realistic fabric texture depth without loading external assets or causing cumulative layout shift (CLS).
- **Dark Section Isolation**: The Brand Statement section (`--color-black-deep`) is treated as an isolated emotional crescendo with inverted monochrome tokens (`--color-white-warm` text, subtle 6% opacity grain texture overlay).

---

## 2. Typography & Copy Details
- **Fonts**:
  - Display: `Instrument_Serif` (Google Font, weight 400), set to `clamp(2.75rem, 5.5vw + 1.25rem, 7.5rem)` with `-0.015em` letter-spacing and `0.98` line-height for high-fashion editorial titles.
  - Sans: `Inter` (Google Font, weights 400/500/600), variable font subset latin.
- **Copy Restraint**: All body paragraphs are limited to a maximum of 2–3 concise sentences and constrained to `60ch` max-width.
- **Section Labels**: Fixed at `13px` (`0.8125rem`), uppercase, `0.2em` letter-spacing, in `--color-grey-soft`.

---

## 3. Motion & Interaction System
- **Lenis Smooth Scroll + GSAP ScrollTrigger**: Integrated Lenis inertial scrolling with a unified `requestAnimationFrame` loop updating GSAP ScrollTrigger.
- **Standard -> Personal Transition**: Built in `TheProblem.tsx` using GSAP ScrollTrigger with `scrub` and pin or Framer Motion viewport triggers to smoothly slide/fade the word "STANDARD" into "PERSONAL" as the user scrolls.
- **Custom Cursor Layer**: Created desktop-only cursor tracking mouse coordinates with a mix-blend-mode difference circle. Detects `(pointer: coarse)` and touch devices to completely disable itself without layout or performance cost. Shows `VIEW` over collection items and `EXPLORE →` over primary CTAs.
- **Session-Aware Loading Screen**: On first visit, displays the centered `SURFER` brand mark with a high-fashion curtain wipe reveal for ~900ms. Stored in `sessionStorage` (`surfer_loaded`) so subsequent page navigations and refreshes are instantaneous.

---

## 4. Accessibility & SEO
- **Reduced Motion Support**: Listens to `prefers-reduced-motion: reduce`. Disables Lenis inertia, GSAP parallax/scrubs, and custom cursor, providing instantaneous transitions.
- **Skip Navigation**: Accessible Skip to Content component linking directly to `#main-content`.
- **Contrast & Focus**: High-contrast outline focus states with inverted focus styles in dark sections.
- **SEO & Metadata**: JSON-LD `Organization` structured data in root layout, custom SVG favicon, Next.js OpenGraph image route, `robots.ts`, and `sitemap.ts`.
