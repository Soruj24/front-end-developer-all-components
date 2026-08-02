import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formPrefixSuffix: RegistryEntry = entry({
    id: "form-prefix-suffix",
    title: "Prefix & Suffix Inputs",
    description: "Inputs with currency and unit add-ons.",
    source: `export default function FormPrefixSuffix() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Prefix</p>
        <div className="flex">
          <span className="flex items-center rounded-l-lg border border-r-0 border-zinc-300 bg-zinc-100 px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800">
            $
          </span>
          <input className={\`\${inputBase} w-full rounded-l-none \${inputBorder}\`} placeholder="Amount" />
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Suffix</p>
        <div className="flex">
          <input className={\`\${inputBase} w-full rounded-r-none \${inputBorder}\`} placeholder="Weight" />
          <span className="flex items-center rounded-r-lg border border-l-0 border-zinc-300 bg-zinc-100 px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800">
            kg
          </span>
        </div>
      </div>
    </div>
  );
}`,
  });
