import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const directionCard: RegistryEntry = entry({
  id: "direction-card",
  title: "Card Layout",
  description: "Card component adapting to LTR and RTL directions.",
  source: `import { DirectionProvider } from "@/components/_direction";

export default function DirectionCard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">LTR Card</p>
        <DirectionProvider dir="ltr">
          <div className="rounded-lg border p-4">
            <CardDemo />
          </div>
        </DirectionProvider>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">RTL Card</p>
        <DirectionProvider dir="rtl">
          <div className="rounded-lg border p-4">
            <CardDemo />
          </div>
        </DirectionProvider>
      </div>
    </div>
  );
}

function CardDemo() {
  return (
    <div className="flex gap-3">
      <div className="h-12 w-12 shrink-0 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Card Title</span>
        <span className="text-xs text-muted-foreground">Card description goes here</span>
        <button
          type="button"
          className="mt-1 w-fit rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-700"
        >
          Action
        </button>
      </div>
    </div>
  );
}`,
});
