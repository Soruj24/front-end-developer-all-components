import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfChalkboard: RegistryEntry = entry({
    id: "nf-chalkboard",
    title: "Chalkboard 404",
    description: "A chalkboard chalk-written themed 404.",
    source: `export default function NfChalkboard() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "#2d5016", borderRadius: "12px", minHeight: "400px", fontFamily: "'Comic Sans MS', cursive" }}>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white/90">404</h1>
        <p className="mt-2 text-lg text-white/70">Page not found on the chalkboard</p>
        <p className="mt-1 text-sm text-white/50">Teacher says: &quot;This page doesn&apos;t exist!&quot;</p>
        <button className="mt-8 rounded bg-yellow-400 px-6 py-2.5 text-sm font-bold text-gray-900 hover:bg-yellow-300">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfBlueprint: RegistryEntry = entry({
    id: "nf-blueprint",
    title: "Blueprint 404",
    description: "An architectural blueprint themed 404.",
    source: `export default function NfBlueprint() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "#1a3a5c", borderRadius: "12px", minHeight: "400px", border: "3px solid #4a8cc7" }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(#4a8cc7 1px, transparent 1px), linear-gradient(90deg, #4a8cc7 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-blue-200">ARCHITECTURAL PLAN: PAGE NOT FOUND</p>
        <p className="mt-1 text-xs text-blue-300">BLUEPRINT REF: 404-NF-001</p>
        <button className="mt-8 rounded border-2 border-white bg-transparent px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfStickyNote: RegistryEntry = entry({
    id: "nf-sticky-note",
    title: "Sticky Note 404",
    description: "Colorful sticky notes themed 404.",
    source: `export default function NfStickyNote() {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-16">
      <div className="h-48 w-48 rotate-[-3deg] rounded-sm bg-yellow-200 p-4 shadow-lg" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        <p className="text-sm font-bold text-yellow-800">TODO:</p>
        <p className="mt-1 text-xs text-yellow-700">- Find missing page</p>
        <p className="text-xs text-yellow-700">- Check URL</p>
        <p className="text-xs text-yellow-700">- Go home</p>
      </div>
      <div className="h-48 w-48 rotate-[2deg] rounded-sm bg-pink-200 p-4 shadow-lg" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        <p className="text-sm font-bold text-pink-800">Note:</p>
        <p className="mt-1 text-xs text-pink-700">This page was never here.</p>
        <p className="mt-2 text-xs text-pink-700">Try another page!</p>
      </div>
      <div className="h-48 w-48 rotate-[-1deg] rounded-sm bg-green-200 p-4 shadow-lg" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        <p className="text-sm font-bold text-green-800">404</p>
        <p className="mt-1 text-xs text-green-700">Page not found.</p>
        <button className="mt-4 inline-block rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-500">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfMap: RegistryEntry = entry({
    id: "nf-map",
    title: "Treasure Map 404",
    description: "A treasure map themed 404.",
    source: `export default function NfMap() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(135deg, #f5e6d3, #e8d5b7)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative z-10">
        <span className="text-6xl">🗺️</span>
        <h1 className="mt-4 text-[8rem] font-bold text-amber-900">404</h1>
        <p className="mt-2 text-lg text-amber-800">X marks the spot... but the treasure is gone!</p>
        <p className="mt-1 text-sm text-amber-700">This page has been lost at sea.</p>
        <button className="mt-8 rounded-lg bg-amber-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-800">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfCompass: RegistryEntry = entry({
    id: "nf-compass",
    title: "Compass 404",
    description: "A spinning compass themed 404.",
    source: `export default function NfCompass() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <svg viewBox="0 0 200 200" className="h-40 w-40" style={{ animation: "compass-spin 4s ease-in-out infinite" }}>
        <circle cx="100" cy="100" r="90" fill="none" stroke="#d1d5db" strokeWidth="2" />
        <text x="100" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">N</text>
        <text x="100" y="180" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">S</text>
        <text x="20" y="105" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">W</text>
        <text x="180" y="105" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#374151">E</text>
        <polygon points="100,20 95,100 100,95 105,100" fill="#ef4444" />
        <polygon points="100,180 95,100 100,105 105,100" fill="#6b7280" />
        <circle cx="100" cy="100" r="5" fill="#374151" />
      </svg>
      <h1 className="mt-4 text-6xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
      <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">Compass points to nowhere.</p>
      <button className="mt-6 rounded-full bg-zinc-900 px-8 py-3 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Go Home</button>
      <style>{\`@keyframes compass-spin { 0% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 50% { transform: rotate(-10deg); } 75% { transform: rotate(5deg); } 100% { transform: rotate(0deg); } }\`}</style>
    </div>
  );
}`,
  });
