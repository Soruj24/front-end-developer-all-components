import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardProductGrid: RegistryEntry = entry({
    id: "card-product-grid",
    title: "Product & Grid Demo",
    description: "Storefront product cards with ratings and pricing.",
    source: `const products = [
  { name: "Wireless Headphones", price: 79.99, rating: 4.5, reviews: 234, tag: "Electronics" },
  { name: "Leather Backpack", price: 129.99, rating: 4.8, reviews: 89, tag: "Accessories" },
  { name: "Smart Watch", price: 249.99, rating: 4.6, reviews: 412, tag: "Electronics" },
];

export default function CardProductGrid() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <div key={i} className="rounded-lg border border-black/[.08] p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/[.145]">
          <div className="flex h-32 items-center justify-center rounded-md bg-gradient-to-br from-zinc-100 to-zinc-200 text-4xl dark:from-zinc-800 dark:to-zinc-700">📦</div>
          <span className="mt-2 inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800">{p.tag}</span>
          <h3 className="mt-1 font-semibold">{p.name}</h3>
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className={\`h-3 w-3 \${s <= Math.floor(p.rating) ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"}\`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span>({p.reviews})</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold">\${p.price}</span>
            <button className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700">Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}`,
  });
