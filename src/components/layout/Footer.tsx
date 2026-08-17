"use client";

import React from "react";
import Link from "next/link";
import { FOOTER_NAV_LINKS, FOOTER_LEGAL_LINKS, FOOTER_FUTURE_LINKS } from "@/data/content";
import { useSmoothScroll } from "@/components/common/SmoothScrollProvider";

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        scrollTo(element as HTMLElement);
      }
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#F5F4F0] pt-24 sm:pt-32 pb-12 border-t border-white/10 dark-section overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 pb-20 border-b border-white/10">
          {/* Brand Manifesto Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-sans font-medium tracking-[0.25em] text-[#8A8A86] uppercase block mb-4">
                SURFER Tailoring
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F4F0] font-normal leading-tight max-w-sm mb-6">
                Pants should adapt to the person — not the person to the pants.
              </h3>
              <p className="text-sm text-[#8A8A86] leading-relaxed max-w-md font-sans">
                A modern luxury fashion house offering personalized proportions, handcrafted with architectural precision.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10">
              <span className="text-[11px] font-sans tracking-[0.2em] text-[#8A8A86] uppercase block mb-2">
                Inquiries & Bespoke Appointments
              </span>
              <p className="text-sm font-mono text-[#F5F4F0]">
                atelier@surfer-tailoring.com
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 md:col-start-7 flex flex-col">
            <span className="text-[11px] font-sans font-medium tracking-[0.22em] text-[#8A8A86] uppercase mb-6">
              Navigation
            </span>
            <ul className="flex flex-col gap-3.5">
              {FOOTER_NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-sm text-[#F5F4F0] hover:text-[#8A8A86] transition-colors duration-300 tracking-wider font-sans inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Exploration Links */}
          <div className="md:col-span-2 flex flex-col">
            <span className="text-[11px] font-sans font-medium tracking-[0.22em] text-[#8A8A86] uppercase mb-6">
              Platform
            </span>
            <ul className="flex flex-col gap-3.5">
              {FOOTER_FUTURE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#8A8A86] hover:text-[#F5F4F0] transition-colors duration-300 tracking-wider font-sans inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-sans font-medium tracking-[0.22em] text-[#8A8A86] uppercase mb-6 block">
                Connect
              </span>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a
                    href="#"
                    aria-label="Instagram (opens in new tab)"
                    className="text-sm text-[#F5F4F0] hover:text-[#8A8A86] transition-colors duration-300 tracking-wider font-sans inline-block"
                  >
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-label="Pinterest (opens in new tab)"
                    className="text-sm text-[#F5F4F0] hover:text-[#8A8A86] transition-colors duration-300 tracking-wider font-sans inline-block"
                  >
                    Pinterest ↗
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <span className="text-[11px] font-sans tracking-[0.22em] text-[#8A8A86] uppercase block mb-3">
                Legal
              </span>
              <div className="flex flex-col gap-2">
                {FOOTER_LEGAL_LINKS.map((legal) => (
                  <Link
                    key={legal.label}
                    href={legal.href}
                    className="text-xs text-[#8A8A86] hover:text-[#F5F4F0] transition-colors duration-300 tracking-wider"
                  >
                    {legal.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Giant Monumental Wordmark */}
        <div className="pt-12 sm:pt-16 select-none overflow-hidden">
          <h2 className="font-serif text-[18vw] leading-[0.8] tracking-[0.06em] text-white/10 hover:text-white/20 transition-colors duration-700 text-center font-normal uppercase">
            SURFER
          </h2>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8A8A86] border-t border-white/5">
          <p>© 2026 SURFER ALL RIGHTS RESERVED.</p>
          <p className="tracking-widest uppercase text-[10px]">
            HANDCRAFTED BESPOKE PANTS · ZERO COMPROMISE
          </p>
        </div>
      </div>
    </footer>
  );
}
