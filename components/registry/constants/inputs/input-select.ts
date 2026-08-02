import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputSelect: RegistryEntry = entry({
    id: "input-select",
    title: "Select",
    description: "Dropdown select.",
    source: `export default function InputSelect() {
  return (
    <select className="w-full max-w-sm rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500">
      <option>Option A</option>
      <option>Option B</option>
      <option>Option C</option>
    </select>
  );
}`,
  });
