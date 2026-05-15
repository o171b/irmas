"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/helpers";

export function CartSheet() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-muted p-4">
              <Trash2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "outline" }))}
              onClick={closeCart}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-sm font-medium hover:underline"
                          onClick={closeCart}
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {item.color} / {item.size}
                        </p>
                        <p className="text-sm font-medium">{formatPrice(item.product.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md border">
                          <button
                            className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex h-7 w-8 items-center justify-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          className="ml-auto text-muted-foreground hover:text-destructive"
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
            </div>

            <div className="border-t pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-medium">Total</span>
                <span className="text-lg font-semibold">{formatPrice(totalPrice())}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
