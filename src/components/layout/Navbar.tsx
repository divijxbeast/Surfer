"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/content";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        scrollTo(element as HTMLElement);
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E2DDD5] py-4 shadow-sm"
            : "bg-transparent py-7"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:outline-none"
            aria-label="SURFER - Return to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#0A0A0A] font-normal transition-opacity duration-300 group-hover:opacity-75">
              SURFER
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-[#9E7B5C] uppercase tracking-widest pl-2 border-l border-[#E2DDD5]">
              ATELIER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative text-xs font-sans font-medium tracking-[0.2em] text-[#0A0A0A] transition-colors duration-300 hover:text-[#9E7B5C] py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavClick("#collection")}
              data-cursor="explore"
              className="relative px-6 py-2.5 text-xs font-sans font-medium tracking-[0.22em] text-[#F7F5F0] bg-[#0A0A0A] border border-[#0A0A0A] transition-all duration-300 hover:bg-[#9E7B5C] hover:border-[#9E7B5C] cursor-pointer shadow-sm"
            >
              EXPLORE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#0A0A0A] focus-visible:outline-none cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Minimal Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#FCFAF6] pt-28 px-8 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-sans tracking-[0.25em] text-[#9E7B5C] uppercase mb-2 font-semibold">
                Navigation
              </span>
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 + 0.1, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center justify-between text-2xl font-serif text-[#0A0A0A] tracking-wider py-3 border-b border-[#E2DDD5]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={18} className="text-[#9E7B5C]" />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => handleNavClick("#collection")}
                className="w-full py-4 text-xs font-sans font-medium tracking-[0.22em] text-[#F7F5F0] bg-[#0A0A0A] uppercase shadow-lg"
              >
                EXPLORE COLLECTION
              </button>
              <p className="text-[11px] text-[#85837D] tracking-widest text-center mt-2">
                TAILORED AROUND YOUR FIT · ATELIER 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
