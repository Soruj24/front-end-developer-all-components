import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formRating: RegistryEntry = entry({
    id: "form-rating",
    title: "Rating Form",
    description: "A five-star rating scale with a follow-up comment.",
    source: `import { useState } from "react";

export default function FormRating() {
  const [rating, setRating] = useState(0);
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium">Rate your experience</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRating(r)}
            className={\`h-10 w-10 rounded-full text-sm font-medium transition-colors \${r <= rating ? "bg-warning text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"}\`}
          >
            {r}
          </button>
        ))}
      </div>
      {rating > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          <textarea rows={2} className={\`\${inputBase} \${inputBorder} w-full resize-none\`} placeholder="Tell us more..." />
          <button type="button" className="self-start rounded-lg bg-warning px-4 py-2 text-sm font-medium text-white">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}`,
  });
