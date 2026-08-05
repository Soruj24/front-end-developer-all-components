"use client";

import { useStudio } from "../../context/StudioContext";
import type { ResponsiveBreakpoint, ResponsiveOverride, VisualProps } from "../../types/canvas";

const BREAKPOINTS: { id: ResponsiveBreakpoint; label: string; icon: string; width: number }[] = [
  { id: "sm", label: "Mobile", icon: "📱", width: 640 },
  { id: "md", label: "Tablet", icon: "📱", width: 768 },
  { id: "lg", label: "Laptop", icon: "💻", width: 1024 },
  { id: "xl", label: "Desktop", icon: "🖥", width: 1280 },
  { id: "2xl", label: "Ultra Wide", icon: "🖥", width: 1536 },
];

function SizeOverrideEditor({
  nodeId,
  breakpoint,
  value,
}: {
  nodeId: string;
  breakpoint: ResponsiveBreakpoint;
  value?: Partial<VisualProps>;
}) {
  const { updateNodeResponsive } = useStudio();

  const update = (patch: Partial<VisualProps>) => {
    updateNodeResponsive(nodeId, breakpoint, patch);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="w-16 text-[10px] text-muted-foreground">Width</label>
        <input
          type="number"
          value={value?.width ?? ""}
          onChange={(e) => update({ width: Number(e.target.value) || 0 })}
          placeholder="auto"
          className="flex-1 rounded border border-border bg-background px-2 py-1 text-xs"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-16 text-[10px] text-muted-foreground">Height</label>
        <input
          type="number"
          value={value?.height ?? ""}
          onChange={(e) => update({ height: Number(e.target.value) || 0 })}
          placeholder="auto"
          className="flex-1 rounded border border-border bg-background px-2 py-1 text-xs"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="w-16 text-[10px] text-muted-foreground">Display</label>
        <select
          value={value?.display ?? ""}
          onChange={(e) => update({ display: e.target.value })}
          className="flex-1 rounded border border-border bg-background px-2 py-1 text-xs"
        >
          <option value="">Inherit</option>
          <option value="block">Block</option>
          <option value="flex">Flex</option>
          <option value="grid">Grid</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="w-16 text-[10px] text-muted-foreground">Gap</label>
        <input
          type="number"
          value={value?.gap ?? ""}
          onChange={(e) => update({ gap: Number(e.target.value) || 0 })}
          placeholder="0"
          className="flex-1 rounded border border-border bg-background px-2 py-1 text-xs"
        />
      </div>
    </div>
  );
}

export function ResponsiveEditor({ nodeId }: { nodeId: string }) {
  const { canvas } = useStudio();
  const node = canvas.nodes[nodeId];
  if (!node) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-medium text-muted-foreground">Responsive Overrides</div>
      {BREAKPOINTS.map((bp) => {
        const override = node.responsive?.[bp.id];
        const hasOverride = !!override;
        return (
          <details key={bp.id} className="group rounded border border-border">
            <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 text-xs font-medium">
              <span>{bp.icon}</span>
              <span>{bp.label}</span>
              <span className="ml-auto text-[10px] text-muted-foreground">{bp.width}px</span>
              {hasOverride && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
            </summary>
            <div className="border-t border-border px-3 py-2">
              <SizeOverrideEditor nodeId={nodeId} breakpoint={bp.id} value={override} />
            </div>
          </details>
        );
      })}
    </div>
  );
}
