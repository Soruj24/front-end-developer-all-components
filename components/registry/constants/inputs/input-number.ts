import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputNumber: RegistryEntry = entry({
    id: "input-number",
    title: "Number",
    description: "Numeric input.",
    source: `export default function InputNumber() {
  return (
    <input
      type="number"
      placeholder="42"
      className="w-full max-w-sm rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500"
    />
  );
}`,
  });
