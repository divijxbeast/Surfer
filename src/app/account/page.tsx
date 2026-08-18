"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Ruler, Heart, Settings, LogOut, ShieldCheck, UserCheck, ArrowLeft } from "lucide-react";
import { AuthCard } from "@/components/account/AuthCard";
import { OrdersTab } from "@/components/account/OrdersTab";
import { MeasurementsTab } from "@/components/account/MeasurementsTab";
import { WishlistTab } from "@/components/account/WishlistTab";
import { SettingsTab } from "@/components/account/SettingsTab";

interface UserProfile {
  name: string;
  email: string;
  memberId: string;
}

export default function AccountPage() {
  // Default logged in user simulation or start with demo user available
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: "Julian Vance",
    email: "julian.vance@atelier-surfer.com",
    memberId: "SRF-8821",
  });

  const [activeTab, setActiveTab] = useState<"orders" | "measurements" | "wishlist" | "settings">("orders");

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <main className="min-h-screen w-full bg-[#ECEAE5] text-[#0A0A0A] pt-8 sm:pt-14 pb-20 sm:pb-32 px-4 sm:px-10 md:px-16 select-none">
      <div className="max-w-[1520px] mx-auto">
        {/* Back link to Home */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#555555] hover:text-[#0A0A0A] uppercase transition-colors"
          >
            <ArrowLeft size={13} />
            <span>RETURN TO SURFER ATELIER</span>
          </Link>
        </div>

        {/* 1. STATE: UNAUTHENTICATED (Show Login / Register Card) */}
        {!currentUser ? (
          <div className="py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Brand Statement & Lookbook Visual */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.26em] text-[#9E7B5C] uppercase block">
                SURFER CLIENT PORTAL
              </span>
              <h1 className="font-anton text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#0A0A0A] leading-none">
                ONE PLACE FOR
                <br />
                EVERY BESPOKE DETAIL.
              </h1>
              <p className="text-xs sm:text-base text-[#555555] font-sans leading-relaxed max-w-lg">
                Log in to follow your custom-cut trousers through live pattern drafting and artisan hand-stitching, calibrate your biometric CAD measurements, and communicate directly with your dedicated tailor.
              </p>

              {/* Atelier Trust Pills */}
              <div className="grid grid-cols-2 gap-3 pt-4 max-w-md">
                <div className="p-3 bg-[#FCFAF6] border border-[#D8D4CC] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#9E7B5C]" />
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0A]">
                    Private CAD Vault
                  </span>
                </div>
                <div className="p-3 bg-[#FCFAF6] border border-[#D8D4CC] flex items-center gap-2">
                  <Package size={16} className="text-[#9E7B5C]" />
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0A]">
                    Live Stage Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Auth Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <AuthCard onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        ) : (
          /* 2. STATE: AUTHENTICATED (Unified Customer Dashboard) */
          <div className="space-y-8">
            {/* Client Top Header Banner */}
            <div className="bg-[#0A0A0A] text-[#F7F5F0] p-6 sm:p-10 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[10px] font-mono tracking-[0.28em] text-[#D4AF37] uppercase font-bold">
                    AUTONOMOUS ATELIER MEMBER · ACTIVE PROFILE
                  </span>
                </div>
                <h1 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-[#F7F5F0]">
                  WELCOME BACK, {currentUser.name}
                </h1>
                <p className="text-xs font-mono text-[#A0A0A0]">
                  Client ID: #{currentUser.memberId} · Registry: {currentUser.email}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="relative z-10 flex items-center gap-3">
                <Link
                  href="/#collection"
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#C29E2E] text-[#0A0A0A] text-xs font-mono font-bold tracking-widest uppercase transition-colors shadow-md"
                >
                  NEW BESPOKE ORDER
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-[#F7F5F0] border border-white/15 transition-colors cursor-pointer"
                  title="Sign out of Atelier"
                >
                  <LogOut size={16} />
                </button>
              </div>

              {/* Background Watermark */}
              <div className="absolute right-4 -bottom-6 select-none pointer-events-none opacity-5">
                <span className="font-anton text-[140px] text-white uppercase leading-none">
                  SURFER
                </span>
              </div>
            </div>

            {/* Dashboard Tabs Bar */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 border-b border-[#D8D4CC]">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-[#0A0A0A] text-[#F7F5F0] shadow-sm"
                    : "bg-[#FCFAF6] text-[#555555] hover:text-[#0A0A0A] border border-[#D8D4CC]"
                }`}
              >
                <Package size={14} />
                <span>MY ORDERS (2)</span>
              </button>

              <button
                onClick={() => setActiveTab("measurements")}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "measurements"
                    ? "bg-[#0A0A0A] text-[#F7F5F0] shadow-sm"
                    : "bg-[#FCFAF6] text-[#555555] hover:text-[#0A0A0A] border border-[#D8D4CC]"
                }`}
              >
                <Ruler size={14} />
                <span>CAD MEASUREMENTS</span>
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "wishlist"
                    ? "bg-[#0A0A0A] text-[#F7F5F0] shadow-sm"
                    : "bg-[#FCFAF6] text-[#555555] hover:text-[#0A0A0A] border border-[#D8D4CC]"
                }`}
              >
                <Heart size={14} />
                <span>WISHLIST ARCHIVE (3)</span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-[#0A0A0A] text-[#F7F5F0] shadow-sm"
                    : "bg-[#FCFAF6] text-[#555555] hover:text-[#0A0A0A] border border-[#D8D4CC]"
                }`}
              >
                <Settings size={14} />
                <span>ADDRESSES & CONCIERGE</span>
              </button>
            </div>

            {/* Active Tab View */}
            <div className="pt-4">
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "measurements" && <MeasurementsTab />}
              {activeTab === "wishlist" && <WishlistTab />}
              {activeTab === "settings" && <SettingsTab />}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
