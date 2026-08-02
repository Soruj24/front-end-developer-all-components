import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const badgeDot: RegistryEntry = entry({
    id: "badge-dot",
    title: "Dot Badge",
    description: "Small status dots with matching labels.",
    source: `export default function BadgeDot() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="text-sm">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <span className="text-sm">Away</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span className="text-sm">Offline</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
        <span className="text-sm">Primary</span>
      </div>
    </div>
  );
}`,
  });
