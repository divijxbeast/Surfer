"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

const TOTAL_FRAMES = 48;

const OUTFIT_METADATA = [
  { range: [0, 0.35], label: "LOOK 01 · OVERSIZED TRENCH & RAW INDIGO DENIM" },
  { range: [0.35, 0.70], label: "LOOK 02 · BIELLA SUPER 120S CHARCOAL TAILORING" },
  { range: [0.70, 1.0], label: "LOOK 03 · OKAYAMA SANDSTONE BESPOKE TWILL" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reflectionCanvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollTo } = useSmoothScroll();
  const [activeLookLabel, setActiveLookLabel] = useState(OUTFIT_METADATA[0].label);

  // Dedicated scroll runway (260vh for smooth, cinematic scrubbing)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for responsive, deterministic scroll scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.1,
  });

  // Horizontal traversal: Starts at 'S' (left: -35vw) and arrives at 'R' (right: +35vw)
  const modelX = useTransform(smoothProgress, [0, 1], ["-35vw", "35vw"]);

  // Dynamic Contact Ground Shadow that reacts to physical footfall
  const shadowScaleX = useTransform(smoothProgress, (p) => {
    // 3 full double-stride cycles = 6 * PI
    const phase = p * 6 * Math.PI;
    return 1 + Math.cos(phase) * 0.16;
  });

  const shadowOpacity = useTransform(smoothProgress, (p) => {
    const phase = p * 6 * Math.PI;
    return 0.42 + Math.abs(Math.cos(phase)) * 0.22;
  });

  // Preloaded WebP Frames Cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = i.toString().padStart(3, "0");
      img.src = `/frames/walk_${numStr}.webp`;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          setIsPreloaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Frame Rendering Loop Synchronized to Scroll Position
  useEffect(() => {
    const renderFrame = () => {
      const p = Math.min(1.0, Math.max(0.0, smoothProgress.get()));
      
      // Update Active Look Label based on scroll position
      for (const look of OUTFIT_METADATA) {
        if (p >= look.range[0] && p <= look.range[1]) {
          setActiveLookLabel(look.label);
          break;
        }
      }

      // Map progress directly to frame index (0 to 47)
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1)))
      );

      const img = imagesRef.current[frameIdx];
      if (!img || !img.complete) return;

      // 1. Draw Primary Model Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }

      // 2. Draw Synchronized Glossy Floor Reflection Canvas
      const refCanvas = reflectionCanvasRef.current;
      if (refCanvas) {
        const rCtx = refCanvas.getContext("2d");
        if (rCtx) {
          rCtx.clearRect(0, 0, refCanvas.width, refCanvas.height);
          rCtx.save();
          rCtx.translate(0, refCanvas.height);
          rCtx.scale(1, -1);
          rCtx.imageSmoothingEnabled = true;
          rCtx.imageSmoothingQuality = "high";
          rCtx.drawImage(img, 0, 0, refCanvas.width, refCanvas.height);
          rCtx.restore();
        }
      }
    };

    const unsubscribe = smoothProgress.on("change", renderFrame);
    renderFrame();

    return () => unsubscribe();
  }, [isPreloaded, smoothProgress]);

  const handleScrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      scrollTo(el as HTMLElement, { offset: -40 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[250vh] sm:h-[280vh] bg-gradient-to-b from-[#ECEAE5] via-[#ECEAE5] to-[#E4E1D9]"
    >
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-between pt-4 sm:pt-8 pb-6 sm:pb-10 px-4 sm:px-10 md:px-16 overflow-hidden select-none">
        {/* Ambient Backlight Bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[400px] bg-white/40 blur-[80px] sm:blur-[110px] rounded-full pointer-events-none z-0" />

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

          {/* Top-Right Active Look & Collection Marker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end text-right"
          >
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#9E7B5C] uppercase">
              EDITORIAL STRIDE
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase mt-0.5">
              COLLECTION 2026
            </span>
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 mt-0.5">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-[#0A0A0A] uppercase">
                3 OUTFIT EVOLUTIONS
              </span>
              <div className="w-5 sm:w-8 h-[1.5px] bg-[#0A0A0A]" />
            </div>
          </motion.div>
        </div>

        {/* 2. Monumental Stage: Giant 'SURFER' in Anton Font + Step-by-Step Walking & Fashion Transition Canvas */}
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-center my-auto py-2 sm:py-6">
          {/* Giant Anton Font Wordmark Behind Model */}
          <h1 className="font-anton text-[28vw] sm:text-[25vw] leading-[0.74] tracking-[0.02em] text-[#0A0A0A] uppercase select-none text-center w-full z-0 block pointer-events-none">
            SURFER
          </h1>

          {/* Scroll-Driven Step-by-Step Model Trajectory */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div
              style={{ x: modelX }}
              className="relative w-[280px] sm:w-[440px] md:w-[540px] lg:w-[640px] h-[55vh] sm:h-[70vh] lg:h-[78vh] max-h-[660px] flex items-center justify-center will-change-transform"
            >
              {/* Dynamic Ground Contact Shadow */}
              <motion.div
                style={{
                  scaleX: shadowScaleX,
                  opacity: shadowOpacity,
                }}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[75%] h-6 sm:h-8 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.12)_50%,transparent_75%)] blur-[2px] sm:blur-[3px] pointer-events-none z-10 will-change-transform"
              />

              {/* Glossy Floor Reflection Canvas (Synchronized Walk & Garment Transition) */}
              <div
                className="absolute top-[98.5%] left-0 right-0 h-[40%] pointer-events-none overflow-hidden opacity-22 blur-[1.2px] z-0"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)",
                }}
              >
                <canvas
                  ref={reflectionCanvasRef}
                  width={1024}
                  height={985}
                  className="w-full h-full object-contain object-bottom"
                />
              </div>

              {/* Primary High-Resolution Sequential Walking Animation Canvas */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                <canvas
                  ref={canvasRef}
                  width={1024}
                  height={985}
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_14px_24px_rgba(0,0,0,0.22)] sm:drop-shadow-[0_20px_32px_rgba(0,0,0,0.25)]"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. Bottom Action Controls & Dynamic Fashion Beat Tracker */}
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

          {/* Dynamic Active Look Status & Scroll Guidance */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-right">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold bg-[#FCFAF6] px-3.5 py-1.5 border border-[#D8D4CC] shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9E7B5C] animate-pulse" />
              <span>{activeLookLabel}</span>
            </div>
            <div className="w-px h-3 bg-[#D8D4CC] hidden sm:block" />
            <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase font-semibold">
              AUTONOMOUS BESPOKE ATELIER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
