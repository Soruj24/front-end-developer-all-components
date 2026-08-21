import { memo, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "@/lib/cn";
import type { GraphNode, Pos } from "./DependencyGraph.types";
import { NODE_W, NODE_H, KIND_FILL, STATUS_FILL } from "./DependencyGraph.constants";

interface NodeViewProps {
  node: GraphNode; x: number; y: number; dimmed: boolean; highlighted: boolean; selected: boolean; focused: boolean;
  onPointerDown: (e: ReactPointerEvent<SVGGElement>, id: string, pos: Pos) => void;
  onPointerMove: (e: ReactPointerEvent<SVGGElement>) => void;
  onPointerUp: (e: ReactPointerEvent<SVGGElement>, node: GraphNode) => void;
  onPointerEnter: (id: string) => void;
  onPointerLeave: (id: string) => void;
  onKeyDown: (e: ReactKeyboardEvent<SVGGElement>, node: GraphNode) => void;
}

export const NodeView = memo(function NodeView({ node, x, y, dimmed, highlighted, selected, focused, onPointerDown, onPointerMove, onPointerUp, onPointerEnter, onPointerLeave, onKeyDown }: NodeViewProps) {
  const kindFill = KIND_FILL[node.kind ?? ""] ?? "fill-foreground";
  return (
    <g data-node transform={`translate(${x} ${y})`} role="button" tabIndex={0} aria-label={`${node.label}${node.kind ? ` (${node.kind})` : ""}`} className="cursor-grab outline-none" pointerEvents={dimmed ? "none" : "auto"} style={{ opacity: dimmed ? 0.12 : 1, transition: "opacity 200ms ease, filter 200ms ease", filter: highlighted || focused ? "drop-shadow(0 0 6px var(--color-primary)/0.25)" : "none" }}
      onPointerDown={(e) => onPointerDown(e, node.id, { x, y })} onPointerMove={onPointerMove} onPointerUp={(e) => onPointerUp(e, node)} onPointerEnter={() => onPointerEnter(node.id)} onPointerLeave={() => onPointerLeave(node.id)} onKeyDown={(e) => onKeyDown(e, node)}>
      <rect width={NODE_W} height={NODE_H} rx={12} className={cn("fill-card stroke-border", (highlighted || focused) && "stroke-primary/60")} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {selected && <rect x={-2} y={-2} width={NODE_W + 4} height={NODE_H + 4} rx={14} fill="none" className="stroke-primary" strokeWidth={2} vectorEffect="non-scaling-stroke" />}
      <circle cx={14} cy={NODE_H / 2} r={5} className={cn(kindFill, "opacity-90")} />
      <text x={28} y={20} fontSize={13} fontWeight={600} className="graph-lod-label fill-foreground">{node.label}</text>
      <text x={28} y={35} fontSize={10} className="graph-lod-label fill-muted-foreground">{node.kind ?? node.id}</text>
      {node.status && <circle cx={NODE_W - 14} cy={NODE_H / 2} r={4} className={STATUS_FILL[node.status] ?? "fill-success"} />}
    </g>
  );
});

export const EdgePath = memo(function EdgePath({ d, highlighted, dimmed, markerId }: { d: string; highlighted: boolean; dimmed: boolean; markerId: string }) {
  return <path d={d} fill="none" stroke={highlighted ? "var(--color-primary)" : "var(--color-border)"} strokeWidth={highlighted ? 2 : 1.2} vectorEffect="non-scaling-stroke" markerEnd={`url(#${markerId})`} pointerEvents="none" style={{ opacity: dimmed ? 0.15 : highlighted ? 1 : 0.6, transition: "opacity 200ms ease, stroke 200ms ease" }} />;
});
