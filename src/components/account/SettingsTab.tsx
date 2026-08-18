"use client";

import React, { useState } from "react";
import { MapPin, CreditCard, MessageSquare, Check, Shield, User } from "lucide-react";

export function SettingsTab() {
  const [addressSaved, setAddressSaved] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [conciergeMsg, setConciergeMsg] = useState("");

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddressSaved(true);
    setTimeout(() => setAddressSaved(false), 3000);
  };

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeMsg.trim()) return;
    setMessageSent(true);
    setConciergeMsg("");
    setTimeout(() => setMessageSent(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8D4CC]">
        <div>
          <h3 className="font-anton text-2xl sm:text-3xl text-[#0A0A0A] uppercase tracking-wide">
            CLIENT SETTINGS & ATELIER CONCIERGE
          </h3>
          <p className="text-xs text-[#666666] font-sans mt-0.5">
            Manage your bespoke shipping addresses, payment vaults, and communicate directly with your dedicated tailor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Primary Shipping Address & Profile */}
        <div className="lg:col-span-7 bg-[#FCFAF6] border border-[#D8D4CC] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E0D6]">
            <MapPin size={16} className="text-[#9E7B5C]" />
            <span className="text-xs font-mono font-bold tracking-wider text-[#0A0A0A] uppercase">
              PRIMARY DELIVERY RESIDENCE
            </span>
          </div>

          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  defaultValue="Julian"
                  className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3.5 py-2 text-xs text-[#0A0A0A]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1">
                  LAST NAME
                </label>
                <input
                  type="text"
                  defaultValue="Vance"
                  className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3.5 py-2 text-xs text-[#0A0A0A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1">
                STREET ADDRESS
              </label>
              <input
                type="text"
                defaultValue="742 Evergreen Atelier Way, Apt 4B"
                className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3.5 py-2 text-xs text-[#0A0A0A]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1">
                  CITY
                </label>
                <input
                  type="text"
                  defaultValue="New York"
                  className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3 py-2 text-xs text-[#0A0A0A]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1">
                  STATE
                </label>
                <input
                  type="text"
                  defaultValue="NY"
                  className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3 py-2 text-xs text-[#0A0A0A]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-[#0A0A0A] uppercase font-bold mb-1">
                  POSTAL CODE
                </label>
                <input
                  type="text"
                  defaultValue="10012"
                  className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] px-3 py-2 text-xs text-[#0A0A0A]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-[#262626] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-sm cursor-pointer mt-2"
            >
              {addressSaved ? "ADDRESS SAVED ✓" : "UPDATE ADDRESS"}
            </button>
          </form>
        </div>

        {/* Right: Atelier Concierge Messaging */}
        <div className="lg:col-span-5 bg-[#FCFAF6] border border-[#D8D4CC] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E0D6]">
            <MessageSquare size={16} className="text-[#9E7B5C]" />
            <span className="text-xs font-mono font-bold tracking-wider text-[#0A0A0A] uppercase">
              DIRECT ATELIER CONCIERGE
            </span>
          </div>

          <p className="text-xs text-[#666666] font-sans leading-relaxed">
            Have a special fit request, need an alteration consult, or want custom monogramming? Send a direct note to your master tailor.
          </p>

          {messageSent && (
            <div className="p-3.5 bg-[#EBE7DF] border border-[#9E7B5C] text-xs text-[#0A0A0A] font-sans">
              <strong>Message dispatched!</strong> Your atelier concierge will respond within 4 business hours.
            </div>
          )}

          <form onSubmit={handleConciergeSubmit} className="space-y-3">
            <textarea
              rows={4}
              required
              value={conciergeMsg}
              onChange={(e) => setConciergeMsg(e.target.value)}
              placeholder="e.g. Could we add 0.5 cm extra room to the left thigh for athletic comfort?"
              className="w-full bg-[#F7F5F0] border border-[#D8D4CC] focus:border-[#0A0A0A] p-3 text-xs text-[#0A0A0A] placeholder-[#999999]"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#0A0A0A] hover:bg-[#262626] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-sm cursor-pointer"
            >
              SEND MESSAGE TO TAILOR
            </button>
          </form>

          <div className="pt-4 border-t border-[#EAE7DF] text-[10px] font-mono text-[#888888] flex items-center gap-1.5">
            <Shield size={12} className="text-[#9E7B5C]" />
            <span>Direct channel to Biella & Okayama workshops</span>
          </div>
        </div>
      </div>
    </div>
  );
}
