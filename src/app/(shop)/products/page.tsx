import type { Metadata } from "next";
import { ProductsPageContent } from "./ProductsPageContent";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete collection of women's fashion.",
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
