import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfFunFact: RegistryEntry = entry({
    id: "nf-fun-fact",
    title: "Fun Fact 404",
    description: "Distracts visitors with a random fun fact while they recover.",
    source: `import { useState } from "react";

export default function NfFunFact() {
  const facts = [
    "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs.",
    "Octopuses have three hearts.",
    "Bananas are berries, but strawberries aren't.",
    "A group of flamingos is called a 'flamboyance'.",
    "The Eiffel Tower can be 15 cm taller during summer.",
    "Wombat poop is cube-shaped.",
    "You can't hum while holding your nose.",
    "The shortest war in history lasted 38 minutes.",
  ];
  const [fact] = useState(() => facts[Math.floor(Math.random() * facts.length)]);

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <h1 className="text-7xl font-bold text-zinc-200 dark:text-zinc-700">404</h1>
      <p className="mt-2 text-sm text-zinc-500">Page not found. But here&apos;s a fun fact:</p>
      <div className="mx-auto mt-5 max-w-md rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-5 dark:from-indigo-950 dark:to-purple-950">
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{fact}</p>
      </div>
      <button className="mt-6 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary">Go Home</button>
    </div>
  );
}`,
  });
