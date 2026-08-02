import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardOverlayGradient: RegistryEntry = entry({
    id: "card-overlay-gradient",
    title: "Overlay & Gradient",
    description: "Text over imagery and vibrant gradient surfaces.",
    source: `export default function CardOverlayGradient() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div className="group relative flex h-56 cursor-pointer items-end overflow-hidden rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 p-5 text-white">
          <span className="text-xs font-medium uppercase tracking-wider text-white/60">Featured</span>
          <h3 className="mt-1 text-xl font-bold">Overlay Card</h3>
          <p className="mt-1 text-sm text-white/80">Text overlaid on a dark gradient background.</p>
          <button className="mt-2 rounded-md bg-white/20 px-3 py-1 text-xs backdrop-blur hover:bg-white/30">Explore</button>
        </div>
      </div>
      <div className="flex h-56 flex-col justify-end rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 p-5 text-white">
        <span className="text-3xl">🌈</span>
        <h3 className="mt-2 text-xl font-bold">Gradient Card</h3>
        <p className="mt-1 text-sm text-white/80">Vibrant gradient with white text for impact.</p>
      </div>
    </div>
  );
}`,
  });
