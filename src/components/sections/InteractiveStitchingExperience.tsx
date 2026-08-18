"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX, Scissors, ArrowDown, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface FabricColorOption {
  name: string;
  fillColor: string;
  shadowColor: string;
  chalkColor: string;
  threadColor: string;
  swatchHex: string;
}

const FABRIC_COLOR_OPTIONS: FabricColorOption[] = [
  {
    name: "Natural Stone Oatmeal Twill",
    fillColor: "#C5BAA5",
    shadowColor: "#8C816E",
    chalkColor: "#FFFFFF",
    threadColor: "#8A6D3B",
    swatchHex: "#C5BAA5",
  },
  {
    name: "Super 120s Charcoal Wool",
    fillColor: "#22252A",
    shadowColor: "#111215",
    chalkColor: "#FFFFFF",
    threadColor: "#D4AF37",
    swatchHex: "#22252A",
  },
  {
    name: "Midnight Navy Tropical",
    fillColor: "#161E2E",
    shadowColor: "#0B1019",
    chalkColor: "#FFFFFF",
    threadColor: "#C9A96E",
    swatchHex: "#161E2E",
  },
  {
    name: "Olive Compact Gabardine",
    fillColor: "#3F4739",
    shadowColor: "#22271E",
    chalkColor: "#FFFFFF",
    threadColor: "#D4AF37",
    swatchHex: "#3F4739",
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

export function InteractiveStitchingExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [selectedFabricIdx, setSelectedFabricIdx] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const activeFabric = FABRIC_COLOR_OPTIONS[selectedFabricIdx];

  // Optional Web Audio Synth for Tactile Feedback
  const playTactileSound = useCallback((freq = 300, duration = 0.04, type: OscillatorType = "sine") => {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  }, [soundEnabled, audioCtx]);

  const toggleSound = () => {
    if (!audioCtx) {
      const newCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
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
    let lastSoundTrigger = 0;

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

    // --- GSAP SCROLLTRIGGER PINNING (10 Viewport Heights) ---
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=4200",
      pin: true,
      scrub: 0.35,
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });

    scrollTriggerRef.current = trigger;

    // --- MASTER CINEMATIC GARMENT CREATION RENDER LOOP ---
    const renderScene = () => {
      animationFrameId = requestAnimationFrame(renderScene);

      // Silky smooth interpolation for reversible scrub
      currentProgress += (targetProgress - currentProgress) * 0.12;
      setScrollProgress(currentProgress);

      const p = currentProgress; // 0.0 to 1.0
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update Active Stage Index
      let stageIdx = 0;
      if (p < 0.10) stageIdx = 0;
      else if (p < 0.22) stageIdx = 1;
      else if (p < 0.36) stageIdx = 2;
      else if (p < 0.48) stageIdx = 3;
      else if (p < 0.60) stageIdx = 4;
      else if (p < 0.72) stageIdx = 5;
      else if (p < 0.82) stageIdx = 6;
      else if (p < 0.92) stageIdx = 7;
      else stageIdx = 8;
      setActiveStageIdx(stageIdx);

      // Trigger Subtle Audio
      if (Math.abs(p - lastSoundTrigger) > 0.02) {
        lastSoundTrigger = p;
        if (p > 0.22 && p < 0.36) playTactileSound(420, 0.03, "triangle"); // Scissor snip
        else if (p >= 0.48 && p < 0.72) playTactileSound(580, 0.02, "sine"); // Needle pierce
        else if (p >= 0.88) playTactileSound(220, 0.06, "sine"); // Fabric fold
      }

      ctx.clearRect(0, 0, w, h);

      // --- 1. DARK CINEMATIC ATELIER ENVIRONMENT ---
      // Near-black charcoal with subtle radial key-light
      const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.48, 50, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      bgGrad.addColorStop(0, "#15171B");
      bgGrad.addColorStop(0.6, "#0E0F12");
      bgGrad.addColorStop(1, "#070809");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Workbench subtle surface plane
      const tableMargin = Math.max(20, w * 0.025);
      const tableW = w - tableMargin * 2;
      const tableH = h - tableMargin * 2;

      ctx.save();
      ctx.fillStyle = "rgba(18, 20, 24, 0.6)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.fillRect(tableMargin, tableMargin, tableW, tableH);
      ctx.strokeRect(tableMargin, tableMargin, tableW, tableH);

      // Fine Tailoring Millimeter Grid Lines on Table
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      const gridStep = 50;
      for (let x = tableMargin + gridStep; x < tableMargin + tableW; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, tableMargin);
        ctx.lineTo(x, tableMargin + tableH);
        ctx.stroke();
      }
      for (let y = tableMargin + gridStep; y < tableMargin + tableH; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(tableMargin, y);
        ctx.lineTo(tableMargin + tableW, y);
        ctx.stroke();
      }
      ctx.restore();

      // --- 2. TROUSERS & TEXTILE GEOMETRY MAPPING ---
      // Centered with proportional scale
      const centerX = w * 0.5;
      const centerY = h * 0.52;
      const pantScale = Math.min(w / 1180, h / 720);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(pantScale, pantScale);

      const waistX = -320;
      const crotchX = -100;
      const cuffX = 360;

      const waistTopY = -135;
      const waistBottomY = 135;

      const topCuffTopY = -120;
      const topCuffBottomY = -35;

      const bottomCuffTopY = 35;
      const bottomCuffBottomY = 120;

      // Full Trouser Outer Perimeter Path Function
      const drawTrouserOutline = () => {
        ctx.beginPath();
        ctx.moveTo(waistX, waistTopY);
        ctx.bezierCurveTo(waistX + 120, waistTopY - 10, crotchX + 80, topCuffTopY - 15, cuffX, topCuffTopY);
        ctx.lineTo(cuffX, topCuffBottomY);
        ctx.bezierCurveTo(crotchX + 160, topCuffBottomY + 10, crotchX + 40, -10, crotchX, 0);
        ctx.bezierCurveTo(crotchX + 40, 10, crotchX + 160, bottomCuffTopY - 10, cuffX, bottomCuffTopY);
        ctx.lineTo(cuffX, bottomCuffBottomY);
        ctx.bezierCurveTo(crotchX + 80, bottomCuffBottomY + 15, waistX + 120, waistBottomY + 10, waistX, waistBottomY);
        ctx.closePath();
      };

      // --- STAGE 01: RAW FABRIC (p: 0.00 -> 0.12) ---
      if (p < 0.38) {
        const rawAlpha = p < 0.22 ? 1 : Math.max(0, 1 - (p - 0.22) / 0.16);
        ctx.save();
        ctx.globalAlpha = rawAlpha;

        // Large uncut horizontal raw textile bolt
        const rawW = 760;
        const rawH = 340;
        const rawX = -380;
        const rawY = -170;

        // Realistic Fabric Shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 12;

        // Raw Fabric Base
        ctx.fillStyle = activeFabric.fillColor;
        ctx.beginPath();
        ctx.roundRect(rawX, rawY, rawW, rawH, 4);
        ctx.fill();

        // Raw Frayed Edges
        ctx.strokeStyle = activeFabric.shadowColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Realistic Weave Texture Lines
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        for (let ty = rawY; ty < rawY + rawH; ty += 4) {
          ctx.fillRect(rawX, ty, rawW, 1.5);
        }

        // Woven Selvage Text along edge
        ctx.fillStyle = "rgba(212, 175, 55, 0.65)";
        ctx.font = "bold 9px monospace";
        ctx.fillText("★ SURFER ATELIER · 100% NATURAL FIBER · BESPOKE COMMISSION ★", rawX + 24, rawY + 18);
        ctx.fillText("★ WEFT 340GSM · SINGLE-UNIT INDEPENDENT PATTERN CUT ★", rawX + 24, rawY + rawH - 12);

        ctx.restore();
      }

      // --- STAGE 02: MEASUREMENT / MARKING (p: 0.10 -> 0.32) ---
      if (p >= 0.10 && p < 0.75) {
        const markProgress = Math.min(1, Math.max(0, (p - 0.10) / 0.14)); // 0 to 1

        ctx.save();
        // Tailor Chalk Guideline
        ctx.strokeStyle = activeFabric.chalkColor;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([7, 5]);
        ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
        ctx.shadowBlur = 6;

        // Progressive Chalk Drawing
        drawTrouserOutline();
        ctx.stroke();

        // Center Leg Press Guidelines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.setLineDash([5, 8]);
        ctx.beginPath();
        ctx.moveTo(waistX + 150, -85);
        ctx.lineTo(cuffX - 10, -80);
        ctx.moveTo(waistX + 150, 85);
        ctx.lineTo(cuffX - 10, 80);
        ctx.stroke();

        // Subtle Measurement Annotations
        if (markProgress > 0.3) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
          ctx.font = "9px monospace";
          ctx.fillText("WAIST: 32.50 IN", waistX + 10, waistTopY - 14);
          ctx.fillText("RISE: 11.00 IN", waistX + 130, -5);
          ctx.fillText("INSEAM: 31.25 IN", crotchX + 80, -25);
          ctx.fillText("TAPER: 16.00 IN", cuffX - 60, topCuffTopY - 14);
        }

        // Tailor Measuring Tape lying curved
        if (p < 0.26) {
          ctx.strokeStyle = "#D4AF37";
          ctx.lineWidth = 3;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.moveTo(waistX - 10, waistTopY + 20);
          ctx.quadraticCurveTo(waistX + 80, -10, waistX + 160, waistBottomY - 20);
          ctx.stroke();
        }

        ctx.restore();
      }

      // --- STAGE 03: CUTTING WITH SHEARS (p: 0.22 -> 0.38) ---
      if (p >= 0.22 && p < 0.42) {
        const cutT = (p - 0.22) / 0.16; // 0 to 1
        const scissorAngle = cutT * Math.PI * 2;
        const sx = waistX + Math.cos(scissorAngle) * 260 + 260;
        const sy = Math.sin(scissorAngle) * 110;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(scissorAngle + Math.PI / 4);

        const snip = Math.sin(cutT * 50) * 0.22;

        // Dark Brushed Steel Blades
        ctx.save();
        ctx.rotate(snip);
        ctx.fillStyle = "#A8A8A8";
        ctx.fillRect(0, -3, 65, 6);
        ctx.restore();

        ctx.save();
        ctx.rotate(-snip);
        ctx.fillStyle = "#CCCCCC";
        ctx.fillRect(0, -3, 65, 6);
        ctx.restore();

        // Gold Handle Loops
        ctx.fillStyle = "#C89D56";
        ctx.beginPath();
        ctx.arc(-20, -10, 16, 0, Math.PI * 2);
        ctx.arc(-20, 10, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#15171B";
        ctx.beginPath();
        ctx.arc(-20, -10, 9, 0, Math.PI * 2);
        ctx.arc(-20, 10, 9, 0, Math.PI * 2);
        ctx.fill();

        // Pivot Screw
        ctx.fillStyle = "#D4AF37";
        ctx.beginPath();
        ctx.arc(8, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // --- STAGE 04: SEPARATED PATTERN PIECES (p: 0.36 -> 0.50) ---
      if (p >= 0.36 && p < 0.52) {
        const driftT = (p - 0.36) / 0.14;
        const drift = Math.sin(driftT * Math.PI) * 18;

        ctx.save();
        // Cut pieces subtly drift apart
        ctx.fillStyle = activeFabric.fillColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 12;

        // Top Leg Panel
        ctx.save();
        ctx.translate(0, -drift);
        ctx.beginPath();
        ctx.moveTo(waistX, waistTopY);
        ctx.bezierCurveTo(waistX + 120, waistTopY - 10, crotchX + 80, topCuffTopY - 15, cuffX, topCuffTopY);
        ctx.lineTo(cuffX, topCuffBottomY);
        ctx.bezierCurveTo(crotchX + 160, topCuffBottomY + 10, crotchX + 40, -10, crotchX, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Bottom Leg Panel
        ctx.save();
        ctx.translate(0, drift);
        ctx.beginPath();
        ctx.moveTo(crotchX, 0);
        ctx.bezierCurveTo(crotchX + 40, 10, crotchX + 160, bottomCuffTopY - 10, cuffX, bottomCuffTopY);
        ctx.lineTo(cuffX, bottomCuffBottomY);
        ctx.bezierCurveTo(crotchX + 80, bottomCuffBottomY + 15, waistX + 120, waistBottomY + 10, waistX, waistBottomY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Waistband Strip
        ctx.fillStyle = activeFabric.shadowColor;
        ctx.fillRect(waistX - 35, waistTopY, 28, 270);

        ctx.restore();
      }

      // --- STAGE 05, 06, 07: PROGRESSIVE NEEDLEWORK & ASSEMBLY (p: 0.48 -> 0.88) ---
      if (p >= 0.48 && p < 0.90) {
        const stitchP = (p - 0.48) / 0.40; // 0 to 1
        const stitchFrontierX = waistX + stitchP * (cuffX - waistX + 30);

        ctx.save();
        // Clip solid sewn fabric to the exact needle frontier
        ctx.beginPath();
        ctx.rect(-400, -250, stitchFrontierX - (-400), 500);
        ctx.clip();

        // 1. Solid Sewn Cloth with Realistic Texture
        ctx.fillStyle = activeFabric.fillColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
        ctx.shadowBlur = 18;
        drawTrouserOutline();
        ctx.fill();

        // Weave Overlay
        ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
        for (let ty = -180; ty < 180; ty += 4) {
          ctx.fillRect(-350, ty, 750, 1.5);
        }

        // 2. Tailored Construction Lines
        // Waistband
        ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(waistX + 45, waistTopY + 5);
        ctx.lineTo(waistX + 45, waistBottomY - 5);
        ctx.stroke();

        // Double Forward Pleats
        ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(waistX + 45, -95);
        ctx.quadraticCurveTo(waistX + 110, -90, waistX + 160, -85);
        ctx.moveTo(waistX + 45, -70);
        ctx.quadraticCurveTo(waistX + 100, -68, waistX + 140, -65);
        ctx.moveTo(waistX + 45, 95);
        ctx.quadraticCurveTo(waistX + 110, 90, waistX + 160, 85);
        ctx.moveTo(waistX + 45, 70);
        ctx.quadraticCurveTo(waistX + 100, 68, waistX + 140, 65);
        ctx.stroke();

        // Slanted Pocket Openings & Bar-tacks
        ctx.strokeStyle = "#9E7B5C";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(waistX + 45, -125);
        ctx.lineTo(waistX + 135, -135);
        ctx.moveTo(waistX + 45, 125);
        ctx.lineTo(waistX + 135, 135);
        ctx.stroke();

        // Front Fly J-Stitch
        ctx.strokeStyle = "#9E7B5C";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(waistX + 45, -15);
        ctx.lineTo(crotchX - 10, -15);
        ctx.arcTo(crotchX, -15, crotchX, 0, 15);
        ctx.stroke();

        // Pressed Center Creases
        ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(waistX + 160, -85);
        ctx.lineTo(cuffX - 10, -80);
        ctx.moveTo(waistX + 160, 85);
        ctx.lineTo(cuffX - 10, 80);
        ctx.stroke();

        // 3. Golden Bespoke Stitches
        ctx.strokeStyle = activeFabric.threadColor;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 4]);
        ctx.shadowColor = activeFabric.threadColor;
        ctx.shadowBlur = 4;

        ctx.beginPath();
        ctx.moveTo(waistX + 50, waistTopY + 4);
        ctx.bezierCurveTo(waistX + 120, waistTopY - 8, crotchX + 80, topCuffTopY - 12, cuffX - 5, topCuffTopY + 4);
        ctx.moveTo(waistX + 50, waistBottomY - 4);
        ctx.bezierCurveTo(waistX + 120, waistBottomY + 8, crotchX + 80, bottomCuffBottomY + 12, cuffX - 5, bottomCuffBottomY - 4);
        ctx.moveTo(cuffX - 5, topCuffBottomY - 4);
        ctx.bezierCurveTo(crotchX + 160, topCuffBottomY + 8, crotchX + 40, -8, crotchX, 0);
        ctx.bezierCurveTo(crotchX + 40, 8, crotchX + 160, bottomCuffTopY - 8, cuffX - 5, bottomCuffTopY + 4);
        ctx.moveTo(cuffX - 20, topCuffTopY);
        ctx.lineTo(cuffX - 20, topCuffBottomY);
        ctx.moveTo(cuffX - 20, bottomCuffTopY);
        ctx.lineTo(cuffX - 20, bottomCuffBottomY);
        ctx.stroke();

        // Horn Button at Waist
        ctx.fillStyle = "#181410";
        ctx.strokeStyle = "#9E7B5C";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(waistX + 25, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = activeFabric.threadColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(waistX + 21, -4);
        ctx.lineTo(waistX + 29, 4);
        ctx.moveTo(waistX + 29, -4);
        ctx.lineTo(waistX + 21, 4);
        ctx.stroke();

        ctx.restore();

        // --- ACTIVE GOLDEN NEEDLE & THREAD AT FRONTIER ---
        const needleX = stitchFrontierX;
        const needleY = Math.sin(stitchP * 24) * 75;
        const needleDip = Math.sin(stitchP * 90) * 14;

        ctx.save();
        ctx.translate(needleX, needleY);

        // Dynamic Silk Thread Curve
        ctx.strokeStyle = activeFabric.threadColor;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(0, -25 + needleDip);
        ctx.bezierCurveTo(-25, -60, -50, -30, -90, -45);
        ctx.stroke();

        // Polished Tapered Needle
        ctx.save();
        ctx.translate(0, needleDip);
        ctx.rotate(-Math.PI / 4);

        ctx.fillStyle = "#EAEAEA";
        ctx.beginPath();
        ctx.moveTo(0, 28);
        ctx.lineTo(2.5, -24);
        ctx.lineTo(-2.5, -24);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#15171B";
        ctx.beginPath();
        ctx.ellipse(0, -18, 1, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.restore();
      }

      // --- STAGE 08 & 09: 3D VOLUMETRIC FINISHED PANTS & ATELIER FOLD (p: 0.88 -> 1.00) ---
      if (p >= 0.88) {
        const foldP = (p - 0.88) / 0.12; // 0 to 1

        ctx.save();
        // Fully assembled, 3D volumetric trousers
        ctx.fillStyle = activeFabric.fillColor;
        ctx.shadowColor = "rgba(0, 0, 0, 0.65)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 15;

        // Left Half (Waist & Thighs)
        const foldX = crotchX + 30;
        ctx.beginPath();
        ctx.moveTo(waistX, waistTopY);
        ctx.bezierCurveTo(waistX + 80, waistTopY - 5, foldX - 40, -100, foldX, -90);
        ctx.lineTo(foldX, 90);
        ctx.bezierCurveTo(foldX - 40, 100, waistX + 80, waistBottomY + 5, waistX, waistBottomY);
        ctx.closePath();
        ctx.fill();

        // Waistband Divider & Horn Button
        ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(waistX + 45, waistTopY + 5);
        ctx.lineTo(waistX + 45, waistBottomY - 5);
        ctx.stroke();

        ctx.fillStyle = "#181410";
        ctx.strokeStyle = "#9E7B5C";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(waistX + 25, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Folding Lower Legs (Flipping along center press line)
        ctx.save();
        ctx.translate(foldX, 0);
        ctx.scale(Math.cos(foldP * Math.PI), 1);

        if (foldP > 0.1) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
          ctx.shadowBlur = 24 * foldP;
          ctx.shadowOffsetX = -12 * foldP;
        }

        ctx.fillStyle = activeFabric.fillColor;
        ctx.beginPath();
        ctx.moveTo(0, -90);
        ctx.bezierCurveTo(80, -95, 200, topCuffTopY - 15, cuffX - foldX, topCuffTopY);
        ctx.lineTo(cuffX - foldX, topCuffBottomY);
        ctx.bezierCurveTo(120, topCuffBottomY + 10, 40, -10, 0, 0);
        ctx.bezierCurveTo(40, 10, 120, bottomCuffTopY - 10, cuffX - foldX, bottomCuffTopY);
        ctx.lineTo(cuffX - foldX, bottomCuffBottomY);
        ctx.bezierCurveTo(200, bottomCuffBottomY + 15, 80, 95, 0, 90);
        ctx.closePath();
        ctx.fill();

        // Golden Cuffs Hem Stitches
        ctx.strokeStyle = activeFabric.threadColor;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(cuffX - foldX - 20, topCuffTopY);
        ctx.lineTo(cuffX - foldX - 20, topCuffBottomY);
        ctx.moveTo(cuffX - foldX - 20, bottomCuffTopY);
        ctx.lineTo(cuffX - foldX - 20, bottomCuffBottomY);
        ctx.stroke();

        ctx.restore();

        // Gold Foil SURFER Atelier Ribbon & Presentation Seal (at final completion)
        if (foldP > 0.65) {
          const ribbonAlpha = (foldP - 0.65) / 0.35;
          ctx.save();
          ctx.globalAlpha = ribbonAlpha;

          ctx.fillStyle = "#9E7B5C";
          ctx.fillRect(waistX + 110, -155, 34, 310);
          ctx.strokeStyle = "#D4AF37";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(waistX + 110, -155, 34, 310);

          // Seal
          ctx.fillStyle = "#FCFAF6";
          ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(waistX + 127, 0, 26, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#0A0A0A";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("SURFER", waistX + 127, -4);
          ctx.fillStyle = "#9E7B5C";
          ctx.font = "7px monospace";
          ctx.fillText("BESPOKE", waistX + 127, 6);

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
      {/* High-DPI Real-time WebGL/Canvas Atelier Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

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
          <span className="text-[10px] tracking-widest">{soundEnabled ? "AUDIO ON" : "AUDIO MUTED"}</span>
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
            <h1 className="font-serif text-4xl text-[#FCFAF6]">
              Pants Made For You.
            </h1>
            <p className="text-xs text-[#888888] font-sans tracking-wide">
              Scroll down to physically control the manufacturing process from raw fabric to finished trousers.
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
            <span className="text-xs font-serif text-[#D4AF37]">
              {activeFabric.name}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            {FABRIC_COLOR_OPTIONS.map((fabric, fIdx) => (
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
