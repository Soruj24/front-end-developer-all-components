import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfPirate: RegistryEntry = entry({
    id: "nf-pirate",
    title: "Pirate 404",
    description: "A pirate-themed 404 with nautical elements.",
    source: `export default function NfPirate() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <span className="text-7xl">🏴‍☠️</span>
      <h1 className="mt-4 text-5xl font-bold text-amber-800 dark:text-amber-400">404</h1>
      <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">Yarr! This page has walked the plank!</p>
      <p className="mt-1 text-sm text-zinc-400">Abandon ship and head back to shore.</p>
      <button className="mt-8 rounded-lg bg-amber-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700">Go Home</button>
    </div>
  );
}`,
  });

export const nfZombie: RegistryEntry = entry({
    id: "nf-zombie",
    title: "Zombie 404",
    description: "A zombie apocalypse themed 404.",
    source: `export default function NfZombie() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <span className="text-7xl">🧟</span>
      <h1 className="mt-4 text-5xl font-bold text-green-700 dark:text-green-400">BRAAAINS...</h1>
      <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">This page was eaten by zombies.</p>
      <p className="mt-1 text-sm text-zinc-400">Run! Before they get you too.</p>
      <button className="mt-8 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-600">Go Home</button>
    </div>
  );
}`,
  });

export const nfNinja: RegistryEntry = entry({
    id: "nf-ninja",
    title: "Ninja 404",
    description: "A stealthy ninja-themed 404.",
    source: `export default function NfNinja() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <span className="text-7xl">🥷</span>
      <h1 className="mt-4 text-5xl font-bold text-zinc-800 dark:text-zinc-100">404</h1>
      <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">This page vanished like a ninja.</p>
      <p className="mt-1 text-sm text-zinc-400">It was never here. Or was it?</p>
      <button className="mt-8 rounded-lg bg-zinc-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-700">Go Home</button>
    </div>
  );
}`,
  });

export const nfCowboy: RegistryEntry = entry({
    id: "nf-cowboy",
    title: "Cowboy 404",
    description: "A western cowboy-themed 404.",
    source: `export default function NfCowboy() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <span className="text-7xl">🤠</span>
      <h1 className="mt-4 text-5xl font-bold text-amber-900 dark:text-amber-300">404</h1>
      <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">Well, this page rode off into the sunset.</p>
      <p className="mt-1 text-sm text-zinc-400">Ain&apos;t nothin&apos; here, partner.</p>
      <button className="mt-8 rounded-full bg-amber-900 px-8 py-3 text-sm font-medium text-white hover:bg-amber-800">Go Home</button>
    </div>
  );
}`,
  });

export const nfDetective: RegistryEntry = entry({
    id: "nf-detective",
    title: "Detective 404",
    description: "A film noir detective-themed 404 with case file.",
    source: `export default function NfDetective() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "#1a1a1a", borderRadius: "12px", color: "#d4d4d4" }}>
      <span className="text-7xl">🔍</span>
      <h1 className="mt-4 text-4xl font-bold text-zinc-200">Case #404: Missing Page</h1>
      <p className="mt-2 text-sm text-zinc-400">Status: Cold case. The page vanished without a trace.</p>
      <div className="mt-4 rounded-lg bg-zinc-800 p-4 text-left text-xs text-zinc-400">
        <p>SUSPECT: Unknown</p>
        <p>LAST SEEN: /this-page</p>
        <p>EVIDENCE: 404 error log</p>
      </div>
      <button className="mt-6 rounded border border-zinc-600 bg-transparent px-6 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800">Go Home</button>
    </div>
  );
}`,
  });
