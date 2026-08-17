"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";
import { Sparkles } from "lucide-react";

export function FinalCTA() {
  const { scrollTo } = useSmoothScroll();

  const handleScrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      scrollTo(el as HTMLElement);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#F7F5F0] border-t border-[#E2DDD5]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-between pb-10 sm:pb-14 border-b border-[#E2DDD5]">
          <span className="section-label">THE INVITATION</span>
          <span className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
            09 / COMMENCE
          </span>
        </div>

        {/* Center Content Card */}
        <div className="pt-20 sm:pt-28 pb-12 sm:pb-16 max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FCFAF6] border border-[#E2DDD5] text-xs font-sans font-semibold tracking-[0.26em] text-[#9E7B5C] uppercase mb-8 shadow-sm"
          >
            <Sparkles size={14} className="text-[#9E7B5C]" />
            <span>EXPERIENCE BESPOKE TAILORING</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.98] tracking-[-0.02em] text-[#0A0A0A] mb-10"
          >
            Ready for a better fit?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="body-lead text-[#242424] max-w-xl mb-14 text-center"
          >
            Explore the collection and discover trousers designed around your measurements, your preferred cut, and your personal way of living.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("#collection")}
              data-cursor="explore"
              className="w-full sm:w-auto px-10 py-5 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-sans font-medium tracking-[0.24em] uppercase transition-all duration-300 hover:bg-[#242424] border border-[#0A0A0A] cursor-pointer flex items-center justify-center gap-3 group shadow-xl"
            >
              <span>EXPLORE SURFER</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-[#C9BFA8]">→</span>
            </button>

            <button
              onClick={() => handleScrollTo("#about")}
              className="w-full sm:w-auto px-10 py-5 bg-[#FCFAF6] text-[#0A0A0A] text-xs font-sans font-medium tracking-[0.24em] uppercase transition-all duration-300 hover:bg-[#0A0A0A] hover:text-[#F7F5F0] border border-[#E2DDD5] cursor-pointer shadow-sm"
            >
              OUR PHILOSOPHY
            </button>
          </motion.div>

          <p className="mt-14 text-xs font-mono text-[#85837D] tracking-widest uppercase">
            INDIVIDUALLY CRAFTED · COMPLIMENTARY FITTING ASSISTANCE
          </p>
        </div>
      </div>
    </section>
  );
}
