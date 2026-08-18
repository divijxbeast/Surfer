"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { COLLECTION_ITEMS } from "@/data/content";

export function WishlistTab() {
  const wishlistItems = COLLECTION_ITEMS.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8D4CC]">
        <div>
          <h3 className="font-anton text-2xl sm:text-3xl text-[#0A0A0A] uppercase tracking-wide">
            SAVED SILHOUETTES ({wishlistItems.length})
          </h3>
          <p className="text-xs text-[#666666] font-sans mt-0.5">
            Garments saved to your client archive, ready to be tailored to your biometric CAD profile.
          </p>
        </div>

        <Link
          href="/#collection"
          className="text-xs font-mono font-bold tracking-widest text-[#0A0A0A] hover:text-[#9E7B5C] uppercase flex items-center gap-1.5"
        >
          <span>EXPLORE NEW SILHOUETTES</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#FCFAF6] border border-[#D8D4CC] p-5 flex flex-col justify-between group hover:border-[#0A0A0A] transition-all shadow-sm"
          >
            <div>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE7DF] border border-[#D8D4CC] mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  className="absolute top-2.5 right-2.5 p-2 bg-white/85 hover:bg-white text-[#0A0A0A] rounded-full shadow-xs cursor-pointer"
                  title="Remove from archive"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <span className="text-[9px] font-mono tracking-widest text-[#9E7B5C] uppercase font-bold block mb-1">
                {item.category}
              </span>
              <h4 className="font-sans font-bold text-base text-[#0A0A0A] uppercase tracking-tight">
                {item.name}
              </h4>
              <p className="text-xs text-[#666666] font-sans mt-1">
                {item.fabric}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E0D6] flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#0A0A0A]">
                {item.priceEst}
              </span>
              <Link
                href="/cart"
                className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#242424] text-[#F7F5F0] text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-1.5 shadow-sm"
              >
                <ShoppingBag size={12} />
                <span>ORDER CUT</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
