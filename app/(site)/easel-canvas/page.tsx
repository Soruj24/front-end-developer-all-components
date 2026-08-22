"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { EASEL_CANVAS_SOURCE } from "./easel-canvas-source";
import {
  PLAYGROUND_EXAMPLE,
  TOOLS_EXAMPLE,
  SKETCH_EXAMPLE,
  WHITEBOARD_EXAMPLE,
  DIAGRAM_EXAMPLE,
  SIGNATURE_EXAMPLE,
  DRAWING_EXAMPLE,
} from "./easel-canvas-examples";
import {
  DrawingCanvasDemo,
  ToolPaletteDemo,
  ColorPaletteDemo,
  SketchAppDemo,
  WhiteboardDemo,
  DiagramToolDemo,
  SignaturePadDemo,
  PlaygroundDemo,
} from "./demos";

export default function EaselCanvasPage() {
  return (
    <ComponentDocPage
      name="Easel Canvas"
      category="Tools"
      description="Drawing canvas with pen/eraser tools, color palette, brush size, and export functionality. Supports keyboard navigation and multiple drawing styles."
    >
      <PreviewPanel filename="easel-canvas.tsx">
        <DrawingCanvasDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={EASEL_CANVAS_SOURCE}
        filename="components/ui/EaselCanvas/EaselCanvas.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Resize presets with saved export gallery." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Drawing Canvas" description="Basic pen tool with color and brush size controls." code={DRAWING_EXAMPLE}>
          <DrawingCanvasDemo />
        </ExampleBlock>
        <ExampleBlock title="Tool Palette" description="Full set of drawing tools with active state and radiogroup semantics." code={TOOLS_EXAMPLE}>
          <ToolPaletteDemo />
        </ExampleBlock>
        <ExampleBlock title="Color Palette" description="Color picker with hex display and hover lift effect." code={SKETCH_EXAMPLE}>
          <ColorPaletteDemo />
        </ExampleBlock>
        <ExampleBlock title="Sketch App" description="Full drawing app with toolbar, undo, and SVG export." code={SKETCH_EXAMPLE}>
          <SketchAppDemo />
        </ExampleBlock>
        <ExampleBlock title="Whiteboard" description="Collaborative wireframe sketching with shapes and markup." code={WHITEBOARD_EXAMPLE}>
          <WhiteboardDemo />
        </ExampleBlock>
        <ExampleBlock title="Diagram Tool" description="Simple flow diagram with connected shapes." code={DIAGRAM_EXAMPLE}>
          <DiagramToolDemo />
        </ExampleBlock>
        <ExampleBlock title="Signature Pad" description="Signature capture with confirm flow." code={SIGNATURE_EXAMPLE}>
          <SignaturePadDemo />
        </ExampleBlock>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-xl border border-black/[.08] dark:border-white/[.145]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[.06] bg-muted/40 dark:border-white/[.1]">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/[.06] dark:border-white/[.1]">
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">800</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-black/[.06] dark:border-white/[.1]">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">600</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-black/[.06] dark:border-white/[.1]">
                <td className="px-4 py-3 font-mono text-xs">onSave</td>
                <td className="px-4 py-3 text-muted-foreground">(dataUrl: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
