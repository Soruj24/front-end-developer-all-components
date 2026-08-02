import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formRegister: RegistryEntry = entry({
    id: "form-register",
    title: "Register Form",
    description: "A create-account form with name fields.",
    source: `export default function FormRegister() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-sm rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <h3 className="mb-4 text-lg font-semibold">Create Account</h3>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">First</label>
            <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="John" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Last</label>
            <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Doe" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="john@example.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input type="password" className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="Min 8 characters" />
        </div>
        <button type="submit" className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white">
          Create Account
        </button>
        <p className="text-center text-xs text-zinc-500">
          By signing up you agree to our{" "}
          <button type="button" className="text-primary hover:underline">
            Terms
          </button>
        </p>
      </div>
    </form>
  );
}`,
  });
