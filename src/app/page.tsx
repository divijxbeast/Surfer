import { Hero } from "@/components/sections/Hero";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { CampaignFeature } from "@/components/sections/CampaignFeature";
import { TrustBar } from "@/components/sections/TrustBar";
import { BestOfSurfer } from "@/components/sections/BestOfSurfer";
import { FitSection } from "@/components/sections/FitSection";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { TheProblem } from "@/components/sections/TheProblem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { CustomizationPhilosophy } from "@/components/sections/CustomizationPhilosophy";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main id="main-content" className="relative w-full bg-[#ECEAE5] text-[#0A0A0A]">
      {/* 1. MONUMENTAL HERO: Giant 'SURFER' Typography & Walking Subject */}
      <Hero />

      {/* 2. HIGH-CONTRAST DARK CATEGORY STRIP */}
      <CategoryStrip />

      {/* 3. CAMPAIGN FEATURE: 'NEW PROPORTIONS' Split Editorial */}
      <CampaignFeature />

      {/* 4. ATELIER TRUST & ASSURANCE ICON BAR */}
      <TrustBar />

      {/* 5. BEST OF SURFER PRODUCT ARCHIVE GRID */}
      <BestOfSurfer />

      {/* 6. BESPOKE ARCHITECTURAL SILHOUETTES */}
      <FitSection />

      {/* 7. THE SURFER ATELIER & MANIFESTO */}
      <BrandIntro />

      {/* 8. THE PROBLEM: STANDARD → PERSONAL */}
      <TheProblem />

      {/* 9. THE 4-STEP PROCESS */}
      <HowItWorks />

      {/* 10. ATELIER CRAFTSMANSHIP & DETAILS */}
      <Craftsmanship />

      {/* 11. CUSTOMIZATION PHILOSOPHY */}
      <CustomizationPhilosophy />

      {/* 12. BRAND STATEMENT CRESCENDO */}
      <BrandStatement />

      {/* 13. FINAL INVITATION CTA */}
      <FinalCTA />
    </main>
  );
}
