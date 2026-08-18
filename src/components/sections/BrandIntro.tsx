"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

export function BrandIntro() {
  return (
    <section
      id="atelier"
      className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#FCFAF6] border-t border-[#E2DDD5] scroll-mt-10"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Label Header */}
        <div className="flex items-center justify-between pb-10 sm:pb-14 border-b border-[#E2DDD5]">
          <span className="section-label">THE SURFER IDEA</span>
          <span className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
            01 / MANIFESTO
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 sm:gap-20 items-center pt-16 sm:pt-24">
          {/* Left: Headline & Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif headline-fluid-sub text-[#0A0A0A] font-normal leading-[1.02] tracking-[-0.015em] mb-10"
            >
              Why fit into standard when you can make it yours?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 text-[#242424]"
            >
              <p className="body-lead text-[#242424]">
                Conventional sizing forces diverse bodies into rigid numerical approximations. At SURFER, we inverse the paradigm. You choose the aesthetic, define your silhouette, and input your exact proportions.
              </p>
              <p className="text-base sm:text-lg text-[#85837D] leading-relaxed max-w-[55ch]">
                Every pair of trousers is patterned individually and crafted from exceptional natural textiles to honor your personal movement and anatomy.
              </p>
            </motion.div>

            {/* Spec Feature Grid with Warm Accents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 mt-12 border-t border-[#E2DDD5]"
            >
              <div className="p-6 bg-[#F7F5F0] border border-[#E2DDD5]">
                <span className="text-[11px] font-sans font-medium tracking-[0.2em] text-[#9E7B5C] uppercase block mb-2">
                  CUSTOMIZATION
                </span>
                <span className="font-serif text-2xl text-[#0A0A0A] block mb-1">
                  Millimeter Precision
                </span>
                <span className="text-xs text-[#85837D]">Every curve mapped to your body geometry.</span>
              </div>
              <div className="p-6 bg-[#F7F5F0] border border-[#E2DDD5]">
                <span className="text-[11px] font-sans font-medium tracking-[0.2em] text-[#9E7B5C] uppercase block mb-2">
                  MATERIALS
                </span>
                <span className="font-serif text-2xl text-[#0A0A0A] block mb-1">
                  Natural Fibers
                </span>
                <span className="text-xs text-[#85837D]">Italian high-twist wool & Japanese organic twill.</span>
              </div>
              <div className="p-6 bg-[#F7F5F0] border border-[#E2DDD5]">
                <span className="text-[11px] font-sans font-medium tracking-[0.2em] text-[#9E7B5C] uppercase block mb-2">
                  PRODUCTION
                </span>
                <span className="font-serif text-2xl text-[#0A0A0A] block mb-1">
                  Single-Piece Cut
                </span>
                <span className="text-xs text-[#85837D]">Zero warehouse waste, cut individually on order.</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Editorial Atelier Photography */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <PlaceholderImage
                filename="tailoring.jpg"
                dimensions="1200×1600"
                aspectRatio="3/4"
                label="THE BESPOKE ATELIER"
                caption="Individual pattern drafts and artisan benchwork"
                className="border border-[#E2DDD5] shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0A0A0A] text-[#F7F5F0] px-6 py-4 text-xs font-mono tracking-[0.2em] uppercase border border-white/10 shadow-2xl">
                INDIVIDUALLY PATTERNED
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
