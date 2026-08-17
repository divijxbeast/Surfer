"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CRAFTSMANSHIP_DETAILS } from "@/data/content";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";

export function Craftsmanship() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section
      id="craftsmanship"
      ref={containerRef}
      className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#F7F5F0] border-t border-[#E2DDD5] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-10 sm:pb-14 border-b border-[#E2DDD5]">
          <span className="section-label">MADE WITH INTENTION</span>
          <span className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
            06 / ATELIER BENCHWORK
          </span>
        </div>

        {/* Headline & Editorial Lead */}
        <div className="pt-16 sm:pt-24 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif headline-fluid text-[#0A0A0A] font-normal leading-[0.98] tracking-[-0.02em] mb-6">
              The details matter.
            </h2>
            <p className="body-lead text-[#242424]">
              True bespoke luxury lives in hidden architectural reinforcements: hand-set split waistbands, natural horn fastenings, and generous internal hem allowances.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <p className="text-xs font-mono text-[#9E7B5C] tracking-widest uppercase font-semibold">
              ZERO CUT CORNERS · REINFORCED STRESS POINTS
            </p>
          </div>
        </div>

        {/* 4 Detail Close-Up Grid with Real Imagery & Subtle Parallax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pt-6">
          {CRAFTSMANSHIP_DETAILS.map((detail, idx) => {
            const isOdd = idx % 2 !== 0;
            return (
              <motion.div
                key={detail.id}
                style={{ y: isOdd ? parallaxY1 : parallaxY2 }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col bg-[#FCFAF6] border border-[#E2DDD5] p-6 sm:p-7 shadow-md luxury-card"
              >
                <div className="overflow-hidden border border-[#E2DDD5] mb-8 relative aspect-square">
                  <PlaceholderImage
                    src={detail.image}
                    dimensions="800×800"
                    aspectRatio="1/1"
                    label={detail.title.toUpperCase()}
                    className="w-full h-full"
                  />
                </div>

                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono text-[#9E7B5C] font-semibold">
                        DETAIL {detail.number}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9E7B5C]" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#0A0A0A] font-normal mb-3">
                      {detail.title}
                    </h3>
                  </div>
                  <div className="pt-4 border-t border-[#E2DDD5]">
                    <p className="text-sm text-[#242424] leading-relaxed mb-2">
                      {detail.description}
                    </p>
                    <p className="text-xs font-mono text-[#85837D]">
                      {detail.specNote}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Atelier Text Manifesto */}
        <div className="mt-20 pt-16 border-t border-[#E2DDD5] grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-[#FCFAF6] border border-[#E2DDD5]">
            <h4 className="font-serif text-2xl text-[#0A0A0A] mb-3">Textile Provenance</h4>
            <p className="text-sm text-[#85837D] leading-relaxed">
              We partner exclusively with historic European and Japanese weaving houses committed to natural, long-staple fibers.
            </p>
          </div>
          <div className="p-6 bg-[#FCFAF6] border border-[#E2DDD5]">
            <h4 className="font-serif text-2xl text-[#0A0A0A] mb-3">Single-Unit Engineering</h4>
            <p className="text-sm text-[#85837D] leading-relaxed">
              Each garment has its own CNC CAD pattern cut individually rather than stacked in industrial multi-layer batches.
            </p>
          </div>
          <div className="p-6 bg-[#FCFAF6] border border-[#E2DDD5]">
            <h4 className="font-serif text-2xl text-[#0A0A0A] mb-3">Lifelong Alterability</h4>
            <p className="text-sm text-[#85837D] leading-relaxed">
              Engineered with full inlay seam allowances at the seat and hem, allowing future fine adjustments across decades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
