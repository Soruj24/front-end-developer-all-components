import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfFunny: RegistryEntry = entry({
    id: "nf-funny",
    title: "Lighthearted 404s",
    description: "Playful 404s: vacation, under construction, and tea time themes.",
    source: `export default function NfFunny() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <span className="text-5xl">🏖️</span>
        <h1 className="mt-4 text-2xl font-bold text-warning dark:text-warning">Oops!</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">This page went on vacation</p>
        <p className="mt-1 text-xs text-zinc-400">It didn&apos;t even leave a forwarding address.</p>
        <button className="mt-5 rounded-full bg-warning px-6 py-2 text-sm font-medium text-white hover:bg-warning">Take Me Home</button>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <span className="text-5xl">🚧</span>
        <h1 className="mt-3 text-3xl font-bold text-warning dark:text-warning">404</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Under Construction</p>
        <p className="mt-1 text-xs text-zinc-400">This page is being built. Check back later!</p>
        <div className="mt-3 flex gap-2 text-xl">
          <span>🔨</span><span>🛠️</span><span>📐</span>
        </div>
        <button className="mt-4 rounded-lg bg-warning px-5 py-2 text-sm font-medium text-white hover:bg-warning">Back to Safety</button>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl p-6 text-center" style={{ background: "linear-gradient(180deg, #fef3c7 0%, #fff 100%)" }}>
        <span className="text-5xl">🍵</span>
        <h1 className="mt-3 text-2xl font-bold text-amber-800">Take a break</h1>
        <p className="mt-1 text-xs text-zinc-500">The page you were looking for isn&apos;t here.</p>
        <p className="text-[11px] italic text-zinc-400">Enjoy a cup of tea while you decide where to go.</p>
        <button className="mt-4 rounded-lg bg-amber-700 px-5 py-2 text-sm font-medium text-white hover:bg-amber-800">Back to Home</button>
      </div>
    </div>
  );
}`,
  });
