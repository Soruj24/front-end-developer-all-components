import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfDarkGlow: RegistryEntry = entry({
    id: "nf-dark-glow",
    title: "Dark Mode 404s",
    description: "Neon glow typography and a lost-in-space scene on dark backgrounds.",
    source: `export default function NfDarkGlow() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-950 p-6 text-center" style={{ minHeight: "320px" }}>
        <h1 className="text-8xl font-bold text-transparent" style={{ textShadow: "0 0 40px #a78bfa, 0 0 80px #a78bfa, 0 0 120px #7c3aed", WebkitTextStroke: "2px #a78bfa" }}>404</h1>
        <p className="mt-2 text-sm text-zinc-400" style={{ textShadow: "0 0 20px #a78bfa55" }}>Lost in the dark</p>
        <button className="mt-6 rounded-lg border border-violet-400 bg-transparent px-5 py-2 text-sm font-medium text-violet-300 transition-all hover:bg-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30">Escape →</button>
      </div>
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-6 text-center" style={{ minHeight: "320px", background: "#0a0a1a" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #fff1 1px, transparent 1px), radial-gradient(circle at 80% 60%, #fff1 1px, transparent 1px)", backgroundSize: "40px 40px, 60px 60px" }} />
        <div className="relative z-10">
          <span className="text-5xl">🚀</span>
          <h1 className="mt-2 text-5xl font-bold text-white">404</h1>
          <p className="mt-1 text-sm text-zinc-400">Lost in space</p>
          <p className="text-xs text-zinc-600">This page drifted into the cosmic void.</p>
          <button className="mt-5 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 text-sm font-medium text-white">Return to Earth</button>
        </div>
      </div>
    </div>
  );
}`,
  });
