"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Search,  AlertCircle, TextCursor } from "lucide-react";

const CROSSHAIR_SOURCE = "use client";

function CrosshairDemo() {
  const [size, setSize] = useState(24);
  return (
    <div className="flex items-center gap-2">
      <TextCursor className={`h-[${size}px] w-[${size}px] text-current`} /> <span className="text-sm text-foreground">Large</span>
      <button onClick={() => setSize((s) => s > 8 ? s - 8 : 24)} className="rounded-border border-border px-2 py-1 text-xs font-medium hover:bg-muted transition-colors">−</button>
      <button onClick={() => setSize((s) => s + 8)} className="rounded-border border-border px-2 py-1 text-xs font-medium hover:bg-muted transition-colors">+</button>
    </div>
  );
}

export default function CrosshairCursorPage() {
  return (
    <ComponentDocPage
      name="Crosshair Cursor"
      category="Data Display"
      description="A customizable crosshair cursor component with resize controls and visual feedback."
    >
      <PreviewPanel filename="crosshair-cursor.tsx">
        <CrosshairDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CROSSHAIR_SOURCE}
        filename="components/ui/CrosshairCursor/CrosshairCursor.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Default" description="Large crosshair cursor." code={CROSSHAIR_SOURCE}>
          <CrosshairDemo />
        </ExampleBlock>

        <ExampleBlock title="Small" description="Tight crosshair for focused interactions." code={CROSSHAIR_SOURCE}>
          <CrosshairDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}