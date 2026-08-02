import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfJoke: RegistryEntry = entry({
    id: "nf-joke",
    title: "Joke 404",
    description: "A not-found page that serves up a programming joke.",
    source: `import { useState } from "react";

export default function NfJoke() {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Why did the developer go broke? Because he used up all his cache.",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "There are 10 types of people in the world: those who understand binary and those who don't.",
    "Why do Java developers wear glasses? Because they can't C#.",
    "I would tell you a UDP joke, but you might not get it.",
  ];
  const [joke] = useState(() => jokes[Math.floor(Math.random() * jokes.length)]);

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <h1 className="text-7xl font-bold text-zinc-200 dark:text-zinc-700">404</h1>
      <p className="mt-2 text-sm text-zinc-500">Page missing. Have a joke instead:</p>
      <div className="mx-auto mt-5 max-w-md rounded-xl border border-dashed border-zinc-300 p-5 dark:border-zinc-600">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{joke}</p>
      </div>
      <button className="mt-6 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Go Home</button>
    </div>
  );
}`,
  });
