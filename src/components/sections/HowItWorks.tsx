"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/data/content";
import { cn } from "@/lib/utils";
import { Compass, Ruler, Sparkles, Check } from "lucide-react";

const STEP_ICONS = [Compass, Ruler, Sparkles, Check];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#FCFAF6] border-t border-[#E2DDD5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-10 sm:pb-14 border-b border-[#E2DDD5]">
          <span className="section-label">THE PROCESS</span>
          <span className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest">
            03 / METHODOLOGY
          </span>
        </div>

        {/* Section Headline */}
        <div className="pt-16 sm:pt-24 pb-16 sm:pb-24 max-w-4xl">
          <h2 className="font-serif headline-fluid text-[#0A0A0A] font-normal leading-[0.98] tracking-[-0.02em] mb-8">
            Your fit. Your way.
          </h2>
          <p className="body-lead text-[#242424]">
            A frictionless, transparent bespoke journey from architectural cloth selection to individual single-piece cutting.
          </p>
        </div>

        {/* 4 Large Numbered Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isHovered = activeStep === idx;
            const Icon = STEP_ICONS[idx];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveStep(idx)}
                className={cn(
                  "relative p-8 sm:p-10 border transition-all duration-500 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] cursor-pointer",
                  isHovered
                    ? "bg-[#0A0A0A] text-[#F7F5F0] border-[#0A0A0A] shadow-2xl scale-[1.02]"
                    : "bg-[#F7F5F0] text-[#0A0A0A] border-[#E2DDD5] hover:border-[#9E7B5C]"
                )}
              >
                {/* Step Number & Icon Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className={isHovered ? "text-[#9E7B5C]" : "text-[#85837D]"} />
                    <span
                      className={cn(
                        "font-mono text-xs tracking-widest uppercase transition-colors duration-300",
                        isHovered ? "text-[#C9BFA8]" : "text-[#85837D]"
                      )}
                    >
                      STEP
                    </span>
                  </div>
                  <span
                    className={cn(
                      "font-serif text-3xl sm:text-4xl transition-colors duration-300 font-normal",
                      isHovered ? "text-[#F7F5F0]" : "text-[#0A0A0A]"
                    )}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step Title & Subtitle */}
                <div className="my-auto py-8">
                  <h3
                    className={cn(
                      "font-serif text-3xl sm:text-4xl tracking-tight mb-3 font-normal transition-colors duration-300",
                      isHovered ? "text-[#F7F5F0]" : "text-[#0A0A0A]"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs font-sans font-semibold tracking-[0.2em] uppercase transition-colors duration-300",
                      isHovered ? "text-[#9E7B5C]" : "text-[#9E7B5C]"
                    )}
                  >
                    {step.subtitle}
                  </p>
                </div>

                {/* Step Description & Detail */}
                <div
                  className={cn(
                    "pt-6 border-t transition-colors duration-300",
                    isHovered ? "border-white/15" : "border-[#E2DDD5]"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm leading-relaxed mb-2 transition-colors duration-300",
                      isHovered ? "text-neutral-200" : "text-[#242424]"
                    )}
                  >
                    {step.description}
                  </p>
                  <p
                    className={cn(
                      "text-xs leading-relaxed transition-colors duration-300",
                      isHovered ? "text-[#85837D]" : "text-[#85837D]"
                    )}
                  >
                    {step.detail}
                  </p>
                </div>

                {/* Active Indicator Accent Line */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-1.5 transition-all duration-300",
                    isHovered ? "bg-[#9E7B5C]" : "bg-transparent"
                  )}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
