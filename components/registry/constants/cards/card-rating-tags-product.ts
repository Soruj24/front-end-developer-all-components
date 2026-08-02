import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardRatingTagsProduct: RegistryEntry = entry({
    id: "card-rating-tags-product",
    title: "Rating, Tags & Product Cards",
    description: "Star ratings, tag chips, and a storefront product.",
    source: `export default function CardRatingTagsProduct() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <span className="text-3xl">⭐</span>
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} className={\`h-4 w-4 \${s <= 4 ? "text-amber-400" : "text-zinc-200 dark:text-zinc-700"}\`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-zinc-500">4.0 (128 reviews)</span>
        </div>
        <p className="mt-2 text-sm text-zinc-500">Rating card with star ratings and review count.</p>
      </div>
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <span className="text-3xl">🔖</span>
        <h3 className="mt-2 font-semibold">Tags Card</h3>
        <p className="mt-1 text-sm text-zinc-500">Content card with technology tags.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["React", "TypeScript", "Tailwind", "Next.js"].map((t) => (
            <span key={t} className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800">{t}</span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-5xl dark:from-zinc-800 dark:to-zinc-700">🛍️</div>
        <div className="p-4">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Electronics</span>
          <h3 className="mt-1 font-semibold">Wireless Headphones</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xl font-bold">$79.99</span>
            <button className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
