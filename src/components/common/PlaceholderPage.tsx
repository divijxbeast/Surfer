import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  category?: string;
}

export function PlaceholderPage({ title, subtitle, category = "ARCHIVE / COMING SOON" }: PlaceholderPageProps) {
  return (
    <main className="min-h-screen flex flex-col justify-between p-8 sm:p-16 bg-[#F5F4F0] text-[#0A0A0A]">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between border-b border-[#D8D7D2] pb-6">
        <Link href="/" className="font-serif text-2xl tracking-[0.18em] text-[#0A0A0A]">
          SURFER
        </Link>
        <span className="text-[11px] font-mono tracking-widest text-[#8A8A86] uppercase">
          {category}
        </span>
      </div>

      <div className="max-w-2xl mx-auto my-auto py-16 text-center">
        <span className="text-xs font-sans font-medium tracking-[0.22em] text-[#8A8A86] uppercase block mb-4">
          MODULE IN DEVELOPMENT
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#0A0A0A] font-normal mb-6">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-[#1C1C1C] leading-relaxed max-w-md mx-auto mb-10">
          {subtitle}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A0A0A] text-[#F5F4F0] text-xs font-sans font-medium tracking-[0.2em] uppercase border border-[#0A0A0A] hover:bg-transparent hover:text-[#0A0A0A] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>RETURN HOME</span>
        </Link>
      </div>

      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between border-t border-[#D8D7D2] pt-6 text-xs font-mono text-[#8A8A86]">
        <span>© 2026 SURFER</span>
        <span className="uppercase tracking-widest">BESPOKE PLATFORM</span>
      </div>
    </main>
  );
}
