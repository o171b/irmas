import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/features/products/ProductGrid";
import { products } from "@/constants/products";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.isNew || p.isSale).slice(0, 8);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">Featured Products</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Handpicked just for you
            </p>
          </div>
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "link" }), "hidden sm:flex")}
          >
            View All
          </Link>
        </div>
        <ProductGrid products={featured} />
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
