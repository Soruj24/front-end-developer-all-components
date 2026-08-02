import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfGlitch: RegistryEntry = entry({
    id: "nf-glitch",
    title: "Glitch 404",
    description: "An RGB-split glitch effect over a large 404.",
    source: `export default function NfGlitch() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
      <style>{\`
        @keyframes glitch1 { 0%,100% { transform: translate(0); } 20% { transform: translate(-3px, 2px) skewX(-2deg); } 40% { transform: translate(3px, -1px) skewX(2deg); } 60% { transform: translate(-2px, -2px) skewX(-1deg); } 80% { transform: translate(2px, 1px) skewX(1deg); } }
        @keyframes glitch2 { 0%,100% { transform: translate(0); opacity: 0.5; } 25% { transform: translate(-4px, 2px) skewX(3deg); clip-path: inset(20% 0 30% 0); } 50% { transform: translate(4px, -1px) skewX(-3deg); clip-path: inset(50% 0 10% 0); } 75% { transform: translate(-2px, 3px) skewX(2deg); clip-path: inset(0% 0 60% 0); } }
        @keyframes glitch3 { 0%,100% { transform: translate(0); opacity: 0.3; } 30% { transform: translate(5px, -2px) skewX(-4deg); clip-path: inset(10% 0 50% 0); } 60% { transform: translate(-5px, 3px) skewX(4deg); clip-path: inset(40% 0 20% 0); } }
      \`}</style>
      <div className="relative">
        <h1 className="text-8xl font-bold text-zinc-900 dark:text-zinc-100" style={{ animation: "glitch1 3s infinite" }}>404</h1>
        <h1 className="absolute inset-0 text-8xl font-bold text-cyan-500" style={{ animation: "glitch2 2.5s infinite", top: 0 }} aria-hidden>404</h1>
        <h1 className="absolute inset-0 text-8xl font-bold text-pink-500" style={{ animation: "glitch3 3.5s infinite", top: 0 }} aria-hidden>404</h1>
      </div>
      <p className="mt-4 text-sm text-zinc-500">Page glitched out</p>
      <button className="mt-5 rounded border-2 border-zinc-900 bg-transparent px-5 py-2 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900">Reset</button>
    </div>
  );
}`,
  });
