"use client";

import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";

interface CartGiftOptionsProps {
  giftWrap: boolean;
  giftMessage: string;
  giftWrapCost: number;
  onToggleGiftWrap: () => void;
  onGiftMessageChange: (msg: string) => void;
}

export function CartGiftOptions({
  giftWrap,
  giftMessage,
  giftWrapCost,
  onToggleGiftWrap,
  onGiftMessageChange,
}: CartGiftOptionsProps) {
  const messageId = "cart-gift-message";
  return (
    <div className="rounded-lg border border-border/60 p-3">
      <label
        htmlFor="cart-gift-wrap"
        className="flex min-h-[44px] cursor-pointer items-center gap-3"
      >
        <input
          id="cart-gift-wrap"
          type="checkbox"
          checked={giftWrap}
          onChange={onToggleGiftWrap}
          className="h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        <span className="flex-1 text-sm font-medium text-foreground">
          Gift wrap this order
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            (+${giftWrapCost.toFixed(2)})
          </span>
        </span>
      </label>
      {giftWrap && (
        <>
          <label htmlFor={messageId} className="sr-only">
            Gift message
          </label>
          <input
            id={messageId}
            type="text"
            value={giftMessage}
            onChange={(e) => onGiftMessageChange(e.target.value)}
            placeholder="Add a gift message…"
            maxLength={200}
            className={cn(
              "mt-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-muted-foreground/30",
              FOCUS.ringInput,
            )}
          />
        </>
      )}
    </div>
  );
}
