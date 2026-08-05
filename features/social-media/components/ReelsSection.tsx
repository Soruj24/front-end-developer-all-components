import Image from "next/image";
import { reels } from "../constants/social-data";
import { ActionButton } from "./ActionButton";

export function ReelsSection() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Reels / Shorts</h3>
        <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">See all</button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {reels.map((reel) => (
          <div key={reel.id} className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-xl">
            <Image src={reel.image} alt={reel.description} fill className="object-cover transition-transform group-hover:scale-105" sizes="200px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-[11px] font-medium leading-tight text-white">{reel.description}</p>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-white/70">
                <ActionButton icon="like" count={Number(reel.likes.replace("K", "000"))} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
