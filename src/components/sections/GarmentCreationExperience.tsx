"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX, ArrowDown, ChevronRight, Scissors, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface FabricVariant {
  name: string;
  fillBase: string;
  fillHighlight: string;
  fillShadow: string;
  threadColor: string;
  swatchHex: string;
  grainColor: string;
}

const FABRIC_VARIANTS: FabricVariant[] = [
  {
    name: "Natural Stone Oatmeal Twill",
    fillBase: "#D0C6B2",
    fillHighlight: "#E5DDD0",
    fillShadow: "#988D77",
    threadColor: "#B58E4E",
    swatchHex: "#D0C6B2",
    grainColor: "rgba(90, 75, 55, 0.08)",
  },
  {
    name: "Super 120s Charcoal Wool",
    fillBase: "#242830",
    fillHighlight: "#3B414C",
    fillShadow: "#14171C",
    threadColor: "#E0B758",
    swatchHex: "#242830",
    grainColor: "rgba(255, 255, 255, 0.05)",
  },
  {
    name: "Midnight Navy Tropical",
    fillBase: "#1A2234",
    fillHighlight: "#2D3A56",
    fillShadow: "#0E131F",
    threadColor: "#D4AF37",
    swatchHex: "#1A2234",
    grainColor: "rgba(255, 255, 255, 0.05)",
  },
  {
    name: "Olive Compact Gabardine",
    fillBase: "#414B3B",
    fillHighlight: "#5B6853",
    fillShadow: "#232A1F",
    threadColor: "#DFC15D",
    swatchHex: "#414B3B",
    grainColor: "rgba(255, 255, 255, 0.05)",
  },
];

const STAGES = [
  { id: "01", label: "THE FABRIC", title: "IT STARTS WITH NOTHING.", desc: "Raw material. Endless possibility." },
  { id: "02", label: "MARKING", title: "STARTING FROM THE PERSON.", desc: "Every curve calibrated to your individual anatomy." },
  { id: "03", label: "CUTTING", title: "INDIVIDUALLY SLICED.", desc: "No batch stacking. One garment cut for one person." },
  { id: "04", label: "PIECES", title: "THE ANATOMY OF PROPORTION.", desc: "Eight bespoke components ready for construction." },
  { id: "05", label: "POCKETS", title: "CONCEALED STRENGTH.", desc: "Deep slant pockets and reinforced bar-tacks." },
  { id: "06", label: "STITCHING", title: "FOURTEEN STITCHES PER INCH.", desc: "Silk-core thread engineered for generational longevity." },
  { id: "07", label: "ASSEMBLY", title: "JOINING THE PANELS.", desc: "Anatomical balance through seat, stride, and thigh." },
  { id: "08", label: "SHAPING", title: "TAKING VOLUMETRIC FORM.", desc: "Hand-set horn button, French fly, and crisp press lines." },
  { id: "09", label: "MADE FOR YOU", title: "MADE AROUND YOU.", desc: "Your measurements. Your fit. Your pants." },
];

export function GarmentCreationExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [selectedFabricIdx, setSelectedFabricIdx] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const activeFabric = FABRIC_VARIANTS[selectedFabricIdx];

  // Tactile Web Audio Synthesizer
  const playTactileSound = useCallback(
    (freq = 300, duration = 0.04, type: OscillatorType = "sine") => {
      if (!soundEnabled || !audioCtx) return;
      try {
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch {
        // Silent fallback
      }
    },
    [soundEnabled, audioCtx]
  );

  const toggleSound = () => {
    if (!audioCtx) {
      const newCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setAudioCtx(newCtx);
    }
    setSoundEnabled(!soundEnabled);
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastSoundProgress = 0;

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // --- GSAP SCROLLTRIGGER PINNING (10 VIEWPORT HEIGHTS) ---
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=4800",
      pin: true,
      scrub: 0.25,
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });

    scrollTriggerRef.current = trigger;

    // --- PROCEDURAL DRAWING ENGINE ---
    const renderScene = () => {
      animationFrameId = requestAnimationFrame(renderScene);

      // Direct smooth interpolation with zero jitter
      currentProgress += (targetProgress - currentProgress) * 0.18;
      setScrollProgress(currentProgress);

      const p = currentProgress; // 0.0 to 1.0
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update active stage
      let stageIdx = 0;
      if (p < 0.10) stageIdx = 0;
      else if (p < 0.22) stageIdx = 1;
      else if (p < 0.35) stageIdx = 2;
      else if (p < 0.48) stageIdx = 3;
      else if (p < 0.60) stageIdx = 4;
      else if (p < 0.72) stageIdx = 5;
      else if (p < 0.82) stageIdx = 6;
      else if (p < 0.92) stageIdx = 7;
      else stageIdx = 8;
      setActiveStageIdx(stageIdx);

      // Trigger audio feedback
      if (Math.abs(p - lastSoundProgress) > 0.015) {
        lastSoundProgress = p;
        if (p > 0.22 && p < 0.35) playTactileSound(440, 0.03, "triangle");
        else if (p >= 0.48 && p < 0.72) playTactileSound(600, 0.02, "sine");
        else if (p >= 0.82 && p < 0.92) playTactileSound(340, 0.04, "sine");
      }

      ctx.clearRect(0, 0, w, h);

      // 1. LUXURY DARK ATELIER BACKGROUND
      const bgGrad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        100,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.85
      );
      bgGrad.addColorStop(0, "#191C22");
      bgGrad.addColorStop(0.5, "#0F1115");
      bgGrad.addColorStop(1, "#07080A");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Cutting Mat Perimeter
      const margin = Math.max(24, w * 0.03);
      const matW = w - margin * 2;
      const matH = h - margin * 2;

      ctx.save();
      ctx.fillStyle = "rgba(22, 25, 31, 0.5)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.fillRect(margin, margin, matW, matH);
      ctx.strokeRect(margin, margin, matW, matH);

      // Millimeter Atelier Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.022)";
      ctx.lineWidth = 1;
      const step = 48;
      for (let x = margin + step; x < margin + matW; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, margin);
        ctx.lineTo(x, margin + matH);
        ctx.stroke();
      }
      for (let y = margin + step; y < margin + matH; y += step) {
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(margin + matW, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. TROUSER GEOMETRY & COORDINATES (Horizontal Tailor Bench Placement)
      const cx = w * 0.5;
      const cy = h * 0.52;
      const scale = Math.min(w / 1250, h / 750);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Horizontal orientation:
      // Left = Waistband (X ~ -340)
      // Center = Crotch fork (X ~ -100)
      // Right = Pant cuffs / Leg hem (X ~ +360)
      const wX = -340;
      const crX = -90;
      const cuffX = 360;

      // Top leg profile (Left Leg in horizontal view)
      const tWaistY = -135;
      const tOutseamKneeY = -155;
      const tCuffTopY = -130;
      const tCuffBottomY = -45;
      const tInseamKneeY = -65;

      // Bottom leg profile (Right Leg in horizontal view)
      const bWaistY = 135;
      const bOutseamKneeY = 155;
      const bCuffBottomY = 130;
      const bCuffTopY = 45;
      const bInseamKneeY = 65;

      // Master Trouser Outline Function
      const pathTrouserPerimeter = () => {
        ctx.beginPath();
        // 1. Waistband Left Edge
        ctx.moveTo(wX, tWaistY);
        // 2. Top Outseam to Cuff
        ctx.bezierCurveTo(wX + 110, tWaistY - 18, crX + 80, tOutseamKneeY, cuffX, tCuffTopY);
        // 3. Top Cuff Hem
        ctx.lineTo(cuffX, tCuffBottomY);
        // 4. Top Inseam to Crotch Fork
        ctx.bezierCurveTo(crX + 160, tInseamKneeY, crX + 50, -12, crX, 0);
        // 5. Bottom Inseam from Crotch Fork to Cuff
        ctx.bezierCurveTo(crX + 50, 12, crX + 160, bInseamKneeY, cuffX, bCuffTopY);
        // 6. Bottom Cuff Hem
        ctx.lineTo(cuffX, bCuffBottomY);
        // 7. Bottom Outseam to Waistband
        ctx.bezierCurveTo(crX + 80, bOutseamKneeY, wX + 110, bWaistY + 18, wX, bWaistY);
        // 8. Close back to top waistband
        ctx.closePath();
      };

      // Top Leg Panel Path
      const pathTopLeg = (offsetY = 0) => {
        ctx.beginPath();
        ctx.moveTo(wX, tWaistY + offsetY);
        ctx.bezierCurveTo(wX + 110, tWaistY - 18 + offsetY, crX + 80, tOutseamKneeY + offsetY, cuffX, tCuffTopY + offsetY);
        ctx.lineTo(cuffX, tCuffBottomY + offsetY);
        ctx.bezierCurveTo(crX + 160, tInseamKneeY + offsetY, crX + 50, -12 + offsetY, crX, offsetY);
        ctx.lineTo(wX, offsetY);
        ctx.closePath();
      };

      // Bottom Leg Panel Path
      const pathBottomLeg = (offsetY = 0) => {
        ctx.beginPath();
        ctx.moveTo(wX, offsetY);
        ctx.lineTo(crX, offsetY);
        ctx.bezierCurveTo(crX + 50, 12 + offsetY, crX + 160, bInseamKneeY + offsetY, cuffX, bCuffTopY + offsetY);
        ctx.lineTo(cuffX, bCuffBottomY + offsetY);
        ctx.bezierCurveTo(crX + 80, bOutseamKneeY + offsetY, wX + 110, bWaistY + 18 + offsetY, wX, bWaistY + offsetY);
        ctx.closePath();
      };

      // ==========================================
      // STAGE 01: RAW FABRIC BOLT (p: 0.00 -> 0.12)
      // ==========================================
      if (p < 0.36) {
        const rawAlpha = p < 0.22 ? 1 : Math.max(0, 1 - (p - 0.22) / 0.14);
        ctx.save();
        ctx.globalAlpha = rawAlpha;

        const boltW = 780;
        const boltH = 360;
        const boltX = -390;
        const boltY = -180;

        // Shadow under raw bolt
        ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
        ctx.shadowBlur = 32;
        ctx.shadowOffsetY = 16;

        // Fabric Bolt Surface
        const fabricGrad = ctx.createLinearGradient(boltX, boltY, boltX + boltW, boltY + boltH);
        fabricGrad.addColorStop(0, activeFabric.fillHighlight);
        fabricGrad.addColorStop(0.5, activeFabric.fillBase);
        fabricGrad.addColorStop(1, activeFabric.fillShadow);
        ctx.fillStyle = fabricGrad;
        ctx.beginPath();
        ctx.roundRect(boltX, boltY, boltW, boltH, 6);
        ctx.fill();

        // Selvage woven edge border
        ctx.strokeStyle = activeFabric.fillShadow;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Realistic Diagonal Twill Weave Grain
        ctx.fillStyle = activeFabric.grainColor;
        for (let gy = boltY; gy < boltY + boltH; gy += 4) {
          ctx.fillRect(boltX, gy, boltW, 1.5);
        }

        // Gold Selvage Typography
        ctx.fillStyle = "rgba(212, 175, 55, 0.85)";
        ctx.font = "bold 9px monospace";
        ctx.fillText("★ SURFER ATELIER · 100% NATURAL FIBER · BESPOKE COMMISSION ★", boltX + 24, boltY + 22);
        ctx.fillText("★ WEFT 340GSM · SINGLE-UNIT INDEPENDENT PATTERN CUT ★", boltX + 24, boltY + boltH - 14);

        ctx.restore();
      }

      // ==========================================
      // STAGE 02: CHALK MARKING (p: 0.10 -> 0.32)
      // ==========================================
      if (p >= 0.10 && p < 0.75) {
        const markProgress = Math.min(1, Math.max(0, (p - 0.10) / 0.14));

        ctx.save();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2.4;
        ctx.setLineDash([8, 6]);
        ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
        ctx.shadowBlur = 8;

        pathTrouserPerimeter();
        ctx.stroke();

        // Center Press Crease Chalk Line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.setLineDash([5, 8]);
        ctx.beginPath();
        ctx.moveTo(wX + 150, -90);
        ctx.lineTo(cuffX - 10, -87);
        ctx.moveTo(wX + 150, 90);
        ctx.lineTo(cuffX - 10, 87);
        ctx.stroke();

        // Tailor Measuring Annotation Badges
        if (markProgress > 0.25) {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 9px monospace";
          ctx.fillText("WAIST: 32.50 IN", wX + 15, tWaistY - 14);
          ctx.fillText("FRONT RISE: 11.00 IN", wX + 130, -8);
          ctx.fillText("INSEAM: 31.25 IN", crX + 80, -28);
          ctx.fillText("ANKLE OPENING: 16.00 IN", cuffX - 100, tCuffTopY - 14);
        }

        // Tailor's Chalk Tool
        if (p < 0.26) {
          const chalkT = (p - 0.10) / 0.16;
          const chalkAngle = chalkT * Math.PI * 2;
          const chX = wX + Math.cos(chalkAngle) * 200 + 200;
          const chY = Math.sin(chalkAngle) * 90;

          ctx.save();
          ctx.translate(chX, chY);
          ctx.rotate(chalkAngle);

          // Chalk Block
          ctx.fillStyle = "#F5F5F0";
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.roundRect(-14, -8, 28, 16, 3);
          ctx.fill();

          ctx.fillStyle = "#A88344";
          ctx.font = "bold 6px monospace";
          ctx.textAlign = "center";
          ctx.fillText("CHALK", 0, 2);

          ctx.restore();
        }

        ctx.restore();
      }

      // ==========================================
      // STAGE 03: CUTTING WITH SHEARS (p: 0.22 -> 0.38)
      // ==========================================
      if (p >= 0.22 && p < 0.42) {
        const cutT = (p - 0.22) / 0.16;
        const scissorAngle = cutT * Math.PI * 2;
        const sx = wX + Math.cos(scissorAngle) * 260 + 260;
        const sy = Math.sin(scissorAngle) * 110;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(scissorAngle + Math.PI / 4);

        const snip = Math.sin(cutT * 60) * 0.25;

        // Top Blade
        ctx.save();
        ctx.rotate(snip);
        ctx.fillStyle = "#C0C5CC";
        ctx.fillRect(0, -3.5, 70, 7);
        ctx.restore();

        // Bottom Blade
        ctx.save();
        ctx.rotate(-snip);
        ctx.fillStyle = "#E2E6EC";
        ctx.fillRect(0, -3.5, 70, 7);
        ctx.restore();

        // Gold Brass Shear Handles
        ctx.fillStyle = "#C89D56";
        ctx.beginPath();
        ctx.arc(-22, -12, 17, 0, Math.PI * 2);
        ctx.arc(-22, 12, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#15171B";
        ctx.beginPath();
        ctx.arc(-22, -12, 10, 0, Math.PI * 2);
        ctx.arc(-22, 12, 10, 0, Math.PI * 2);
        ctx.fill();

        // Pivot Gold Screw
        ctx.fillStyle = "#D4AF37";
        ctx.beginPath();
        ctx.arc(8, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // ==========================================
      // STAGE 04: INDIVIDUAL PIECES (p: 0.36 -> 0.50)
      // ==========================================
      if (p >= 0.36 && p < 0.52) {
        const driftT = (p - 0.36) / 0.14;
        const drift = Math.sin(driftT * Math.PI) * 22;

        ctx.save();
        ctx.fillStyle = activeFabric.fillBase;
        ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
        ctx.shadowBlur = 18;

        // Top Leg Panel drifted up
        ctx.save();
        pathTopLeg(-drift);
        ctx.fill();
        ctx.strokeStyle = activeFabric.fillShadow;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Bottom Leg Panel drifted down
        ctx.save();
        pathBottomLeg(drift);
        ctx.fill();
        ctx.strokeStyle = activeFabric.fillShadow;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Separate Waistband Strip Piece
        ctx.fillStyle = activeFabric.fillHighlight;
        ctx.fillRect(wX - 45, tWaistY - drift, 32, 270 + drift * 2);
        ctx.strokeStyle = activeFabric.fillShadow;
        ctx.strokeRect(wX - 45, tWaistY - drift, 32, 270 + drift * 2);

        // Labels
        ctx.fillStyle = "#D4AF37";
        ctx.font = "bold 8px monospace";
        ctx.fillText("PANEL A / FRONT LEFT", crX + 20, -drift - 90);
        ctx.fillText("PANEL B / FRONT RIGHT", crX + 20, drift + 95);
        ctx.fillText("WAISTBAND", wX - 42, 0);

        ctx.restore();
      }

      // ==========================================
      // STAGE 05, 06, 07: STITCHING & ASSEMBLY (p: 0.48 -> 0.88)
      // ==========================================
      if (p >= 0.48 && p < 0.90) {
        const stitchP = (p - 0.48) / 0.40;
        const stitchFrontierX = wX + stitchP * (cuffX - wX + 30);

        ctx.save();
        ctx.beginPath();
        ctx.rect(-450, -300, stitchFrontierX - (-450), 600);
        ctx.clip();

        // Assembled Solid Fabric Surface
        ctx.fillStyle = activeFabric.fillBase;
        ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
        ctx.shadowBlur = 24;
        pathTrouserPerimeter();
        ctx.fill();

        // Micro Woven Grain
        ctx.fillStyle = activeFabric.grainColor;
        for (let gy = -200; gy < 200; gy += 4) {
          ctx.fillRect(-380, gy, 780, 1.5);
        }

        // Waistband Seam Line
        ctx.strokeStyle = "rgba(0, 0, 0, 0.55)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(wX + 45, tWaistY + 5);
        ctx.lineTo(wX + 45, bWaistY - 5);
        ctx.stroke();

        // Double Forward Pleats
        ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(wX + 45, -100);
        ctx.quadraticCurveTo(wX + 110, -95, wX + 165, -90);
        ctx.moveTo(wX + 45, -75);
        ctx.quadraticCurveTo(wX + 100, -72, wX + 145, -68);
        ctx.moveTo(wX + 45, 100);
        ctx.quadraticCurveTo(wX + 110, 95, wX + 165, 90);
        ctx.moveTo(wX + 45, 75);
        ctx.quadraticCurveTo(wX + 100, 72, wX + 145, 68);
        ctx.stroke();

        // Slant Pockets & Bar-Tack Reinforcements
        ctx.strokeStyle = "#8A6D47";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(wX + 45, -125);
        ctx.lineTo(wX + 135, -135);
        ctx.moveTo(wX + 45, 125);
        ctx.lineTo(wX + 135, 135);
        ctx.stroke();

        // Fly Shield Hardware
        ctx.strokeStyle = "#8A6D47";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(wX + 45, -15);
        ctx.lineTo(crX - 10, -15);
        ctx.arcTo(crX, -15, crX, 0, 16);
        ctx.stroke();

        // Center Leg Press Creases
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(wX + 165, -90);
        ctx.lineTo(cuffX - 10, -87);
        ctx.moveTo(wX + 165, 90);
        ctx.lineTo(cuffX - 10, 87);
        ctx.stroke();

        // 14-Stitches/Inch Golden Silk Lockstitches
        ctx.strokeStyle = activeFabric.threadColor;
        ctx.lineWidth = 2.4;
        ctx.setLineDash([5, 4]);
        ctx.shadowColor = activeFabric.threadColor;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        // Top Outseam Seam
        ctx.moveTo(wX + 48, tWaistY + 4);
        ctx.bezierCurveTo(wX + 110, tWaistY - 14, crX + 80, tOutseamKneeY + 4, cuffX - 5, tCuffTopY + 4);
        // Bottom Outseam Seam
        ctx.moveTo(wX + 48, bWaistY - 4);
        ctx.bezierCurveTo(wX + 110, bWaistY + 14, crX + 80, bOutseamKneeY - 4, cuffX - 5, bCuffBottomY - 4);
        // Inseam Seam
        ctx.moveTo(cuffX - 5, tCuffBottomY - 4);
        ctx.bezierCurveTo(crX + 160, tInseamKneeY + 4, crX + 50, -8, crX, 0);
        ctx.bezierCurveTo(crX + 50, 8, crX + 160, bInseamKneeY - 4, cuffX - 5, bCuffTopY + 4);
        // Turn-up Hem Stitches
        ctx.moveTo(cuffX - 20, tCuffTopY);
        ctx.lineTo(cuffX - 20, tCuffBottomY);
        ctx.moveTo(cuffX - 20, bCuffTopY);
        ctx.lineTo(cuffX - 20, bCuffBottomY);
        ctx.stroke();

        // Genuine Horn Button at Waistband
        ctx.fillStyle = "#181410";
        ctx.strokeStyle = "#8A6D47";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wX + 25, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Button Cross-Stitch
        ctx.strokeStyle = activeFabric.threadColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(wX + 21, -4);
        ctx.lineTo(wX + 29, 4);
        ctx.moveTo(wX + 29, -4);
        ctx.lineTo(wX + 21, 4);
        ctx.stroke();

        ctx.restore();

        // Active Sewing Needle & Trailing Physics Thread
        const needleX = stitchFrontierX;
        const needleY = Math.sin(stitchP * 24) * 80;
        const needleDip = Math.sin(stitchP * 90) * 14;

        ctx.save();
        ctx.translate(needleX, needleY);

        // Tensile Silk Thread
        ctx.strokeStyle = activeFabric.threadColor;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(0, -25 + needleDip);
        ctx.bezierCurveTo(-30, -65, -60, -35, -100, -50);
        ctx.stroke();

        // Polished Steel Needle
        ctx.save();
        ctx.translate(0, needleDip);
        ctx.rotate(-Math.PI / 4);

        ctx.fillStyle = "#F0F2F5";
        ctx.shadowColor = "#FFFFFF";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.lineTo(2.8, -26);
        ctx.lineTo(-2.8, -26);
        ctx.closePath();
        ctx.fill();

        // Needle Eyelet
        ctx.fillStyle = "#121418";
        ctx.beginPath();
        ctx.ellipse(0, -20, 1.2, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.restore();
      }

      // ==========================================
      // STAGE 08 & 09: FINISHED TROUSERS & ATELIER FOLD (p: 0.88 -> 1.00)
      // ==========================================
      if (p >= 0.88) {
        const foldP = (p - 0.88) / 0.12;

        ctx.save();
        ctx.fillStyle = activeFabric.fillBase;
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 32;
        ctx.shadowOffsetY = 16;

        const foldX = crX + 30;

        // Left Half (Waist & Seat)
        ctx.beginPath();
        ctx.moveTo(wX, tWaistY);
        ctx.bezierCurveTo(wX + 80, tWaistY - 5, foldX - 40, -105, foldX, -95);
        ctx.lineTo(foldX, 95);
        ctx.bezierCurveTo(foldX - 40, 105, wX + 80, bWaistY + 5, wX, bWaistY);
        ctx.closePath();
        ctx.fill();

        // Waistband Seam
        ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(wX + 45, tWaistY + 5);
        ctx.lineTo(wX + 45, bWaistY - 5);
        ctx.stroke();

        // Horn Button
        ctx.fillStyle = "#181410";
        ctx.strokeStyle = "#8A6D47";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wX + 25, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Right Half (Legs folding over center line)
        ctx.save();
        ctx.translate(foldX, 0);
        ctx.scale(Math.cos(foldP * Math.PI), 1);

        if (foldP > 0.1) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
          ctx.shadowBlur = 28 * foldP;
          ctx.shadowOffsetX = -14 * foldP;
        }

        ctx.fillStyle = activeFabric.fillBase;
        ctx.beginPath();
        ctx.moveTo(0, -95);
        ctx.bezierCurveTo(80, -100, 200, tCuffTopY - 15, cuffX - foldX, tCuffTopY);
        ctx.lineTo(cuffX - foldX, tCuffBottomY);
        ctx.bezierCurveTo(120, tCuffBottomY + 10, 40, -10, 0, 0);
        ctx.bezierCurveTo(40, 10, 120, bCuffTopY - 10, cuffX - foldX, bCuffTopY);
        ctx.lineTo(cuffX - foldX, bCuffBottomY);
        ctx.bezierCurveTo(200, bCuffBottomY + 15, 80, 100, 0, 95);
        ctx.closePath();
        ctx.fill();

        // Turn-up Hem stitches on folded leg
        ctx.strokeStyle = activeFabric.threadColor;
        ctx.lineWidth = 2.4;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(cuffX - foldX - 20, tCuffTopY);
        ctx.lineTo(cuffX - foldX - 20, tCuffBottomY);
        ctx.moveTo(cuffX - foldX - 20, bCuffTopY);
        ctx.lineTo(cuffX - foldX - 20, bCuffBottomY);
        ctx.stroke();

        ctx.restore();

        // Gold Foil SURFER Atelier Ribbon & Presentation Seal
        if (foldP > 0.6) {
          const ribbonAlpha = (foldP - 0.6) / 0.4;
          ctx.save();
          ctx.globalAlpha = ribbonAlpha;

          // Silk Satin Ribbon
          ctx.fillStyle = "#8A6D47";
          ctx.fillRect(wX + 110, -160, 36, 320);
          ctx.strokeStyle = "#D4AF37";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(wX + 110, -160, 36, 320);

          // Atelier Gold Wax Seal
          ctx.fillStyle = "#FCFAF6";
          ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(wX + 128, 0, 28, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#0A0A0A";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("SURFER", wX + 128, -4);
          ctx.fillStyle = "#8A6D47";
          ctx.font = "7px monospace";
          ctx.fillText("BESPOKE", wX + 128, 6);

          ctx.restore();
        }

        ctx.restore();
      }

      ctx.restore();
    };

    renderScene();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
      trigger.kill();
    };
  }, [selectedFabricIdx, soundEnabled, playTactileSound]);

  const activeStage = STAGES[activeStageIdx] || STAGES[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#070809] border-t border-white/5 overflow-hidden text-[#FCFAF6] select-none"
    >
      {/* Real-time Atelier Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* TOP LEFT: Brand & Active Stage Heading */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-20 max-w-md pointer-events-none">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
            {activeStage.id} / {activeStage.label}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FCFAF6] font-normal tracking-tight leading-[1.1]">
          {activeStage.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#A0A0A0] font-sans leading-relaxed mt-2 max-w-xs">
          {activeStage.desc}
        </p>
      </div>

      {/* TOP RIGHT: Minimal Sound Toggle */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12 z-20 flex items-center gap-4">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 bg-black/40 hover:bg-black/60 border border-white/10 text-xs font-mono text-[#A0A0A0] hover:text-white transition-colors cursor-pointer backdrop-blur-md"
          title={soundEnabled ? "Mute Atelier Audio" : "Enable Tactile Audio"}
        >
          {soundEnabled ? <Volume2 size={14} className="text-[#D4AF37]" /> : <VolumeX size={14} />}
          <span className="text-[10px] tracking-widest">
            {soundEnabled ? "AUDIO ON" : "AUDIO MUTED"}
          </span>
        </button>
      </div>

      {/* RIGHT EDGE: Minimal Vertical Stage Progress Indicator */}
      <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-4 pointer-events-none">
        {STAGES.map((stg, idx) => (
          <div key={stg.id} className="flex items-center gap-3 group">
            <span
              className={cn(
                "text-[9px] font-mono tracking-widest transition-all duration-300",
                activeStageIdx === idx
                  ? "text-[#D4AF37] opacity-100 font-bold scale-110"
                  : "text-[#666666] opacity-40"
              )}
            >
              {stg.id}
            </span>
            <div
              className={cn(
                "w-1.5 transition-all duration-300 rounded-full",
                activeStageIdx === idx
                  ? "h-6 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
                  : "h-1.5 bg-white/20"
              )}
            />
          </div>
        ))}
      </div>

      {/* CENTER INITIAL SCROLL HINT (Fades out quickly) */}
      {scrollProgress < 0.03 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-700">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-black/60 backdrop-blur-md border border-white/10 max-w-sm text-center">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
              SURFER BESPOKE TAILORING
            </span>
            <h1 className="font-serif text-4xl text-[#FCFAF6]">Pants Made For You.</h1>
            <p className="text-xs text-[#888888] font-sans tracking-wide">
              Scroll down to physically control the manufacturing process from raw fabric to
              finished trousers.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] mt-2 animate-bounce">
              <ArrowDown size={14} />
              <span>SCROLL TO CRAFT</span>
            </div>
          </div>
        </div>
      )}

      {/* FINAL EMOTIONAL PAYOFF MODAL (Appears when completed at p > 0.94) */}
      {scrollProgress > 0.94 && (
        <div className="absolute bottom-24 sm:bottom-28 left-8 sm:left-12 z-30 flex flex-col items-start gap-4 p-6 sm:p-8 bg-black/70 backdrop-blur-md border border-[#D4AF37]/30 max-w-md animate-fade-in">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
            COMMISSION CERTIFIED · SINGLE-UNIT
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#FCFAF6] leading-none">
            MADE AROUND YOU.
          </h3>
          <p className="text-xs text-[#AAAAAA] font-sans leading-relaxed">
            Your measurements. Your chosen fit. Trousers handcrafted around your life.
          </p>
          <a
            href="#collection"
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A0A0A] text-xs font-mono font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-lg"
          >
            <span>EXPLORE THE COLLECTION</span>
            <ChevronRight size={14} />
          </a>
        </div>
      )}

      {/* BOTTOM HUD: Cloth Swatch Switcher & Biometric Parameters */}
      <div className="absolute bottom-8 sm:bottom-10 left-8 sm:left-12 right-8 sm:right-12 z-20 max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pointer-events-none">
        {/* Biometric Measurement Feed */}
        <div className="p-4 bg-black/50 backdrop-blur-md border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-xs font-mono pointer-events-auto">
          <div>
            <span className="text-[9px] text-[#777777] uppercase block">WAIST</span>
            <span className="text-[#FCFAF6] font-semibold">32.50 IN / 82.5 CM</span>
          </div>
          <div>
            <span className="text-[9px] text-[#777777] uppercase block">INSEAM</span>
            <span className="text-[#FCFAF6] font-semibold">31.25 IN / 79.4 CM</span>
          </div>
          <div>
            <span className="text-[9px] text-[#777777] uppercase block">RISE</span>
            <span className="text-[#FCFAF6] font-semibold">11.00 IN / 28.0 CM</span>
          </div>
          <div>
            <span className="text-[9px] text-[#777777] uppercase block">TAPER</span>
            <span className="text-[#FCFAF6] font-semibold">16.00 IN / 40.6 CM</span>
          </div>
        </div>

        {/* Cloth Swatch Selector */}
        <div className="p-4 bg-black/50 backdrop-blur-md border border-white/10 flex flex-col gap-2 pointer-events-auto">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[9px] font-mono text-[#777777] uppercase tracking-wider">
              COMMISSION TEXTILE
            </span>
            <span className="text-xs font-serif text-[#D4AF37]">{activeFabric.name}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            {FABRIC_VARIANTS.map((fabric, fIdx) => (
              <button
                key={fabric.name}
                onClick={() => setSelectedFabricIdx(fIdx)}
                className={cn(
                  "w-6 h-6 border transition-transform duration-200 cursor-pointer",
                  selectedFabricIdx === fIdx
                    ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-black scale-110 border-white"
                    : "border-white/20 hover:scale-105"
                )}
                style={{ backgroundColor: fabric.swatchHex }}
                title={fabric.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
