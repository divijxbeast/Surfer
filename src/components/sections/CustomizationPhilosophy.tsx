"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Leaf, Sparkles } from "lucide-react";

export function CustomizationPhilosophy() {
  return (
    <section className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#FCFAF6] border-t border-[#E2DDD5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-10 sm:pb-14 border-b border-[#E2DDD5]">
          <span className="section-label">THE PHILOSOPHY</span>
          <span className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
            07 / ATELIER CODE
          </span>
        </div>

        {/* Large Statement Centerpiece */}
        <div className="py-20 sm:py-28 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-sans font-medium tracking-[0.26em] text-[#9E7B5C] uppercase mb-8"
          >
            PRECISION OVER COMPROMISE
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif headline-fluid text-[#0A0A0A] font-normal leading-[0.96] tracking-[-0.02em] mb-12"
          >
            Not just your size.
            <br />
            <span className="italic text-[#0A0A0A]">Your fit.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-10 border-t border-[#E2DDD5]"
          >
            <div className="md:col-span-6">
              <p className="body-lead text-[#242424]">
                SURFER starts from your individual anatomical parameters — waist, hip circumference, front rise, and exact inseam — rather than grouping you into generic mass market sizes.
              </p>
            </div>
            <div className="md:col-span-6">
              <p className="text-base sm:text-lg text-[#85837D] leading-relaxed">
                The result is effortless comfort without pulling, bunching, or compromising on silhouette line. Pants crafted for how you live and move.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3 Pillars Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-[#E2DDD5]">
          <div className="p-8 bg-[#F7F5F0] border border-[#E2DDD5] luxury-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#9E7B5C] font-semibold">01 / DRAFTING</span>
              <Cpu size={18} className="text-[#9E7B5C]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0A0A0A] mb-3">Unique CAD Profile</h3>
            <p className="text-sm text-[#85837D] leading-relaxed">
              Every client receives a custom digital pattern archived for future reorders with one click.
            </p>
          </div>
          <div className="p-8 bg-[#F7F5F0] border border-[#E2DDD5] luxury-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#9E7B5C] font-semibold">02 / NATURAL CLOTH</span>
              <Leaf size={18} className="text-[#9E7B5C]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0A0A0A] mb-3">Breathable Drape</h3>
            <p className="text-sm text-[#85837D] leading-relaxed">
              Pure wools, cotton twills, and linens that recover naturally without heavy synthetic blends.
            </p>
          </div>
          <div className="p-8 bg-[#F7F5F0] border border-[#E2DDD5] luxury-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#9E7B5C] font-semibold">03 / ARCHITECTURE</span>
              <Sparkles size={18} className="text-[#9E7B5C]" />
            </div>
            <h3 className="font-serif text-2xl text-[#0A0A0A] mb-3">Modern Proportion</h3>
            <p className="text-sm text-[#85837D] leading-relaxed">
              Designed to outlast seasonal trend cycles with enduring, architectural lines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
