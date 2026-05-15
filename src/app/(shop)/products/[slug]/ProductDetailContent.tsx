"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, ShoppingBag, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductGrid } from "@/components/features/products/ProductGrid";
import { type Product } from "@/types";
import { formatPrice } from "@/lib/helpers";
import { useCartStore } from "@/stores/useCartStore";
import { products } from "@/constants/products";

interface Props {
  product: Product;
}

export function ProductDetailContent({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedSize, selectedColor);
    openCart();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute left-3 top-3 flex gap-2">
              {product.isNew && <Badge>New</Badge>}
              {product.isSale && <Badge variant="destructive">Sale</Badge>}
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                    i === selectedImage ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p className="text-sm text-muted-foreground capitalize">
            {product.category}
          </p>
          <h1 className="mt-1 text-3xl font-light tracking-tight">
            {product.name}
          </h1>

          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <Separator className="my-6" />

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <Separator className="my-6" />

          <div>
            <h3 className="text-sm font-medium">Color</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    selectedColor === color.name
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground"
                  }`}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={`Select ${color.name}`}
                >
                  <span
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium">Size</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                    selectedSize === size
                      ? "border-primary bg-primary/5 font-medium"
                      : "hover:border-muted-foreground"
                  }`}
                  onClick={() => setSelectedSize(size)}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={handleBuyNow}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Buy Now
            </Button>
            <Button
              size="lg"
              variant={addedToCart ? "secondary" : "outline"}
              className="flex-1"
              onClick={handleAddToCart}
            >
              {addedToCart ? "Added to Cart!" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <Separator className="mb-8" />
          <h2 className="mb-6 text-2xl font-light tracking-tight">
            Complete the Look
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
