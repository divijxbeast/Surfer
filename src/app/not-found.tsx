import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-between p-8 sm:p-16 bg-[#0A0A0A] text-[#F5F4F0] dark-section">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between border-b border-white/10 pb-6">
        <span className="font-serif text-2xl tracking-[0.18em]">SURFER</span>
        <span className="text-[11px] font-mono tracking-widest text-[#8A8A86] uppercase">
          ERROR 404
        </span>
      </div>

      <div className="max-w-xl mx-auto my-auto py-16 text-center">
        <span className="text-xs font-sans font-medium tracking-[0.25em] text-[#8A8A86] uppercase block mb-4">
          PAGE NOT LOCATED
        </span>
        <h1 className="font-serif text-6xl sm:text-8xl text-[#F5F4F0] font-normal mb-6">
          404
        </h1>
        <p className="text-sm sm:text-base text-[#8A8A86] leading-relaxed mb-10 max-w-md mx-auto">
          The requested coordinate or archive document does not exist within the current tailoring collection.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5F4F0] text-[#0A0A0A] text-xs font-sans font-medium tracking-[0.2em] uppercase border border-[#F5F4F0] hover:bg-transparent hover:text-[#F5F4F0] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>RETURN TO ATELIER</span>
        </Link>
      </div>

      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-[#8A8A86]">
        <span>© 2026 SURFER</span>
        <span className="uppercase tracking-widest">BESPOKE SYSTEM</span>
      </div>
    </main>
  );
}
