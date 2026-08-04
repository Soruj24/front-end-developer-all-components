import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const scrollAreaDefault: RegistryEntry = entry({
  id: "scroll-area-default",
  title: "Default",
  description: "Default scroll area with vertical scrolling.",
  source: `import { ScrollArea } from "@/components/_scroll-area";

export default function ScrollAreaDefault() {
  return (
    <ScrollArea maxHeight={200} className="w-full rounded border">
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="rounded bg-muted/50 p-2 text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}`,
});
