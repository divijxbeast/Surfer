"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Shield, Ruler, Sparkles, ChevronRight, Edit3 } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { getProductBySlug, isLoaded } = useProducts();

  const product = getProductBySlug(slug);
  const [selectedSwatch, setSelectedSwatch] = useState<number>(0);
  const [selectedInseam, setSelectedInseam] = useState<string>("Bespoke (CAD)");

  if (!isLoaded) {
    return (
      <main className="min-h-screen w-full bg-[#ECEAE5] flex items-center justify-center">
        <span className="text-xs font-mono uppercase text-[#85837D] animate-pulse">
          LOADING GARMENT SPECIFICATIONS...
        </span>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen w-full bg-[#ECEAE5] text-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4 bg-[#FCFAF6] border border-[#D8D4CC] p-8">
          <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#9E7B5C] uppercase block">
            ATELIER ARCHIVE
          </span>
          <h1 className="font-anton text-3xl uppercase">GARMENT NOT FOUND</h1>
          <p className="text-xs text-[#555555]">
            This piece may have been removed or the bespoke commission window has concluded.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/products"
              className="py-3 px-6 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#222222]"
            >
              RETURN TO ARCHIVE
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentSwatch = product.swatches?.[selectedSwatch];

  return (
    <main className="min-h-screen w-full bg-[#ECEAE5] text-[#0A0A0A] pt-6 sm:pt-10 pb-24 sm:pb-36 px-4 sm:px-10 md:px-16">
      <div className="max-w-[1520px] mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#555555] hover:text-[#0A0A0A] uppercase transition-colors"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO ARCHIVE</span>
          </Link>
        </div>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* Left Column: Garment Image Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] w-full bg-[#E5E2DA] border border-[#D8D4CC] overflow-hidden">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#85837D]">
                  <span className="font-anton text-4xl uppercase tracking-wider text-[#0A0A0A]/40 mb-2">
                    SURFER
                  </span>
                  <span className="text-xs font-mono uppercase">IMAGE PLACEHOLDER</span>
                </div>
              )}

              {/* Watermark badge */}
              <div className="absolute bottom-4 left-4 pointer-events-none">
                <span className="px-3 py-1 bg-[#0A0A0A]/85 backdrop-blur-xs text-[#F7F5F0] text-[10px] font-mono tracking-widest uppercase">
                  ATELIER COMMISSION · {product.category || "BESPOKE"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Garment Details & Specifications */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Category & Status */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#0A0A0A] text-[#F7F5F0] text-[10px] font-mono font-bold tracking-widest uppercase">
                  {product.category || "BESPOKE"}
                </span>
                {product.millOrigin && (
                  <span className="text-xs font-mono text-[#85837D] uppercase">
                    MILL: {product.millOrigin}
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div className="space-y-2 border-b border-[#D8D4CC] pb-6">
                <h1 className="font-anton text-3xl sm:text-5xl uppercase text-[#0A0A0A] leading-none tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-[#0A0A0A]">
                    {product.price}
                  </span>
                  <span className="text-xs font-mono text-[#85837D] uppercase">
                    / SINGLE-UNIT COMMISSION
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#9E7B5C] uppercase block">
                  CRAFTSMANSHIP SUMMARY
                </span>
                <p className="text-xs sm:text-sm text-[#555555] font-sans leading-relaxed">
                  {product.description || "Individually drafted single-unit cut with hand-finished interior seams and millimeter calibration."}
                </p>
              </div>

              {/* Fabric Specs */}
              {product.fabric && (
                <div className="p-4 bg-[#FCFAF6] border border-[#D8D4CC] space-y-1">
                  <span className="text-[10px] font-mono text-[#85837D] uppercase block">TEXTILE SPECIFICATION</span>
                  <span className="font-sans font-semibold text-xs text-[#0A0A0A] block">
                    {product.fabric}
                  </span>
                  {product.millOrigin && (
                    <span className="text-[11px] font-mono text-[#9E7B5C] block">
                      Origin: {product.millOrigin}
                    </span>
                  )}
                </div>
              )}

              {/* Color Swatches Selection */}
              {product.swatches && product.swatches.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#9E7B5C] uppercase">
                      SELECT FABRIC SHADE
                    </span>
                    <span className="text-xs font-mono text-[#0A0A0A] uppercase font-bold">
                      {currentSwatch?.name || ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {product.swatches.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSwatch(idx)}
                        className={`flex items-center gap-2 p-2 border transition-all cursor-pointer ${
                          selectedSwatch === idx
                            ? "border-[#0A0A0A] bg-[#FCFAF6] shadow-xs"
                            : "border-[#D8D4CC] hover:border-[#85837D]"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/20"
                          style={{ backgroundColor: s.colorHex }}
                        />
                        <span className="text-[11px] font-mono text-[#0A0A0A] pr-1 uppercase">
                          {s.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Construction Details Checklist */}
              {product.details && product.details.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#9E7B5C] uppercase block">
                    BENCHMARK DETAILS
                  </span>
                  <div className="space-y-1.5">
                    {product.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-sans text-[#555555]">
                        <Check size={13} className="text-[#9E7B5C] shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-6 border-t border-[#D8D4CC]">
              <Link
                href="/measurements"
                className="w-full py-4 px-6 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-between hover:bg-[#222222] transition-colors shadow-md group"
              >
                <span>INPUT MEASUREMENTS & COMMISSION</span>
                <ChevronRight size={16} className="text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#85837D] uppercase">
                <span className="flex items-center gap-1">
                  <Shield size={12} className="text-[#9E7B5C]" />
                  PERFECT FIT GUARANTEE
                </span>
                <span>·</span>
                <span>FREE BESPOKE ALTERATIONS</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
