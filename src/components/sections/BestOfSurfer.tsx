"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { COLLECTION_ITEMS } from "@/data/content";

export function BestOfSurfer() {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [selectedSwatches, setSelectedSwatches] = useState<Record<string, number>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectSwatch = (itemId: string, swatchIdx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSwatches((prev) => ({ ...prev, [itemId]: swatchIdx }));
  };

  // Featured 4 primary showcase items
  const showcaseItems = COLLECTION_ITEMS.slice(0, 4);

  return (
    <section id="collection" className="w-full bg-[#ECEAE5] py-20 sm:py-28 px-6 sm:px-12 md:px-16 border-b border-[#D8D4CC]">
      <div className="max-w-[1520px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 sm:pb-12 border-b border-[#D0CCC2] mb-10 sm:mb-14">
          <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-[#0A0A0A] uppercase tracking-tight">
            BEST OF SURFER
          </h2>
          <a
            href="#fit"
            className="text-xs font-mono font-bold tracking-[0.24em] text-[#0A0A0A] hover:text-[#9E7B5C] uppercase flex items-center gap-2 transition-colors"
          >
            <span>VIEW ALL SILHOUETTES</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* 4-Column Editorial Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {showcaseItems.map((item, idx) => {
            const isLiked = !!wishlist[item.id];
            const activeSwatchIdx = selectedSwatches[item.id] ?? 0;
            const activeSwatch = item.swatches[activeSwatchIdx];

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-[#F7F5F0] border border-[#D8D4CC] transition-all duration-300 hover:border-[#0A0A0A] hover:shadow-xl"
              >
                {/* Image Container with Wishlist Button */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#DDD9D0]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.03]"
                  />

                  {/* Wishlist Heart Toggle */}
                  <button
                    onClick={(e) => toggleWishlist(item.id, e)}
                    className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-[#0A0A0A] transition-transform active:scale-90 cursor-pointer shadow-sm"
                    title="Add to Wishlist"
                  >
                    <Heart
                      size={15}
                      className={isLiked ? "fill-red-600 text-red-600" : "text-[#0A0A0A]"}
                    />
                  </button>

                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="px-2.5 py-1 bg-[#0A0A0A] text-[#F7F5F0] text-[9px] font-mono tracking-widest uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-sans font-bold text-lg text-[#0A0A0A] uppercase tracking-tight group-hover:text-[#9E7B5C] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#666666] font-sans mt-1">
                      {item.fabric}
                    </p>
                  </div>

                  {/* Swatches & Price */}
                  <div className="mt-5 pt-4 border-t border-[#E5E0D6] flex items-center justify-between">
                    {/* Color Swatch Circles */}
                    <div className="flex items-center gap-1.5">
                      {item.swatches.map((swatch, sIdx) => {
                        const isSelected = activeSwatchIdx === sIdx;
                        return (
                          <button
                            key={swatch.name}
                            type="button"
                            onClick={(e) => selectSwatch(item.id, sIdx, e)}
                            title={swatch.name}
                            className={`w-4 h-4 rounded-full border transition-transform ${
                              isSelected
                                ? "ring-2 ring-[#0A0A0A] ring-offset-1 scale-110 border-[#0A0A0A]"
                                : "border-black/20 hover:scale-105"
                            }`}
                            style={{ backgroundColor: swatch.colorHex }}
                          />
                        );
                      })}
                    </div>

                    <span className="text-xs font-mono font-semibold text-[#0A0A0A] uppercase">
                      {item.priceEst}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
