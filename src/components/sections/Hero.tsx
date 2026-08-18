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
    <section className="relative w-full min-h-[82vh] sm:min-h-[88vh] lg:min-h-[94vh] bg-gradient-to-b from-[#ECEAE5] via-[#ECEAE5] to-[#E4E1D9] flex flex-col justify-between pt-6 sm:pt-14 pb-8 sm:pb-14 px-4 sm:px-10 md:px-16 overflow-hidden select-none">
      {/* Ambient Atmospheric Studio Glow Tint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[400px] bg-white/40 blur-[70px] sm:blur-[100px] rounded-full pointer-events-none z-0" />

      {/* 1. Top Section Metadata Labels */}
      <div className="max-w-[1520px] w-full mx-auto flex items-start justify-between z-20 relative pointer-events-auto mb-4 sm:mb-8">
        {/* Top-Left Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight">
            FASHION
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight mt-0.5">
            THAT MOVES
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight">
              WITH YOU.
            </span>
            <div className="w-5 sm:w-8 h-[1.5px] bg-[#0A0A0A]" />
          </div>
        </motion.div>

        {/* Top-Right Collection Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-end text-right"
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase">
            NEW
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase mt-0.5">
            COLLECTION
          </span>
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 mt-0.5">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase">
              2026
            </span>
            <div className="w-5 sm:w-8 h-[1.5px] bg-[#0A0A0A]" />
          </div>
        </motion.div>
      </div>

      {/* 2. Monumental Stage: Giant 'SURFER' in Anton Font + Cutout Walking Model + Floor Reflection */}
      <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-center my-auto py-4 sm:py-10">
        {/* Giant Anton Font Wordmark Behind Model */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-anton text-[28vw] sm:text-[25vw] leading-[0.74] tracking-[0.02em] text-[#0A0A0A] uppercase select-none text-center w-full z-0 block pointer-events-none"
        >
          SURFER
        </motion.h1>

        {/* Transparent Walking Model Cutout with Studio Floor Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="relative w-[280px] sm:w-[440px] md:w-[540px] lg:w-[640px] h-[55vh] sm:h-[70vh] lg:h-[78vh] max-h-[660px] flex items-center justify-center">
            {/* Soft Ambient Ground Shadow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[75%] h-6 sm:h-8 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.08)_50%,transparent_75%)] blur-[2px] sm:blur-[3px] pointer-events-none z-10" />

            {/* Subtle Studio Floor Reflection */}
            <div
              className="absolute top-[98.5%] left-0 right-0 h-[40%] pointer-events-none overflow-hidden scale-y-[-1] opacity-20 blur-[1px] sm:blur-[1.5px] z-0"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)",
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/hero-model.png"
                  alt="Reflection"
                  fill
                  sizes="(max-width: 768px) 85vw, 640px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* Primary Model Cutout PNG */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              <Image
                src="/hero-model.png"
                alt="SURFER Walking Model in Trench Coat, Cap, and Bespoke Relaxed Trousers"
                fill
                priority
                sizes="(max-width: 768px) 85vw, 640px"
                className="object-contain object-bottom drop-shadow-[0_14px_22px_rgba(0,0,0,0.22)] sm:drop-shadow-[0_18px_28px_rgba(0,0,0,0.24)]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Action Controls */}
      <div className="max-w-[1520px] w-full mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 z-20 relative pointer-events-auto pt-4 sm:pt-8">
        {/* Buttons matching reference layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 sm:gap-7 w-full sm:w-auto justify-center sm:justify-start"
        >
          <button
            onClick={() => handleScrollTo("#collection")}
            data-cursor="explore"
            className="flex-1 sm:flex-none px-7 sm:px-10 py-3 sm:py-4 bg-[#0A0A0A] hover:bg-[#262626] text-[#F7F5F0] text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-95 text-center"
          >
            SHOP NOW
          </button>

          <button
            onClick={() => handleScrollTo("#collection")}
            className="flex-1 sm:flex-none text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#0A0A0A] hover:text-[#9E7B5C] uppercase transition-colors cursor-pointer relative py-2 border-b border-[#0A0A0A] text-center"
          >
            EXPLORE NEW IN
          </button>
        </motion.div>

        {/* Brand signature subline */}
        <div className="text-center sm:text-right">
          <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase font-semibold">
            AUTONOMOUS BESPOKE ATELIER
          </span>
        </div>
      </div>
    </section>
  );
}
