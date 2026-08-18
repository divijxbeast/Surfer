"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  filename?: string;
  src?: string;
  dimensions?: string;
  aspectRatio?: string; // e.g. "4/5", "16/9", "3/4", "1/1"
  label?: string;
  className?: string;
  priority?: boolean;
  dark?: boolean;
  caption?: string;
  alt?: string;
}

// Fallback high-res editorial image map for any filename passed
const IMAGE_URL_MAP: Record<string, string> = {
  "hero.jpg": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1600&auto=format&fit=crop",
  "tailoring.jpg": "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=1200&auto=format&fit=crop",
  "fabric-detail.jpg": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
  "fit-slim.jpg": "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000&auto=format&fit=crop",
  "fit-regular.jpg": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop",
  "fit-relaxed.jpg": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
  "fit-wide.jpg": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
  "collection-01.jpg": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
  "collection-02.jpg": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
  "collection-03.jpg": "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
  "collection-04.jpg": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
  "collection-05.jpg": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  "collection-06.jpg": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  "craftsmanship-01.jpg": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
  "craftsmanship-02.jpg": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
  "craftsmanship-03.jpg": "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800&auto=format&fit=crop",
  "craftsmanship-04.jpg": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop",
  "brand-statement-bg.jpg": "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=2000&auto=format&fit=crop",
};

export function PlaceholderImage({
  filename = "hero.jpg",
  src,
  aspectRatio = "4/5",
  label,
  className,
  priority = false,
  dark = false,
  caption,
  alt,
}: PlaceholderImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const finalSrc = src || IMAGE_URL_MAP[filename] || IMAGE_URL_MAP["hero.jpg"];
  const displayLabel = label || filename.replace(/\.[^/.]+$/, "").toUpperCase();

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none group transition-all duration-700",
        dark ? "bg-[#111111]" : "bg-[#EDE8DE]",
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Real High-Resolution Editorial Image */}
      <Image
        src={finalSrc}
        alt={alt || displayLabel || "SURFER Bespoke Tailoring"}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn(
          "object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          dark ? "brightness-[0.45] contrast-[1.1]" : "brightness-[0.96] contrast-[1.02]"
        )}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Subtle Warm Editorial Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-500",
          dark
            ? "bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            : "bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40"
        )}
      />

      {/* Subtle Structural Framing Line (Fine Tailoring Grid) */}
      <div
        className={cn(
          "absolute inset-3 border pointer-events-none transition-colors duration-500",
          dark ? "border-white/10" : "border-white/20"
        )}
      />

      {/* Editorial Marker & Spec Badge on Hover or Bottom */}
      {caption && (
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
          <div
            className={cn(
              "inline-block px-3 py-1.5 backdrop-blur-md transition-all duration-300",
              dark
                ? "bg-black/75 text-neutral-200 border border-white/15"
                : "bg-[#FCFAF6]/90 text-[#0A0A0A] border border-[#E2DDD5] shadow-sm"
            )}
          >
            <p className="text-[11px] font-sans font-medium tracking-wide">
              {caption}
            </p>
          </div>
        </div>
      )}

      {/* Corner Minimalist Registration Marks */}
      <div
        className={cn(
          "absolute top-2.5 left-2.5 w-2 h-2 border-t border-l pointer-events-none transition-colors",
          dark ? "border-white/40" : "border-white/60"
        )}
      />
      <div
        className={cn(
          "absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r pointer-events-none transition-colors",
          dark ? "border-white/40" : "border-white/60"
        )}
      />
    </div>
  );
}
