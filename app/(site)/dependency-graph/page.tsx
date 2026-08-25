"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DependencyGraph } from "@/components/ui/DependencyGraph";
import type { GraphNode, GraphEdge } from "@/components/ui/DependencyGraph";

const DEPENDENCY_GRAPH_SOURCE = `"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { GraphNode, DependencyGraphProps, Pos, Bounds } from "./DependencyGraph.types";
import { NODE_W, NODE_H, PAD, MIN_SCALE, MAX_SCALE, MINI_W, MINI_H, clamp, computeLayout, computeBounds, edgePath } from "./DependencyGraph.constants";
import { NodeView, EdgePath } from "./DependencyGraphPieces";
import { GraphOverlay } from "./DependencyGraphOverlay";

export function DependencyGraph({ nodes, edges, width = "100%", height, minHeight = 480, className, onNodeSelect, searchable = true, minimap = true, focusable = true, emptyMessage = "Nothing to render yet" }: DependencyGraphProps) {
  const reactId = useId();
  const markerId = \`\${reactId}-arrow\`;

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const viewportRef = useRef<SVGGElement>(null);
  const zoomLabelRef = useRef<HTMLSpanElement>(null);
  const minimapRef = useRef<SVGSVGElement>(null);
  const minimapViewportRef = useRef<SVGRectElement>(null);

  const transformRef = useRef({ x: 0, y: 0, k: 1 });
  const sizeRef = useRef({ w: 800, h: 480 });
  const boundsRef = useRef<Bounds | null>(null);
  const minimapGeoRef = useRef<{ s: number; ox: number; oy: number } | null>(null);
  const positionsRef = useRef<Record<string, Pos>>({});
  const onNodeSelectRef = useRef(onNodeSelect);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; tx: number; ty: number; moved: boolean } | null>(null);
  const nodeDragRef = useRef<{ id: string; pointerId: number; startClientX: number; startClientY: number; startPos: Pos; moved: boolean } | null>(null);
  const miniDragRef = useRef<number | null>(null);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ dist: number; midX: number; midY: number } | null>(null);
  const fittedSearchRef = useRef("");
  const fittedFocusRef = useRef<string | null>(null);

  const [dragged, setDragged] = useState<Record<string, Pos>>({});
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => { onNodeSelectRef.current = onNodeSelect; }, [onNodeSelect]);

  const layout = useMemo(() => computeLayout(nodes, edges), [nodes, edges]);
  const positions = useMemo(() => {
    const merged: Record<string, Pos> = {};
    for (const id of Object.keys(layout)) merged[id] = layout[id];
    for (const id of Object.keys(dragged)) merged[id] = dragged[id];
    return merged;
  }, [layout, dragged]);
  const bounds = useMemo(() => computeBounds(positions), [positions]);

  useEffect(() => { positionsRef.current = positions; boundsRef.current = bounds; });

  const derived = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matched = new Set<string>();
    if (q) { for (const n of nodes) { if (n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)) matched.add(n.id); } }
    const active = focusId ?? hover;
    const neighbors = new Set<string>();
    if (active) { for (const e of edges) { if (e.from === active) neighbors.add(e.to); if (e.to === active) neighbors.add(e.from); } }
    const nodeDim = new Map<string, boolean>();
    const nodeHi = new Map<string, boolean>();
    for (const n of nodes) {
      if (q) { nodeDim.set(n.id, !matched.has(n.id)); nodeHi.set(n.id, matched.has(n.id)); }
      else if (active) { const inNb = n.id === active || neighbors.has(n.id); nodeDim.set(n.id, !inNb); nodeHi.set(n.id, inNb); }
    }
    return { active, neighbors, matched, nodeDim, nodeHi };
  }, [nodes, edges, search, focusId, hover]);

  const nodeItems = useMemo(() =>
    nodes.map((n) => { const p = positions[n.id]; if (!p) return null; return { node: n, x: p.x, y: p.y, dimmed: derived.nodeDim.get(n.id) ?? false, highlighted: derived.nodeHi.get(n.id) ?? false, selected: n.id === selected, focused: n.id === focusId }; }).filter((v): v is NonNullable<typeof v> => Boolean(v)),
    [nodes, positions, derived, selected, focusId]);

  const edgeItems = useMemo(() =>
    edges.map((e) => { const from = positions[e.from]; const to = positions[e.to]; if (!from || !to) return null; const active = derived.active; const highlighted = derived.matched.size > 0 ? derived.matched.has(e.from) && derived.matched.has(e.to) : active !== null && (e.from === active || e.to === active); return { key: \`\${e.from}-->\${e.to}\`, d: edgePath(from, to), highlighted, dimmed: !highlighted && (derived.matched.size > 0 || active !== null) }; }).filter((v): v is NonNullable<typeof v> => Boolean(v)),
    [edges, positions, derived]);

  const minimapGeo = useMemo(() => {
    const s = Math.min((MINI_W - 16) / Math.max(bounds.width, 1), (MINI_H - 16) / Math.max(bounds.height, 1)) * 0.98;
    const ox = (MINI_W - bounds.width * s) / 2 - bounds.minX * s;
    const oy = (MINI_H - bounds.height * s) / 2 - bounds.minY * s;
    const dots = nodes.map((n) => { const p = positions[n.id]; if (!p) return null; return { id: n.id, x: ox + p.x * s, y: oy + p.y * s }; }).filter((v): v is NonNullable<typeof v> => Boolean(v));
    return { s, ox, oy, dots };
  }, [nodes, positions, bounds]);

  useEffect(() => { minimapGeoRef.current = minimapGeo; });

  const updateMinimapViewport = useCallback(() => {
    const rect = minimapViewportRef.current; const geo = minimapGeoRef.current; const b = boundsRef.current;
    if (!rect || !geo || !b) return;
    const t = transformRef.current; const size = sizeRef.current;
    const x0 = -t.x / t.k; const y0 = -t.y / t.k;
    rect.setAttribute("x", String(geo.ox + x0 * geo.s));
    rect.setAttribute("y", String(geo.oy + y0 * geo.s));
    rect.setAttribute("width", String((size.w / t.k) * geo.s));
    rect.setAttribute("height", String((size.h / t.k) * geo.s));
  }, []);

  const applyTransform = useCallback(() => {
    const t = transformRef.current; const g = viewportRef.current;
    if (g) g.setAttribute("transform", \`translate(\${t.x} \${t.y}) scale(\${t.k})\`);
    if (svgRef.current) svgRef.current.setAttribute("data-lod", t.k < 0.45 ? "low" : "high");
    if (zoomLabelRef.current) zoomLabelRef.current.textContent = \`\${Math.round(t.k * 100)}%\`;
    updateMinimapViewport();
  }, [updateMinimapViewport]);

  const fitToBounds = useCallback((points: Pos[]) => {
    if (points.length === 0) return;
    const size = sizeRef.current;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of points) { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x + NODE_W); maxY = Math.max(maxY, p.y + NODE_H); }
    const bw = maxX - minX + PAD * 2; const bh = maxY - minY + PAD * 2;
    const t = transformRef.current;
    t.k = clamp(Math.min(size.w / Math.max(bw, 1), size.h / Math.max(bh, 1)), MIN_SCALE, 1.2);
    t.x = size.w / 2 - ((minX + maxX) / 2) * t.k;
    t.y = size.h / 2 - ((minY + maxY) / 2) * t.k;
    applyTransform();
  }, [applyTransform]);

  const fitAll = useCallback(() => { fitToBounds(Object.values(positionsRef.current)); }, [fitToBounds]);

  const zoomBy = useCallback((factor: number) => {
    const t = transformRef.current; const size = sizeRef.current;
    const k = clamp(t.k * factor, MIN_SCALE, MAX_SCALE);
    const cx = size.w / 2; const cy = size.h / 2;
    t.x = cx - ((cx - t.x) / t.k) * k;
    t.y = cy - ((cy - t.y) / t.k) * k;
    t.k = k; applyTransform();
  }, [applyTransform]);

  const handleNodePointerDown = useCallback((e, id, pos) => {
    e.stopPropagation(); e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    nodeDragRef.current = { id, pointerId: e.pointerId, startClientX: e.clientX, startClientY: e.clientY, startPos: pos, moved: false };
  }, []);

  const handleNodePointerMove = useCallback((e) => {
    const d = nodeDragRef.current; if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startClientX; const dy = e.clientY - d.startClientY;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    if (d.moved) { const k = transformRef.current.k; setDragged((prev) => ({ ...prev, [d.id]: { x: d.startPos.x + dx / k, y: d.startPos.y + dy / k } })); }
  }, []);

  const handleNodePointerUp = useCallback((e, node) => {
    const d = nodeDragRef.current; nodeDragRef.current = null;
    if (d && d.pointerId === e.pointerId && !d.moved) { setSelected(node.id); setHover(node.id); setFocusId(node.id); onNodeSelectRef.current?.(node); }
  }, []);

  const handleNodeEnter = useCallback((id) => { if (!nodeDragRef.current) setHover(id); }, []);
  const handleNodeLeave = useCallback((id) => { setHover((h) => (h === id ? null : h)); }, []);

  const handleNodeKeyDown = useCallback((e, node) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(node.id); setHover(node.id); setFocusId(node.id); onNodeSelectRef.current?.(node); }
  }, []);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden rounded-xl border border-border/60 bg-card bg-dots shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.06]", className)} style={{ width, height, minHeight }}>
      <svg ref={svgRef} role="img" aria-label="Dependency graph" data-lod="high" className="absolute inset-0 h-full w-full touch-none select-none">
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} markerUnits="userSpaceOnUse" orient="auto" style={{ color: "var(--color-border)" }}>
            <path d="M0 0L10 5L0 10z" fill="currentColor" />
          </marker>
        </defs>
        <g ref={viewportRef} transform="translate(0 0) scale(1)">
          {edgeItems.map((e) => <EdgePath key={e.key} d={e.d} highlighted={e.highlighted} dimmed={e.dimmed} markerId={markerId} />)}
          {nodeItems.map(({ node, x, y, dimmed, highlighted, selected: isSelected, focused }) => (
            <NodeView key={node.id} node={node} x={x} y={y} dimmed={dimmed} highlighted={highlighted} selected={isSelected} focused={focused}
              onPointerDown={handleNodePointerDown} onPointerMove={handleNodePointerMove} onPointerUp={handleNodePointerUp}
              onPointerEnter={handleNodeEnter} onPointerLeave={handleNodeLeave} onKeyDown={handleNodeKeyDown} />
          ))}
        </g>
      </svg>
      <GraphOverlay searchable={searchable} search={search} searchActive={searchActive} nodesLength={nodes.length}
        onSearchChange={setSearch} onSearchClear={() => setSearch("")} focusable={focusable} focusNode={focusNode}
        onFocusClear={() => { setFocusId(null); setSelected(null); }} onZoomIn={() => zoomBy(1.35)} onZoomOut={() => zoomBy(1 / 1.35)} onFitAll={fitAll}
        zoomLabelRef={zoomLabelRef} minimap={minimap} minimapGeo={minimapGeo} minimapRef={minimapRef}
        minimapViewportRef={minimapViewportRef} onMiniPointerDown={handleMiniPointerDown} onMiniPointerMove={handleMiniPointerMove} onMiniPointerUp={handleMiniPointerUp} />
    </div>
  );
}`;

const SAMPLE_NODES: GraphNode[] = [
  { id: "app", label: "App Shell", kind: "app", status: "ok" },
  { id: "auth", label: "Auth Service", kind: "service", status: "ok" },
  { id: "api", label: "API Gateway", kind: "service", status: "ok" },
  { id: "db", label: "PostgreSQL", kind: "db", status: "ok" },
  { id: "cache", label: "Redis Cache", kind: "db", status: "warn" },
  { id: "queue", label: "Message Queue", kind: "queue", status: "ok" },
  { id: "ui", label: "UI Components", kind: "ui", status: "ok" },
  { id: "hooks", label: "React Hooks", kind: "hooks", status: "ok" },
  { id: "utils", label: "Utilities", kind: "util", status: "ok" },
  { id: "mail", label: "Email Service", kind: "service", status: "error" },
];

const SAMPLE_EDGES: GraphEdge[] = [
  { from: "app", to: "auth" },
  { from: "app", to: "api" },
  { from: "app", to: "ui" },
  { from: "auth", to: "db" },
  { from: "auth", to: "cache" },
  { from: "api", to: "auth" },
  { from: "api", to: "db" },
  { from: "api", to: "cache" },
  { from: "api", to: "queue" },
  { from: "queue", to: "mail" },
  { from: "ui", to: "hooks" },
  { from: "hooks", to: "utils" },
];

const SMALL_NODES: GraphNode[] = [
  { id: "a", label: "Component A", kind: "component" },
  { id: "b", label: "Component B", kind: "component" },
  { id: "c", label: "Service C", kind: "service" },
  { id: "d", label: "Utils D", kind: "util" },
];

const SMALL_EDGES: GraphEdge[] = [
  { from: "a", to: "b" },
  { from: "a", to: "c" },
  { from: "b", to: "d" },
  { from: "c", to: "d" },
];

const BASIC_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} />`;

const MINIMAP_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} minimap />`;

const NO_SEARCH_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} searchable={false} />`;

const NO_MINIMAP_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} minimap={false} />`;

const EMPTY_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={[]} edges={[]} />`;

const SELECT_CODE = `"use client";
import { DependencyGraph } from "@/components/ui/DependencyGraph";
import type { GraphNode } from "@/components/ui/DependencyGraph";

function SelectExample() {
  const [selected, setSelected] = useState<GraphNode | null>(null);
  return (
    <div>
      <DependencyGraph nodes={nodes} edges={edges} onNodeSelect={setSelected} />
      {selected && <p>Selected: {selected.label}</p>}
    </div>
  );
}`;

const HEIGHT_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} height={300} minHeight={300} />`;

export default function DependencyGraphPage() {
  const [selected, setSelected] = useState<GraphNode | null>(null);

  return (
    <ComponentDocPage
      name="Dependency Graph"
      category="Data Display"
      description="An interactive dependency graph with pan, zoom, pinch, node drag, search, minimap, focus mode, and keyboard shortcuts."
    >
      <PreviewPanel filename="dependency-graph-preview.tsx">
        <DependencyGraph nodes={SAMPLE_NODES} edges={SAMPLE_EDGES} minHeight={400} />
      </PreviewPanel>

      <SourceCodeViewer
        source={DEPENDENCY_GRAPH_SOURCE}
        filename="components/ui/DependencyGraph/DependencyGraph.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Basic Graph" description="Auto-layout with pan, zoom, and pinch support." code={BASIC_CODE} filename="basic.tsx">
          <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} minHeight={320} />
        </ExampleBlock>

        <ExampleBlock title="Full Feature Set" description="Search, minimap, and node focus with a status indicator." code={MINIMAP_CODE} filename="full.tsx">
          <DependencyGraph nodes={SAMPLE_NODES} edges={SAMPLE_EDGES} minHeight={440} />
        </ExampleBlock>

        <ExampleBlock title="Node Selection" description="Click a node to select it and fire onNodeSelect." code={SELECT_CODE} filename="select.tsx">
          <div className="flex flex-col gap-3">
            <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} onNodeSelect={setSelected} minHeight={320} />
            {selected && (
              <div className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm">
                <span className="text-muted-foreground">Selected: </span>
                <span className="font-medium text-foreground">{selected.label}</span>
                {selected.kind && <span className="ml-1.5 text-muted-foreground">({selected.kind})</span>}
              </div>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Without Search" description="Hide the search bar." code={NO_SEARCH_CODE} filename="no-search.tsx">
          <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} searchable={false} minHeight={320} />
        </ExampleBlock>

        <ExampleBlock title="Without Minimap" description="Hide the minimap for a cleaner view." code={NO_MINIMAP_CODE} filename="no-minimap.tsx">
          <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} minimap={false} minHeight={320} />
        </ExampleBlock>

        <ExampleBlock title="Custom Height" description="Control the graph container height." code={HEIGHT_CODE} filename="height.tsx">
          <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} height={300} minHeight={300} />
        </ExampleBlock>

        <ExampleBlock title="Empty State" description="Display a message when no nodes are provided." code={EMPTY_CODE} filename="empty.tsx">
          <DependencyGraph nodes={[]} edges={[]} height={200} minHeight={200} emptyMessage="No dependencies to display." />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
