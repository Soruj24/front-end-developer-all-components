import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfGalaxy: RegistryEntry = entry({
    id: "nf-galaxy",
    title: "Galaxy 404",
    description: "A deep space galaxy-themed 404.",
    source: `export default function NfGalaxy() {
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden" style={{ background: "radial-gradient(ellipse at center, #1a0033 0%, #000 70%)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-transparent" style={{ WebkitTextStroke: "2px #a855f7", textShadow: "0 0 40px #a855f7" }}>404</h1>
        <p className="mt-2 text-lg text-purple-300">Lost in the galaxy</p>
        <p className="mt-1 text-sm text-purple-400/70">This page is 4.2 light years away.</p>
        <button className="mt-8 rounded-full bg-purple-600 px-8 py-3 text-sm font-medium text-white hover:bg-purple-500">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfAstronaut: RegistryEntry = entry({
    id: "nf-astronaut",
    title: "Astronaut 404",
    description: "A floating astronaut space-themed 404.",
    source: `export default function NfAstronaut() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(180deg, #0c0c1d, #1a1a3e)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-blue-200">Houston, we have a problem.</p>
        <p className="mt-1 text-sm text-blue-300/70">This page is not in orbit.</p>
        <button className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-500">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfAlien: RegistryEntry = entry({
    id: "nf-alien",
    title: "Alien 404",
    description: "An alien abduction themed 404.",
    source: `export default function NfAlien() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(180deg, #000, #0a2e0a)", borderRadius: "12px", minHeight: "400px" }}>
      <span className="text-8xl" style={{ animation: "alien-bob 2s ease-in-out infinite" }}>👽</span>
      <h1 className="mt-4 text-[8rem] font-bold text-green-400" style={{ textShadow: "0 0 20px #0f0" }}>404</h1>
      <p className="mt-2 text-lg text-green-300">Take me to your... 404 page?</p>
      <p className="mt-1 text-sm text-green-400/70">The aliens abducted this page.</p>
      <button className="mt-8 rounded-full bg-green-600 px-8 py-3 text-sm font-medium text-white hover:bg-green-500">Go Home</button>
      <style>{\`@keyframes alien-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }\`}</style>
    </div>
  );
}`,
  });

export const nfWormhole: RegistryEntry = entry({
    id: "nf-wormhole",
    title: "Wormhole 404",
    description: "A wormhole portal themed 404 with spinning rings.",
    source: `export default function NfWormhole() {
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden" style={{ background: "#000", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full border-4 border-purple-500/30" style={{ animation: "wormhole-spin 4s linear infinite" }} />
        <div className="absolute h-48 w-48 rounded-full border-4 border-cyan-500/30" style={{ animation: "wormhole-spin 3s linear infinite reverse" }} />
        <div className="absolute h-32 w-32 rounded-full border-4 border-pink-500/30" style={{ animation: "wormhole-spin 2s linear infinite" }} />
      </div>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-purple-300">You fell through a wormhole.</p>
        <button className="mt-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-3 text-sm font-medium text-white hover:opacity-90">Go Home</button>
      </div>
      <style>{\`@keyframes wormhole-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\`}</style>
    </div>
  );
}`,
  });

export const nfTimeTravel: RegistryEntry = entry({
    id: "nf-time-travel",
    title: "Time Travel 404",
    description: "A time travel paradox themed 404.",
    source: `export default function NfTimeTravel() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="text-6xl" style={{ animation: "clock-spin 3s linear infinite" }}>⏰</div>
      <h1 className="mt-4 text-[8rem] font-bold text-cyan-400" style={{ textShadow: "0 0 20px #0ff" }}>404</h1>
      <p className="mt-2 text-lg text-cyan-300">Time paradox detected!</p>
      <p className="mt-1 text-sm text-cyan-400/70">This page exists in a different timeline.</p>
      <button className="mt-8 rounded-full bg-cyan-600 px-8 py-3 text-sm font-medium text-white hover:bg-cyan-500">Return to Present</button>
      <style>{\`@keyframes clock-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\`}</style>
    </div>
  );
}`,
  });
