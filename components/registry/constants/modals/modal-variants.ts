import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const modalVariants: RegistryEntry = entry({
    id: "modal-variants",
    title: "Modal Variants",
    description: "Default, fullscreen, side panel, and bottom sheet layouts.",
    source: `export default function ModalVariants() {
  const VARIANTS = [
    { label: "Default", desc: "Standard card modal" },
    { label: "Fullscreen", desc: "Full viewport modal" },
    { label: "Side Panel", desc: "Slides in from right" },
    { label: "Bottom Sheet", desc: "Anchored to bottom" },
  ];
  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
      {VARIANTS.map((v) => (
        <div key={v.label} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <div className="text-sm font-medium">{v.label}</div>
          <div className="mt-1 text-xs text-zinc-500">{v.desc}</div>
        </div>
      ))}
    </div>
  );
}`,
  });
