"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

const TOTAL_FRAMES = 16;
const STRIDE_CYCLES = 3.5; // 3.5 full walk cycles across the width of SURFER

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reflectionCanvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Scroll Progress across the 240vh hero runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fluid spring smoothing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.15,
  });

  // Horizontal traversal from 'S' (left) to 'R' (right)
  const modelX = useTransform(smoothProgress, [0, 1], ["-34vw", "34vw"]);

  // Dynamic ground shadow pulsing
  const shadowScaleX = useTransform(smoothProgress, (p) => {
    const phase = p * STRIDE_CYCLES * 2 * Math.PI;
    return 1 + Math.cos(phase) * 0.15;
  });

  const shadowOpacity = useTransform(smoothProgress, (p) => {
    const phase = p * STRIDE_CYCLES * 2 * Math.PI;
    return 0.4 + Math.abs(Math.cos(phase)) * 0.2;
  });

  // Preloaded Images Array
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = i.toString().padStart(2, "0");
      img.src = `/walk/frame_${numStr}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Continuous Canvas Frame Render on Scroll
  useEffect(() => {
    const renderFrame = () => {
      const p = smoothProgress.get();
      const rawFrame = (p * STRIDE_CYCLES * TOTAL_FRAMES) % TOTAL_FRAMES;
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(rawFrame))
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

      // 2. Draw Reflection Canvas (Vertically flipped)
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
  }, [imagesLoaded, smoothProgress]);

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
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-between pt-4 sm:pt-8 pb-6 sm:pb-10 px-4 sm:px-10 md:px-16 overflow-hidden select-none">
        {/* Atmospheric Backlight Bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[250px] sm:h-[400px] bg-white/45 blur-[80px] sm:blur-[110px] rounded-full pointer-events-none z-0" />

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

        {/* 2. Monumental Stage: Giant 'SURFER' in Anton Font + Frame-by-Frame Animated Walking Model */}
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-center my-auto py-2 sm:py-6">
          {/* Giant Anton Font Wordmark Behind Model */}
          <h1 className="font-anton text-[28vw] sm:text-[25vw] leading-[0.74] tracking-[0.02em] text-[#0A0A0A] uppercase select-none text-center w-full z-0 block pointer-events-none">
            SURFER
          </h1>

          {/* Scroll-Driven Animated Model Container */}
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

              {/* Glossy Floor Reflection Canvas */}
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

              {/* Primary High-Resolution Walking Animation Canvas */}
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

          {/* Stride Scroll Hint */}
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
