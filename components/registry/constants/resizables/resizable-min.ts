import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const resizableMin: RegistryEntry = entry({
  id: "resizable-min",
  title: "Min Size",
  description: "Resizable with minimum panel size.",
  source: `import { Resizable, ResizablePanel, ResizableHandle } from "@/components/_resizable";

export default function ResizableMin() {
  return (
    <Resizable defaultSizes={[60, 40]} className="h-48">
      <ResizablePanel minSize={30}>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          Min 30%
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          Flexible
        </div>
      </ResizablePanel>
    </Resizable>
  );
}`,
});
