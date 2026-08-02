import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formInlineHorizontal: RegistryEntry = entry({
    id: "form-inline-horizontal",
    title: "Horizontal Inline Forms",
    description: "Compact single-row filter and search forms.",
    source: `export default function FormInlineHorizontal() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-wrap items-end gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium">Start</label>
          <input type="date" className={\`\${inputBase} \${inputBorder}\`} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium">End</label>
          <input type="date" className={\`\${inputBase} \${inputBorder}\`} />
        </div>
        <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
          Filter
        </button>
      </form>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-wrap items-end gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
      >
        <div className="flex-1 basis-40">
          <label className="mb-1 block text-xs font-medium">Search</label>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Search..." />
        </div>
        <select className={\`\${inputBase} \${inputBorder}\`}>
          <option>Any</option>
          <option>Admin</option>
          <option>User</option>
        </select>
        <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
          Go
        </button>
      </form>
    </div>
  );
}`,
  });
