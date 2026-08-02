import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formNewsletter: RegistryEntry = entry({
    id: "form-newsletter",
    title: "Newsletter Signup",
    description: "A gradient signup card for email subscriptions.",
    source: `export default function FormNewsletter() {
  const inputBase =
    "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
  const inputBorder = "border-black/[.08] dark:border-white/[.145]";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-8 text-center dark:border-zinc-800 dark:from-zinc-900 dark:to-black"
    >
      <h3 className="text-xl font-bold">Stay in the loop</h3>
      <p className="max-w-md text-sm text-zinc-500">
        Get the latest updates, features, and news delivered to your inbox.
      </p>
      <div className="flex w-full max-w-md gap-2">
        <input type="email" className={\`\${inputBase} \${inputBorder} flex-1\`} placeholder="your@email.com" />
        <button type="submit" className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white">
          Subscribe
        </button>
      </div>
      <p className="text-xs text-zinc-400">No spam. Unsubscribe anytime.</p>
    </form>
  );
}`,
  });
