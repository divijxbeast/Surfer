"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowRight, PlusCircle, Sparkles, Filter, RefreshCw } from "lucide-react";
import { useProducts, Product } from "@/context/ProductContext";

const CATEGORIES = [
  { label: "ALL PIECES", value: "all" },
  { label: "TAILORED TROUSERS", value: "tailored" },
  { label: "RELAXED & FLUID", value: "relaxed" },
  { label: "COMPACT CHINOS", value: "chino" },
  { label: "WIDE LEG", value: "wide" },
];

export default function ProductsPage() {
  const { products, seedSampleProducts, isLoaded } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "name">("newest");
  const [activeSwatchIndex, setActiveSwatchIndex] = useState<{ [productId: string]: number }>({});

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category / silhouette
    if (selectedCategory !== "all") {
      list = list.filter((p) => {
        const cat = (p.category || "").toLowerCase();
        const sil = (p.silhouette || "").toLowerCase();
        const query = selectedCategory.toLowerCase();
        return cat.includes(query) || sil.includes(query);
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.millOrigin.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "price-asc" || sortBy === "price-desc") {
        const numA = parseInt(a.price.replace(/[^0-9]/g, "") || "0", 10);
        const numB = parseInt(b.price.replace(/[^0-9]/g, "") || "0", 10);
        return sortBy === "price-asc" ? numA - numB : numB - numA;
      }
      // default newest
      return b.createdAt - a.createdAt;
    });

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen w-full bg-[#ECEAE5] text-[#0A0A0A] pt-8 sm:pt-14 pb-24 sm:pb-36 px-4 sm:px-10 md:px-16">
      <div className="max-w-[1520px] mx-auto space-y-10 sm:space-y-14">
        
        {/* Top Header Banner */}
        <div className="space-y-4 border-b border-[#D8D4CC] pb-8 sm:pb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#9E7B5C] uppercase block mb-2">
                AUTONOMOUS ATELIER · 2026 ARCHIVE
              </span>
              <h1 className="font-anton text-4xl sm:text-6xl md:text-8xl tracking-tight text-[#0A0A0A] uppercase leading-[0.9]">
                COLLECTION ARCHIVE
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#222222] transition-colors shadow-sm"
              >
                <PlusCircle size={14} className="text-[#D4AF37]" />
                <span>ADMIN PORTAL</span>
              </Link>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#555555] font-sans max-w-2xl leading-relaxed">
            Every trouser in the SURFER archive is constructed individually to client biometric parameters.
            Browse our core silhouettes or launch the admin portal to publish new bespoke commissions.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 sm:p-4 bg-[#FCFAF6] border border-[#D8D4CC]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-2 text-[11px] font-mono font-bold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                    active
                      ? "bg-[#0A0A0A] text-[#F7F5F0]"
                      : "bg-transparent text-[#555555] hover:text-[#0A0A0A] hover:bg-[#ECEAE5]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#85837D]" />
              <input
                type="text"
                placeholder="SEARCH ARCHIVE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#ECEAE5] border border-[#D8D4CC] text-[#0A0A0A] placeholder-[#85837D] text-xs font-mono py-2 pl-9 pr-3 uppercase focus:outline-none focus:border-[#0A0A0A]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#85837D] uppercase hidden sm:inline-block">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#ECEAE5] border border-[#D8D4CC] text-[#0A0A0A] text-xs font-mono py-2 px-3 uppercase focus:outline-none focus:border-[#0A0A0A] cursor-pointer"
              >
                <option value="newest">NEWEST FIRST</option>
                <option value="name">NAME (A–Z)</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-[#85837D] px-1">
          <span>{filteredProducts.length} {filteredProducts.length === 1 ? "GARMENT" : "GARMENTS"} AVAILABLE</span>
          {products.length > 0 && (
            <span className="uppercase text-[#9E7B5C] font-semibold">ALL BESPOKE ORDERS INDIVIDUALLY CRAFTED</span>
          )}
        </div>

        {/* PRODUCT GRID OR EMPTY STATE */}
        {!isLoaded ? (
          <div className="py-24 text-center">
            <span className="text-xs font-mono uppercase text-[#85837D] animate-pulse">
              LOADING ATELIER ARCHIVE...
            </span>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Elegant Empty State */
          <div className="py-16 sm:py-24 px-6 bg-[#FCFAF6] border border-[#D8D4CC] text-center space-y-6 max-w-3xl mx-auto">
            <div className="w-14 h-14 bg-[#0A0A0A] text-[#F7F5F0] flex items-center justify-center mx-auto shadow-md">
              <SlidersHorizontal size={22} className="text-[#D4AF37]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#9E7B5C] uppercase block">
                ATELIER ARCHIVE STATUS
              </span>
              <h2 className="font-anton text-2xl sm:text-4xl text-[#0A0A0A] uppercase tracking-tight">
                {products.length === 0 ? "NO GARMENTS IN ROTATION YET" : "NO MATCHING PIECES FOUND"}
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] font-sans max-w-md mx-auto leading-relaxed">
                {products.length === 0
                  ? "The digital archive is currently awaiting new garment additions. Use the Admin Portal to publish pieces or load sample items to preview."
                  : "No garments match your current search and filter settings. Try adjusting your filter or search query."}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/admin"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#222222] transition-colors"
              >
                OPEN ADMIN PORTAL
              </Link>
              {products.length === 0 && (
                <button
                  onClick={seedSampleProducts}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#ECEAE5] border border-[#0A0A0A] text-[#0A0A0A] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#0A0A0A] hover:text-[#F7F5F0] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} className="text-[#9E7B5C]" />
                  <span>LOAD SAMPLE ITEMS (DEMO)</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const activeSwatch = activeSwatchIndex[product.id] || 0;
              const swatch = product.swatches?.[activeSwatch];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#FCFAF6] border border-[#D8D4CC] flex flex-col justify-between hover:border-[#0A0A0A] transition-colors duration-300"
                >
                  <div>
                    {/* Image Stage */}
                    <div className="relative aspect-[4/5] w-full bg-[#E5E2DA] overflow-hidden">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#85837D]">
                          <span className="font-anton text-2xl uppercase tracking-wider text-[#0A0A0A]/40 mb-1">
                            SURFER
                          </span>
                          <span className="text-[10px] font-mono uppercase">IMAGE COMING SOON</span>
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 bg-[#0A0A0A] text-[#F7F5F0] text-[9px] font-mono font-bold tracking-widest uppercase">
                          {product.category || "BESPOKE"}
                        </span>
                        {product.millOrigin && (
                          <span className="px-2.5 py-1 bg-[#FCFAF6]/90 backdrop-blur-xs text-[#0A0A0A] border border-[#D8D4CC] text-[9px] font-mono font-bold tracking-widest uppercase">
                            {product.millOrigin}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Title & Price */}
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-anton text-xl sm:text-2xl text-[#0A0A0A] uppercase tracking-tight leading-tight group-hover:text-[#9E7B5C] transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-sm font-mono font-bold text-[#0A0A0A] shrink-0">
                          {product.price}
                        </span>
                      </div>

                      {/* Fabric and Description */}
                      <p className="text-xs text-[#555555] font-sans line-clamp-2 leading-relaxed">
                        {product.description || product.fabric}
                      </p>

                      {/* Fabric Swatches */}
                      {product.swatches && product.swatches.length > 0 && (
                        <div className="pt-2 border-t border-[#EAE6DF] flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {product.swatches.map((s, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveSwatchIndex((prev) => ({ ...prev, [product.id]: idx }));
                                }}
                                title={s.name}
                                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                                  activeSwatch === idx
                                    ? "border-[#0A0A0A] scale-125 ring-1 ring-[#0A0A0A]"
                                    : "border-black/20 hover:scale-110"
                                }`}
                                style={{ backgroundColor: s.colorHex }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-[#85837D] uppercase">
                            {swatch?.name || `${product.swatches.length} SHADES`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="p-5 sm:p-6 pt-0">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full py-3 px-4 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-between hover:bg-[#222222] transition-colors"
                    >
                      <span>VIEW BESPOKE SPECS</span>
                      <ArrowRight size={14} className="text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
