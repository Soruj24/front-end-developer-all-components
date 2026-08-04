import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const resizableDefault: RegistryEntry = entry({
  id: "resizable-default",
  title: "Default",
  description: "Default resizable panels.",
  source: `import { Resizable, ResizablePanel, ResizableHandle } from "@/components/_resizable";

export default function ResizableDefault() {
  return (
    <Resizable defaultSizes={[50, 50]} className="h-48">
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          Panel 1
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          Panel 2
        </div>
      </ResizablePanel>
    </Resizable>
  );
}`,
});
