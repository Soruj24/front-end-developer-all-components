"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  CreditCard,
  Tag,
} from "lucide-react";

const installCommand = `npx component-library@latest add shopping-cart`;

const usageCode = `import { ShoppingCart } from "@/components/ui";

<ShoppingCart items={items} onRemove={handleRemove} />`;

function CartItemDemo() {
  const [qty, setQty] = useState(2);
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
        <Package className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Wireless Headphones</p>
        <p className="text-sm text-muted-foreground">$79.99</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-7 w-7 items-center justify-center rounded-md border bg-background hover:bg-muted">
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-6 text-center text-sm font-medium">{qty}</span>
        <button onClick={() => setQty(qty + 1)} className="flex h-7 w-7 items-center justify-center rounded-md border bg-background hover:bg-muted">
          <Plus className="h-3 w-3" />
        </button>
      </div>
      <p className="w-20 text-right font-semibold">${(79.99 * qty).toFixed(2)}</p>
      <button className="text-muted-foreground hover:text-destructive">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function CartSummaryDemo() {
  const subtotal = 239.97;
  const shipping = 9.99;
  const tax = 19.2;
  const total = subtotal + shipping + tax;
  return (
    <div className="w-full max-w-sm rounded-lg border p-6">
      <h3 className="mb-4 font-semibold">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Subtotal (3 items)</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>${shipping.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
        <div className="border-t pt-2 font-semibold flex justify-between"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </div>
    </div>
  );
}

function AddToCartDemo() {
  const [added, setAdded] = useState(false);
  return (
    <div className="flex gap-3">
      <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500); }} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <ShoppingCart className="h-4 w-4" />
        {added ? "Added!" : "Add to Cart"}
      </button>
      <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">
        <Tag className="h-4 w-4" />
        Apply Coupon
      </button>
    </div>
  );
}

function QuantitySelectorDemo() {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Qty:</span>
      <div className="flex items-center overflow-hidden rounded-md border">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-9 w-9 items-center justify-center hover:bg-muted">
          <Minus className="h-3 w-3" />
        </button>
        <span className="flex h-9 w-12 items-center justify-center border-x text-sm font-medium">{qty}</span>
        <button onClick={() => setQty(Math.min(10, qty + 1))} className="flex h-9 w-9 items-center justify-center hover:bg-muted">
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function CartBadgeDemo() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {count}
          </span>
        )}
      </div>
      <button onClick={() => setCount(c => c + 1)} className="rounded-md border px-3 py-1 text-sm hover:bg-muted">Add Item</button>
      <button onClick={() => setCount(Math.max(0, count - 1))} className="rounded-md border px-3 py-1 text-sm hover:bg-muted">Remove</button>
    </div>
  );
}

function CheckoutButtonDemo() {
  const [processing, setProcessing] = useState(false);
  return (
    <button onClick={() => { setProcessing(true); setTimeout(() => setProcessing(false), 2000); }} disabled={processing} className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
      <CreditCard className="h-4 w-4" />
      {processing ? "Processing..." : "Proceed to Checkout"}
    </button>
  );
}

function EmptyCartDemo() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
      <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground/50" />
      <p className="font-medium">Your cart is empty</p>
      <p className="mt-1 text-sm text-muted-foreground">Add some items to get started</p>
    </div>
  );
}

export default function ShoppingCartPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Shopping Cart</h1>
          <Badge variant="primary">E-Commerce</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A full-featured shopping cart system with item management, quantity controls, order summaries, and checkout flow.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Cart Item</h2>
        <ComponentPreview component="ShoppingCartItemDemo">
          <CartItemDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Cart Summary</h2>
        <ComponentPreview component="ShoppingCartSummaryDemo">
          <CartSummaryDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Add to Cart</h2>
        <ComponentPreview component="ShoppingCartAddToCartDemo">
          <AddToCartDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Quantity Selector</h2>
        <ComponentPreview component="ShoppingCartQuantitySelectorDemo">
          <QuantitySelectorDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Cart Badge</h2>
        <ComponentPreview component="ShoppingCartBadgeDemo">
          <CartBadgeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Checkout Button</h2>
        <ComponentPreview component="ShoppingCartCheckoutButtonDemo">
          <CheckoutButtonDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Empty Cart</h2>
        <ComponentPreview component="ShoppingCartEmptyCartDemo">
          <EmptyCartDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">CartItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onRemove</td>
                <td className="px-4 py-3 text-muted-foreground">(id: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onQuantityChange</td>
                <td className="px-4 py-3 text-muted-foreground">(id: string, qty: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onCheckout</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showSummary</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">taxRate</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0.08</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
