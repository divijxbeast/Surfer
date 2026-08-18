"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Package, Clock, CheckCircle2, Truck, FileText, ChevronRight, Sparkles, RefreshCw } from "lucide-react";

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: "drafting" | "cutting" | "stitching" | "quality_check" | "dispatched" | "delivered";
  statusLabel: string;
  estimatedDelivery: string;
  trackingCode: string;
  productName: string;
  silhouette: string;
  fabric: string;
  colorName: string;
  colorHex: string;
  price: string;
  image: string;
  measurementsSummary: {
    waist: string;
    inseam: string;
    rise: string;
    opening: string;
  };
}

const MOCK_ORDERS: OrderItem[] = [
  {
    id: "ord-1",
    orderNumber: "SRF-2026-9812",
    date: "Aug 14, 2026",
    status: "stitching",
    statusLabel: "ARTISAN BENCH STITCHING",
    estimatedDelivery: "Aug 24, 2026",
    trackingCode: "DHL-EXPRESS-99214820",
    productName: "The Architectural Double-Pleat",
    silhouette: "Relaxed Fluid Cut",
    fabric: "Italian Super 120s High-Twist Wool",
    colorName: "Charcoal Slate",
    colorHex: "#2C2C2E",
    price: "$280.00",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
    measurementsSummary: {
      waist: "32.5 in (82.5 cm)",
      inseam: "31.0 in (78.7 cm)",
      rise: "11.5 in (29.2 cm)",
      opening: "22.0 cm (Fluid Break)",
    },
  },
  {
    id: "ord-2",
    orderNumber: "SRF-2026-8401",
    date: "Jul 02, 2026",
    status: "delivered",
    statusLabel: "DELIVERED TO RESIDENCE",
    estimatedDelivery: "Delivered Jul 12, 2026",
    trackingCode: "FEDEX-PRIORITY-11029481",
    productName: "The Relaxed Everyday Chino",
    silhouette: "Regular Contemporary Cut",
    fabric: "Japanese High-Density Organic Twill",
    colorName: "Sandstone Beige",
    colorHex: "#C2B299",
    price: "$210.00",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    measurementsSummary: {
      waist: "32.5 in (82.5 cm)",
      inseam: "31.0 in (78.7 cm)",
      rise: "11.0 in (27.9 cm)",
      opening: "19.5 cm (Clean Break)",
    },
  },
];

const STAGES = [
  { key: "drafting", label: "CAD Pattern Drafted" },
  { key: "cutting", label: "Single-Piece Cut" },
  { key: "stitching", label: "Artisan Stitching" },
  { key: "quality_check", label: "Quality Inspection" },
  { key: "dispatched", label: "Dispatched" },
];

export function OrdersTab() {
  const [filter, setFilter] = useState<"all" | "in_production" | "delivered">("all");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<OrderItem | null>(null);

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (filter === "in_production") return order.status !== "delivered";
    if (filter === "delivered") return order.status === "delivered";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Filter & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8D4CC]">
        <div>
          <h3 className="font-anton text-2xl sm:text-3xl text-[#0A0A0A] uppercase tracking-wide">
            BESPOKE ORDER ARCHIVE
          </h3>
          <p className="text-xs text-[#666666] font-sans mt-0.5">
            Follow your trousers through pattern drafting, single-piece bench cutting, and hand-finishing.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-[#ECEAE5] p-1 border border-[#D8D4CC]">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase font-bold transition-all ${
              filter === "all" ? "bg-[#0A0A0A] text-[#F7F5F0]" : "text-[#666666] hover:text-[#0A0A0A]"
            }`}
          >
            ALL ORDERS ({MOCK_ORDERS.length})
          </button>
          <button
            onClick={() => setFilter("in_production")}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase font-bold transition-all ${
              filter === "in_production" ? "bg-[#0A0A0A] text-[#F7F5F0]" : "text-[#666666] hover:text-[#0A0A0A]"
            }`}
          >
            IN PRODUCTION (1)
          </button>
          <button
            onClick={() => setFilter("delivered")}
            className={`px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase font-bold transition-all ${
              filter === "delivered" ? "bg-[#0A0A0A] text-[#F7F5F0]" : "text-[#666666] hover:text-[#0A0A0A]"
            }`}
          >
            DELIVERED (1)
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => {
          const isDelivered = order.status === "delivered";

          return (
            <div
              key={order.id}
              className="bg-[#FCFAF6] border border-[#D8D4CC] p-6 sm:p-8 shadow-sm hover:border-[#0A0A0A] transition-all duration-300"
            >
              {/* Order Meta Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E5E0D6] mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#0A0A0A] tracking-wider uppercase">
                    ORDER #{order.orderNumber}
                  </span>
                  <span className="text-xs text-[#888888]">·</span>
                  <span className="text-xs font-mono text-[#666666]">{order.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase ${
                      isDelivered
                        ? "bg-[#E3ECE0] text-[#2D5A27] border border-[#C5D9C0]"
                        : "bg-[#0A0A0A] text-[#D4AF37] border border-[#D4AF37]/30 animate-pulse"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {order.statusLabel}
                  </span>
                </div>
              </div>

              {/* Atelier Progress Stage Timeline (For active in-production orders) */}
              {!isDelivered && (
                <div className="mb-8 p-5 bg-[#F7F5F0] border border-[#D8D4CC]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#9E7B5C] uppercase font-bold">
                      LIVE ATELIER BENCH PROGRESS
                    </span>
                    <span className="text-xs font-mono text-[#0A0A0A] font-semibold">
                      ESTIMATED DISPATCH: {order.estimatedDelivery}
                    </span>
                  </div>

                  {/* Step Progress Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
                    {STAGES.map((stg, sIdx) => {
                      const isComplete = sIdx < 2; // e.g. CAD & Cutting complete
                      const isCurrent = sIdx === 2; // Stitching in progress

                      return (
                        <div key={stg.key} className="flex flex-col items-start gap-1.5">
                          <div
                            className={`h-1.5 w-full rounded-full transition-colors ${
                              isComplete
                                ? "bg-[#0A0A0A]"
                                : isCurrent
                                ? "bg-[#D4AF37] animate-pulse"
                                : "bg-[#D8D4CC]"
                            }`}
                          />
                          <span
                            className={`text-[9px] font-mono tracking-wider uppercase ${
                              isCurrent
                                ? "text-[#0A0A0A] font-bold"
                                : isComplete
                                ? "text-[#555555]"
                                : "text-[#AAAAAA]"
                            }`}
                          >
                            0{sIdx + 1} {stg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Item Card Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Product Thumbnail */}
                <div className="md:col-span-3">
                  <div className="relative aspect-[3/4] w-full max-w-[140px] overflow-hidden bg-[#EAE7DF] border border-[#D8D4CC]">
                    <Image
                      src={order.image}
                      alt={order.productName}
                      fill
                      sizes="160px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Garment & Custom Measurements Spec */}
                <div className="md:col-span-6 space-y-3">
                  <div>
                    <h4 className="font-sans font-bold text-lg text-[#0A0A0A] uppercase tracking-tight">
                      {order.productName}
                    </h4>
                    <p className="text-xs text-[#666666] font-sans mt-0.5">
                      {order.fabric} · {order.silhouette}
                    </p>
                  </div>

                  {/* Biometric Measurement Stamp */}
                  <div className="p-3 bg-[#ECEAE5] border border-[#D8D4CC] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                    <div>
                      <span className="text-[#888888] block">WAIST</span>
                      <span className="text-[#0A0A0A] font-bold">{order.measurementsSummary.waist}</span>
                    </div>
                    <div>
                      <span className="text-[#888888] block">INSEAM</span>
                      <span className="text-[#0A0A0A] font-bold">{order.measurementsSummary.inseam}</span>
                    </div>
                    <div>
                      <span className="text-[#888888] block">RISE</span>
                      <span className="text-[#0A0A0A] font-bold">{order.measurementsSummary.rise}</span>
                    </div>
                    <div>
                      <span className="text-[#888888] block">ANKLE</span>
                      <span className="text-[#0A0A0A] font-bold">{order.measurementsSummary.opening}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#777777]">
                    <span>TRACKING:</span>
                    <span className="text-[#0A0A0A] font-semibold">{order.trackingCode}</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-[#E5E0D6]">
                  <span className="font-mono text-xl font-bold text-[#0A0A0A]">
                    {order.price}
                  </span>

                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-4 py-2 bg-[#F7F5F0] hover:bg-[#EBE7DF] border border-[#D8D4CC] text-[10px] font-mono tracking-widest uppercase font-bold text-[#0A0A0A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText size={13} />
                      <span>BESPOKE CERTIFICATE</span>
                    </button>

                    {isDelivered && (
                      <button className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#242424] text-[#F7F5F0] text-[10px] font-mono tracking-widest uppercase font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer">
                        <RefreshCw size={12} />
                        <span>REORDER CUT</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bespoke Certificate / Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FCFAF6] border border-[#D8D4CC] max-w-lg w-full p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-4 right-4 text-xs font-mono font-bold text-[#0A0A0A] hover:text-[#9E7B5C]"
            >
              [CLOSE ✕]
            </button>

            <div className="border-b border-[#D8D4CC] pb-4 mb-6">
              <span className="text-[10px] font-mono tracking-[0.28em] text-[#9E7B5C] uppercase font-bold block mb-1">
                SURFER AUTONOMOUS ATELIER
              </span>
              <h3 className="font-anton text-3xl uppercase text-[#0A0A0A]">
                CERTIFICATE OF BESPOKE ORIGIN
              </h3>
              <p className="text-xs font-mono text-[#666666] mt-1">
                Order #{selectedInvoiceOrder.orderNumber} · Single-Piece Registry
              </p>
            </div>

            <div className="space-y-4 text-xs font-sans text-[#333333] leading-relaxed">
              <div className="p-4 bg-[#F7F5F0] border border-[#D8D4CC] space-y-2">
                <p><strong>Garment:</strong> {selectedInvoiceOrder.productName}</p>
                <p><strong>Fabric Origin:</strong> {selectedInvoiceOrder.fabric}</p>
                <p><strong>Silhouette:</strong> {selectedInvoiceOrder.silhouette}</p>
                <p><strong>Tailoring Specs:</strong> {selectedInvoiceOrder.measurementsSummary.waist}, {selectedInvoiceOrder.measurementsSummary.inseam}, {selectedInvoiceOrder.measurementsSummary.rise}</p>
                <p><strong>Total Bespoke Price:</strong> {selectedInvoiceOrder.price}</p>
              </div>
              <p className="text-[11px] text-[#777777] italic font-serif">
                This document certifies that this garment was patterned individually and hand-finished with zero warehouse mass production.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D8D4CC] flex justify-end">
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-6 py-2.5 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono tracking-widest uppercase font-bold"
              >
                PRINT / DOWNLOAD PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
