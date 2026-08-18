"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

const CATEGORIES = [
  {
    id: "formal",
    title: "TAILORED TROUSERS",
    desc: "Double pleats & Italian Super 120s wool.",
    linkText: "SHOP TROUSERS",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
    href: "#collection",
  },
  {
    id: "relaxed",
    title: "RELAXED & FLUID",
    desc: "Single pleat ease with architectural drape.",
    linkText: "SHOP RELAXED",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    href: "#collection",
  },
  {
    id: "chinos",
    title: "COMPACT CHINOS",
    desc: "High-density Japanese twill benchwork.",
    linkText: "SHOP CHINOS",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop",
    href: "#collection",
  },
];

export function CategoryStrip() {
  const { scrollTo } = useSmoothScroll();

  const handleCategoryClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      scrollTo(el as HTMLElement, { offset: -40 });
    }
  };

  return (
    <section className="w-full bg-[#0A0A0A] text-[#F7F5F0] py-8 sm:py-10 px-6 sm:px-12 md:px-16 border-y border-white/10">
      <div className="max-w-[1520px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center gap-5 cursor-pointer group ${
              idx > 0 ? "pt-6 md:pt-0 md:pl-8 lg:pl-12" : ""
            }`}
            onClick={() => handleCategoryClick(cat.href)}
          >
            {/* Category Thumbnail */}
            <div className="relative w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 overflow-hidden bg-[#1A1A1A] border border-white/10">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>

            {/* Category Text & Action */}
            <div className="flex flex-col justify-center">
              <h3 className="font-sans font-bold text-base sm:text-lg tracking-wider text-[#FCFAF6] uppercase group-hover:text-[#D4AF37] transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-[#8A8A86] font-sans mt-1 leading-relaxed max-w-[24ch]">
                {cat.desc}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono font-semibold tracking-widest text-[#F7F5F0] group-hover:text-[#D4AF37] mt-3 uppercase">
                <span>{cat.linkText}</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
