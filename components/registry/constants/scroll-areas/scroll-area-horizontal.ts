import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const scrollAreaHorizontal: RegistryEntry = entry({
  id: "scroll-area-horizontal",
  title: "Horizontal",
  description: "Horizontal scroll area.",
  source: `import { ScrollArea } from "@/components/_scroll-area";

export default function ScrollAreaHorizontal() {
  return (
    <ScrollArea maxHeight={100} orientation="horizontal" className="w-full rounded border">
      <div className="flex gap-4 p-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex h-20 w-32 shrink-0 items-center justify-center rounded bg-muted/50 text-sm">
            Card {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}`,
});
