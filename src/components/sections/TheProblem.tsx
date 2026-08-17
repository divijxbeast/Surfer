"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

export function TheProblem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPersonal, setIsPersonal] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.4) {
        setIsPersonal(true);
      } else {
        setIsPersonal(false);
      }
    });
  }, [scrollYProgress]);

  const opacityStandard = useTransform(scrollYProgress, [0.25, 0.45], [1, 0.2]);
  const opacityPersonal = useTransform(scrollYProgress, [0.35, 0.55], [0.2, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#F7F5F0] border-t border-[#E2DDD5]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-between pb-10 sm:pb-14 border-b border-[#E2DDD5]">
          <span className="section-label">THE PROBLEM</span>
          <span className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
            02 / REALITY
          </span>
        </div>

        {/* Dynamic Typographic Centerpiece */}
        <div className="pt-20 sm:pt-28 pb-16 sm:pb-24 max-w-5xl">
          <p className="text-xs sm:text-sm font-sans font-medium tracking-[0.24em] text-[#9E7B5C] uppercase mb-6">
            MASS PRODUCTION DISREGARDS INDIVIDUALITY
          </p>

          <h2 className="font-serif headline-fluid text-[#0A0A0A] font-normal leading-[0.98] tracking-[-0.02em] mb-12">
            <span>SIZES AREN&apos;T </span>
            <span className="inline-block relative min-w-[280px] sm:min-w-[440px] align-baseline">
              {/* STANDARD word state */}
              <motion.span
                style={{ opacity: opacityStandard }}
                className={`transition-all duration-700 ${
                  isPersonal ? "line-through text-[#85837D]" : "text-[#0A0A0A]"
                }`}
              >
                STANDARD
              </motion.span>
              
              {/* Arrow transition */}
              <span className="text-sm sm:text-xl font-sans tracking-widest text-[#9E7B5C] mx-3 align-middle font-normal not-italic">
                →
              </span>

              {/* PERSONAL word state */}
              <motion.span
                style={{ opacity: opacityPersonal }}
                className={`font-serif italic transition-all duration-700 ${
                  isPersonal ? "text-[#0A0A0A] underline underline-offset-8 decoration-1 decoration-[#9E7B5C]" : "text-[#85837D]"
                }`}
              >
                PERSONAL.
              </motion.span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-10 border-t border-[#E2DDD5]">
            <div className="md:col-span-6">
              <p className="body-lead text-[#242424]">
                Ready-to-wear sizing assumes identical proportions across waist, thigh, rise, and inseam. In reality, no two human frames share the same anatomical balance.
              </p>
            </div>
            <div className="md:col-span-6">
              <p className="text-base sm:text-lg text-[#85837D] leading-relaxed">
                By abandoning warehouse inventory in favor of autonomous bespoke production, SURFER delivers pants engineered specifically to drape naturally around your posture.
              </p>
            </div>
          </div>
        </div>

        {/* Proportions Breakdown Table */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-[#E2DDD5]">
          <div className="p-8 bg-[#FCFAF6] border border-[#E2DDD5] luxury-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#9E7B5C] block">01 / RISE</span>
              <ShieldAlert size={16} className="text-[#85837D]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0A0A0A] mb-3">Anatomical Crotch Depth</h3>
            <p className="text-sm text-[#85837D] leading-relaxed">
              Standard brands lock rise to waist circumference, causing pulling or excessive sagging when seated.
            </p>
          </div>

          <div className="p-8 bg-[#FCFAF6] border border-[#E2DDD5] luxury-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#9E7B5C] block">02 / THIGH</span>
              <ShieldAlert size={16} className="text-[#85837D]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0A0A0A] mb-3">True Thigh Volume</h3>
            <p className="text-sm text-[#85837D] leading-relaxed">
              Athletic and slender legs require distinct taper curves to prevent fabric tension and distortion.
            </p>
          </div>

          <div className="p-8 bg-[#FCFAF6] border border-[#E2DDD5] luxury-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#9E7B5C] block">03 / INSEAM</span>
              <CheckCircle2 size={16} className="text-[#9E7B5C]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0A0A0A] mb-3">Exact Ankle Break</h3>
            <p className="text-sm text-[#85837D] leading-relaxed">
              Cut to your millimeter preference, whether clean full break, slight break, or no break over your footwear.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
