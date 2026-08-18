"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

export function CampaignFeature() {
  const { scrollTo } = useSmoothScroll();

  const handleExploreClick = () => {
    const el = document.querySelector("#collection");
    if (el) {
      scrollTo(el as HTMLElement, { offset: -40 });
    }
  };

  return (
    <section className="w-full bg-[#DCD9D2] text-[#0A0A0A] overflow-hidden py-16 sm:py-24 px-6 sm:px-12 md:px-16 border-b border-[#C8C5BC]">
      <div className="max-w-[1520px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Bold Campaign Headline in Anton Font */}
        <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.28em] text-[#333333] uppercase block mb-3">
              NEW SEASON
            </span>

            <h2 className="font-anton text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-[0.02em] leading-[0.88] text-[#0A0A0A] mb-6">
              NEW
              <br />
              VIBES
            </h2>

            <p className="text-sm sm:text-base text-[#3A3A3A] font-sans leading-relaxed mb-10 max-w-md">
              Discover everything new and now. Architectural trousers engineered to your biometric measurements, crafted from high-twist wools and Japanese organic twills.
            </p>

            <button
              onClick={handleExploreClick}
              data-cursor="explore"
              className="px-8 sm:px-10 py-4 bg-[#0A0A0A] hover:bg-[#242424] text-[#F7F5F0] text-xs font-mono font-bold tracking-[0.26em] uppercase transition-all duration-300 cursor-pointer shadow-xl active:scale-95"
            >
              EXPLORE COLLECTION
            </button>
          </motion.div>
        </div>

        {/* Right Column: Editorial Portrait Photography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[560px] aspect-[4/5] overflow-hidden shadow-2xl bg-[#C8C5BD]">
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop"
              alt="SURFER Campaign New Vibes Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top filter grayscale-[0.2] contrast-[1.06] transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
