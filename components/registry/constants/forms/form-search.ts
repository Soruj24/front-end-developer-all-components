import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formSearch: RegistryEntry = entry({
    id: "form-search",
    title: "Search Form",
    description: "Search bar with quick filter chips.",
    source: `export default function FormSearch() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-lg rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">S</span>
          <input className={\`\${inputBase} \${inputBorder} w-full pl-9\`} placeholder="Search projects, files, users..." />
        </div>
        <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
          Search
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["All", "Projects", "Files", "Users"].map((f) => (
          <button
            key={f}
            type="button"
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {f}
          </button>
        ))}
      </div>
    </form>
  );
}`,
  });
