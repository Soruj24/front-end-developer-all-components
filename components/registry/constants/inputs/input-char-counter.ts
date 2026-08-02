import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputCharCounter: RegistryEntry = entry({
    id: "input-char-counter",
    title: "With Character Counter",
    description: "Live countdown toward the max length.",
    source: `import { useState } from "react";

export default function InputCharCounter() {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <textarea
        rows={3}
        maxLength={200}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write something..."
        className="w-full resize-none rounded-lg border border-black/[.08] px-3 py-2 pr-12 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500"
      />
      <p className={\`text-right text-xs \${value.length >= 180 ? "text-red-500" : "text-zinc-400"}\`}>
        {value.length}/200
      </p>
    </div>
  );
}`,
  });
