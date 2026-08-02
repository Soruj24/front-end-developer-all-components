import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputClear: RegistryEntry = entry({
    id: "input-clear",
    title: "With Clear Button",
    description: "One-click clear button that appears while typing.",
    source: `import { useState } from "react";

const X = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function InputClear() {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        className="w-full rounded-lg border border-black/[.08] px-3 py-2 pr-10 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear input"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          <X />
        </button>
      )}
    </div>
  );
}`,
  });
