import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formDateTime: RegistryEntry = entry({
    id: "form-date-time",
    title: "Date & Time Inputs",
    description: "Date pickers and time controls with a live hue slider.",
    source: `import { useState } from "react";

export default function FormDateTime() {
  const [hue, setHue] = useState(50);
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Date Inputs</p>
        <div className="flex flex-col gap-3">
          <input type="date" className={\`\${inputBase} \${inputBorder} w-full\`} />
          <input type="datetime-local" className={\`\${inputBase} \${inputBorder} w-full\`} />
          <input type="month" className={\`\${inputBase} \${inputBorder} w-full\`} />
          <input type="week" className={\`\${inputBase} \${inputBorder} w-full\`} />
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Time Inputs</p>
        <div className="flex flex-col gap-3">
          <input type="time" className={\`\${inputBase} \${inputBorder} w-full\`} />
          <input
            type="range"
            min={0}
            max={100}
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="w-full accent-zinc-900 dark:accent-zinc-100"
          />
          <div className="flex items-center gap-2 text-sm">
            <span>Value: {hue}</span>
            <div
              className="h-4 w-4 rounded"
              style={{ backgroundColor: \`hsl(\${hue * 3.6}, 70%, 50%)\` }}
            />
          </div>
          <input type="color" className="h-10 w-full cursor-pointer rounded border border-zinc-300 p-0.5 dark:border-zinc-700" />
        </div>
      </div>
    </div>
  );
}`,
  });
