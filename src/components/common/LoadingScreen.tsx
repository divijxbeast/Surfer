"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user already saw the loader this session
    const hasLoaded = sessionStorage.getItem("surfer_loaded");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasLoaded || prefersReducedMotion) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("surfer_loaded", "true");
    }, 1050);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1], // expo-out
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] text-[#F5F4F0] select-none"
        >
          {/* Subtle background grain */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative overflow-hidden flex flex-col items-center">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-[0.25em] text-[#F5F4F0] font-normal uppercase pl-[0.25em]"
            >
              SURFER
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              }}
              className="h-px bg-[#8A8A86]/50 mt-4"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.5,
              }}
              className="text-[11px] font-sans tracking-[0.25em] text-[#8A8A86] uppercase mt-3"
            >
              TAILORED TO YOU
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
