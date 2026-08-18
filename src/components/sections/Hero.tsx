"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Track scroll progress within the dedicated 240vh hero runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for fluid scrubbing without jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  // 1. Horizontal walk from 'S' (left) across 'U-R-F-E' to 'R' (right)
  // Map from approx -34vw to +34vw
  const modelX = useTransform(smoothProgress, [0, 1], ["-34vw", "34vw"]);

  // 2. Realistic Walking Kinematics:
  // 5 full walking stride cycles (10 half-steps) across the journey from S to R
  // Vertical step bounce: drops on footstrike, rises during passing phase
  const walkBobY = useTransform(smoothProgress, (p) => {
    // 5 full cycles = 10 * PI
    const phase = p * 10 * Math.PI;
    return -Math.abs(Math.sin(phase)) * 14; // Bobs up and down by 14px
  });

  // Natural pelvic & shoulder tilt sway (±2.2 degrees per footstep)
  const walkSwayRotate = useTransform(smoothProgress, (p) => {
    const phase = p * 10 * Math.PI;
    return Math.sin(phase) * 2.2;
  });

  // Subtle forward coat drag & stride flex (dynamic scale)
  const walkFlexScaleY = useTransform(smoothProgress, (p) => {
    const phase = p * 10 * Math.PI;
    return 1 + Math.sin(phase) * 0.015;
  });

  // Subtle forward lean as forward velocity builds
  const forwardLeanRotate = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1.2, 0.5]);

  // Combined rotation: sway + forward lean
  const combinedRotate = useTransform(
    [walkSwayRotate, forwardLeanRotate],
    ([sway, lean]: number[]) => sway + lean
  );

  // Dynamic Contact Ground Shadow: expands on foot contact, contracts when foot is in air
  const shadowScaleX = useTransform(smoothProgress, (p) => {
    const phase = p * 10 * Math.PI;
    return 1 + Math.cos(phase) * 0.18;
  });

  const shadowOpacity = useTransform(smoothProgress, (p) => {
    const phase = p * 10 * Math.PI;
    return 0.38 + Math.abs(Math.cos(phase)) * 0.22;
  });

  // Interactive letter highlight: subtle brightness reaction as the model passes each letter
  const glowX = useTransform(smoothProgress, [0, 1], ["20%", "80%"]);

  const handleScrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      scrollTo(el as HTMLElement, { offset: -40 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[240vh] sm:h-[260vh] bg-gradient-to-b from-[#ECEAE5] via-[#ECEAE5] to-[#E4E1D9]"
    >
      {/* Sticky Fullscreen Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-between pt-4 sm:pt-8 pb-6 sm:pb-10 px-4 sm:px-10 md:px-16 overflow-hidden select-none">
        {/* Ambient Atmospheric Studio Glow Tint (Follows model subtly) */}
        <motion.div
          style={{ left: glowX }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[400px] bg-white/45 blur-[80px] sm:blur-[110px] rounded-full pointer-events-none z-0"
        />

        {/* 1. Top Section Metadata Labels */}
        <div className="max-w-[1520px] w-full mx-auto flex items-start justify-between z-20 relative pointer-events-auto">
          {/* Top-Left Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight">
              FASHION
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight mt-0.5">
              THAT MOVES
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase leading-tight">
                WITH YOU.
              </span>
              <div className="w-5 sm:w-8 h-[1.5px] bg-[#0A0A0A]" />
            </div>
          </motion.div>

          {/* Top-Right Collection Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end text-right"
          >
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase">
              NEW
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase mt-0.5">
              COLLECTION
            </span>
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 mt-0.5">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase">
                2026
              </span>
              <div className="w-5 sm:w-8 h-[1.5px] bg-[#0A0A0A]" />
            </div>
          </motion.div>
        </div>

        {/* 2. Monumental Stage: Giant 'SURFER' in Anton Font + Animated Walking Model + Dynamic Reflection */}
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-center my-auto py-2 sm:py-6">
          {/* Giant Anton Font Wordmark Behind Model */}
          <h1 className="font-anton text-[28vw] sm:text-[25vw] leading-[0.74] tracking-[0.02em] text-[#0A0A0A] uppercase select-none text-center w-full z-0 block pointer-events-none">
            SURFER
          </h1>

          {/* Scroll-Driven Animated Walking Model Trajectory */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div
              style={{
                x: modelX,
                y: walkBobY,
                rotate: combinedRotate,
                scaleY: walkFlexScaleY,
              }}
              className="relative w-[280px] sm:w-[440px] md:w-[540px] lg:w-[640px] h-[55vh] sm:h-[70vh] lg:h-[78vh] max-h-[660px] flex items-center justify-center will-change-transform"
            >
              {/* Dynamic Contact Ground Shadow that Pulses with Footsteps */}
              <motion.div
                style={{
                  scaleX: shadowScaleX,
                  opacity: shadowOpacity,
                }}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[75%] h-6 sm:h-8 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.12)_50%,transparent_75%)] blur-[2px] sm:blur-[3px] pointer-events-none z-10 will-change-transform"
              />

              {/* Dynamic Glossy Studio Floor Reflection in Full Sync */}
              <div
                className="absolute top-[98.5%] left-0 right-0 h-[40%] pointer-events-none overflow-hidden scale-y-[-1] opacity-22 blur-[1.2px] z-0"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)",
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/hero-model.png"
                    alt="Reflection"
                    fill
                    sizes="(max-width: 768px) 85vw, 640px"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Crystal-Clear Transparent Walking Model PNG Cutout (100% Quality Preserved) */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                <Image
                  src="/hero-model.png"
                  alt="SURFER Walking Model in Trench Coat, Cap, and Bespoke Relaxed Trousers"
                  fill
                  priority
                  sizes="(max-width: 768px) 85vw, 640px"
                  className="object-contain object-bottom drop-shadow-[0_14px_24px_rgba(0,0,0,0.22)] sm:drop-shadow-[0_20px_32px_rgba(0,0,0,0.25)]"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. Bottom Action Controls & Stride Scroll Guidance */}
        <div className="max-w-[1520px] w-full mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 z-20 relative pointer-events-auto pt-2 sm:pt-4">
          {/* Action Buttons */}
          <div className="flex items-center gap-4 sm:gap-7 w-full sm:w-auto justify-center sm:justify-start">
            <button
              onClick={() => handleScrollTo("#collection")}
              data-cursor="explore"
              className="flex-1 sm:flex-none px-7 sm:px-10 py-3 sm:py-3.5 bg-[#0A0A0A] hover:bg-[#262626] text-[#F7F5F0] text-[11px] sm:text-xs font-mono font-bold tracking-[0.24em] uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-95 text-center"
            >
              SHOP NOW
            </button>

            <button
              onClick={() => handleScrollTo("#collection")}
              className="flex-1 sm:flex-none text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#0A0A0A] hover:text-[#9E7B5C] uppercase transition-colors cursor-pointer relative py-2 border-b border-[#0A0A0A] text-center"
            >
              EXPLORE NEW IN
            </button>
          </div>

          {/* Stride Scroll Hint & Atelier Signature */}
          <div className="flex items-center gap-4 text-center sm:text-right">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#888888] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9E7B5C] animate-ping" />
              <span>SCROLL TO WALK · S TO R</span>
            </div>
            <div className="w-px h-3 bg-[#D8D4CC] hidden md:block" />
            <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase font-semibold">
              AUTONOMOUS BESPOKE ATELIER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
