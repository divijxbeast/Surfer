"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { COLLECTION_ITEMS } from "@/data/content";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { Sparkles, Eye } from "lucide-react";

export function CollectionPreview() {
  const [selectedSwatches, setSelectedSwatches] = useState<Record<string, number>>({});

  const handleSwatchSelect = (itemId: string, swatchIndex: number) => {
    setSelectedSwatches((prev) => ({
      ...prev,
      [itemId]: swatchIndex,
    }));
  };

  return (
    <section
      id="collection"
      className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#FCFAF6] border-t border-[#E2DDD5]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-10 sm:pb-14 border-b border-[#E2DDD5]">
          <span className="section-label">THE ARCHIVE</span>
          <span className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
            05 / EDITIONS
          </span>
        </div>

        {/* Section Headline */}
        <div className="pt-16 sm:pt-24 pb-16 sm:pb-24 max-w-4xl">
          <h2 className="font-serif headline-fluid text-[#0A0A0A] font-normal leading-[0.98] tracking-[-0.02em] mb-8">
            The Collection.
          </h2>
          <p className="body-lead text-[#242424]">
            A considered collection of pants, designed to be made your way. Curated textiles and architectural cuts engineered for made-to-measure production.
          </p>
        </div>

        {/* Editorial Collection Grid (3 Columns with generous gap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
          {COLLECTION_ITEMS.map((item, idx) => {
            const activeSwatchIdx = selectedSwatches[item.id] ?? 0;
            const activeSwatch = item.swatches[activeSwatchIdx];

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-[#FCFAF6] border border-[#E2DDD5] transition-all duration-500 hover:border-[#0A0A0A] shadow-md hover:shadow-2xl"
                data-cursor="view"
              >
                {/* Image Container with Zoom & Badge */}
                <div className="relative overflow-hidden aspect-[4/5] bg-[#EDE8DE]">
                  <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                    <PlaceholderImage
                      src={item.image}
                      dimensions="1000×1250"
                      aspectRatio="4/5"
                      label={item.name.toUpperCase()}
                      caption={item.fabric}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3.5 py-1.5 bg-[#0A0A0A] text-[#F7F5F0] text-[10px] font-mono tracking-[0.2em] uppercase border border-white/15 select-none shadow-md">
                      COMING SOON
                    </span>
                  </div>

                  {/* Item Number Top-Left */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-[#FCFAF6]/90 backdrop-blur-xs text-[#0A0A0A] text-[10px] font-mono tracking-widest border border-[#E2DDD5]">
                      Nº {item.id}
                    </span>
                  </div>

                  {/* View Details Hover Pill */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <span className="px-5 py-2.5 bg-[#0A0A0A]/90 text-[#F7F5F0] text-xs font-sans font-medium tracking-[0.2em] uppercase backdrop-blur-sm border border-white/20 flex items-center gap-2 shadow-xl">
                      <Eye size={14} className="text-[#C9BFA8]" />
                      <span>VIEW TAILORING SPEC</span>
                    </span>
                  </div>
                </div>

                {/* Card Meta & Typography */}
                <div className="p-8 sm:p-9 flex flex-col justify-between flex-grow border-t border-[#E2DDD5]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-sans font-semibold tracking-[0.22em] text-[#9E7B5C] uppercase">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#85837D] uppercase">
                        {item.priceEst}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl text-[#0A0A0A] font-normal mb-3 group-hover:text-[#9E7B5C] transition-colors duration-300">
                      {item.name}
                    </h3>

                    <p className="text-sm text-[#242424] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Fabric Swatches Color Picker */}
                  <div className="pt-6 border-t border-[#E2DDD5]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-[#85837D] uppercase tracking-wider">
                        CLOTH: {activeSwatch.name}
                      </span>
                      <span className="text-[10px] font-sans text-[#9E7B5C]">
                        {activeSwatch.origin}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {item.swatches.map((swatch, sIdx) => {
                        const isSelected = activeSwatchIdx === sIdx;
                        return (
                          <button
                            key={swatch.name}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSwatchSelect(item.id, sIdx);
                            }}
                            title={`${swatch.name} (${swatch.origin})`}
                            className={`w-6 h-6 border transition-transform duration-200 cursor-pointer ${
                              isSelected
                                ? "ring-2 ring-[#0A0A0A] ring-offset-2 scale-110 border-[#0A0A0A]"
                                : "border-black/20 hover:scale-105"
                            }`}
                            style={{ backgroundColor: swatch.colorHex }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Custom Commission Banner */}
        <div className="mt-20 p-10 bg-[#F7F5F0] border border-[#E2DDD5] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FCFAF6] border border-[#E2DDD5] text-[#9E7B5C]">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-serif text-3xl text-[#0A0A0A] font-normal mb-1">
                Looking for a private textile commission?
              </h4>
              <p className="text-sm text-[#85837D] font-sans tracking-wide">
                We source deadstock vintage cashmere and exclusive Italian weavers for private commissions.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#0A0A0A] border border-[#0A0A0A] px-6 py-3.5 bg-transparent select-none uppercase tracking-widest font-medium">
            FALL / WINTER 2026 ARCHIVE
          </span>
        </div>
      </div>
    </section>
  );
}
