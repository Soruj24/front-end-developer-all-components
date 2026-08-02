import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputSearch: RegistryEntry = entry({
    id: "input-search",
    title: "Search",
    description: "Search input with a clearable value.",
    source: `export default function InputSearch() {
  return (
    <input
      type="search"
      placeholder="Search..."
      className="w-full max-w-sm rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500"
    />
  );
}`,
  });
