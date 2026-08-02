import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfQuote: RegistryEntry = entry({
    id: "nf-quote",
    title: "Quote 404",
    description: "A not-found page that shares a coding quote to guide visitors back.",
    source: `import { useState } from "react";

export default function NfQuote() {
  const quotes = [
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Stay hungry, stay foolish. — Steve Jobs",
    "Code is like humor. When you have to explain it, it's bad. — Cory House",
    "First, solve the problem. Then, write the code. — John Johnson",
    "Simplicity is the soul of efficiency. — Austin Freeman",
    "Make it work, make it right, make it fast. — Kent Beck",
    "Talk is cheap. Show me the code. — Linus Torvalds",
    "Any fool can write code that a computer can understand. — Martin Fowler",
  ];
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <h1 className="text-7xl font-bold text-zinc-200 dark:text-zinc-700">404</h1>
      <p className="mt-2 text-sm text-zinc-500">Lost? Find your way with this:</p>
      <div className="mx-auto mt-5 max-w-lg">
        <p className="text-lg italic leading-relaxed text-zinc-700 dark:text-zinc-200">&ldquo;{quote.split("—")[0].trim()}&rdquo;</p>
        <p className="mt-2 text-sm text-zinc-400">&mdash; {quote.split("—")[1].trim()}</p>
      </div>
      <button className="mt-6 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Go Home</button>
    </div>
  );
}`,
  });
