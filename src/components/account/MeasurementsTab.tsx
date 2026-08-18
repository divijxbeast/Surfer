"use client";

import React, { useState } from "react";
import { Ruler, Check, Sliders, Info, ShieldCheck, Sparkles } from "lucide-react";

export function MeasurementsTab() {
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [waist, setWaist] = useState(32.5);
  const [inseam, setInseam] = useState(31.0);
  const [rise, setRise] = useState(11.5);
  const [thigh, setThigh] = useState(25.0);
  const [hip, setHip] = useState(40.0);
  const [ankleOpening, setAnkleOpening] = useState(22.0);
  const [fitPreference, setFitPreference] = useState("relaxed");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8D4CC]">
        <div>
          <h3 className="font-anton text-2xl sm:text-3xl text-[#0A0A0A] uppercase tracking-wide">
            BIOMETRIC CAD MEASUREMENT VAULT
          </h3>
          <p className="text-xs text-[#666666] font-sans mt-0.5">
            Your personalized anatomical profile used by our atelier cutters to draft single-piece garment patterns.
          </p>
        </div>

        {/* Unit Switcher */}
        <div className="flex items-center gap-1 bg-[#ECEAE5] p-1 border border-[#D8D4CC]">
          <button
            type="button"
            onClick={() => setUnit("in")}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase font-bold transition-all ${
              unit === "in" ? "bg-[#0A0A0A] text-[#F7F5F0]" : "text-[#666666] hover:text-[#0A0A0A]"
            }`}
          >
            INCHES (IN)
          </button>
          <button
            type="button"
            onClick={() => setUnit("cm")}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase font-bold transition-all ${
              unit === "cm" ? "bg-[#0A0A0A] text-[#F7F5F0]" : "text-[#666666] hover:text-[#0A0A0A]"
            }`}
          >
            METRIC (CM)
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Measurement Sliders & Precision Inputs */}
        <div className="lg:col-span-7 bg-[#FCFAF6] border border-[#D8D4CC] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D6]">
            <span className="text-xs font-mono font-bold tracking-wider text-[#0A0A0A] uppercase">
              CALIBRATED SPECIFICATIONS
            </span>
            <span className="text-[10px] font-mono text-[#9E7B5C] font-semibold">
              ACCURACY: ±0.5MM
            </span>
          </div>

          {/* Waist */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-sans font-bold text-[#0A0A0A] uppercase tracking-wide">
                Natural Waist Circumference
              </label>
              <span className="font-mono font-bold text-[#0A0A0A]">
                {unit === "in" ? `${waist.toFixed(1)} in` : `${(waist * 2.54).toFixed(1)} cm`}
              </span>
            </div>
            <input
              type="range"
              min={26}
              max={44}
              step={0.5}
              value={waist}
              onChange={(e) => setWaist(parseFloat(e.target.value))}
              className="w-full accent-[#0A0A0A] cursor-pointer"
            />
            <p className="text-[10px] text-[#777777] font-sans">
              Measured 2 fingers above the navel where your waistband rests naturally.
            </p>
          </div>

          {/* Inseam */}
          <div className="space-y-2 pt-3 border-t border-[#EAE7DF]">
            <div className="flex items-center justify-between text-xs">
              <label className="font-sans font-bold text-[#0A0A0A] uppercase tracking-wide">
                Inside Leg (Inseam Break)
              </label>
              <span className="font-mono font-bold text-[#0A0A0A]">
                {unit === "in" ? `${inseam.toFixed(1)} in` : `${(inseam * 2.54).toFixed(1)} cm`}
              </span>
            </div>
            <input
              type="range"
              min={26}
              max={38}
              step={0.5}
              value={inseam}
              onChange={(e) => setInseam(parseFloat(e.target.value))}
              className="w-full accent-[#0A0A0A] cursor-pointer"
            />
            <p className="text-[10px] text-[#777777] font-sans">
              From crotch seam to your preferred shoe break line.
            </p>
          </div>

          {/* Rise */}
          <div className="space-y-2 pt-3 border-t border-[#EAE7DF]">
            <div className="flex items-center justify-between text-xs">
              <label className="font-sans font-bold text-[#0A0A0A] uppercase tracking-wide">
                Front Rise Architecture
              </label>
              <span className="font-mono font-bold text-[#0A0A0A]">
                {unit === "in" ? `${rise.toFixed(1)} in` : `${(rise * 2.54).toFixed(1)} cm`}
              </span>
            </div>
            <input
              type="range"
              min={9.5}
              max={14.0}
              step={0.25}
              value={rise}
              onChange={(e) => setRise(parseFloat(e.target.value))}
              className="w-full accent-[#0A0A0A] cursor-pointer"
            />
            <p className="text-[10px] text-[#777777] font-sans">
              Determines whether your trousers sit mid-waist or high-rise.
            </p>
          </div>

          {/* Thigh & Hip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#EAE7DF]">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-sans font-bold text-[#0A0A0A] uppercase tracking-wide">
                  Thigh Girth
                </label>
                <span className="font-mono font-bold text-[#0A0A0A]">
                  {unit === "in" ? `${thigh.toFixed(1)} in` : `${(thigh * 2.54).toFixed(1)} cm`}
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={32}
                step={0.5}
                value={thigh}
                onChange={(e) => setThigh(parseFloat(e.target.value))}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-sans font-bold text-[#0A0A0A] uppercase tracking-wide">
                  Hip Seat Circumference
                </label>
                <span className="font-mono font-bold text-[#0A0A0A]">
                  {unit === "in" ? `${hip.toFixed(1)} in` : `${(hip * 2.54).toFixed(1)} cm`}
                </span>
              </div>
              <input
                type="range"
                min={34}
                max={50}
                step={0.5}
                value={hip}
                onChange={(e) => setHip(parseFloat(e.target.value))}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#0A0A0A] hover:bg-[#262626] text-[#F7F5F0] text-xs font-mono font-bold tracking-[0.24em] uppercase transition-all duration-200 cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2"
            >
              <Check size={14} />
              <span>{isSaved ? "BIOMETRIC PROFILE SAVED ✓" : "SAVE CAD MEASUREMENTS"}</span>
            </button>
          </div>
        </div>

        {/* Right: Silhouette Aesthetic & Visual CAD Spec Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fit Silhouette Preset Selector */}
          <div className="bg-[#FCFAF6] border border-[#D8D4CC] p-6 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.22em] text-[#9E7B5C] uppercase font-bold block">
              PRIMARY SILHOUETTE PREFERENCE
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "slim", label: "SLIM ARCHITECTURAL" },
                { id: "regular", label: "REGULAR CONTEMPORARY" },
                { id: "relaxed", label: "RELAXED FLUID" },
                { id: "wide", label: "WIDE STATEMENT" },
              ].map((fit) => (
                <button
                  key={fit.id}
                  type="button"
                  onClick={() => setFitPreference(fit.id)}
                  className={`p-3 text-left border text-xs font-sans font-bold transition-all ${
                    fitPreference === fit.id
                      ? "bg-[#0A0A0A] text-[#F7F5F0] border-[#0A0A0A]"
                      : "bg-[#F7F5F0] text-[#0A0A0A] border-[#D8D4CC] hover:border-[#9E7B5C]"
                  }`}
                >
                  {fit.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual CAD Blueprint Summary */}
          <div className="bg-[#0A0A0A] text-[#F7F5F0] p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                DIGITAL PATTERN #CAD-8821
              </span>
              <span className="text-[10px] font-mono text-[#888888]">VERIFIED PROFILE</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">WAIST CURVE:</span>
                <span className="font-bold text-[#F7F5F0]">{waist} in</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">INSEAM LENGTH:</span>
                <span className="font-bold text-[#F7F5F0]">{inseam} in</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">RISE DEPTH:</span>
                <span className="font-bold text-[#F7F5F0]">{rise} in</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">THIGH VOLUME:</span>
                <span className="font-bold text-[#F7F5F0]">{thigh} in</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">ESTIMATED ANKLE OPENING:</span>
                <span className="font-bold text-[#D4AF37]">{ankleOpening} cm</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-[#888888]">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              <span>Auto-applied to any trousers added to cart</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
