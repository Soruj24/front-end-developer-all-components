import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfCoffee: RegistryEntry = entry({
    id: "nf-coffee",
    title: "Coffee Stain 404",
    description: "A coffee stain ring themed 404.",
    source: `export default function NfCoffee() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(135deg, #f5e6d3, #e8d5b7)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-amber-800 bg-amber-100 opacity-40" style={{ boxShadow: "inset 0 0 20px rgba(139,90,43,0.3)" }} />
        <div className="absolute top-8 left-8 h-24 w-24 rounded-full border-4 border-amber-800/20" />
      </div>
      <h1 className="mt-4 text-[8rem] font-bold text-amber-900">404</h1>
      <p className="mt-2 text-lg text-amber-800">Spilled coffee on the page.</p>
      <p className="mt-1 text-sm text-amber-700">Oops! This page is gone.</p>
      <button className="mt-8 rounded-lg bg-amber-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-800">Go Home</button>
    </div>
  );
}`,
  });

export const nfWinter: RegistryEntry = entry({
    id: "nf-winter",
    title: "Winter 404",
    description: "A snowy winter wonderland themed 404.",
    source: `export default function NfWinter() {
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #e8f4f8, #b3d9e8)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative z-10">
        <span className="text-6xl">⛄</span>
        <h1 className="mt-4 text-[8rem] font-bold text-blue-800">404</h1>
        <p className="mt-2 text-lg text-blue-700">This page is frozen.</p>
        <button className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-500">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfAutumn: RegistryEntry = entry({
    id: "nf-autumn",
    title: "Autumn 404",
    description: "A falling autumn leaves themed 404.",
    source: `export default function NfAutumn() {
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #fde68a, #fbbf24)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-orange-800">404</h1>
        <p className="mt-2 text-lg text-orange-700">This page fell with the leaves.</p>
        <button className="mt-8 rounded-full bg-orange-700 px-8 py-3 text-sm font-medium text-white hover:bg-orange-600">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfOcean: RegistryEntry = entry({
    id: "nf-ocean",
    title: "Ocean 404",
    description: "An underwater ocean themed 404.",
    source: `export default function NfOcean() {
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0077b6, #023e8a, #03045e)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-cyan-200">Page sunk to the bottom of the ocean.</p>
        <button className="mt-8 rounded-full bg-cyan-500 px-8 py-3 text-sm font-medium text-white hover:bg-cyan-400">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfFire: RegistryEntry = entry({
    id: "nf-fire",
    title: "Fire 404",
    description: "A flaming fire themed 404.",
    source: `export default function NfFire() {
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #1a0000, #4a0000, #8b0000)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-orange-400" style={{ textShadow: "0 0 30px #ff4500, 0 0 60px #ff0000" }}>404</h1>
        <p className="mt-2 text-lg text-orange-300">This page went up in flames.</p>
        <button className="mt-8 rounded-full bg-orange-600 px-8 py-3 text-sm font-medium text-white hover:bg-orange-500">Go Home</button>
      </div>
    </div>
  );
}`,
  });

export const nfIceCrystal: RegistryEntry = entry({
    id: "nf-ice-crystal",
    title: "Ice Crystal 404",
    description: "An ice crystal frost-themed 404.",
    source: `export default function NfIceCrystal() {
  return (
    <div className="flex flex-col items-center justify-center py-20" style={{ background: "linear-gradient(135deg, #e0f7fa, #b2ebf2, #80deea)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="text-6xl">❄️</div>
      <h1 className="mt-4 text-[10rem] font-bold text-cyan-800" style={{ textShadow: "0 0 20px rgba(0,188,212,0.5)" }}>404</h1>
      <p className="mt-2 text-lg text-cyan-700">This page crystallized and shattered.</p>
      <p className="mt-1 text-sm text-cyan-600">Better bundle up and go home.</p>
      <button className="mt-8 rounded-full bg-cyan-700 px-8 py-3 text-sm font-medium text-white hover:bg-cyan-600">Go Home</button>
    </div>
  );
}`,
  });
