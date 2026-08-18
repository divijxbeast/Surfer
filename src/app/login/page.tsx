"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login and redirect to client portal
    setTimeout(() => {
      setIsLoading(false);
      router.push("/account");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#ECEAE5] text-[#0A0A0A] flex flex-col justify-between">
      {/* Top Header Strip */}
      <header className="w-full py-6 px-6 sm:px-12 flex items-center justify-between border-b border-[#D8D4CC] bg-[#ECEAE5]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#555555] hover:text-[#0A0A0A] uppercase transition-colors"
        >
          <ArrowLeft size={14} />
          <span>BACK TO ATELIER</span>
        </Link>

        <Link href="/" className="font-anton text-2xl tracking-[0.05em] text-[#0A0A0A] uppercase">
          SURFER
        </Link>

        <div className="text-[11px] font-mono text-[#85837D] uppercase tracking-widest hidden sm:block">
          CLIENT ACCESS
        </div>
      </header>

      {/* Main Container: Split Editorial Layout */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-center">
        {/* Left: High-Fashion Atelier Editorial Imagery */}
        <div className="hidden lg:block lg:col-span-6 relative h-[620px] w-full bg-[#0A0A0A] overflow-hidden border border-[#D8D4CC] shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop"
            alt="SURFER Bespoke Tailoring"
            fill
            sizes="50vw"
            className="object-cover object-center grayscale contrast-125 opacity-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />

          {/* Overlay Text */}
          <div className="absolute bottom-10 left-10 right-10 text-[#F7F5F0]">
            <span className="text-[10px] font-mono tracking-[0.28em] text-[#D4AF37] uppercase font-bold block mb-2">
              AUTONOMOUS BESPOKE HOUSE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F5F0] font-normal leading-tight">
              Wear what feels like you.
            </h2>
            <p className="text-xs text-[#A0A0A0] font-sans mt-3 leading-relaxed max-w-md">
              No two people are built the same. Your pants shouldn&apos;t be either. Access your calibrated CAD measurements and live atelier orders.
            </p>
          </div>
        </div>

        {/* Right: Clean, Minimalist Login Card */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto">
          <div className="bg-[#FCFAF6] border border-[#D8D4CC] p-8 sm:p-12 shadow-xl">
            {/* Header */}
            <div className="mb-8">
              <span className="text-[10px] font-mono tracking-[0.24em] text-[#9E7B5C] uppercase font-bold block mb-1.5">
                {isSignUp ? "NEW CLIENT REGISTRATION" : "CLIENT IDENTIFICATION"}
              </span>
              <h1 className="font-anton text-3xl sm:text-4xl uppercase tracking-wide text-[#0A0A0A] leading-none">
                {isSignUp ? "CREATE ATELIER PROFILE" : "SIGN IN TO SURFER"}
              </h1>
              <p className="text-xs text-[#666666] font-sans mt-2">
                {isSignUp
                  ? "Enter your details to save custom measurements and track bespoke cuts."
                  : "Welcome back. Enter your credentials to access your client portal."}
              </p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#F7F5F0] hover:bg-[#EBE7DF] border border-[#D8D4CC] text-[#0A0A0A] text-xs font-sans font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#F7F5F0] hover:bg-[#EBE7DF] border border-[#D8D4CC] text-[#0A0A0A] text-xs font-sans font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.62-.76 1.04-1.81.92-2.87-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.73-.85 2.76.99.08 2.03-.51 2.56-1.24z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-[#D8D4CC] w-full" />
              <span className="bg-[#FCFAF6] px-3 text-[10px] font-mono text-[#888888] uppercase tracking-widest">
                OR CONTINUE WITH EMAIL
              </span>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1.5">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Julian Vance"
                    className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] focus:outline-none px-4 py-3 text-xs text-[#0A0A0A] placeholder-[#999999]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@atelier-surfer.com"
                  className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] focus:outline-none px-4 py-3 text-xs text-[#0A0A0A] placeholder-[#999999]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold">
                    PASSWORD
                  </label>
                  {!isSignUp && (
                    <a
                      href="#"
                      className="text-[10px] font-mono text-[#888888] hover:text-[#0A0A0A] uppercase"
                    >
                      FORGOT PASSWORD?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] focus:outline-none px-4 py-3 text-xs text-[#0A0A0A] placeholder-[#999999]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#888888] hover:text-[#0A0A0A] cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              {!isSignUp && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 accent-[#0A0A0A] cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs text-[#666666] font-sans cursor-pointer select-none">
                    Remember me on this device
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#0A0A0A] hover:bg-[#242424] text-[#F7F5F0] text-xs font-mono font-bold tracking-[0.24em] uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <span>AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>{isSignUp ? "CREATE ATELIER ACCOUNT" : "SIGN IN TO ATELIER"}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="mt-8 pt-6 border-t border-[#D8D4CC] text-center">
              <p className="text-xs text-[#666666] font-sans">
                {isSignUp ? "Already registered with the atelier?" : "New to SURFER bespoke tailoring?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-bold text-[#0A0A0A] hover:text-[#9E7B5C] underline cursor-pointer ml-1"
                >
                  {isSignUp ? "Sign in here" : "Create an account"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 sm:px-12 text-center text-xs font-mono text-[#85837D] border-t border-[#D8D4CC] bg-[#ECEAE5]">
        <p>© 2026 SURFER ATELIER · 256-BIT ENCRYPTED CLIENT VAULT</p>
      </footer>
    </div>
  );
}
