import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formAddress: RegistryEntry = entry({
    id: "form-address",
    title: "Address Grid",
    description: "A two-column address form grid.",
    source: `export default function FormAddress() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-2xl rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Street</label>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="123 Main St" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">City</label>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="City" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">State</label>
          <select className={\`\${inputBase} \${inputBorder} w-full\`}>
            <option>NY</option>
            <option>CA</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">ZIP</label>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="10001" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Country</label>
          <select className={\`\${inputBase} \${inputBorder} w-full\`}>
            <option>US</option>
            <option>CA</option>
          </select>
        </div>
      </div>
      <button type="submit" className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}`,
  });
