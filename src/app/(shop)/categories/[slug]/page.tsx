import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, products } from "@/constants/products";
import { CategoryContent } from "./CategoryContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: cat.name,
    description: `Browse our collection of ${cat.name.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const categoryProducts =
    slug === "all" ? [...products] : products.filter((p) => p.category === cat.slug);

  return <CategoryContent category={cat} products={categoryProducts} />;
}
