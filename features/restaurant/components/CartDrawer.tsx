import type { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  deliveryFee: number;
  onAdd: (id: number, name: string, price: number) => void;
  onRemove: (id: number) => void;
}

export function CartDrawer({ isOpen, onClose, cart, cartTotal, deliveryFee, onAdd, onRemove }: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative flex w-full max-w-md flex-col bg-white p-6 shadow-xl dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Your Order</h3>
          <button onClick={onClose} className="text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground/70">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{c.name}</h4>
                    <span className="text-xs text-muted-foreground">${c.price.toFixed(2)} each</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onRemove(c.id)} className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.qty > 1 ? "M20 12H4" : "M6 18L18 6M6 6l12 12"} />
                      </svg>
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-foreground">{c.qty}</span>
                    <button onClick={() => onAdd(c.id, c.name, c.price)} className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 dark:border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium text-foreground">{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold dark:border-border">
                <span className="text-foreground">Total</span>
                <span className="text-orange-600 dark:text-orange-400">${(cartTotal + deliveryFee).toFixed(2)}</span>
              </div>
              <button className="w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
