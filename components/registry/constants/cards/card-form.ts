import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardForm: RegistryEntry = entry({
    id: "card-form",
    title: "Form Card",
    description: "Card wrapping a simple contact form.",
    source: `import { useState } from "react";

export default function CardForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-md rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
      <h3 className="font-semibold">Contact Form</h3>
      <div className="mt-3 flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-transparent"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-transparent"
        />
        <button className="rounded-md bg-zinc-900 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900">Submit</button>
      </div>
    </div>
  );
}`,
  });
