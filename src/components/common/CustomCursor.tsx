"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "explore">("default");
  const [isCoarse, setIsCoarse] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check coarse pointer & reduced motion
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapabilities = () => {
      const isTouch = coarseQuery.matches || reducedMotionQuery.matches;
      setIsCoarse(isTouch);
    };

    updateCapabilities();
    coarseQuery.addEventListener("change", updateCapabilities);
    reducedMotionQuery.addEventListener("change", updateCapabilities);

    if (coarseQuery.matches || reducedMotionQuery.matches) {
      return () => {
        coarseQuery.removeEventListener("change", updateCapabilities);
        reducedMotionQuery.removeEventListener("change", updateCapabilities);
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorAttr === "view") {
        setCursorVariant("view");
        setCursorText("VIEW");
      } else if (cursorAttr === "explore") {
        setCursorVariant("explore");
        setCursorText("EXPLORE →");
      } else if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      coarseQuery.removeEventListener("change", updateCapabilities);
      reducedMotionQuery.removeEventListener("change", updateCapabilities);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isCoarse || !isVisible) return null;

  const variants = {
    default: {
      width: 10,
      height: 10,
      backgroundColor: "#0A0A0A",
      border: "1px solid rgba(255,255,255,0.4)",
    },
    hover: {
      width: 44,
      height: 44,
      backgroundColor: "rgba(10, 10, 10, 0.15)",
      border: "1px solid #0A0A0A",
    },
    view: {
      width: 72,
      height: 72,
      backgroundColor: "#0A0A0A",
      border: "1px solid #FAF9F6",
    },
    explore: {
      width: 96,
      height: 96,
      backgroundColor: "#0A0A0A",
      border: "1px solid #FAF9F6",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[60] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={cursorVariant}
      variants={variants}
      transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.4 }}
    >
      {cursorText && (
        <span className="text-[10px] font-sans font-medium tracking-[0.18em] text-[#F5F4F0] select-none text-center px-1">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
