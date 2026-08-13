"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import type { CartItem } from "../types/ecommerce.types";
import Image from "next/image";

interface CartDrawerProps {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({
  items,
  totalItems,
  totalPrice,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isOpen,
  onClose,
}: CartDrawerProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-xl">
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Cart</h2>
            <Badge variant="secondary">{totalItems}</Badge>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg className="mb-4 h-16 w-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-xl border border-border/50 p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h4 className="text-sm font-medium text-foreground line-clamp-1">
                      {item.product.title}
                    </h4>
                    <p className="text-sm font-semibold text-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-xs text-muted-foreground transition-colors hover:text-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/50 px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-foreground">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                onClose();
                router.push("/e-commerce/checkout");
              }}
            >
              Checkout
            </Button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
