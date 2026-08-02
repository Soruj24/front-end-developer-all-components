import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputDisabled: RegistryEntry = entry({
    id: "input-disabled",
    title: "Disabled & Readonly",
    description: "Non-editable and read-only states.",
    source: `export default function InputDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <input
        type="text"
        value="Disabled input"
        disabled
        className="w-full cursor-not-allowed rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm text-zinc-400 dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-500"
      />
      <input
        type="text"
        value="Readonly value"
        readOnly
        className="w-full rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm outline-none dark:border-white/[.145] dark:bg-zinc-900/50"
      />
    </div>
  );
}`,
  });
