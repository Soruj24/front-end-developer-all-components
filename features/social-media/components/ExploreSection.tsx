import Image from "next/image";
import { exploreCategories } from "../constants/social-data";

export function ExploreSection() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Explore</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {exploreCategories.map((cat) => (
          <div key={cat.label} className="group relative cursor-pointer overflow-hidden rounded-xl">
            <Image src={cat.image} alt={cat.label} width={200} height={150} className="h-24 w-full object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2">
              <p className="text-sm font-semibold text-white">{cat.label}</p>
              <p className="text-[10px] text-white/70">{cat.posts} posts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
