import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formLogin: RegistryEntry = entry({
    id: "form-login",
    title: "Login Form",
    description: "A compact sign-in form.",
    source: `export default function FormLogin() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-sm rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <h3 className="mb-4 text-lg font-semibold">Sign In</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input type="email" className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input type="password" className={\`\${inputBase} \${inputBorder} w-full\`} placeholder="••••••••" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="accent-zinc-900" />
            Remember me
          </label>
          <button type="button" className="text-primary hover:underline">
            Forgot?
          </button>
        </div>
        <button type="submit" className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white">
          Sign In
        </button>
        <p className="text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <button type="button" className="text-primary hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}`,
  });
