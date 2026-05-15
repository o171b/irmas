"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, color) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.size === size && i.color === color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.size === size && i.color === color
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1, size, color }] };
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          ),
        })),

      updateQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter(
                (i) => !(i.product.id === productId && i.size === size && i.color === color)
              )
            : state.items.map((i) =>
                i.product.id === productId && i.size === size && i.color === color
                  ? { ...i, quantity }
                  : i
              ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "irmas-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
