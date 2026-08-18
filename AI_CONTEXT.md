# SURFER — Master Brand & Full Codebase AI Context Document

> **Purpose**: This document provides complete architectural, philosophical, visual, and technical context for **SURFER**, an autonomous bespoke fashion house web application built on Next.js 15. Feed this file to any AI model or developer to instantly give them 100% context on the brand vision, code structure, design system, and feature implementations.

---

## 1. Executive Summary & Brand Manifesto

### Brand Identity
- **Brand Name**: **SURFER** (Atelier Est. 2026)
- **Tagline**: *"Wear what feels like you."*
- **Sub-tagline**: *"Select · Measure · Tailor"*
- **Core Mission**: No two people are built the same. Your pants shouldn't be either. SURFER brings bespoke custom tailoring into everyday contemporary fashion. Clients choose their aesthetic silhouette, specify their biometric measurements, and receive single-piece, artisan-cut trousers with millimeter precision.

### The Problem SURFER Solves
- **Standard Sizing Failure**: Conventional retail forces diverse human anatomies into rigid, arbitrary integer sizes (e.g., S/M/L or 30/32/34). This causes waist gap, poor rise structure, thigh tension, and incorrect inseam break.
- **The SURFER Paradigm**: Inverse the manufacturing pipeline. Zero mass warehouse waste. Every pair of pants is drafted individually on demand using Italian Super 120s high-twist wools and Japanese organic twills.

---

## 2. Technical Stack & Architecture

| Layer | Technology | Details |
|---|---|---|
| **Framework** | Next.js 15.5.23 (App Router) | React Server & Client Components, Server-Side Prerendering |
| **Language** | TypeScript | Strict type checking, interface schemas for all products and silhouettes |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | CSS variables, custom themes, hardware-accelerated transforms |
| **Typography** | Google Fonts (`Anton`, `Geist`, `Geist Mono`, `Playfair Display`) | Next.js font optimization via `next/font/google` |
| **Animations** | Framer Motion | Fluid scroll triggers, interactive state transitions, AnimatePresence |
| **Smooth Scrolling** | Lenis (`@studio-freight/lenis`) | Custom RAF smooth scrolling provider with programmatic anchor targeting |
| **Icons** | Lucide React | Lightweight SVG icons (`Search`, `User`, `Heart`, `ShoppingBag`, `SlidersHorizontal`, etc.) |
| **Image Pipeline** | Next.js `<Image />` + PIL / rembg | Transparent cutout alpha matting, responsive srcset, prioritized loading |
| **Repository** | Git / GitHub | Remote: `https://github.com/divijxbeast/Surfer.git` (`main` branch) |

---

## 3. Project Directory Structure

```
c:\Users\jeshu\OneDrive\Desktop\Surfer\
├── public/
│   ├── hero-model.png            # Exact high-res transparent PNG cutout of the walking model
│   ├── favicon.svg               # Minimalist atelier SVG favicon
│   └── site.webmanifest          # PWA web manifest
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout: font registration (Anton & Geist), SmoothScrollProvider, Navbar, Footer
│   │   ├── page.tsx              # Single-page master brand experience assembling all 13 sections
│   │   ├── globals.css           # Tailwind CSS v4 theme variables, font utilities, fluid typography classes
│   │   ├── account/              # User account & bespoke profile vault
│   │   ├── cart/                 # Shopping bag & checkout flow
│   │   ├── fit/                  # Dedicated silhouette fit guide
│   │   ├── measurements/         # Biometric sizing entry flow
│   │   ├── orders/               # Order tracking & atelier progress
│   │   └── products/             # Dynamic product catalog & detail pages
│   ├── components/
│   │   ├── common/
│   │   │   ├── SmoothScrollProvider.tsx  # Global Lenis smooth scroll hook & context
│   │   │   └── PlaceholderImage.tsx      # Curated editorial image wrapper with fallback maps
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Top announcement bar + header with Anton logo + mobile menu drawer
│   │   │   └── Footer.tsx        # Manifesto footer, multi-column navigation, monumental Anton watermark
│   │   └── sections/
│   │       ├── Hero.tsx          # Monumental Anton wordmark + walking model cutout + reflection + CTAs
│   │       ├── CategoryStrip.tsx # High-contrast 3-column dark category strip (Tailored, Relaxed, Chinos)
│   │       ├── CampaignFeature.tsx # 'NEW VIBES' split editorial banner with Anton typography
│   │       ├── TrustBar.tsx      # 4-item bespoke assurance icon grid (Delivery, Fit, Fabrics, Checkout)
│   │       ├── BestOfSurfer.tsx  # 4-column product showcase grid with wishlist toggles & swatches
│   │       ├── FitSection.tsx    # 4-silhouette interactive cut switcher (Slim, Regular, Relaxed, Wide)
│   │       ├── BrandIntro.tsx    # "THE SURFER IDEA" manifesto & 3-spec atelier grid
│   │       ├── TheProblem.tsx    # Off-the-rack vs. SURFER bespoke comparison matrix
│   │       ├── HowItWorks.tsx    # 4-step ordering process (Select → Measure → Craft → Delivery)
│   │       ├── Craftsmanship.tsx # Raw materials, hand-finished seams & atelier photography
│   │       ├── CustomizationPhilosophy.tsx # Interactive pant anatomy & tailoring breakdown
│   │       ├── BrandStatement.tsx# "Wear what feels like you" crescendo section with tailor background
│   │       └── FinalCTA.tsx      # Final invitation to design bespoke trousers
│   ├── data/
│   │   └── content.ts            # Canonical data: products, silhouettes, fabrics, nav items, specs
│   └── lib/
│       └── utils.ts              # `cn()` utility combining `clsx` and `tailwind-merge`
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 4. Visual Design System & Aesthetics

### Color Palette
- **Studio Off-White / Cream**: `#ECEAE5` (Primary Hero & page background, inspired by minimalist luxury lookbooks)
- **Deep Obsidian Black**: `#0A0A0A` (Primary typography, buttons, high-contrast category strips, and dark sections)
- **Atelier Warm Gold / Ochre**: `#9E7B5C` / `#D4AF37` (Accent highlights, active tabs, indicator dots, rule lines)
- **Muted Studio Gray**: `#85837D` / `#555555` (Secondary metadata, mono labels, subtitles)
- **Card Surface**: `#FCFAF6` / `#F7F5F0` (Card container surfaces with delicate `#E2DDD5` borders)

### Typography Rules
1. **`Anton` (Google Font)**:
   - Used for monumental, impactful headlines and brand wordmarks.
   - Example: Hero `SURFER` (`text-[26vw] font-anton leading-[0.74]`), Campaign `NEW VIBES` (`font-anton text-8xl`), Navbar logo (`font-anton text-[34px]`).
2. **`Geist Sans` & `Geist Mono`**:
   - Used for editorial UI labels, body text, specifications, and micro-metadata (`tracking-[0.24em] uppercase font-mono`).
3. **`Playfair Display` (Serif)**:
   - Used for editorial narrative headings (e.g., *"Why fit into standard when you can make it yours?"* and *"Fit is personal."*).

---

## 5. Detailed Breakdown of Key Page Sections

### 1. Header & Navigation ([`Navbar.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/layout/Navbar.tsx))
- **Announcement Strip**: Black bar with gold pulsing dot: `FREE DELIVERY ON ORDERS ABOVE $150 · BESPOKE ATELIER` and links (`DOWNLOAD APP`, `TRACK ORDER`, `HELP`).
- **Main Nav Links**:
  - `MEN` → Scrolls to `#collection` (Product grid)
  - `SILHOUETTES` → Scrolls to `#fit` (Silhouette explorer)
  - `ATELIER` → Scrolls to `#atelier` (Manifesto & workshop)
  - `ABOUT US` → Scrolls to `#about-us` (The Core Belief: *"Wear what feels like you."*)
- **Center Logo**: `SURFER` in **Anton** font, perfectly proportioned to avoid vertical crowding.
- **Utility Links**: `SEARCH`, `LOGIN`, `WISHLIST`, `CART (0)`.
- **Mobile Menu Drawer**: Full-screen sliding drawer with large Anton links and smooth scroll dispatch.

### 2. Monumental Hero ([`Hero.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/Hero.tsx))
- **Atmospheric Bloom**: Soft luminous radial glow (`bg-white/40 blur-[100px]`) centered behind the subject.
- **Top Metadata**:
  - Left: `FASHION · THAT MOVES · WITH YOU.`
  - Right: `NEW · COLLECTION · 2026`
- **Giant Wordmark**: **`SURFER`** rendered in **Anton** font at `text-[26vw]`.
- **Foreground Cutout Model**: High-resolution transparent PNG cutout (`/hero-model.png`) of a model in dark cap, long trench coat, relaxed trousers, and sneakers walking forward.
- **Studio Floor Reflection**: Inverted reflection (`scale-y-[-1]`, `opacity-20`, `blur-[1.5px]`) masked with downward linear gradient fade to emulate a polished studio floor.
- **Floor Shadow**: Radial gradient shadow anchoring the footwear.
- **Action Controls**: `SHOP NOW` solid button + `EXPLORE NEW IN` underline link.

### 3. Category Strip ([`CategoryStrip.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/CategoryStrip.tsx))
- High-contrast black section with 3 columns:
  1. *TAILORED TROUSERS* (Double pleats & Italian Super 120s wool)
  2. *RELAXED & FLUID* (Single pleat ease with architectural drape)
  3. *COMPACT CHINOS* (High-density Japanese twill benchwork)

### 4. Campaign Feature ([`CampaignFeature.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/CampaignFeature.tsx))
- Split editorial banner on `#DCD9D2`.
- Left: **`NEW VIBES`** headline in **Anton** font + descriptive copy + `EXPLORE COLLECTION` CTA.
- Right: Large aspect-ratio portrait editorial photography.

### 5. Trust & Assurance Bar ([`TrustBar.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/TrustBar.tsx))
- 4 luxury assurance cards with Lucide icons:
  1. *Express Atelier Delivery*
  2. *Perfect Fit Guarantee*
  3. *100% Natural Fibers*
  4. *Secure Bespoke Checkout*

### 6. Best of SURFER Archive Grid ([`BestOfSurfer.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/BestOfSurfer.tsx))
- 4-column product grid featuring:
  - *The Architectural Double-Pleat* ($280)
  - *The Relaxed Everyday Chino* ($210)
  - *The Fluid Wool Trouser* ($340)
  - *The Minimalist Tailored Short* ($190)
- Interactive features:
  - Wishlist heart toggle button with persistent state and touch hitbox.
  - Multi-color swatch selector circles that dynamically change the product selection.

### 7. Bespoke Silhouettes Explorer ([`FitSection.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/FitSection.tsx))
- Interactive 4-tab selector for distinct body cuts:
  - **Slim Architectural**: Tapered 16.5cm opening, mid-rise, athletic thighs.
  - **Regular Contemporary**: Straight 19.5cm opening, natural rise, balanced thigh.
  - **Relaxed Fluid**: Drapey 22.0cm opening, relaxed rise, generous thigh.
  - **Wide Statement**: Voluminous 25.5cm opening, high rise, maximum drape.

### 8. Manifesto & Craftsmanship ([`BrandIntro.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/BrandIntro.tsx), [`TheProblem.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/TheProblem.tsx), [`HowItWorks.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/HowItWorks.tsx))
- Detailed editorial sections highlighting millimeter precision, Biella/Okayama mills, zero inventory waste, and the 4-step bespoke creation process.

### 9. Brand Statement / Core Belief ([`BrandStatement.tsx`](file:///c:/Users/jeshu/OneDrive/Desktop/Surfer/src/components/sections/BrandStatement.tsx))
- Target anchor for `ABOUT US` navigation (`id="about-us"`).
- Top Badge: `SELECT · MEASURE · TAILOR`
- Headline: *"Wear what feels like you."*
- Core Manifesto:
  > *"No two people are built the same. Your pants shouldn't be either. SURFER brings custom tailoring into everyday fashion. Choose your style, define your fit, and get pants made specifically to your measurements."*
- Background: Subdued bespoke tailoring atelier photograph with tailor measuring tape and chalk pattern drafting.

---

## 6. How to Run, Test, and Build

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Create optimized production build
npm run build

# 4. Start production server locally on port 3000
npm run start -- -p 3000
```

---

## 7. Key Guidance for Future AI Assistants

1. **Brand Tone**: Maintain uncompromising luxury, editorial clarity, and brutalist-minimalist elegance. Avoid generic ecommerce clichés, cheesy badges, or neon buttons.
2. **Typography Integrity**: Preserve the **Anton** Google Font for giant display headlines (`SURFER`, `NEW VIBES`) and keep body text clean in **Geist** with high letter-spacing on mono labels (`tracking-[0.24em]`).
3. **Responsive Breakpoints**: Always verify that components adapt smoothly between mobile (`< 640px`), tablet (`768px - 1024px`), and desktop (`> 1200px`). Ensure touch targets are at least 44px on interactive controls.
4. **Smooth Scroll Routing**: When creating anchor links, link with `#id` and dispatch smooth scrolling via `useSmoothScroll()` from `@/components/common/SmoothScrollProvider`.
