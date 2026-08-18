"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, User, ArrowRight, CheckCircle2, Shield, Sparkles, Eye, EyeOff } from "lucide-react";

interface AuthCardProps {
  onLoginSuccess: (user: { name: string; email: string; memberId: string }) => void;
}

export function AuthCard({ onLoginSuccess }: AuthCardProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "magic">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === "magic") {
        setMagicLinkSent(true);
      } else {
        onLoginSuccess({
          name: name || "Julian Vance",
          email: email || "julian.vance@atelier-surfer.com",
          memberId: "SRF-8821",
        });
      }
    }, 700);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: "Julian Vance",
        email: "julian.vance@atelier-surfer.com",
        memberId: "SRF-8821",
      });
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#FCFAF6] border border-[#D8D4CC] shadow-2xl p-6 sm:p-10 relative overflow-hidden">
      {/* Top Gold Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
        <div className="absolute transform rotate-45 bg-[#9E7B5C] text-[#F7F5F0] text-[8px] font-mono font-bold py-0.5 right-[-35px] top-[18px] w-[120px] text-center tracking-widest uppercase">
          BESPOKE
        </div>
      </div>

      {/* Header Marker */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9E7B5C]" />
          <span className="text-[10px] font-mono tracking-[0.24em] text-[#9E7B5C] uppercase font-semibold">
            CLIENT ACCESS VAULT
          </span>
        </div>
        <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-[0.03em] text-[#0A0A0A] leading-none">
          {mode === "signin" && "SIGN IN TO ATELIER"}
          {mode === "signup" && "JOIN THE ATELIER"}
          {mode === "magic" && "PASSWORDLESS ACCESS"}
        </h2>
        <p className="text-xs text-[#666666] font-sans mt-2 leading-relaxed">
          {mode === "signin" && "Access your bespoke orders, measurement CAD vault, and tailoring archive."}
          {mode === "signup" && "Create your private account to calibrate millimeter measurements and order bespoke pieces."}
          {mode === "magic" && "We'll email you a secure one-click passkey link directly to your inbox."}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 gap-1 bg-[#ECEAE5] p-1 border border-[#D8D4CC] mb-6 text-center">
        <button
          type="button"
          onClick={() => {
            setMode("signin");
            setMagicLinkSent(false);
          }}
          className={`py-2 text-[11px] font-mono tracking-wider uppercase font-bold transition-all ${
            mode === "signin"
              ? "bg-[#0A0A0A] text-[#F7F5F0] shadow-sm"
              : "text-[#555555] hover:text-[#0A0A0A]"
          }`}
        >
          SIGN IN
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setMagicLinkSent(false);
          }}
          className={`py-2 text-[11px] font-mono tracking-wider uppercase font-bold transition-all ${
            mode === "signup"
              ? "bg-[#0A0A0A] text-[#F7F5F0] shadow-sm"
              : "text-[#555555] hover:text-[#0A0A0A]"
          }`}
        >
          NEW CLIENT
        </button>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          type="button"
          onClick={handleDemoLogin}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#F7F5F0] hover:bg-[#EBE7DF] border border-[#D8D4CC] text-[#0A0A0A] text-xs font-sans font-semibold tracking-wide transition-colors active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#F7F5F0] hover:bg-[#EBE7DF] border border-[#D8D4CC] text-[#0A0A0A] text-xs font-sans font-semibold tracking-wide transition-colors active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.62-.76 1.04-1.81.92-2.87-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.73-.85 2.76.99.08 2.03-.51 2.56-1.24z" />
          </svg>
          <span>Apple</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-5">
        <div className="border-t border-[#D8D4CC] w-full" />
        <span className="bg-[#FCFAF6] px-3 text-[10px] font-mono text-[#888888] uppercase tracking-widest">
          OR WITH EMAIL
        </span>
      </div>

      {/* Magic Link Success Message */}
      <AnimatePresence>
        {magicLinkSent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 p-4 bg-[#EBE7DF] border border-[#9E7B5C] flex items-start gap-3"
          >
            <CheckCircle2 size={18} className="text-[#9E7B5C] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-sans font-bold text-[#0A0A0A]">
                Magic passkey dispatched!
              </p>
              <p className="text-[11px] text-[#555555] font-sans mt-0.5">
                Check your inbox at <strong>{email || "your email"}</strong> to sign in instantly without a password.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1.5">
              FULL LEGAL NAME
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Julian Vance"
                className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] focus:outline-none px-3.5 py-2.5 text-xs text-[#0A0A0A] placeholder-[#999999]"
              />
              <User size={14} className="absolute right-3.5 top-3 text-[#999999]" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1.5">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@atelier-surfer.com"
              className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] focus:outline-none px-3.5 py-2.5 text-xs text-[#0A0A0A] placeholder-[#999999]"
            />
            <Mail size={14} className="absolute right-3.5 top-3 text-[#999999]" />
          </div>
        </div>

        {mode !== "magic" && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold">
                PASSWORD
              </label>
              {mode === "signin" && (
                <button
                  type="button"
                  onClick={() => setMode("magic")}
                  className="text-[10px] font-mono text-[#9E7B5C] hover:underline uppercase"
                >
                  USE MAGIC LINK
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] focus:outline-none px-3.5 py-2.5 text-xs text-[#0A0A0A] placeholder-[#999999]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[#999999] hover:text-[#0A0A0A]"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#242424] text-[#F7F5F0] text-xs font-mono font-bold tracking-[0.24em] uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2 mt-6"
        >
          {isLoading ? (
            <span className="inline-block animate-spin">⟳</span>
          ) : (
            <>
              <span>{mode === "signin" ? "ENTER CLIENT PORTAL" : mode === "signup" ? "CREATE ATELIER PROFILE" : "DISPATCH MAGIC LINK"}</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>

      {/* 1-Click Instant Demo Button */}
      <div className="mt-5 pt-4 border-t border-[#D8D4CC]">
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2 px-3 bg-[#EAE7DF] hover:bg-[#DDD8CD] border border-[#D0CCC2] text-[#0A0A0A] text-[11px] font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Sparkles size={13} className="text-[#9E7B5C]" />
          <span>INSTANT DEMO LOGIN (1-CLICK)</span>
        </button>
      </div>

      {/* Privacy Guarantee Marker */}
      <div className="mt-5 flex items-center justify-center gap-1.5 text-[#888888] text-[10px] font-mono">
        <Shield size={12} className="text-[#9E7B5C]" />
        <span>256-BIT ENCRYPTED BESPOKE VAULT</span>
      </div>
    </div>
  );
}
