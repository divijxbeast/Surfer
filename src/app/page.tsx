import { Hero } from "@/components/sections/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { TheProblem } from "@/components/sections/TheProblem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FitSection } from "@/components/sections/FitSection";
import { CollectionPreview } from "@/components/sections/CollectionPreview";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { CustomizationPhilosophy } from "@/components/sections/CustomizationPhilosophy";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main id="main-content" className="relative w-full overflow-hidden bg-[#F5F4F0]">
      <Hero />
      <BrandIntro />
      <TheProblem />
      <HowItWorks />
      <FitSection />
      <CollectionPreview />
      <Craftsmanship />
      <CustomizationPhilosophy />
      <BrandStatement />
      <FinalCTA />
    </main>
  );
}
