"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  const handleScrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      scrollTo(el as HTMLElement);
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] bg-[#ECEAE5] flex flex-col justify-between pt-10 sm:pt-14 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 overflow-hidden select-none">
      {/* 1. Top Section Metadata Labels */}
      <div className="max-w-[1520px] w-full mx-auto flex items-start justify-between z-20 relative pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.28em] text-[#1A1A1A] uppercase leading-tight">
            BESPOKE TAILORING
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.28em] text-[#1A1A1A] uppercase leading-tight mt-1">
            PANTS THAT MOVE
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.28em] text-[#1A1A1A] uppercase leading-tight">
              WITH YOU.
            </span>
            <div className="w-8 h-[1.5px] bg-[#0A0A0A]" />
          </div>
        </motion.div>

        {/* Right Label: New Collection 2026 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:flex flex-col items-end text-right"
        >
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.28em] text-[#1A1A1A] uppercase">
            NEW ARCHIVE
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.28em] text-[#1A1A1A] uppercase mt-1">
            EDITION 2026
          </span>
          <div className="w-10 h-[1.5px] bg-[#0A0A0A] mt-2" />
        </motion.div>
      </div>

      {/* 2. Monumental Hero Stage: Giant Wordmark + Overlay Editorial Subject */}
      <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-center my-auto py-6 sm:py-10">
        {/* Giant Background Typography: "SURFER" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[23vw] font-black tracking-[-0.04em] text-[#0A0A0A] uppercase select-none leading-[0.82] text-center w-full z-0 font-sans"
        >
          SURFER
        </motion.h1>

        {/* Central Editorial Fashion Model Subject (Walking forward in wide bespoke trousers) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="relative w-[340px] sm:w-[480px] md:w-[600px] lg:w-[720px] aspect-[3/4] flex items-center justify-center">
            {/* Cutout Editorial Fashion Model */}
            <div className="relative w-full h-full max-h-[82vh] flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                alt="SURFER Bespoke Tailored Trousers Model"
                width={800}
                height={1200}
                priority
                className="object-cover object-top h-[75vh] max-h-[640px] w-auto drop-shadow-[0_24px_36px_rgba(0,0,0,0.3)] filter contrast-[1.05] grayscale-[0.15]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Action Bar */}
      <div className="max-w-[1520px] w-full mx-auto flex items-end justify-between z-20 relative pointer-events-auto pt-4">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => handleScrollTo("#collection")}
            data-cursor="explore"
            className="px-7 sm:px-9 py-3.5 sm:py-4 bg-[#0A0A0A] hover:bg-[#222222] text-[#F7F5F0] text-xs font-mono font-bold tracking-[0.24em] uppercase transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
          >
            SHOP NOW
          </button>

          <button
            onClick={() => handleScrollTo("#fit")}
            className="px-4 py-3.5 text-xs font-mono font-bold tracking-[0.22em] text-[#0A0A0A] hover:text-[#9E7B5C] uppercase transition-colors cursor-pointer flex items-center gap-2 group"
          >
            <span>EXPLORE SILHOUETTES</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Bottom Right Mobile Date Marker */}
        <div className="sm:hidden text-right">
          <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase">
            ARCHIVE 2026
          </span>
        </div>
      </div>
    </section>
  );
}
