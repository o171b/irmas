"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductGrid } from "@/components/features/products/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/constants/products";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
] as const;

export function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [search, categoryFilter, sort]);

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setSort("newest");
    router.push("/products");
  };

  const hasFilters = search || categoryFilter;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight">All Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Showing {filtered.length} of {products.length} products
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateURL("q", e.target.value);
            }}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              updateURL("sort", e.target.value);
            }}
            className="rounded-md border bg-background px-3 py-2 text-sm"
            aria-label="Sort products"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        <aside
          className={`shrink-0 ${
            showFilters ? "block" : "hidden"
          } w-full lg:block lg:w-56`}
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold">Category</h3>
              <div className="space-y-1">
                <button
                  className={`block w-full rounded px-3 py-1.5 text-left text-sm transition-colors ${
                    !categoryFilter
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => {
                    setCategoryFilter("");
                    updateURL("category", "");
                  }}
                >
                  All
                </button>
                {categories.filter((c) => c.slug !== "all").map((cat) => (
                  <button
                    key={cat.id}
                    className={`block w-full rounded px-3 py-1.5 text-left text-sm transition-colors ${
                      categoryFilter === cat.slug
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    onClick={() => {
                      setCategoryFilter(cat.slug);
                      updateURL("category", cat.slug);
                    }}
                  >
                    {cat.name}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({cat.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </aside>

        <div className="flex-1">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
