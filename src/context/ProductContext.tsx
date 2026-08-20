"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ProductSwatch {
  name: string;
  colorHex: string;
  origin?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  silhouette: string;
  price: string;
  fabric: string;
  millOrigin: string;
  description: string;
  imageUrl: string;
  swatches: ProductSwatch[];
  details?: string[];
  inStock?: boolean;
  createdAt: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, "id" | "slug" | "createdAt">) => Product;
  updateProduct: (id: string, updatedData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  seedSampleProducts: () => void;
  clearAllProducts: () => void;
  isLoaded: boolean;
}

const STORAGE_KEY = "surfer_atelier_products";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const SAMPLE_PRODUCTS: Omit<Product, "id" | "slug" | "createdAt">[] = [
  {
    name: "The Architectural Double-Pleat",
    category: "Tailored Trousers",
    silhouette: "wide",
    price: "$280",
    fabric: "100% Super 120s High-Twist Wool",
    millOrigin: "Biella, Italy",
    description: "Deep forward pleats with adjustable side-tabs, internal split-back waistband curtain, and full hand-set lining for effortless drape.",
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
    swatches: [
      { name: "Charcoal Heather", colorHex: "#2C2D30", origin: "Biella, Italy" },
      { name: "Midnight Navy", colorHex: "#1B2430", origin: "Biella, Italy" },
      { name: "Deep Espresso", colorHex: "#2E241E", origin: "Biella, Italy" },
    ],
    details: [
      "Traditional split-back waistband with pleated curtain",
      "Hand-finished blind hem with 2.5-inch alteration inlay",
      "Sustainably sourced water buffalo horn buttons",
      "Reinforced French seam interior finish",
    ],
    inStock: true,
  },
  {
    name: "The Relaxed Everyday Chino",
    category: "Compact Chinos",
    silhouette: "relaxed",
    price: "$210",
    fabric: "340gsm Japanese Organic Cotton Twill",
    millOrigin: "Okayama, Japan",
    description: "Generous through the seat with a gentle fluid taper. Clean flat-front aesthetic engineered for daily movement.",
    imageUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
    swatches: [
      { name: "Camel Sand", colorHex: "#B89F7D", origin: "Okayama, Japan" },
      { name: "Washed Olive", colorHex: "#525A4B", origin: "Okayama, Japan" },
      { name: "Obsidian", colorHex: "#181818", origin: "Okayama, Japan" },
    ],
    details: [
      "Pre-shrunk high-density compact weave",
      "Hidden interior ticket coin pocket",
      "Japanese antique brass fly hardware",
      "Continuous waistband with internal canvas reinforcement",
    ],
    inStock: true,
  },
  {
    name: "The Fluid Wool Trouser",
    category: "Relaxed & Fluid",
    silhouette: "regular",
    price: "$340",
    fabric: "Tropical Wool & Mulberry Silk Blend",
    millOrigin: "Como, Italy",
    description: "Single pleat ease with an airy, architectural silhouette that moves naturally with every step.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    swatches: [
      { name: "Warm Oat", colorHex: "#D5CEBF", origin: "Como, Italy" },
      { name: "Sage Drab", colorHex: "#697263", origin: "Como, Italy" },
      { name: "Chalk White", colorHex: "#ECEAE4", origin: "Como, Italy" },
    ],
    details: [
      "Ultra-breathable 220gsm tropical weave",
      "Single forward pleat for seated comfort",
      "Silk-lined pocket bags",
      "Tapered 16.0-inch cuff opening",
    ],
    inStock: true,
  },
];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount (no default items hardcoded)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load products from localStorage", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    } catch (err) {
      console.error("Failed to save products to localStorage", err);
    }
  };

  const addProduct = (productData: Omit<Product, "id" | "slug" | "createdAt">): Product => {
    const id = "srf_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    let baseSlug = generateSlug(productData.name) || "garment";
    
    // Ensure slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    while (products.some((p) => p.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newProduct: Product = {
      ...productData,
      id,
      slug,
      createdAt: Date.now(),
    };

    const updated = [newProduct, ...products];
    saveProducts(updated);
    return newProduct;
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const newProduct = { ...p, ...updatedData };
        if (updatedData.name && updatedData.name !== p.name) {
          newProduct.slug = generateSlug(updatedData.name);
        }
        return newProduct;
      }
      return p;
    });
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const getProductBySlug = (slug: string): Product | undefined => {
    return products.find((p) => p.slug === slug);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const seedSampleProducts = () => {
    const newItems: Product[] = SAMPLE_PRODUCTS.map((item, idx) => ({
      ...item,
      id: "sample_" + Date.now() + "_" + idx,
      slug: generateSlug(item.name),
      createdAt: Date.now() - idx * 1000,
    }));
    const updated = [...newItems, ...products];
    saveProducts(updated);
  };

  const clearAllProducts = () => {
    saveProducts([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductById,
        seedSampleProducts,
        clearAllProducts,
        isLoaded,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
