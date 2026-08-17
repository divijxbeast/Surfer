import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:px-4 focus:py-2 focus:bg-[#0A0A0A] focus:text-[#F5F4F0] focus:text-xs focus:font-medium focus:tracking-widest focus:uppercase focus:border focus:border-[#F5F4F0] transition-transform"
    >
      Skip to main content
    </a>
  );
}
