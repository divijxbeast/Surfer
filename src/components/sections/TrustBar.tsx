"use client";

import React from "react";
import { Truck, RotateCcw, Award, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "EXPRESS ATELIER DELIVERY",
    desc: "Direct from bench to doorstep worldwide",
  },
  {
    icon: RotateCcw,
    title: "PERFECT FIT GUARANTEE",
    desc: "Complimentary alterations & remakes included",
  },
  {
    icon: Award,
    title: "100% NATURAL FIBERS",
    desc: "Milled in Biella, Italy & Okayama, Japan",
  },
  {
    icon: ShieldCheck,
    title: "SECURE BESPOKE CHECKOUT",
    desc: "Encrypted payments & private CAD profile",
  },
];

export function TrustBar() {
  return (
    <section className="w-full bg-[#ECEAE5] py-8 sm:py-14 px-4 sm:px-12 md:px-16 border-b border-[#D8D4CC]">
      <div className="max-w-[1520px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-10">
        {TRUST_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 p-3 sm:p-0 bg-[#F7F5F0]/60 sm:bg-transparent border sm:border-0 border-[#D8D4CC]/60"
            >
              <div className="p-2.5 sm:p-3 bg-[#FCFAF6] border border-[#D8D4CC] text-[#0A0A0A] flex-shrink-0 shadow-2xs">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <div className="flex flex-col">
                <h4 className="font-sans font-bold text-[11px] sm:text-xs tracking-wider text-[#0A0A0A] uppercase leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#666666] font-sans mt-0.5 leading-snug">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
