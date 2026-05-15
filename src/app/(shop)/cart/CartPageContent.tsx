"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/helpers";

export function CartPageContent() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-4 px-4">
        <div className="rounded-full bg-muted p-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-light">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/products" className={cn(buttonVariants())}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-light tracking-tight">
        Shopping Cart ({totalItems()} {totalItems() === 1 ? "item" : "items"})
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              className="flex gap-4 rounded-lg border p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted sm:h-28 sm:w-28">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="text-sm font-medium hover:underline sm:text-base"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {item.color} / {item.size}
                  </p>
                  <p className="mt-1 text-sm font-semibold sm:text-base">
                    {formatPrice(item.product.price)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-md border">
                    <button
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="flex h-8 w-10 items-center justify-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.product.id, item.size, item.color)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-medium">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(totalPrice())}</span>
            </div>
            <Button className="mt-6 w-full" size="lg">
              Checkout
            </Button>
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "link" }), "mt-2 w-full")}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
