import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputSuffix: RegistryEntry = entry({
    id: "input-suffix",
    title: "With Suffix / Trailing",
    description: "Prefixes and suffixes inside the input frame.",
    source: `const base =
  "w-full rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500";

export default function InputSuffix() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
        <input type="number" placeholder="0.00" className="w-full rounded-lg border border-black/[.08] py-2 pl-7 pr-12 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">USD</span>
      </div>
      <div className="relative">
        <input type="text" placeholder="username" className="w-full rounded-lg border border-black/[.08] py-2 pl-3 pr-10 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">.com</span>
      </div>
    </div>
  );
}`,
  });
