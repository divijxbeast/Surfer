"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FIT_SILHOUETTES } from "@/data/content";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

export function FitSection() {
  const [selectedFitId, setSelectedFitId] = useState<string>("regular");
  const currentFit = FIT_SILHOUETTES.find((f) => f.id === selectedFitId) || FIT_SILHOUETTES[1];

  return (
    <section
      id="fit"
      className="relative w-full py-16 sm:py-36 md:py-48 px-4 sm:px-10 md:px-16 bg-[#F7F5F0] border-t border-[#E2DDD5]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 sm:pb-14 border-b border-[#E2DDD5]">
          <span className="section-label">SILHOUETTES</span>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
            04 / PROPORTIONS
          </span>
        </div>

        {/* Headline & Takeaway */}
        <div className="pt-10 sm:pt-20 pb-10 sm:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#0A0A0A] font-normal leading-[1.05] tracking-[-0.02em] mb-4 sm:mb-6">
              Fit is personal.
            </h2>
            <p className="body-lead text-[#242424] text-sm sm:text-base md:text-lg">
              The same individual desires different silhouettes for different moments. Explore four distinct architectural profiles engineered for bespoke customization.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="inline-flex items-center gap-2 border border-[#E2DDD5] px-4 py-2.5 bg-[#FCFAF6] shadow-2xs">
              <SlidersHorizontal size={13} className="text-[#9E7B5C]" />
              <span className="text-[11px] font-mono text-[#0A0A0A] uppercase tracking-widest font-semibold">
                4 BESPOKE SILHOUETTES
              </span>
            </div>
          </div>
        </div>

        {/* Silhouette Selection Buttons (Tab Bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-16 border-b border-[#E2DDD5] pb-6 sm:pb-8">
          {FIT_SILHOUETTES.map((silhouette) => {
            const isSelected = silhouette.id === selectedFitId;
            return (
              <button
                key={silhouette.id}
                onClick={() => setSelectedFitId(silhouette.id)}
                className={cn(
                  "py-4 sm:py-6 px-4 sm:px-6 text-left border transition-all duration-300 relative cursor-pointer active:scale-98",
                  isSelected
                    ? "bg-[#0A0A0A] text-[#F7F5F0] border-[#0A0A0A] shadow-md"
                    : "bg-[#FCFAF6] text-[#0A0A0A] border-[#E2DDD5] hover:border-[#9E7B5C]"
                )}
              >
                <span
                  className={cn(
                    "text-[9px] sm:text-[10px] font-mono tracking-widest uppercase block mb-1.5 font-semibold",
                    isSelected ? "text-[#C9BFA8]" : "text-[#9E7B5C]"
                  )}
                >
                  CUT ARCHIVE
                </span>
                <span className="font-serif text-xl sm:text-3xl block font-normal">{silhouette.name}</span>
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#9E7B5C]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Fit Feature Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFit.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-center bg-[#FCFAF6] border border-[#E2DDD5] p-5 sm:p-12 md:p-16 shadow-lg"
          >
            {/* Visual Column with Real Silhouette Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative group overflow-hidden border border-[#E2DDD5] shadow-md">
                <PlaceholderImage
                  src={currentFit.image}
                  dimensions="1000×1333"
                  aspectRatio="3/4"
                  label={`${currentFit.name.toUpperCase()} DRAPE`}
                  caption={currentFit.tagline}
                  className="w-full"
                />
              </div>
            </div>

            {/* Spec Narrative Column */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full py-2 sm:py-4">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.22em] text-[#9E7B5C] uppercase">
                    SILHOUETTE PROFILE
                  </span>
                  <span className="h-px w-6 sm:w-8 bg-[#9E7B5C]" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#0A0A0A] uppercase tracking-wider font-semibold">
                    {currentFit.name} CUT
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#0A0A0A] font-normal mb-3 sm:mb-4">
                  {currentFit.name} — {currentFit.tagline}
                </h3>

                <p className="font-serif italic text-base sm:text-xl text-[#85837D] mb-4 sm:mb-6">
                  {currentFit.accentQuote}
                </p>

                <p className="body-lead text-[#242424] text-xs sm:text-base mb-6 sm:mb-10">
                  {currentFit.description}
                </p>
              </div>

              {/* Proportions Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-10 border-t border-[#E2DDD5]">
                <div className="p-3.5 sm:p-4 bg-[#F7F5F0] border border-[#E2DDD5]">
                  <span className="text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.2em] text-[#9E7B5C] uppercase block mb-1">
                    LEG OPENING SPEC
                  </span>
                  <span className="font-mono text-xs sm:text-base text-[#0A0A0A] font-medium">
                    {currentFit.legOpening}
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 bg-[#F7F5F0] border border-[#E2DDD5]">
                  <span className="text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.2em] text-[#9E7B5C] uppercase block mb-1">
                    RISE STRUCTURE
                  </span>
                  <span className="font-mono text-xs sm:text-base text-[#0A0A0A] font-medium">
                    {currentFit.rise}
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 bg-[#F7F5F0] border border-[#E2DDD5]">
                  <span className="text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.2em] text-[#9E7B5C] uppercase block mb-1">
                    THIGH VOLUME
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-[#0A0A0A] font-medium">
                    {currentFit.thighProfile}
                  </span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#E2DDD5] flex items-center justify-between">
                <span className="text-[11px] sm:text-xs text-[#85837D] font-serif italic">
                  * Calibrated with millimeter accuracy to your personal measurement profile.
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
