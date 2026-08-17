import { PlaceholderPage } from "@/components/common/PlaceholderPage";

export const metadata = {
  title: "Product Detail — SURFER",
  description: "Bespoke trouser detail and configuration.",
};

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedTitle = slug ? slug.replace(/-/g, " ").toUpperCase() : "TROUSER DETAIL";

  return (
    <PlaceholderPage
      title={formattedTitle}
      subtitle="Bespoke configuration, cloth selection, and 3D draping preview will be unlocked soon."
      category="BESPOKE CONFIGURATOR"
    />
  );
}
