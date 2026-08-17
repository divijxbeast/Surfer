"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  as: Component = "h2",
  delay = 0,
  stagger = 0.05,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.25 });

  const words = text.split(" ");

  return (
    <Component className={cn("inline-block overflow-hidden", className)}>
      <span ref={ref} className="inline-block">
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-top">
            <motion.span
              className="inline-block"
              initial={{ y: "115%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1], // expo-out
                delay: delay + index * stagger,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  );
}
