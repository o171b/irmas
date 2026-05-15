"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/useCartStore";
import { categories } from "@/constants/products";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navLinkClass = (href: string) =>
    cn(
      "relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform hover:after:scale-x-100",
      isActive(href)
        ? "text-foreground after:scale-x-100"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="text-2xl font-semibold tracking-tight">
            IRMAS
          </Link>

          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            <Link
              href="/"
              className={navLinkClass("/")}
            >
              Home
            </Link>
            {categories.filter((c) => c.slug !== "all").slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className={navLinkClass(`/categories/${cat.slug}`)}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/products"
              className={navLinkClass("/products")}
            >
              All Collections
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted"
            aria-label="Toggle search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={openCart}
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t px-4 py-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsSearchOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="border-t lg:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4 sm:px-6">
            <Link
              href="/"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                isActive("/") ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {categories.filter((c) => c.slug !== "all").map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                  isActive(`/categories/${cat.slug}`) ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/products"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                isActive("/products") ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              All Collections
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
