import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formTextareaVariants: RegistryEntry = entry({
    id: "form-textarea-variants",
    title: "Textarea Variants",
    description: "Default, labeled with hint, and auto-resizing textareas.",
    source: `export default function FormTextareaVariants() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Default</p>
        <textarea rows={3} className={\`\${inputBase} \${inputBorder} w-full resize-none\`} placeholder="Default textarea..." />
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Label &amp; Hint</p>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium">Description</label>
          <textarea rows={3} className={\`\${inputBase} \${inputBorder} w-full resize-none\`} placeholder="Enter description..." />
          <p className="text-[10px] text-zinc-400">Max 500 characters</p>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Auto-Resize</p>
        <textarea rows={1} className={\`\${inputBase} \${inputBorder} w-full resize-none overflow-hidden\`} placeholder="Type to expand..." />
      </div>
    </div>
  );
}`,
  });
