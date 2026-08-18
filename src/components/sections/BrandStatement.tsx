"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

export function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.95], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.96, 1, 1.02]);
  const textY = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);

  return (
    <section
      id="about-us"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#0A0A0A] text-[#F7F5F0] dark-section overflow-hidden scroll-mt-10"
    >
      {/* Background Subdued Texture & Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <PlaceholderImage
          filename="brand-statement-bg.jpg"
          dimensions="1920×1080"
          aspectRatio="16/9"
          dark
          className="h-full w-full object-cover"
        />
      </div>

      {/* Tonal Radial Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0A]/80 to-[#0A0A0A]" />

      {/* Top Header Marker */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex items-center justify-between pb-10 border-b border-white/10">
        <span className="text-[11px] font-sans font-medium tracking-[0.25em] text-[#C9BFA8] uppercase flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9E7B5C]" />
          THE CORE BELIEF
        </span>
        <span className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
          08 / CRESCENDO
        </span>
      </div>

      {/* Monumental Central Statement */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto my-auto py-20 sm:py-32 flex flex-col items-center text-center">
        <motion.div
          style={{ opacity, scale, y: textY }}
          className="flex flex-col items-center"
        >
          <span className="text-xs sm:text-sm font-sans font-medium tracking-[0.32em] text-[#9E7B5C] uppercase mb-10">
            POSTURE · PROPORTION · FREEDOM
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.92] tracking-[-0.02em] text-[#F7F5F0] max-w-6xl">
            Clothes should move with you.
          </h2>

          <div className="h-0.5 w-20 bg-[#9E7B5C] my-12" />

          <p className="text-base sm:text-lg font-sans text-neutral-300 max-w-xl leading-relaxed tracking-wide font-light">
            Engineered around posture, stride, and daily life. SURFER trousers are created so you forget you are wearing them, while the world notices the difference.
          </p>

          <span className="mt-14 font-serif text-4xl sm:text-6xl tracking-[0.25em] text-[#F7F5F0] uppercase pl-[0.25em] font-normal">
            SURFER
          </span>
        </motion.div>
      </div>

      {/* Bottom Marker */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex items-center justify-between pt-10 border-t border-white/10 text-xs font-mono text-[#85837D]">
        <span>ATELIER EST. 2026</span>
        <span className="uppercase tracking-widest text-[#C9BFA8]">AUTONOMOUS BESPOKE HOUSE</span>
      </div>
    </section>
  );
}
