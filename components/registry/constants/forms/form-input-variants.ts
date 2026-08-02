import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formInputVariants: RegistryEntry = entry({
    id: "form-input-variants",
    title: "Input Variants",
    description: "Text inputs, input types, and size variations.",
    source: `export default function FormInputVariants() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Text Inputs</p>
        <div className="flex flex-col gap-3">
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Default" />
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Disabled" disabled />
          <input className={\`\${inputBase} w-full border-red-500\`} defaultValue="Error state" />
          <input className={\`\${inputBase} w-full border-success\`} defaultValue="Success state" />
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Input Types</p>
        <div className="flex flex-col gap-3">
          <input type="email" className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Email" />
          <input type="password" className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Password" />
          <input type="number" className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Number" />
          <input type="tel" className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Phone" />
          <input type="url" className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="URL" />
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Sizes</p>
        <div className="flex flex-col gap-3">
          <input className="rounded-lg border border-black/[.08] px-2 py-1 text-xs dark:border-white/[.145]" placeholder="Small (xs)" />
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Default (sm)" />
          <input className="rounded-lg border border-black/[.08] px-4 py-3 text-base dark:border-white/[.145]" placeholder="Large (base)" />
          <input className="rounded-lg border border-black/[.08] px-5 py-3.5 text-lg dark:border-white/[.145]" placeholder="XLarge" />
        </div>
      </div>
    </div>
  );
}`,
  });
