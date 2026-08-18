import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";
import { CustomCursor } from "@/components/common/CustomCursor";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { SkipToContent } from "@/components/common/SkipToContent";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SURFER — Pants Made For You",
  description:
    "SURFER creates premium custom-fitted pants made around your measurements and your preferred fit. Modern editorial tailoring with millimeter precision.",
  keywords: [
    "custom tailored pants",
    "bespoke trousers",
    "made to measure pants",
    "quiet luxury menswear",
    "SURFER tailoring",
    "architectural trousers",
  ],
  authors: [{ name: "SURFER Atelier" }],
  creator: "SURFER",
  metadataBase: new URL("https://surfer-tailoring.com"),
  openGraph: {
    title: "SURFER — Pants Made For You",
    description:
      "Pants should adapt to the person — not the person to the pants. Premium bespoke tailoring crafted individually to your proportions.",
    url: "https://surfer-tailoring.com",
    siteName: "SURFER",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SURFER — Pants Made For You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SURFER — Pants Made For You",
    description: "Tailored to your measurements. Designed around your fit.",
    creator: "@surfer_tailoring",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SURFER",
    url: "https://surfer-tailoring.com",
    logo: "https://surfer-tailoring.com/favicon.svg",
    description:
      "SURFER creates premium custom-tailored pants made around your measurements and preferred silhouette.",
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F5F4F0] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F5F4F0]">
        <SkipToContent />
        <LoadingScreen />
        <CustomCursor />
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
