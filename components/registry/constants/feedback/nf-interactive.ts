import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfInteractive: RegistryEntry = entry({
    id: "nf-interactive",
    title: "Interactive 404",
    description: "A 404 that spins when clicked — a small reward for lost visitors.",
    source: `import { useState } from "react";

export default function NfInteractive() {
  const [spin, setSpin] = useState(0);
  const handleClickSpin = () => setSpin((s) => s + 360);

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <h1
        onClick={handleClickSpin}
        className="cursor-pointer select-none text-8xl font-bold text-indigo-500 transition-all duration-700 ease-in-out hover:text-primary"
        style={{ transform: \`rotate(\${spin}deg)\`, textShadow: spin > 0 ? "0 0 40px rgba(99,102,241,0.4)" : "none" }}
      >
        404
      </h1>
      <p className="mt-2 text-xs text-zinc-400">Click the 404 to spin it!</p>
      <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-300">Interactive error page</p>
      <button className="mt-6 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary">Go Home</button>
    </div>
  );
}`,
  });
