"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/types";
import { formatPrice } from "@/lib/helpers";
import { useCartStore } from "@/stores/useCartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0].name);
    openCart();
  };

  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
            {product.isSale && <Badge variant="destructive">Sale</Badge>}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center p-4 transition-transform duration-300 group-hover:translate-y-0">
            <Button size="sm" className="w-full shadow-lg" onClick={handleAddToCart}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.originalPrice ? (
              <>
                <span className="text-sm font-semibold text-primary">{formatPrice(product.price)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
