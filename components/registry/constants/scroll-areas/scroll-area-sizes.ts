import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const scrollAreaSizes: RegistryEntry = entry({
  id: "scroll-area-sizes",
  title: "Sizes",
  description: "Different scrollbar sizes.",
  source: `import { ScrollArea } from "@/components/_scroll-area";

export default function ScrollAreaSizes() {
  return (
    <div className="flex gap-4">
      <ScrollArea maxHeight={150} size="sm" className="w-32 rounded border">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded bg-muted/50 p-2 text-xs">Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea maxHeight={150} size="md" className="w-32 rounded border">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded bg-muted/50 p-2 text-xs">Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea maxHeight={150} size="lg" className="w-32 rounded border">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded bg-muted/50 p-2 text-xs">Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}`,
});
