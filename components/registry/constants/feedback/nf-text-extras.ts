import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfNeon: RegistryEntry = entry({
    id: "nf-neon",
    title: "Neon 404",
    description: "A glowing neon sign effect 404 on dark background.",
    source: `export default function NfNeon() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "#0a0a0a", borderRadius: "12px" }}>
      <h1 className="text-[10rem] font-bold text-white" style={{ textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0ff, 0 0 80px #0ff, 0 0 120px #0ff" }}>404</h1>
      <p className="mt-2 text-lg text-cyan-400" style={{ textShadow: "0 0 10px #0ff" }}>Neon sign says: Page not found</p>
      <button className="mt-8 rounded-full border-2 border-cyan-400 bg-transparent px-8 py-3 text-sm font-medium text-cyan-400 hover:bg-cyan-400/10">Go Home</button>
    </div>
  );
}`,
  });

export const nfPixelArt: RegistryEntry = entry({
    id: "nf-pixel-art",
    title: "Pixel Art 404",
    description: "A retro 8-bit pixel art style 404 with game over theme.",
    source: `export default function NfPixelArt() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ imageRendering: "pixelated" }}>
      <div className="grid grid-cols-5 gap-1">
        {[1,0,1,0,1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,1,1].map((v, i) => (
          <div key={i} className={\`h-4 w-4 \${v ? "bg-amber-500" : "bg-transparent"}\`} />
        ))}
      </div>
      <h1 className="mt-6 text-5xl font-bold text-amber-500" style={{ fontFamily: "'Press Start 2P', monospace" }}>404</h1>
      <p className="mt-3 text-sm text-zinc-500">Game Over! Page not found.</p>
      <button className="mt-6 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-bold text-black hover:bg-amber-400">Go Home</button>
    </div>
  );
}`,
  });

export const nfOrigami: RegistryEntry = entry({
    id: "nf-origami",
    title: "Origami 404",
    description: "A paper-fold origami style 404 with geometric shapes.",
    source: `export default function NfOrigami() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <svg viewBox="0 0 120 120" className="h-32 w-32" style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.15))" }}>
        <polygon points="60,10 110,60 60,110 10,60" fill="#f0f0f0" stroke="#d1d5db" strokeWidth="1" />
        <polygon points="60,10 110,60 60,60" fill="#e5e7eb" />
        <polygon points="60,60 110,60 60,110" fill="#d1d5db" />
        <text x="60" y="65" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#6b7280">404</text>
      </svg>
      <p className="mt-4 text-zinc-500">This page folded away</p>
      <button className="mt-6 rounded-lg bg-zinc-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-600">Go Home</button>
    </div>
  );
}`,
  });

export const nfPopArt: RegistryEntry = entry({
    id: "nf-pop-art",
    title: "Pop Art 404",
    description: "An Andy Warhol inspired 404 with colorful grid layout.",
    source: `export default function NfPopArt() {
  const bg = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff"];
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="grid grid-cols-2 gap-2">
        {bg.map((c, i) => (
          <div key={i} className="flex h-28 w-28 items-center justify-center rounded-lg" style={{ background: c }}>
            <span className="text-4xl font-bold text-white" style={{ textShadow: "2px 2px 0 #000" }}>404</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-lg font-bold text-zinc-900">POP! Page not found</p>
      <button className="mt-6 rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold text-white hover:opacity-90">Go Home</button>
    </div>
  );
}`,
  });
