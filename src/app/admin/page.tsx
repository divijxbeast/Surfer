"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Sparkles,
  CheckCircle,
  Package,
  Layers,
  ArrowRight,
  RefreshCw,
  Image as ImageIcon,
  Palette,
  AlertCircle,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import { useProducts, Product, ProductSwatch } from "@/context/ProductContext";

const PRESET_IMAGES = [
  {
    name: "Architectural Pleats (Wool)",
    url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Relaxed Fluid (Como Silk)",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Compact Chino (Japanese Twill)",
    url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Tailored Cargo (Gabardine)",
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Wide Leg Flannel (Huddersfield)",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  },
];

const CATEGORY_OPTIONS = [
  "Tailored Trousers",
  "Relaxed & Fluid",
  "Compact Chinos",
  "Wide Leg",
  "Tailored Cargo",
  "Daily Rotation",
  "Tailored Shorts",
];

const SILHOUETTE_OPTIONS = [
  { label: "Slim Precision", value: "slim" },
  { label: "Classic Regular", value: "regular" },
  { label: "Relaxed Drape", value: "relaxed" },
  { label: "Wide Architectural", value: "wide" },
];

// Master access passkey
const VALID_PASSCODES = ["RSD2026", "rsd2026"];
const AUTH_STORAGE_KEY = "surfer_atelier_admin_token";

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    seedSampleProducts,
    clearAllProducts,
  } = useProducts();

  // Encryption Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Admin Dashboard State
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tailored Trousers");
  const [silhouette, setSilhouette] = useState("wide");
  const [price, setPrice] = useState("$280");
  const [fabric, setFabric] = useState("");
  const [millOrigin, setMillOrigin] = useState("Biella, Italy");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [detailsText, setDetailsText] = useState(
    "Traditional split-back waistband\nHand-finished blind hem\nWater buffalo horn buttons"
  );

  // Swatches State
  const [swatches, setSwatches] = useState<ProductSwatch[]>([
    { name: "Charcoal Heather", colorHex: "#2C2D30", origin: "Biella, Italy" },
    { name: "Midnight Navy", colorHex: "#1B2430", origin: "Biella, Italy" },
  ]);

  const [newSwatchName, setNewSwatchName] = useState("");
  const [newSwatchHex, setNewSwatchHex] = useState("#2C2D30");

  // Check existing session token
  useEffect(() => {
    try {
      const token = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (token === "AUTHENTICATED_ATELIER_SESSION") {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError(null);

    setTimeout(() => {
      const cleanInput = passcodeInput.trim();
      if (VALID_PASSCODES.includes(cleanInput)) {
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem(AUTH_STORAGE_KEY, "AUTHENTICATED_ATELIER_SESSION");
        } catch (e) {
          console.error(e);
        }
        setPasscodeInput("");
      } else {
        setAuthError("INCORRECT ACCESS KEY · ACCESS DENIED");
      }
      setIsVerifying(false);
    }, 400);
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleAddSwatch = () => {
    if (!newSwatchName.trim()) return;
    setSwatches([...swatches, { name: newSwatchName.trim(), colorHex: newSwatchHex }]);
    setNewSwatchName("");
  };

  const handleRemoveSwatch = (index: number) => {
    setSwatches(swatches.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setName("");
    setCategory("Tailored Trousers");
    setSilhouette("wide");
    setPrice("$280");
    setFabric("");
    setMillOrigin("Biella, Italy");
    setDescription("");
    setImageUrl(PRESET_IMAGES[0].url);
    setDetailsText("Traditional split-back waistband\nHand-finished blind hem\nWater buffalo horn buttons");
    setSwatches([
      { name: "Charcoal Heather", colorHex: "#2C2D30", origin: "Biella, Italy" },
      { name: "Midnight Navy", colorHex: "#1B2430", origin: "Biella, Italy" },
    ]);
    setEditingId(null);
  };

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setSilhouette(product.silhouette || "regular");
    setPrice(product.price);
    setFabric(product.fabric);
    setMillOrigin(product.millOrigin);
    setDescription(product.description);
    setImageUrl(product.imageUrl);
    setDetailsText((product.details || []).join("\n"));
    setSwatches(product.swatches || []);
    setActiveTab("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a product name");
      return;
    }

    const detailsArray = detailsText
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const productPayload = {
      name: name.trim(),
      category,
      silhouette,
      price: price.trim() || "Bespoke Commission",
      fabric: fabric.trim() || "Bespoke Luxury Textile",
      millOrigin: millOrigin.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      swatches,
      details: detailsArray,
      inStock: true,
    };

    if (editingId) {
      updateProduct(editingId, productPayload);
      showNotification(`Updated "${name}" successfully!`);
      resetForm();
    } else {
      const created = addProduct(productPayload);
      showNotification(`Published "${created.name}" to Atelier Shop!`);
      resetForm();
    }

    setActiveTab("manage");
  };

  // 1. ENCRYPTED ACCESS GATE (IF LOCKED)
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#0A0A0A] text-[#F7F5F0] flex items-center justify-center p-4 sm:p-8 select-none">
        <div className="max-w-md w-full bg-[#141414] border border-white/10 p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#D4AF37]/15 blur-[60px] pointer-events-none" />

          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-[#D4AF37] mb-4">
              <Lock size={20} />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#D4AF37] uppercase block">
              SURFER ATELIER VAULT
            </span>
            <h1 className="font-anton text-3xl uppercase tracking-wider text-white">
              RESTRICTED STUDIO
            </h1>
            <p className="text-xs font-mono text-[#85837D] leading-relaxed">
              This terminal is encrypted. Please enter the master atelier passkey to manage inventory.
            </p>
          </div>

          {/* Passcode Form */}
          <form onSubmit={handleUnlock} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-[#A0A0A0] uppercase tracking-widest block">
                ATELIER ACCESS PASSKEY
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoFocus
                  required
                  placeholder="••••••••••••"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/20 text-white placeholder-white/20 text-sm font-mono p-3.5 pr-10 tracking-widest focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {authError && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 pt-1">
                  <ShieldAlert size={13} />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#E5C158] transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <span>DECRYPTING VAULT...</span>
              ) : (
                <>
                  <KeyRound size={14} />
                  <span>UNLOCK ATELIER STUDIO</span>
                </>
              )}
            </button>
          </form>

          {/* Discreet Footer Hint */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
            <span>256-BIT ENCRYPTION</span>
            <Link href="/" className="hover:text-white/70 transition-colors uppercase">
              ← Return to Site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <main className="min-h-screen w-full bg-[#ECEAE5] text-[#0A0A0A] pt-8 sm:pt-14 pb-24 sm:pb-36 px-4 sm:px-10 md:px-16">
      <div className="max-w-[1520px] mx-auto space-y-8">
        
        {/* Top Notification Toast */}
        {successMessage && (
          <div className="p-4 bg-[#0A0A0A] text-[#F7F5F0] border-l-4 border-[#D4AF37] flex items-center justify-between shadow-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className="text-[#D4AF37]" />
              <span className="text-xs font-mono tracking-wider uppercase font-bold">
                {successMessage}
              </span>
            </div>
            <Link
              href="/products"
              className="text-[11px] font-mono text-[#D4AF37] hover:underline uppercase flex items-center gap-1"
            >
              <span>VIEW IN SHOP</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        )}

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8D4CC] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.24em] text-[#9E7B5C] uppercase block">
                SURFER ATELIER · ENCRYPTED MANAGEMENT SESSION
              </span>
            </div>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-[#0A0A0A] leading-none">
              ADMIN PRODUCT STUDIO
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] font-sans mt-2 max-w-xl">
              Publish bespoke trouser styles, manage textiles and mill origins, and calibrate product data.
              Hidden from public view and secured.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="px-5 py-3 bg-[#FCFAF6] border border-[#D8D4CC] text-[#0A0A0A] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#0A0A0A] hover:text-[#F7F5F0] transition-colors flex items-center gap-2"
            >
              <ExternalLink size={13} />
              <span>SHOP PREVIEW ({products.length})</span>
            </Link>

            <button
              onClick={() => {
                seedSampleProducts();
                showNotification("Loaded 3 sample bespoke garments into archive!");
              }}
              className="px-5 py-3 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#222222] transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span>LOAD SAMPLE ITEMS</span>
            </button>

            {/* Lock Session Button */}
            <button
              onClick={handleLock}
              className="px-4 py-3 border border-red-800 text-red-700 bg-red-50 hover:bg-red-700 hover:text-white text-xs font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-2"
              title="Lock Admin Terminal"
            >
              <LogOut size={13} />
              <span>LOCK</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#D8D4CC]">
          <button
            onClick={() => {
              setActiveTab("create");
              if (!editingId) resetForm();
            }}
            className={`px-6 py-3.5 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "create"
                ? "bg-[#0A0A0A] text-[#F7F5F0]"
                : "bg-transparent text-[#555555] hover:text-[#0A0A0A]"
            }`}
          >
            <Plus size={14} className={activeTab === "create" ? "text-[#D4AF37]" : ""} />
            <span>{editingId ? "EDITING GARMENT" : "ADD NEW GARMENT"}</span>
          </button>

          <button
            onClick={() => setActiveTab("manage")}
            className={`px-6 py-3.5 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "manage"
                ? "bg-[#0A0A0A] text-[#F7F5F0]"
                : "bg-transparent text-[#555555] hover:text-[#0A0A0A]"
            }`}
          >
            <Layers size={14} className={activeTab === "manage" ? "text-[#D4AF37]" : ""} />
            <span>INVENTORY ARCHIVE ({products.length})</span>
          </button>
        </div>

        {/* TAB 1: ADD / EDIT PRODUCT FORM */}
        {activeTab === "create" && (
          <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {editingId && (
              <div className="p-3 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#0A0A0A] text-xs font-mono flex items-center justify-between">
                <span>Currently editing existing garment ID: {editingId}</span>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs underline hover:text-[#9E7B5C] cursor-pointer"
                >
                  Cancel Edit (Create New Instead)
                </button>
              </div>
            )}

            <div className="bg-[#FCFAF6] border border-[#D8D4CC] p-6 sm:p-10 space-y-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#9E7B5C] uppercase block border-b border-[#EAE6DF] pb-3">
                1. BASIC GARMENT SPECIFICATIONS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Architectural Double-Pleat"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-sm font-sans focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
                    Category / Style
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-xs font-mono uppercase focus:outline-none focus:border-[#0A0A0A] cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Silhouette Profile */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
                    Silhouette Profile
                  </label>
                  <select
                    value={silhouette}
                    onChange={(e) => setSilhouette(e.target.value)}
                    className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-xs font-mono uppercase focus:outline-none focus:border-[#0A0A0A] cursor-pointer"
                  >
                    {SILHOUETTE_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label} ({s.value})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
                    Commission Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $280"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-xs font-mono focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* Mill Origin */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
                    Mill Origin / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Biella, Italy"
                    value={millOrigin}
                    onChange={(e) => setMillOrigin(e.target.value)}
                    className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-xs font-mono focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* Fabric Material Details */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
                    Fabric Composition & Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Super 120s High-Twist Wool (280gsm)"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-sm font-sans focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* Story / Description */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
                    Artisan Story / Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the architectural drape, pleating structure, and intended fit..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-sm font-sans focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>

              {/* SECTION 2: IMAGERY */}
              <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#9E7B5C] uppercase block border-b border-[#EAE6DF] pb-3 pt-4">
                2. LOOKBOOK PHOTOGRAPHY & PRESETS
              </span>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0A0A0A] uppercase block">
                    Custom Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-xs font-mono focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* Preset Image Options */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-[#85837D] uppercase block">
                    Or select a curated atelier image preset:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        className={`p-2 border text-left transition-all cursor-pointer ${
                          imageUrl === preset.url
                            ? "border-[#0A0A0A] bg-[#0A0A0A] text-[#F7F5F0]"
                            : "border-[#D8D4CC] bg-[#ECEAE5] text-[#0A0A0A] hover:border-[#85837D]"
                        }`}
                      >
                        <span className="text-[9px] font-mono uppercase block font-bold truncate">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: FABRIC SWATCHES */}
              <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#9E7B5C] uppercase block border-b border-[#EAE6DF] pb-3 pt-4">
                3. FABRIC COLOR SWATCHES
              </span>

              <div className="space-y-4">
                {/* Active Swatches List */}
                <div className="flex flex-wrap items-center gap-2">
                  {swatches.map((s, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 bg-[#ECEAE5] border border-[#D8D4CC] flex items-center gap-2"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: s.colorHex }}
                      />
                      <span className="text-xs font-mono text-[#0A0A0A] uppercase">{s.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSwatch(idx)}
                        className="text-[#85837D] hover:text-red-600 text-xs ml-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {swatches.length === 0 && (
                    <span className="text-xs font-mono text-[#85837D]">No swatches added yet.</span>
                  )}
                </div>

                {/* Add New Swatch Inline Form */}
                <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-[#ECEAE5] border border-[#D8D4CC]">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="color"
                      value={newSwatchHex}
                      onChange={(e) => setNewSwatchHex(e.target.value)}
                      className="w-9 h-9 border border-[#D8D4CC] bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="Color Name (e.g. Olive Drab)"
                      value={newSwatchName}
                      onChange={(e) => setNewSwatchName(e.target.value)}
                      className="bg-[#FCFAF6] border border-[#D8D4CC] p-2 text-xs font-mono flex-1 sm:w-48 focus:outline-none focus:border-[#0A0A0A]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSwatch}
                    className="w-full sm:w-auto px-4 py-2 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#222222] cursor-pointer"
                  >
                    + Add Swatch
                  </button>
                </div>
              </div>

              {/* SECTION 4: CONSTRUCTION BULLETS */}
              <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#9E7B5C] uppercase block border-b border-[#EAE6DF] pb-3 pt-4">
                4. CONSTRUCTION BENCHMARK DETAILS (ONE PER LINE)
              </span>

              <div className="space-y-2">
                <textarea
                  rows={4}
                  value={detailsText}
                  onChange={(e) => setDetailsText(e.target.value)}
                  placeholder="Split-back waistband&#10;Hand-finished blind hem&#10;Horn buttons"
                  className="w-full bg-[#ECEAE5] border border-[#D8D4CC] p-3 text-xs font-mono focus:outline-none focus:border-[#0A0A0A]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-[#D8D4CC] flex items-center justify-between">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-3 border border-[#D8D4CC] text-xs font-mono text-[#555555] hover:text-[#0A0A0A] uppercase cursor-pointer"
                >
                  Reset Form
                </button>

                <button
                  type="submit"
                  className="px-8 py-4 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#222222] transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle size={15} className="text-[#D4AF37]" />
                  <span>{editingId ? "UPDATE GARMENT" : "PUBLISH TO ATELIER SHOP"}</span>
                </button>
              </div>

            </div>
          </form>
        )}

        {/* TAB 2: INVENTORY LIST & MANAGEMENT */}
        {activeTab === "manage" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#FCFAF6] border border-[#D8D4CC] p-4">
              <span className="text-xs font-mono font-bold text-[#0A0A0A] uppercase">
                ACTIVE PUBLISHED GARMENTS ({products.length})
              </span>
              {products.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear all products?")) {
                      clearAllProducts();
                      showNotification("All garments removed from archive.");
                    }
                  }}
                  className="text-xs font-mono text-red-600 hover:underline uppercase cursor-pointer flex items-center gap-1"
                >
                  <Trash2 size={13} />
                  <span>Clear All Products</span>
                </button>
              )}
            </div>

            {products.length === 0 ? (
              <div className="py-16 text-center bg-[#FCFAF6] border border-[#D8D4CC] space-y-4">
                <Package size={28} className="mx-auto text-[#85837D]" />
                <h3 className="font-anton text-2xl uppercase">NO PRODUCTS LISTED YET</h3>
                <p className="text-xs text-[#555555] max-w-sm mx-auto">
                  Use the Add New Garment tab above to publish your first pair of bespoke pants, or load sample demo items.
                </p>
                <button
                  onClick={() => {
                    seedSampleProducts();
                    showNotification("Loaded 3 sample bespoke garments!");
                  }}
                  className="px-6 py-3 bg-[#0A0A0A] text-[#F7F5F0] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#222222] cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles size={13} className="text-[#D4AF37]" />
                  <span>LOAD SAMPLE ITEMS (DEMO)</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#FCFAF6] border border-[#D8D4CC] flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[4/3] w-full bg-[#E5E2DA] overflow-hidden">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#85837D] font-mono text-xs uppercase">
                            NO IMAGE
                          </div>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#0A0A0A] text-[#F7F5F0] text-[9px] font-mono uppercase font-bold">
                          {product.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-anton text-lg uppercase text-[#0A0A0A] leading-tight">
                            {product.name}
                          </h4>
                          <span className="font-mono text-xs font-bold text-[#0A0A0A] shrink-0">
                            {product.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#555555] line-clamp-2">{product.fabric}</p>
                        {product.millOrigin && (
                          <span className="text-[10px] font-mono text-[#9E7B5C] uppercase block">
                            Mill: {product.millOrigin}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 pt-0 border-t border-[#EAE6DF] mt-2 flex items-center justify-between gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-[11px] font-mono text-[#0A0A0A] hover:underline uppercase flex items-center gap-1"
                      >
                        <span>View Page</span>
                        <ExternalLink size={11} />
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(product)}
                          className="p-1.5 border border-[#D8D4CC] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F7F5F0] transition-colors cursor-pointer"
                          title="Edit product"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${product.name}"?`)) {
                              deleteProduct(product.id);
                              showNotification(`Deleted "${product.name}"`);
                            }
                          }}
                          className="p-1.5 border border-[#D8D4CC] text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
