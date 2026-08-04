import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const resizableThree: RegistryEntry = entry({
  id: "resizable-three",
  title: "Three Panels",
  description: "Three resizable panels.",
  source: `import { Resizable, ResizablePanel, ResizableHandle } from "@/components/_resizable";

export default function ResizableThree() {
  return (
    <Resizable defaultSizes={[33, 33, 34]} className="h-48">
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          Content
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">
          Preview
        </div>
      </ResizablePanel>
    </Resizable>
  );
}`,
});
