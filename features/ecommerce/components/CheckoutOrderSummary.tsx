import Image from "next/image";
import { cn } from "@/lib/cn";
import type { CartItem } from "../types/ecommerce.types";

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  promoCode?: string;
  onApplyPromo?: (code: string) => void;
  onRemovePromo?: () => void;
  className?: string;
}

export function CheckoutOrderSummary({
  items,
  subtotal,
  shippingCost,
  tax,
  discount,
  total,
  promoCode,
  onApplyPromo,
  onRemovePromo,
  className,
}: CheckoutOrderSummaryProps) {
  return (
    <div className={cn("rounded-xl border border-border/50 bg-background", className)}>
      <div className="border-b border-border/50 px-5 py-4">
        <h3 className="font-semibold text-foreground">Order Summary</h3>
        <p className="text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="max-h-64 overflow-y-auto px-5 py-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted/30">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {item.product.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  ${item.product.price.toFixed(2)} each
                </p>
              </div>
              <p className="text-sm font-medium text-foreground">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 px-5 py-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-foreground">
            {shippingCost === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-border/50 pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 px-5 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure checkout with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
}
