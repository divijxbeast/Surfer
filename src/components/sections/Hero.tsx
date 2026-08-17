"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";
import { Sparkles, ShieldCheck, Scissors } from "lucide-react";

export function Hero() {
  const { scrollTo } = useSmoothScroll();

  const handleExploreClick = () => {
    const el = document.querySelector("#collection");
    if (el) {
      scrollTo(el as HTMLElement);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-10 md:px-16 overflow-hidden bg-[#F7F5F0]">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="max-w-[1440px] mx-auto h-full grid grid-cols-4 md:grid-cols-12 border-x border-[#E2DDD5]">
          <div className="border-r border-[#E2DDD5] col-span-1 hidden md:block" />
          <div className="border-r border-[#E2DDD5] col-span-5 hidden md:block" />
          <div className="border-r border-[#E2DDD5] col-span-5 hidden md:block" />
          <div className="col-span-1 hidden md:block" />
        </div>
      </div>

      {/* Top Header Badge & Origin Bar */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#E2DDD5]">
        <div className="flex items-center gap-3">
          <span className="section-label">AUTONOMOUS BESPOKE HOUSE</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#9E7B5C]" />
          <span className="text-[11px] font-mono text-[#85837D] tracking-widest uppercase">
            EST. 2026
          </span>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Scissors size={13} className="text-[#9E7B5C]" />
            MILLIMETER PRECISION
          </span>
          <span className="hidden sm:inline-block">·</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#9E7B5C]" />
            100% NATURAL CLOTH
          </span>
        </div>
      </div>

      {/* Centerpiece Content & Split Editorial Layout */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto py-12 sm:py-20">
        {/* Left: Monumental Headline & Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#FCFAF6] border border-[#E2DDD5] text-[11px] font-sans font-medium tracking-[0.24em] text-[#9E7B5C] uppercase"
            >
              <Sparkles size={12} className="text-[#9E7B5C]" />
              <span>THE ARCHITECTURAL TROUSER ERA</span>
            </motion.div>
          </div>

          <h1 className="font-serif headline-fluid text-[#0A0A0A] font-normal mb-8 tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                PANTS MADE
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block italic font-serif text-[#0A0A0A]"
              >
                FOR YOU.
              </motion.span>
            </span>
          </h1>

          <div className="overflow-hidden mb-12 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="body-lead text-[#242424]"
            >
              Tailored directly to your biometric proportions. Designed around your preferred silhouette drape. Experience the quiet luxury of trousers crafted individually with zero compromise.
            </motion.p>
          </div>

          {/* Primary Action Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <button
              onClick={handleExploreClick}
              data-cursor="explore"
              className="px-9 py-5 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-sans font-medium tracking-[0.24em] uppercase transition-all duration-300 hover:bg-[#242424] cursor-pointer border border-[#0A0A0A] shadow-md flex items-center gap-3 group"
            >
              <span>EXPLORE COLLECTION</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-sm text-[#C9BFA8]">→</span>
            </button>

            <button
              onClick={() => {
                const el = document.querySelector("#fit");
                if (el) scrollTo(el as HTMLElement);
              }}
              className="px-8 py-5 bg-[#FCFAF6] text-[#0A0A0A] text-xs font-sans font-medium tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#0A0A0A] hover:text-[#F7F5F0] border border-[#E2DDD5] cursor-pointer"
            >
              FIT SILHOUETTES
            </button>
          </motion.div>

          {/* Micro Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 pt-8 border-t border-[#E2DDD5] grid grid-cols-3 gap-6 max-w-lg"
          >
            <div>
              <span className="block font-serif text-2xl text-[#0A0A0A]">3 Min</span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-[#85837D]">Smart Sizing</span>
            </div>
            <div>
              <span className="block font-serif text-2xl text-[#0A0A0A]">100%</span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-[#85837D]">Single-Piece Cut</span>
            </div>
            <div>
              <span className="block font-serif text-2xl text-[#0A0A0A]">Italy & JP</span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-[#85837D]">Milled Cloth</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Editorial Visual Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full"
        >
          <div className="relative group">
            <PlaceholderImage
              filename="hero.jpg"
              dimensions="1600×2000"
              aspectRatio="4/5"
              label="EDITORIAL COLLECTION 2026"
              caption="The Tailored Pleated Trouser in High-Twist Wool"
              priority
              className="border border-[#E2DDD5] shadow-xl"
            />
            {/* Elegant Bronze Corner Details */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#9E7B5C]" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#9E7B5C]" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Scroll Indicator */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex items-center justify-between pt-8 border-t border-[#E2DDD5]">
        <p className="text-xs font-serif italic text-[#85837D]">
          Pants should adapt to the person — not the person to the pants.
        </p>

        <button
          onClick={handleExploreClick}
          className="flex items-center gap-3 text-[11px] font-sans tracking-[0.24em] text-[#0A0A0A] uppercase hover:text-[#9E7B5C] transition-colors focus-visible:outline-none cursor-pointer"
        >
          <span>SCROLL TO DISCOVER</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-xs font-bold text-[#9E7B5C]"
          >
            ↓
          </motion.span>
        </button>
      </div>
    </section>
  );
}
