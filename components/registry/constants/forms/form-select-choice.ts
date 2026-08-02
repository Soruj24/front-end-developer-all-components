import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formSelectChoice: RegistryEntry = entry({
    id: "form-select-choice",
    title: "Select & Choice Inputs",
    description: "Standard selects, multi-select, radios, and checkboxes.",
    source: `export default function FormSelectChoice() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Standard Select</p>
        <select className={\`\${inputBase} \${inputBorder} w-full\`}>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Multi-Select</p>
        <select multiple className={\`\${inputBase} \${inputBorder} h-24 w-full\`}>
          <option>Red</option>
          <option>Blue</option>
          <option>Green</option>
          <option>Yellow</option>
        </select>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Radio Group</p>
        <div className="flex flex-col gap-2">
          {["Option A", "Option B", "Option C"].map((o, i) => (
            <label key={o} className="flex items-center gap-2 text-sm">
              <input type="radio" name="radio" defaultChecked={i === 0} className="accent-zinc-900 dark:accent-zinc-100" />
              {o}
            </label>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Checkbox Group</p>
        <div className="flex flex-col gap-2">
          {["Feature A", "Feature B", "Feature C"].map((f) => (
            <label key={f} className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked={f === "Feature A"} className="accent-zinc-900 dark:accent-zinc-100" />
              {f}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
