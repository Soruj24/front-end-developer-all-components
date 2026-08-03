import type { Pos, Bounds } from "./DependencyGraph.types";

export const NODE_W = 152;
export const NODE_H = 46;
export const GAP_X = 64;
export const GAP_Y = 28;
export const PAD = 48;
export const MIN_SCALE = 0.2;
export const MAX_SCALE = 3;
export const MINI_W = 176;
export const MINI_H = 124;

export const KIND_FILL: Record<string, string> = {
  app: "fill-primary", module: "fill-primary", component: "fill-primary", ui: "fill-primary",
  page: "fill-info", service: "fill-info",
  lib: "fill-warning", db: "fill-warning", queue: "fill-warning",
  hooks: "fill-success", package: "fill-success",
  util: "fill-muted-foreground", middleware: "fill-muted-foreground",
};

export const STATUS_FILL: Record<string, string> = { ok: "fill-success", warn: "fill-warning", error: "fill-danger" };

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

let instanceCounter = 0;
export const nextInstanceId = () => `dg-${instanceCounter++}`;

export function computeLayout(nodes: import("./DependencyGraph.types").GraphNode[], edges: import("./DependencyGraph.types").GraphEdge[]): Record<string, Pos> {
  const layer: Record<string, number> = {};
  for (const n of nodes) layer[n.id] = 0;
  let changed = true; let guard = 0;
  while (changed && guard <= nodes.length) { changed = false; guard += 1; for (const e of edges) { if (e.to in layer && e.from in layer && layer[e.to] < layer[e.from] + 1) { layer[e.to] = layer[e.from] + 1; changed = true; } } }
  const groups = new Map<number, import("./DependencyGraph.types").GraphNode[]>();
  for (const n of nodes) { const l = layer[n.id] ?? 0; const list = groups.get(l); if (list) list.push(n); else groups.set(l, [n]); }
  const positions: Record<string, Pos> = {};
  for (const [l, list] of groups) { list.forEach((n, i) => { positions[n.id] = { x: PAD + l * (NODE_W + GAP_X), y: PAD + i * (NODE_H + GAP_Y) }; }); }
  return positions;
}

export function computeBounds(positions: Record<string, Pos>): Bounds {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of Object.values(positions)) { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x + NODE_W); maxY = Math.max(maxY, p.y + NODE_H); }
  if (!Number.isFinite(minX)) return { minX: 0, minY: 0, maxX: NODE_W, maxY: NODE_H, width: NODE_W, height: NODE_H };
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

export function edgePath(from: Pos, to: Pos): string {
  const x1 = from.x + NODE_W; const y1 = from.y + NODE_H / 2;
  const x2 = to.x; const y2 = to.y + NODE_H / 2;
  const dx = clamp(Math.abs(x2 - x1) * 0.5, 24, 90);
  if (x2 >= x1) return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}
