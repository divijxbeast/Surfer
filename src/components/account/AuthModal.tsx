"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Shield, Eye, EyeOff, User, Mail, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup" | "magic">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === "magic") {
        setMagicLinkSent(true);
      } else {
        onClose();
        router.push("/account");
      }
    }, 600);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      router.push("/account");
    }, 300);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#FCFAF6] border border-[#D8D4CC] shadow-2xl p-6 sm:p-9 z-10 select-none overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#0A0A0A] hover:text-[#9E7B5C] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Top Gold Corner Accent */}
          <div className="absolute top-0 left-0 w-2 h-full bg-[#0A0A0A]" />

          {/* Header */}
          <div className="mb-5 pl-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9E7B5C]" />
              <span className="text-[10px] font-mono tracking-[0.24em] text-[#9E7B5C] uppercase font-bold">
                SURFER ATELIER
              </span>
            </div>
            <h3 className="font-anton text-3xl uppercase tracking-wide text-[#0A0A0A] leading-none">
              {mode === "signin" && "CLIENT SIGN IN"}
              {mode === "signup" && "JOIN ATELIER"}
              {mode === "magic" && "PASSWORDLESS ACCESS"}
            </h3>
            <p className="text-xs text-[#666666] font-sans mt-1.5">
              {mode === "signin" && "Access your orders, CAD measurements, and tailor archive."}
              {mode === "signup" && "Create your bespoke account to save custom proportions."}
              {mode === "magic" && "Receive an instant one-click login link in your inbox."}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-1 bg-[#ECEAE5] p-1 border border-[#D8D4CC] mb-5 text-center">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setMagicLinkSent(false);
              }}
              className={`py-1.5 text-[10px] font-mono tracking-wider uppercase font-bold transition-all cursor-pointer ${
                mode === "signin"
                  ? "bg-[#0A0A0A] text-[#F7F5F0] shadow-xs"
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
              className={`py-1.5 text-[10px] font-mono tracking-wider uppercase font-bold transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-[#0A0A0A] text-[#F7F5F0] shadow-xs"
                  : "text-[#555555] hover:text-[#0A0A0A]"
              }`}
            >
              NEW CLIENT
            </button>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-[#F7F5F0] hover:bg-[#EBE7DF] border border-[#D8D4CC] text-[#0A0A0A] text-xs font-sans font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-[#F7F5F0] hover:bg-[#EBE7DF] border border-[#D8D4CC] text-[#0A0A0A] text-xs font-sans font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.62-.76 1.04-1.81.92-2.87-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.73-.85 2.76.99.08 2.03-.51 2.56-1.24z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-[#D8D4CC] w-full" />
            <span className="bg-[#FCFAF6] px-2.5 text-[9px] font-mono text-[#888888] uppercase tracking-widest">
              OR EMAIL
            </span>
          </div>

          {/* Magic Link Sent Notice */}
          {magicLinkSent && (
            <div className="mb-4 p-3 bg-[#EBE7DF] border border-[#9E7B5C] text-xs text-[#0A0A0A]">
              Magic passkey sent to <strong>{email}</strong>. Check your inbox to enter.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <div>
                <label className="block text-[9px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Julian Vance"
                  className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3 py-2 text-xs text-[#0A0A0A] placeholder-[#999999]"
                />
              </div>
            )}

            <div>
              <label className="block text-[9px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@atelier-surfer.com"
                className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3 py-2 text-xs text-[#0A0A0A] placeholder-[#999999]"
              />
            </div>

            {mode !== "magic" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[9px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold">
                    PASSWORD
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={() => setMode("magic")}
                      className="text-[9px] font-mono text-[#9E7B5C] hover:underline uppercase cursor-pointer"
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
                    className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3 py-2 text-xs text-[#0A0A0A] placeholder-[#999999]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-[#999999] hover:text-[#0A0A0A] cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#0A0A0A] hover:bg-[#242424] text-[#F7F5F0] text-xs font-mono font-bold tracking-[0.22em] uppercase transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {isLoading ? (
                <span>LOADING...</span>
              ) : (
                <>
                  <span>{mode === "signin" ? "ENTER CLIENT PORTAL" : mode === "signup" ? "CREATE ATELIER PROFILE" : "SEND MAGIC LINK"}</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </form>

          {/* 1-Click Instant Demo Button */}
          <div className="mt-4 pt-3 border-t border-[#D8D4CC]">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 bg-[#EAE7DF] hover:bg-[#DDD8CD] border border-[#D0CCC2] text-[#0A0A0A] text-[10px] font-mono tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles size={12} className="text-[#9E7B5C]" />
              <span>1-CLICK INSTANT PREVIEW LOGIN</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
