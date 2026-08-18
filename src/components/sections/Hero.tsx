"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  const handleScrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      scrollTo(el as HTMLElement, { offset: -40 });
    }
  };

  return (
    <section className="relative w-full min-h-[88vh] lg:min-h-[96vh] bg-[#ECEAE5] flex flex-col justify-between pt-8 sm:pt-12 pb-10 sm:pb-14 px-6 sm:px-12 md:px-16 overflow-hidden select-none">
      {/* 1. Top Section Metadata Labels */}
      <div className="max-w-[1520px] w-full mx-auto flex items-start justify-between z-20 relative pointer-events-auto">
        {/* Top-Left Tagline matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight">
            FASHION
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight mt-0.5">
            THAT MOVES
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight">
              WITH YOU.
            </span>
            <div className="w-8 h-[1.5px] bg-[#0A0A0A]" />
          </div>
        </motion.div>

        {/* Top-Right Collection Label matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:flex flex-col items-end text-right"
        >
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#0A0A0A] uppercase">
            NEW
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#0A0A0A] uppercase mt-0.5">
            COLLECTION
          </span>
          <div className="flex items-center justify-end gap-2 mt-0.5">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#0A0A0A] uppercase">
              2026
            </span>
            <div className="w-8 h-[1.5px] bg-[#0A0A0A]" />
          </div>
        </motion.div>
      </div>

      {/* 2. Monumental Stage: Giant 'SURFER' in Anton Font + Transparent Cutout Walking Model */}
      <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-center my-auto py-4 sm:py-6">
        {/* Giant Anton Font Wordmark Behind Model */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-anton text-[26vw] leading-[0.74] tracking-[0.02em] text-[#0A0A0A] uppercase select-none text-center w-full z-0 block pointer-events-none"
        >
          SURFER
        </motion.h1>

        {/* Transparent Walking Model Cutout layered over the text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="relative w-[320px] sm:w-[440px] md:w-[560px] lg:w-[660px] h-[72vh] sm:h-[80vh] lg:h-[86vh] max-h-[720px] flex items-center justify-center">
            {/* Ground Contact Soft Drop Shadow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_70%)] blur-sm pointer-events-none" />

            {/* Model Cutout PNG */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/hero-model.png"
                alt="SURFER Walking Model in Trench Coat and Bespoke Trousers"
                fill
                priority
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 55vw, 660px"
                className="object-contain object-bottom drop-shadow-[0_18px_26px_rgba(0,0,0,0.25)]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Action Controls */}
      <div className="max-w-[1520px] w-full mx-auto flex items-end justify-between z-20 relative pointer-events-auto pt-2">
        {/* Buttons matching reference layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-5 sm:gap-7"
        >
          <button
            onClick={() => handleScrollTo("#collection")}
            data-cursor="explore"
            className="px-8 sm:px-10 py-3.5 sm:py-4 bg-[#0A0A0A] hover:bg-[#262626] text-[#F7F5F0] text-xs font-mono font-bold tracking-[0.26em] uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            SHOP NOW
          </button>

          <button
            onClick={() => handleScrollTo("#collection")}
            className="text-xs font-mono font-bold tracking-[0.22em] text-[#0A0A0A] hover:text-[#9E7B5C] uppercase transition-colors cursor-pointer relative py-2 border-b border-[#0A0A0A]"
          >
            EXPLORE NEW IN
          </button>
        </motion.div>

        {/* Mobile collection date */}
        <div className="sm:hidden text-right">
          <span className="text-[10px] font-mono tracking-widest text-[#555555] uppercase font-bold">
            NEW COLLECTION 2026
          </span>
        </div>
      </div>
    </section>
  );
}
