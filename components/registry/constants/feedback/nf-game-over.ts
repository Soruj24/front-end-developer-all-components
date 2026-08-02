import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfGameOver: RegistryEntry = entry({
    id: "nf-game-over",
    title: "Game Over 404",
    description: "An arcade-style game over screen for the missing level.",
    source: `export default function NfGameOver() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl p-8 text-center" style={{ background: "#111", minHeight: "320px", fontFamily: "'Courier New', monospace" }}>
      <div className="space-y-1 text-2xl font-bold tracking-[0.5em] text-danger">
        <p>GAME</p>
        <p>OVER</p>
      </div>
      <div className="mt-5 h-1 w-28 bg-danger/30" />
      <p className="mt-5 text-5xl font-bold text-zinc-700">404</p>
      <p className="mt-2 text-sm tracking-widest text-zinc-600">LEVEL NOT FOUND</p>
      <div className="mt-6 flex gap-4">
        <button className="border border-red-500/50 px-6 py-2 text-xs tracking-wider text-red-400 transition-all hover:bg-danger/20">RESTART</button>
        <button className="border border-zinc-600 px-6 py-2 text-xs tracking-wider text-zinc-500 transition-all hover:bg-zinc-700">RETRY</button>
      </div>
    </div>
  );
}`,
  });
