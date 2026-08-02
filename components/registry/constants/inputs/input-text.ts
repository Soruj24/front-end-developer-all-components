import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputText: RegistryEntry = entry({
    id: "input-text",
    title: "Text",
    description: "A basic single-line text input.",
    source: `export default function InputText() {
  return (
    <input
      type="text"
      placeholder="Enter your name"
      className="w-full max-w-sm rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500"
    />
  );
}`,
  });
