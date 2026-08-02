import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const inputHelper: RegistryEntry = entry({
    id: "input-helper",
    title: "With Helper Text",
    description: "Supporting copy and inline validation states.",
    source: `export default function InputHelper() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <input
          type="password"
          placeholder="Create a password"
          className="w-full rounded-lg border border-black/[.08] px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent dark:focus:border-zinc-500"
        />
        <p className="text-xs text-zinc-500">Must be at least 8 characters with a number.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <input
          type="email"
          placeholder="Email"
          defaultValue="bad-email"
          className="w-full rounded-lg border border-red-400 px-3 py-2 text-sm outline-none focus:border-red-500 dark:bg-transparent"
        />
        <p className="text-xs text-red-500">Please enter a valid email address.</p>
      </div>
    </div>
  );
}`,
  });
