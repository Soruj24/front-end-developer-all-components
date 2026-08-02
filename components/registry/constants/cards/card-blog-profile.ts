import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardBlogProfile: RegistryEntry = entry({
    id: "card-blog-profile",
    title: "Blog Post & Profile Cards",
    description: "Article cards with cover, tag, and metadata.",
    source: `const posts = [
  { title: "Getting Started with Next.js", author: "Sarah Chen", date: "Mar 15, 2026", read: "5 min", tag: "Development" },
  { title: "Tailwind CSS Best Practices", author: "Alex Rivera", date: "Mar 12, 2026", read: "8 min", tag: "Design" },
  { title: "TypeScript Tips & Tricks", author: "James Wilson", date: "Mar 10, 2026", read: "6 min", tag: "TypeScript" },
];

export default function CardBlogProfile() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-black/[.08] transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/[.145]">
          <div className="flex h-36 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-4xl dark:from-zinc-800 dark:to-zinc-700">📰</div>
          <div className="p-4">
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{post.tag}</span>
            <h3 className="mt-2 font-semibold">{post.title}</h3>
            <p className="mt-1 text-xs text-zinc-500">{post.author} · {post.date} · {post.read}</p>
          </div>
        </div>
      ))}
    </div>
  );
}`,
  });
