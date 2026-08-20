export interface NavItem {
  label: string;
  href: string;
}

export interface FabricSwatch {
  name: string;
  colorHex: string;
  origin: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  category: string;
  description: string;
  fabric: string;
  image: string;
  aspectRatio: string;
  priceEst: string;
  swatches: FabricSwatch[];
}

export interface FitSilhouette {
  id: string;
  name: string;
  tagline: string;
  description: string;
  legOpening: string;
  rise: string;
  thighProfile: string;
  image: string;
  accentQuote: string;
}

export interface CraftsmanshipDetail {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  specNote: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "COLLECTION", href: "#collection" },
  { label: "FIT & SILHOUETTE", href: "#fit" },
  { label: "THE ATELIER", href: "#about" },
  { label: "CRAFTSMANSHIP", href: "#craftsmanship" },
];

export const FOOTER_NAV_LINKS: NavItem[] = [
  { label: "Collection", href: "#collection" },
  { label: "Fit & Silhouette", href: "#fit" },
  { label: "The Atelier", href: "#about" },
  { label: "Craftsmanship", href: "#craftsmanship" },
  { label: "Contact & Bespoke Inquiries", href: "#contact" },
];

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const FOOTER_FUTURE_LINKS: NavItem[] = [
  { label: "Trouser Archive", href: "/products" },
  { label: "Admin Product Studio", href: "/admin" },
  { label: "3D Fit Simulator", href: "/fit" },
  { label: "Digital Tailor Measurement", href: "/measurements" },
  { label: "Client Vault", href: "/account" },
  { label: "Order Progress Tracking", href: "/orders" },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    title: "CHOOSE",
    subtitle: "Select Architectural Cut & Cloth",
    description: "Begin with our curated silhouettes and mill-direct high-character textiles.",
    detail: "Choose between high-twist Italian wools, Japanese heavy twills, and washed Belgian linens.",
  },
  {
    number: "02",
    title: "FIT",
    subtitle: "Define Drape & Volume",
    description: "Specify your preferred drape from clean tapered lines to fluid architectural breaks.",
    detail: "Calibrate rise height, knee taper, and ankle opening to match your daily movement.",
  },
  {
    number: "03",
    title: "MEASURE",
    subtitle: "Input Biometric Parameters",
    description: "Enter simple body dimensions in 3 minutes with our intuitive visual guide.",
    detail: "No tailor visit needed. We account for natural posture, seated hip spread, and stance balance.",
  },
  {
    number: "04",
    title: "MADE FOR YOU",
    subtitle: "Handcrafted Single-Unit Cut",
    description: "Individually laser-cut, assembled by master bench tailors, and hand-pressed.",
    detail: "Finished with natural horn buttons, split-back waistband, and custom monograms.",
  },
];

export const FIT_SILHOUETTES: FitSilhouette[] = [
  {
    id: "slim",
    name: "Slim Precision",
    tagline: "Clean break, sculpted taper",
    description: "Sculpted through the thigh with an anatomical taper to a sharp, modern ankle break. Designed for sharp formal and tailored evening wear.",
    legOpening: "14.5 in / 37 cm",
    rise: "Mid-rise (10.5 in)",
    thighProfile: "Contoured anatomical fit",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000&auto=format&fit=crop",
    accentQuote: "“The sharpest line from hip to shoe.”",
  },
  {
    id: "regular",
    name: "Classic Regular",
    tagline: "Balanced proportion, timeless straight",
    description: "The definitive straight cut with natural drape and effortless movement for daily tailoring. Balanced through seat, knee, and calf.",
    legOpening: "16.0 in / 41 cm",
    rise: "Classic mid-rise (11.0 in)",
    thighProfile: "Balanced natural drape",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
    accentQuote: "“The timeless standard for architectural versatility.”",
  },
  {
    id: "relaxed",
    name: "Relaxed Drape",
    tagline: "Easy thigh, gentle fluid taper",
    description: "Generous through the seat and knee with an easy drape that moves seamlessly with you. Single pleat front allowing unrestricted movement.",
    legOpening: "17.5 in / 44 cm",
    rise: "Mid-to-high rise (11.5 in)",
    thighProfile: "Generous ease with fluid movement",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    accentQuote: "“Unmatched fluidity without losing clean structural lines.”",
  },
  {
    id: "wide",
    name: "Wide Architectural",
    tagline: "Voluminous high-waist drape",
    description: "High-waisted statement cut with full straight leg pooling gently over the shoe. Double forward pleats creating monumental presence.",
    legOpening: "19.5 in / 50 cm",
    rise: "High-rise (12.5 in)",
    thighProfile: "Maximum volumetric ease",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    accentQuote: "“A bold editorial statement rooted in classic Savile Row proportions.”",
  },
];

export const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: "01",
    name: "The Tailored Trouser",
    category: "Formal & Evening",
    description: "Double front pleats with adjustable side-tabs, internal waistband curtain, and full hand-set lining.",
    fabric: "100% Super 120s High-Twist Wool",
    priceEst: "Bespoke Commission",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: "4/5",
    swatches: [
      { name: "Charcoal Heather", colorHex: "#2C2D30", origin: "Biella, Italy" },
      { name: "Midnight Navy", colorHex: "#1B2430", origin: "Biella, Italy" },
      { name: "Deep Espresso", colorHex: "#2E241E", origin: "Biella, Italy" },
    ],
  },
  {
    id: "02",
    name: "The Relaxed Trouser",
    category: "Modern Editorial",
    description: "Single pleat construction engineered with generous thigh ease and fluid, breathable weight.",
    fabric: "Tropical Wool & Mulberry Silk Blend",
    priceEst: "Bespoke Commission",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: "4/5",
    swatches: [
      { name: "Warm Oat", colorHex: "#D5CEBF", origin: "Como, Italy" },
      { name: "Sage Drab", colorHex: "#697263", origin: "Como, Italy" },
      { name: "Chalk White", colorHex: "#ECEAE4", origin: "Como, Italy" },
    ],
  },
  {
    id: "03",
    name: "The Architectural Chino",
    category: "Casual Tailoring",
    description: "Clean flat-front aesthetic with sharp coin pocket, reinforced French seams, and horn button tabs.",
    fabric: "340gsm Japanese Organic Cotton Twill",
    priceEst: "Bespoke Commission",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: "4/5",
    swatches: [
      { name: "Camel Sand", colorHex: "#B89F7D", origin: "Okayama, Japan" },
      { name: "Washed Olive", colorHex: "#525A4B", origin: "Okayama, Japan" },
      { name: "Obsidian", colorHex: "#181818", origin: "Okayama, Japan" },
    ],
  },
  {
    id: "04",
    name: "The Tailored Cargo",
    category: "Utilitarian Minimal",
    description: "Streamlined gusseted pockets with concealed horn buttons and discreet side waist adjusters.",
    fabric: "High-Density Compact Cotton Gabardine",
    priceEst: "Bespoke Commission",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: "4/5",
    swatches: [
      { name: "Dark Slate", colorHex: "#353A40", origin: "Lancashire, UK" },
      { name: "Field Khaki", colorHex: "#827863", origin: "Lancashire, UK" },
      { name: "Black Onyx", colorHex: "#111111", origin: "Lancashire, UK" },
    ],
  },
  {
    id: "05",
    name: "The Wide Leg Wool",
    category: "Monumental Silhouette",
    description: "High-rise architectural cut with deep forward pleats and dramatic, fluid ankle pooling.",
    fabric: "Heavyweight Virgin Wool Flannel",
    priceEst: "Bespoke Commission",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: "4/5",
    swatches: [
      { name: "Mottled Grey", colorHex: "#5A5D64", origin: "Huddersfield, UK" },
      { name: "Cast Iron", colorHex: "#222224", origin: "Huddersfield, UK" },
      { name: "Cognac Brown", colorHex: "#6E472D", origin: "Huddersfield, UK" },
    ],
  },
  {
    id: "06",
    name: "The Everyday Pant",
    category: "Daily Rotation",
    description: "Mid-rise tapered profile designed for non-stop comfort, wrinkle recovery, and clean lines.",
    fabric: "Stretch Cotton-Elastane Micro-Pique",
    priceEst: "Bespoke Commission",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    aspectRatio: "4/5",
    swatches: [
      { name: "Deep Marine", colorHex: "#1C2D37", origin: "Prato, Italy" },
      { name: "Ash Taupe", colorHex: "#777169", origin: "Prato, Italy" },
      { name: "Jet Black", colorHex: "#0D0D0D", origin: "Prato, Italy" },
    ],
  },
];

export const CRAFTSMANSHIP_DETAILS: CraftsmanshipDetail[] = [
  {
    id: "01",
    number: "01",
    title: "Split-Back Waistband",
    description: "Traditional bespoke split-back with pleated internal curtain, adapting gently when seated without tension.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
    specNote: "Hand-finished cotton curtain lining with 2cm expansion allowance.",
  },
  {
    id: "02",
    number: "02",
    title: "Natural Horn Buttons",
    description: "Sustainably sourced water buffalo horn buttons, heat-embossed and cross-stitched with reinforced thread shanks.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    specNote: "Hand-sewn with silk-finish thread for unbreakable longevity.",
  },
  {
    id: "03",
    number: "03",
    title: "French Fly & YKK Excella",
    description: "Interior anchor tab preventing stress across zipper teeth, paired with antique brass Excella hardware.",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800&auto=format&fit=crop",
    specNote: "Smooth gliding symmetrical teeth buffed to jewel-grade smoothness.",
  },
  {
    id: "04",
    number: "04",
    title: "Blind-Stitched Hems",
    description: "Generous 2.5-inch internal hem inlay finished with invisible hand stitching for lifelong alterations.",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop",
    specNote: "Allowing complete hem restyling across decades of wear.",
  },
];
