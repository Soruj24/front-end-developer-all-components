import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfMatrix: RegistryEntry = entry({
    id: "nf-matrix",
    title: "Matrix 404",
    description: "A Matrix-inspired green code rain 404.",
    source: `export default function NfMatrix() {
  const chars = "01アイウエオカキクケコ";
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden" style={{ background: "#000", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ fontFamily: "monospace", fontSize: "14px", color: "#0f0", lineHeight: "1.2", wordBreak: "break-all", overflow: "hidden" }}>
        {Array.from({ length: 200 }, (_, i) => chars[Math.floor(Math.random() * chars.length)]).join(" ")}
      </div>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-green-500" style={{ textShadow: "0 0 20px #0f0" }}>404</h1>
        <p className="mt-2 text-lg text-green-400">Wake up, Neo... The page doesn&apos;t exist.</p>
        <button className="mt-8 rounded border border-green-500 bg-transparent px-6 py-2.5 text-sm text-green-400 hover:bg-green-500/10">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfCyberpunk: RegistryEntry = entry({
    id: "nf-cyberpunk",
    title: "Cyberpunk 404",
    description: "A neon cyberpunk-themed 404 with futuristic styling.",
    source: `export default function NfCyberpunk() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative">
        <h1 className="text-[10rem] font-black text-cyan-400" style={{ textShadow: "0 0 10px #0ff, 0 0 40px #0ff", letterSpacing: "0.1em" }}>404</h1>
        <div className="absolute -top-2 -right-4 rounded bg-pink-500 px-2 py-0.5 text-[10px] font-bold text-white">ERROR</div>
      </div>
      <p className="mt-2 text-lg text-cyan-300" style={{ textShadow: "0 0 5px #0ff" }}>SYSTEM FAILURE: Page not found</p>
      <p className="mt-1 text-xs text-pink-400">NEURAL LINK DISCONNECTED</p>
      <button className="mt-8 rounded border-2 border-cyan-400 bg-transparent px-8 py-3 text-sm font-bold text-cyan-400 hover:bg-cyan-400/10">Go Home</button>
    </div>
  );
}`,
  });

export const nfRetro80s: RegistryEntry = entry({
    id: "nf-retro-80s",
    title: "Retro 80s 404",
    description: "A colorful 1980s retro-themed 404.",
    source: `export default function NfRetro80s() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(180deg, #1a0033, #4a0080, #ff00ff)", borderRadius: "12px", minHeight: "400px" }}>
      <h1 className="text-[10rem] font-black text-transparent" style={{ WebkitTextStroke: "3px #ff00ff", textShadow: "0 0 30px #ff00ff" }}>404</h1>
      <p className="mt-2 text-xl font-bold text-yellow-300" style={{ fontFamily: "'Courier New', monospace", textShadow: "2px 2px 0 #ff00ff" }}>TOTALLY TUBULAR 404</p>
      <p className="mt-1 text-sm text-pink-200">Like, this page is totally rad... but gone.</p>
      <button className="mt-8 rounded-full bg-fuchsia-500 px-8 py-3 text-sm font-bold text-white hover:bg-fuchsia-400">Go Home</button>
    </div>
  );
}`,
  });

export const nfVaporwave: RegistryEntry = entry({
    id: "nf-vaporwave",
    title: "Vaporwave 404",
    description: "A vaporwave aesthetic 404 with pastel gradients.",
    source: `export default function NfVaporwave() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(180deg, #ffb6c1, #b19cd9, #7b68ee)", borderRadius: "12px", minHeight: "400px" }}>
      <h1 className="text-[10rem] font-bold text-white" style={{ textShadow: "4px 4px 0 #ff69b4, 8px 8px 0 #9370db" }}>404</h1>
      <p className="mt-2 text-xl font-bold text-white" style={{ fontFamily: "serif" }}>A E S T H E T I C</p>
      <p className="mt-1 text-sm text-white/80">This page has been vaporized.</p>
      <button className="mt-8 rounded bg-white/20 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30">Go Home</button>
    </div>
  );
}`,
  });

export const nfSteampunk: RegistryEntry = entry({
    id: "nf-steampunk",
    title: "Steampunk 404",
    description: "A steampunk mechanical gears-themed 404.",
    source: `export default function NfSteampunk() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(135deg, #2c1810, #4a2c1a)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="flex items-center gap-4">
        <svg className="h-16 w-16 animate-spin" style={{ animationDuration: "8s" }} viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        <h1 className="text-[8rem] font-bold text-amber-600">404</h1>
        <svg className="h-16 w-16 animate-spin" style={{ animationDuration: "8s", animationDirection: "reverse" }} viewBox="0 0 24 24" fill="none" stroke="#b8860b" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      </div>
      <p className="mt-4 text-lg text-amber-200">The gears have stopped. Page not found.</p>
      <button className="mt-6 rounded-lg border-2 border-amber-600 bg-transparent px-6 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-600/10">Go Home</button>
    </div>
  );
}`,
  });
