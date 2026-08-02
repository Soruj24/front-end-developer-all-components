import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputTextarea: RegistryEntry = entry({
    id: "input-textarea",
    title: "Textarea",
    description: "Multi-line text input.",
    source: `export default function InputTextarea() {
  return (
    <textarea
      rows={3}
      placeholder="Write something..."
      className="w-full max-w-md rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500"
    />
  );
}`,
  });
