"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Store, ShoppingBag, Tag, CreditCard, Star, Package, Truck } from "lucide-react";

const installCommand = `npx component-library@latest add store-front`;
const usageCode = `<StoreHeader brand="Acme Store" cartCount={3} />`;

function StoreHeader() {
  const [cartCount, setCartCount] = useState(3);
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">Acme Store</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground hover:text-foreground">
            <Tag className="h-5 w-5" />
          </button>
          <button className="relative text-muted-foreground hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {searchOpen && (
        <input
          autoFocus
          placeholder="Search products..."
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      )}
      <div className="flex gap-4 border-t pt-3 text-sm text-muted-foreground">
        <button onClick={() => setCartCount((c) => c + 1)} className="hover:text-foreground">+ Add to Cart</button>
        <span>|</span>
        <span>Free shipping on orders over $50</span>
      </div>
    </div>
  );
}

function ProductGrid() {
  const [view, setView] = useState("grid");
  const products = [
    { name: "Wireless Headphones", price: 79.99, rating: 4 },
    { name: "Smart Watch", price: 199.99, rating: 5 },
    { name: "USB-C Hub", price: 49.99, rating: 4 },
    { name: "Mechanical Keyboard", price: 129.99, rating: 5 },
  ];
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Products</h3>
        <div className="flex gap-1">
          {["grid", "list"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded px-2 py-1 text-xs font-medium ${
                view === v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {v === "grid" ? "Grid" : "List"}
            </button>
          ))}
        </div>
      </div>
      <div className={view === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-2"}>
        {products.map((p) => (
          <div key={p.name} className={`rounded-md border p-3 ${view === "list" ? "flex items-center justify-between" : ""}`}>
            <div className={view === "grid" ? "flex flex-col gap-1" : ""}>
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < p.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm font-bold text-foreground">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaleBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="relative flex items-center justify-between rounded-lg bg-primary p-4 text-primary-foreground">
      <div className="flex items-center gap-3">
        <Tag className="h-5 w-5" />
        <div>
          <p className="font-bold">Summer Sale — 30% Off Everything</p>
          <p className="text-sm opacity-90">Use code SUMMER30 at checkout</p>
        </div>
      </div>
      <button onClick={() => setDismissed(true)} className="rounded-md bg-white/20 px-3 py-1 text-sm font-medium hover:bg-white/30">
        Dismiss
      </button>
    </div>
  );
}

function PriceTag() {
  const [currency, setCurrency] = useState("USD");
  const price = 49.99;
  const rates = { USD: "$", EUR: "€", GBP: "£" };
  const multipliers = { USD: 1, EUR: 0.92, GBP: 0.79 };
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
      <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 px-6 py-4 text-center">
        <p className="text-2xl font-bold text-foreground">{rates[currency]}{(price * multipliers[currency]).toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">Per unit</p>
      </div>
      <div className="flex gap-1">
        {["USD", "EUR", "GBP"].map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`rounded px-3 py-1 text-xs font-medium ${
              currency === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function FeaturedItem() {
  const [inWishlist, setInWishlist] = useState(false);
  return (
    <div className="flex gap-4 rounded-lg border bg-card p-6">
      <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-muted/50">
        <Package className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground">Pro Wireless Mouse</h3>
            <Badge variant="success">Featured</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Ergonomic design with 20K DPI sensor</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-foreground">$79.99</p>
          <button
            onClick={() => setInWishlist(!inWishlist)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              inWishlist ? "bg-red-100 text-red-600" : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {inWishlist ? "♥ Saved" : "Save to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StoreFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <h4 className="font-medium text-foreground">Shop</h4>
          <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Sale</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-foreground">Support</h4>
          <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
            <li>Help Center</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-foreground">Company</h4>
          <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
      <div className="border-t pt-4">
        {subscribed ? (
          <p className="text-sm text-green-600">Thanks for subscribing!</p>
        ) : (
          <div className="flex gap-2">
            <input
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => { if (email) setSubscribed(true); }}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Subscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PromoCard() {
  const [applied, setApplied] = useState(false);
  return (
    <div className="flex items-center gap-4 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <CreditCard className="h-7 w-7 text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-foreground">New Customer Discount</p>
        <p className="text-sm text-muted-foreground">Get $10 off your first order</p>
      </div>
      <button
        onClick={() => setApplied(!applied)}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          applied ? "bg-green-100 text-green-700" : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {applied ? "Applied!" : "Apply Code"}
      </button>
    </div>
  );
}

export default function StoreFrontPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Store Front</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A layout component for displaying product catalogs with grid/list views, filtering, and responsive product cards.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Store Header</h2>
        <ComponentPreview component="StoreFrontGrid" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Product Grid</h2>
        <ComponentPreview component="StoreFrontList" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sale Banner</h2>
        <ComponentPreview component="StoreFrontFilters" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Price Tag</h2>
        <ComponentPreview component="StoreFrontPrice" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Featured Item</h2>
        <ComponentPreview component="StoreFrontFeatured" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Store Footer</h2>
        <ComponentPreview component="StoreFrontFooter" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Promo Card</h2>
        <ComponentPreview component="StoreFrontPromo" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">products</td><td className="px-4 py-3 text-muted-foreground">Product[]</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">layout</td><td className="px-4 py-3 text-muted-foreground">{'"grid" | "list"'}</td><td className="px-4 py-3 text-muted-foreground">{'"grid"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">brand</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'""'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">cartCount</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onAddToCart</td><td className="px-4 py-3 text-muted-foreground">{'(id: string) => void'}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showBanner</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr><tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
