import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardInteractiveSocial: RegistryEntry = entry({
    id: "card-interactive-social",
    title: "Interactive & Social Proof Cards",
    description: "Selectable cards and like/share engagement.",
    source: `import { useState } from "react";

export default function CardInteractiveSocial() {
  const [selected, setSelected] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div
        onClick={() => setSelected((v) => !v)}
        className={
          selected
            ? "cursor-pointer rounded-lg border border-blue-500 bg-blue-50 p-5 shadow-md ring-1 ring-blue-500 dark:border-blue-400 dark:bg-blue-900/20"
            : "cursor-pointer rounded-lg border border-black/[.08] p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/[.145]"
        }
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔄</span>
          <div>
            <h3 className="font-semibold">Interactive Card</h3>
            <p className="text-sm text-zinc-500">Click to select — hover to lift</p>
          </div>
        </div>
        {selected && <span className="mt-2 inline-block rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">Selected</span>}
      </div>
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📣</span>
          <div>
            <h3 className="font-semibold">Social Proof</h3>
            <p className="text-sm text-zinc-500">Likes, comments, and shares</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500">
          <span className="flex items-center gap-1">❤️ {liked ? 43 : 42}</span>
          <span className="flex items-center gap-1">💬 18</span>
          <span className="flex items-center gap-1">🔄 7</span>
          <button onClick={() => setLiked((v) => !v)} className="ml-auto text-sm">{liked ? "❤️ Liked" : "🤍 Like"}</button>
        </div>
      </div>
    </div>
  );
}`,
  });
