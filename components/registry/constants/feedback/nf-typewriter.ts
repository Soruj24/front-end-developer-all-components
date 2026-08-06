import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfTypewriter: RegistryEntry = entry({
    id: "nf-typewriter",
    title: "Typewriter 404",
    description: "A retro terminal-style 404 with blinking cursor and monospace font.",
    source: `export default function NfTypewriter() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ fontFamily: "'Courier New', monospace" }}>
      <div className="rounded-xl border-2 border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-6xl font-bold text-green-400" style={{ animation: "blink 1s step-end infinite" }}>404_</h1>
        <p className="mt-4 text-sm text-green-300/70">ERROR: Page not found in database</p>
        <p className="mt-1 text-sm text-green-300/70">Try refreshing or go back to home.</p>
      </div>
      <button className="mt-8 rounded border border-green-500 bg-transparent px-6 py-2.5 text-sm font-medium text-green-400 hover:bg-green-500/10">Go Home</button>
      <style>{\`@keyframes blink { 50% { opacity: 0; } }\`}</style>
    </div>
  );
}`,
  });
