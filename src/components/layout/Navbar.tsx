"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

const NAV_CATEGORIES = [
  { label: "TROUSERS", href: "#collection" },
  { label: "CHINOS", href: "#collection" },
  { label: "CARGOS", href: "#collection" },
  { label: "SILHOUETTES", href: "#fit" },
  { label: "THE ATELIER", href: "#about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount] = useState(0);
  const [bagCount] = useState(0);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        scrollTo(element as HTMLElement, { offset: -40 });
      }
    }
  };

  return (
    <>
      {/* Top Black Announcement Strip */}
      <div className="bg-[#0A0A0A] text-[#F7F5F0] text-[10px] sm:text-[11px] font-mono tracking-widest py-2 px-6 sm:px-12 flex items-center justify-between select-none z-50 relative border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse hidden sm:inline-block" />
          <span className="uppercase">COMPLIMENTARY WORLDWIDE BESPOKE ATELIER DELIVERY</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[#A0A0A0]">
          <Link href="/measurements" className="hover:text-white transition-colors uppercase">
            DIGITAL TAILOR
          </Link>
          <span>|</span>
          <Link href="/orders" className="hover:text-white transition-colors uppercase">
            TRACK ORDER
          </Link>
          <span>|</span>
          <a href="#contact" className="hover:text-white transition-colors uppercase">
            CONCIERGE
          </a>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#EAE8E3]/95 backdrop-blur-md border-b border-[#D8D4CC] py-3.5 shadow-sm"
            : "bg-[#ECEAE5] border-b border-[#E0DCD4] py-4 sm:py-5"
        )}
      >
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
          {/* Left: Category Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_CATEGORIES.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-[11px] font-sans font-semibold tracking-[0.22em] text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors py-1 uppercase"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#0A0A0A] focus-visible:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Center: Monumental Brand Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 focus-visible:outline-none group"
            aria-label="SURFER - Return to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.25em] text-[#0A0A0A] uppercase pl-[0.25em] transition-opacity group-hover:opacity-80 leading-none">
              SURFER
            </span>
          </Link>

          {/* Right: Search, Account, Wishlist, Cart */}
          <div className="flex items-center gap-4 sm:gap-7 text-[#1A1A1A]">
            <button
              onClick={() => handleNavClick("#collection")}
              className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors cursor-pointer"
              title="Search collection"
            >
              <Search size={16} strokeWidth={1.75} />
              <span className="hidden xl:inline-block uppercase">SEARCH</span>
            </button>

            <Link
              href="/account"
              className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors"
              title="Client Account"
            >
              <User size={16} strokeWidth={1.75} />
              <span className="hidden xl:inline-block uppercase">LOGIN</span>
            </Link>

            <Link
              href="/account"
              className="relative p-1 text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors"
              title="Wishlist"
            >
              <Heart size={18} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#0A0A0A] text-white text-[8px] font-mono flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors p-1"
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag size={18} strokeWidth={1.75} />
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#0A0A0A] text-white text-[8px] font-mono flex items-center justify-center">
                  {bagCount}
                </span>
              </div>
              <span className="hidden sm:inline-block uppercase font-semibold">
                CART ({bagCount})
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#ECEAE5] pt-28 px-8 pb-12 flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#9E7B5C] uppercase font-semibold">
                ATELIER DIRECTORY
              </span>
              {NAV_CATEGORIES.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 + 0.05, duration: 0.35 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center justify-between text-3xl font-sans font-bold text-[#0A0A0A] tracking-tight py-3 border-b border-[#D8D4CC]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={20} className="text-[#9E7B5C]" />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => handleNavClick("#collection")}
                className="w-full py-4 text-xs font-mono font-semibold tracking-[0.24em] text-[#F7F5F0] bg-[#0A0A0A] uppercase shadow-lg"
              >
                EXPLORE ARCHIVE
              </button>
              <p className="text-[11px] font-mono text-[#85837D] tracking-widest text-center mt-2">
                SURFER ATELIER · BESPOKE PANTS MADE FOR YOU
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
