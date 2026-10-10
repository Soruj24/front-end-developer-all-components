export const dependencyGraphSource: string = `"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface GraphNode {
  id: string;
  label: string;
  kind?: string;
  status?: "ok" | "warn" | "error";
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface DependencyGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width?: number | string;
  height?: number | string;
  minHeight?: number;
  className?: string;
  onNodeSelect?: (node: GraphNode | null) => void;
  searchable?: boolean;
  minimap?: boolean;
  focusable?: boolean;
  emptyMessage?: string;
}

const STATUS_FILL: Record<string, string> = {
  ok: "var(--success)",
  warn: "var(--warning)",
  error: "var(--danger)",
};

const LAYER_W = 190;
const LAYER_H = 84;
const GAP_X = 70;
const GAP_Y = 26;

export function DependencyGraph({
  nodes,
  edges,
  width = "100%",
  height = 420,
  minHeight = 280,
  className,
  onNodeSelect,
  searchable = true,
  minimap = true,
  focusable = true,
  emptyMessage = "No nodes to display.",
}: DependencyGraphProps) {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return nodes;
    return nodes.filter((n) => (n.label + " " + n.id + " " + (n.kind ?? "")).toLowerCase().includes(needle));
  }, [nodes, q]);

  const visibleIds = useMemo(() => new Set(filtered.map((n) => n.id)), [filtered]);
  const visibleEdges = useMemo(
    () => edges.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to)),
    [edges, visibleIds]
  );

  const layers = useMemo(() => {
    const depth = new Map<string, number>();
    const outgoing = new Map<string, string[]>();
    for (const n of filtered) outgoing.set(n.id, []);
    for (const e of visibleEdges) outgoing.get(e.from)?.push(e.to);
    const visit = (id: string, stack: Set<string>): number => {
      if (depth.has(id)) return depth.get(id) ?? 0;
      if (stack.has(id)) return 0;
      stack.add(id);
      let d = 0;
      for (const child of outgoing.get(id) ?? []) d = Math.max(d, visit(child, stack) + 1);
      stack.delete(id);
      depth.set(id, d);
      return d;
    };
    for (const n of filtered) visit(n.id, new Set());
    const maxDepth = Math.max(0, ...[...depth.values()]);
    const buckets: GraphNode[][] = Array.from({ length: maxDepth + 1 }, () => []);
    for (const n of filtered) buckets[maxDepth - (depth.get(n.id) ?? 0)].push(n);
    return buckets;
  }, [filtered, visibleEdges]);

  const pos = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    layers.forEach((layer, li) => {
      layer.forEach((n, ni) => {
        map.set(n.id, { x: li * (LAYER_W + GAP_X), y: ni * (LAYER_H + GAP_Y) });
      });
    });
    return map;
  }, [layers]);

  const contentW = Math.max(1, layers.length) * (LAYER_W + GAP_X);
  const contentH = Math.max(1, ...layers.map((l) => l.length)) * (LAYER_H + GAP_Y);

  const selected = nodes.find((n) => n.id === selectedId) ?? null;
  const selectedEdges = selectedId ? visibleEdges.filter((e) => e.from === selectedId || e.to === selectedId) : [];

  if (nodes.length === 0) {
    return (
      <div
        className={cn("flex items-center justify-center rounded-xl border border-dashed border-border p-10 text-sm text-muted-foreground", className)}
        style={{ width, height, minHeight }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col overflow-hidden rounded-xl border border-border bg-background", className)}
      style={{ width, height, minHeight }}
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
        {searchable && (
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter nodes…"
            aria-label="Filter nodes"
            className="h-8 w-44 rounded-lg border border-input bg-background px-2.5 text-xs outline-none placeholder:text-muted-foreground focus:border-ring"
          />
        )}
        <span className="font-mono text-[11px] text-muted-foreground">
          {filtered.length}/{nodes.length} nodes · {visibleEdges.length} edges
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.4, +(z - 0.15).toFixed(2)))} className="h-7 w-7 rounded-md border border-border text-sm hover:bg-muted">−</button>
          <span className="w-12 text-center font-mono text-[11px] tabular-nums">{Math.round(zoom * 100)}%</span>
          <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)))} className="h-7 w-7 rounded-md border border-border text-sm hover:bg-muted">+</button>
          <button type="button" aria-label="Reset view" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="h-7 rounded-md border border-border px-2 text-[11px] hover:bg-muted">Reset</button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <svg
          viewBox={"0 0 " + (contentW + 200) + " " + (contentH + 120)}
          className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
          role="img"
          aria-label="Dependency graph"
          onWheel={(e) => setZoom((z) => Math.min(2.5, Math.max(0.4, +(z - Math.sign(e.deltaY) * 0.08).toFixed(2))))}
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture?.(e.pointerId);
            dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
          }}
          onPointerMove={(e) => {
            const d = dragRef.current;
            if (!d) return;
            setPan({ x: d.px + (e.clientX - d.x) / zoom, y: d.py + (e.clientY - d.y) / zoom });
          }}
          onPointerUp={() => { dragRef.current = null; }}
        >
          <g transform={"translate(" + (100 + pan.x * zoom) + "," + (60 + pan.y * zoom) + ") scale(" + zoom + ")"}>
            {visibleEdges.map((e, i) => {
              const a = pos.get(e.from);
              const b = pos.get(e.to);
              if (!a || !b) return null;
              const x1 = a.x + LAYER_W;
              const y1 = a.y + LAYER_H / 2;
              const x2 = b.x;
              const y2 = b.y + LAYER_H / 2;
              const mx = (x1 + x2) / 2;
              const active = selectedId !== null && (e.from === selectedId || e.to === selectedId);
              return (
                <path
                  key={e.from + ">" + e.to + i}
                  d={"M" + x1 + "," + y1 + " C" + mx + "," + y1 + " " + mx + "," + y2 + " " + x2 + "," + y2}
                  fill="none"
                  stroke={active ? "var(--primary)" : "var(--border)"}
                  strokeWidth={active ? 2.5 : 1.5}
                />
              );
            })}
            {filtered.map((n) => {
              const p = pos.get(n.id);
              if (!p) return null;
              const isSelected = n.id === selectedId;
              const dimmed = selectedId !== null && n.id !== selectedId && !selectedEdges.some((e) => e.from === n.id || e.to === n.id);
              return (
                <g
                  key={n.id}
                  transform={"translate(" + p.x + "," + p.y + ")"}
                  opacity={dimmed ? 0.35 : 1}
                  tabIndex={focusable ? 0 : -1}
                  role={focusable ? "button" : undefined}
                  aria-label={focusable ? "Select node " + n.label : undefined}
                  onClick={() => {
                    const next = isSelected ? null : nodes.find((x) => x.id === n.id) ?? null;
                    setSelectedId(next ? n.id : null);
                    onNodeSelect?.(next);
                  }}
                  onKeyDown={(e) => {
                    if (!focusable) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      const next = isSelected ? null : nodes.find((x) => x.id === n.id) ?? null;
                      setSelectedId(next ? n.id : null);
                      onNodeSelect?.(next);
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  <rect
                    width={LAYER_W}
                    height={LAYER_H}
                    rx={12}
                    fill="var(--card)"
                    stroke={isSelected ? "var(--primary)" : "var(--border)"}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <circle cx={16} cy={20} r={5} fill={STATUS_FILL[n.status ?? "ok"] ?? "var(--success)"} />
                  <text x={28} y={24} fontSize={11} fontWeight={700} fill="var(--foreground)">
                    {n.label.length > 22 ? n.label.slice(0, 21) + "…" : n.label}
                  </text>
                  <text x={14} y={44} fontSize={10} fill="var(--muted-foreground)">
                    {(n.kind ?? "module").slice(0, 26)}
                  </text>
                  <text x={14} y={62} fontSize={10} fontFamily="monospace" fill="var(--muted-foreground)">
                    {n.id.slice(0, 26)}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {filtered.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            No nodes match “{q}”.
          </p>
        )}

        {minimap && filtered.length > 0 && (
          <div className="absolute bottom-3 right-3 hidden rounded-lg border border-border bg-background/90 p-1.5 backdrop-blur-sm sm:block" aria-hidden>
            <svg width={120} height={70} viewBox={"0 0 " + contentW + " " + contentH}>
              {visibleEdges.map((e, i) => {
                const a = pos.get(e.from);
                const b = pos.get(e.to);
                if (!a || !b) return null;
                return (
                  <line
                    key={i}
                    x1={a.x + LAYER_W / 2}
                    y1={a.y + LAYER_H / 2}
                    x2={b.x + LAYER_W / 2}
                    y2={b.y + LAYER_H / 2}
                    stroke="var(--border)"
                    strokeWidth={8}
                  />
                );
              })}
              {filtered.map((n) => {
                const p = pos.get(n.id);
                if (!p) return null;
                return (
                  <rect
                    key={n.id}
                    x={p.x}
                    y={p.y}
                    width={LAYER_W}
                    height={LAYER_H}
                    rx={20}
                    fill={n.id === selectedId ? "var(--primary)" : STATUS_FILL[n.status ?? "ok"] ?? "var(--success)"}
                    opacity={n.id === selectedId ? 1 : 0.55}
                  />
                );
              })}
            </svg>
          </div>
        )}

        {selected && (
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-border bg-background/95 px-2.5 py-1.5 text-xs shadow-card backdrop-blur-sm">
            <span className="font-semibold">{selected.label}</span>
            <span className="font-mono text-muted-foreground">{selected.id}</span>
            <button
              type="button"
              aria-label="Clear selection"
              onClick={() => { setSelectedId(null); onNodeSelect?.(null); }}
              className="rounded p-0.5 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
`;
