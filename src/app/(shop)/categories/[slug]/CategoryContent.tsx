"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductGrid } from "@/components/features/products/ProductGrid";
import { type Category, type Product } from "@/types";

interface Props {
  category: Category;
  products: Product[];
}

export function CategoryContent({ category, products }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        All Products
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight">{category.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {products.length} {products.length === 1 ? "item" : "items"}
        </p>
      </div>

      <ProductGrid
        products={products}
        emptyMessage={`No products found in ${category.name}.`}
      />
    </div>
  );
}
