"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

import { useRouter } from "next/navigation";

const NAV_CATEGORIES = [
  { label: "SHOP", href: "/products" },
  { label: "SILHOUETTES", href: "/#fit" },
  { label: "ATELIER", href: "/#atelier" },
  { label: "ABOUT US", href: "/#about-us" },
  { label: "ADMIN", href: "/admin" },
];

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    if (href.startsWith("#") || href.startsWith("/#")) {
      const targetSelector = href.startsWith("/#") ? href.replace("/", "") : href;
      const element = document.querySelector(targetSelector);
      if (element) {
        scrollTo(element as HTMLElement, { offset: -40 });
        return;
      }
    }
    router.push(href);
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#ECEAE5]/95 backdrop-blur-md border-b border-[#D8D4CC] py-3 shadow-xs"
            : "bg-[#ECEAE5] border-b border-[#DCD8CF] py-4"
        )}
      >
        <div className="max-w-[1520px] mx-auto px-4 sm:px-10 md:px-14 flex items-center justify-between">
          {/* Left: Category Navigation */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8" aria-label="Main Navigation">
            {NAV_CATEGORIES.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-[11px] font-sans font-semibold tracking-[0.2em] text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors py-1 uppercase cursor-pointer"
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
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Center: Refined Brand Logo in Anton Font */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 focus-visible:outline-none group flex items-center justify-center"
            aria-label="SURFER - Return to top"
          >
            <span className="font-anton text-2xl sm:text-3xl md:text-[34px] tracking-[0.05em] text-[#0A0A0A] uppercase transition-opacity group-hover:opacity-80 leading-none">
              SURFER
            </span>
          </Link>

          {/* Right: Search, Account, Wishlist, Cart */}
          <div className="flex items-center gap-3 sm:gap-6 text-[#1A1A1A]">
            <button
              onClick={() => handleNavClick("#collection")}
              className="flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors cursor-pointer"
              title="Search collection"
            >
              <Search size={15} strokeWidth={2} />
              <span className="hidden sm:inline-block uppercase">SEARCH</span>
            </button>

            {/* Direct Link to Login Page */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors cursor-pointer px-1 py-1"
              title="Client Login"
            >
              <User size={15} strokeWidth={2} />
              <span className="inline-block uppercase">LOGIN</span>
            </Link>

            <Link
              href="/account"
              className="flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors"
              title="Wishlist"
            >
              <Heart size={15} strokeWidth={2} />
              <span className="hidden md:inline-block uppercase">WISHLIST</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-wider text-[#1A1A1A] hover:text-[#9E7B5C] transition-colors p-1"
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag size={15} strokeWidth={2} />
              </div>
              <span className="uppercase font-semibold text-[11px]">
                CART ({bagCount})
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#ECEAE5] pt-28 px-8 pb-12 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-5">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#9E7B5C] uppercase font-semibold">
                DIRECTORY
              </span>
              {NAV_CATEGORIES.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.05, duration: 0.35 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center justify-between text-2xl font-anton text-[#0A0A0A] tracking-wider py-2.5 border-b border-[#D8D4CC]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={18} className="text-[#9E7B5C]" />
                  </a>
                </motion.div>
              ))}

              {/* Dedicated Login Link in Mobile Drawer */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
              >
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full text-2xl font-anton text-[#0A0A0A] tracking-wider py-2.5 border-b border-[#D8D4CC] text-left"
                >
                  <span>CLIENT LOGIN / VAULT</span>
                  <ArrowRight size={18} className="text-[#9E7B5C]" />
                </Link>
              </motion.div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => handleNavClick("#collection")}
                className="w-full py-4 text-xs font-mono font-semibold tracking-[0.24em] text-[#F7F5F0] bg-[#0A0A0A] uppercase shadow-lg cursor-pointer"
              >
                EXPLORE COLLECTION
              </button>
              <p className="text-[11px] font-mono text-[#85837D] tracking-widest text-center mt-2">
                SURFER ATELIER · PANTS MADE FOR YOU
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
