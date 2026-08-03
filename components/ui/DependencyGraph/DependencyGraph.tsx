"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { cn } from "@/lib/cn";
import type { GraphNode, DependencyGraphProps, Pos, Bounds } from "./DependencyGraph.types";
import { NODE_W, NODE_H, PAD, MIN_SCALE, MAX_SCALE, MINI_W, MINI_H, clamp, nextInstanceId, computeLayout, computeBounds, edgePath } from "./DependencyGraph.constants";
import { NodeView, EdgePath } from "./DependencyGraphPieces";
import { GraphOverlay } from "./DependencyGraphOverlay";

export function DependencyGraph({ nodes, edges, width = "100%", height, minHeight = 480, className, onNodeSelect, searchable = true, minimap = true, focusable = true, emptyMessage = "Nothing to render yet" }: DependencyGraphProps) {
  const [instanceId] = useState(() => nextInstanceId());
  const markerId = `${instanceId}-arrow`;

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
    edges.map((e) => { const from = positions[e.from]; const to = positions[e.to]; if (!from || !to) return null; const active = derived.active; const highlighted = derived.matched.size > 0 ? derived.matched.has(e.from) && derived.matched.has(e.to) : active !== null && (e.from === active || e.to === active); return { key: `${e.from}-->${e.to}`, d: edgePath(from, to), highlighted, dimmed: !highlighted && (derived.matched.size > 0 || active !== null) }; }).filter((v): v is NonNullable<typeof v> => Boolean(v)),
    [edges, positions, derived]);

  const minimapGeo = useMemo(() => {
    const s = Math.min((MINI_W - 14) / Math.max(bounds.width, 1), (MINI_H - 14) / Math.max(bounds.height, 1)) * 0.98;
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
    if (g) g.setAttribute("transform", `translate(${t.x} ${t.y}) scale(${t.k})`);
    if (svgRef.current) svgRef.current.setAttribute("data-lod", t.k < 0.45 ? "low" : "high");
    if (zoomLabelRef.current) zoomLabelRef.current.textContent = `${Math.round(t.k * 100)}%`;
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

  const handleNodePointerDown = useCallback((e: ReactPointerEvent<SVGGElement>, id: string, pos: Pos) => {
    e.stopPropagation(); e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    nodeDragRef.current = { id, pointerId: e.pointerId, startClientX: e.clientX, startClientY: e.clientY, startPos: pos, moved: false };
  }, []);

  const handleNodePointerMove = useCallback((e: ReactPointerEvent<SVGGElement>) => {
    const d = nodeDragRef.current; if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startClientX; const dy = e.clientY - d.startClientY;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    if (d.moved) { const k = transformRef.current.k; setDragged((prev) => ({ ...prev, [d.id]: { x: d.startPos.x + dx / k, y: d.startPos.y + dy / k } })); }
  }, []);

  const handleNodePointerUp = useCallback((e: ReactPointerEvent<SVGGElement>, node: GraphNode) => {
    const d = nodeDragRef.current; nodeDragRef.current = null;
    if (d && d.pointerId === e.pointerId && !d.moved) { setSelected(node.id); setHover(node.id); setFocusId(node.id); onNodeSelectRef.current?.(node); }
  }, []);

  const handleNodeEnter = useCallback((id: string) => { if (!nodeDragRef.current) setHover(id); }, []);
  const handleNodeLeave = useCallback((id: string) => { setHover((h) => (h === id ? null : h)); }, []);

  const handleNodeKeyDown = useCallback((e: ReactKeyboardEvent<SVGGElement>, node: GraphNode) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(node.id); setHover(node.id); setFocusId(node.id); onNodeSelectRef.current?.(node); }
  }, []);

  const handleSvgPointerDown = useCallback((e: ReactPointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragRef.current = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, tx: transformRef.current.x, ty: transformRef.current.y, moved: false };
  }, []);

  const handleSvgPointerMove = useCallback((e: ReactPointerEvent<SVGSVGElement>) => {
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersRef.current.size >= 2) {
      const pts = Array.from(pointersRef.current.values()); const a = pts[0]; const b = pts[1];
      const dist = Math.hypot(a.x - b.x, a.y - b.y); const midX = (a.x + b.x) / 2; const midY = (a.y + b.y) / 2;
      const last = pinchRef.current;
      if (last) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) { const anchorX = last.midX - rect.left; const anchorY = last.midY - rect.top; const t = transformRef.current; const gx = (anchorX - t.x) / t.k; const gy = (anchorY - t.y) / t.k; const k = clamp(t.k * (dist / Math.max(last.dist, 1)), MIN_SCALE, MAX_SCALE); t.k = k; t.x = midX - rect.left - gx * k; t.y = midY - rect.top - gy * k; applyTransform(); }
      }
      pinchRef.current = { dist, midX, midY }; return;
    }
    const d = dragRef.current; if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startX; const dy = e.clientY - d.startY;
    if (Math.abs(dx) + Math.abs(dy) > 2) d.moved = true;
    if (d.moved) { const t = transformRef.current; t.x = d.tx + dx; t.y = d.ty + dy; applyTransform(); }
  }, [applyTransform]);

  const handleSvgPointerUp = useCallback((e: ReactPointerEvent<SVGSVGElement>) => {
    pointersRef.current.delete(e.pointerId); pinchRef.current = null; const d = dragRef.current; dragRef.current = null;
    if (d && d.pointerId === e.pointerId && !d.moved) { setFocusId(null); setSelected(null); setHover(null); onNodeSelectRef.current?.(null); }
  }, []);

  const centerOnMini = useCallback((clientX: number, clientY: number) => {
    const svg = minimapRef.current; const geo = minimapGeoRef.current; const b = boundsRef.current; const t = transformRef.current;
    if (!svg || !geo || !b) return;
    const rect = svg.getBoundingClientRect(); const mx = clientX - rect.left; const my = clientY - rect.top;
    const gx = (mx - geo.ox) / geo.s; const gy = (my - geo.oy) / geo.s;
    const size = sizeRef.current; t.x = size.w / 2 - gx * t.k; t.y = size.h / 2 - gy * t.k; applyTransform();
  }, [applyTransform]);

  const handleMiniPointerDown = useCallback((e: ReactPointerEvent<SVGSVGElement>) => {
    e.preventDefault(); try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    miniDragRef.current = e.pointerId; centerOnMini(e.clientX, e.clientY);
  }, [centerOnMini]);

  const handleMiniPointerMove = useCallback((e: ReactPointerEvent<SVGSVGElement>) => { if (miniDragRef.current !== e.pointerId) return; centerOnMini(e.clientX, e.clientY); }, [centerOnMini]);
  const handleMiniPointerUp = useCallback((e: ReactPointerEvent<SVGSVGElement>) => { if (miniDragRef.current === e.pointerId) miniDragRef.current = null; }, []);

  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    const handler = (e: WheelEvent) => { e.preventDefault(); const rect = el.getBoundingClientRect(); const mx = e.clientX - rect.left; const my = e.clientY - rect.top; const t = transformRef.current; const factor = Math.pow(1.0016, -e.deltaY); const k = clamp(t.k * factor, MIN_SCALE, MAX_SCALE); t.x = mx - ((mx - t.x) / t.k) * k; t.y = my - ((my - t.y) / t.k) * k; t.k = k; applyTransform(); };
    el.addEventListener("wheel", handler, { passive: false }); return () => el.removeEventListener("wheel", handler);
  }, [applyTransform]);

  useLayoutEffect(() => {
    const el = containerRef.current; if (!el) return;
    const measure = () => { const r = el.getBoundingClientRect(); sizeRef.current = { w: Math.max(r.width, 320), h: Math.max(r.height, 320) }; };
    measure(); const ro = new ResizeObserver(measure); ro.observe(el); fitAll(); return () => ro.disconnect();
  }, [layout, fitAll]);

  useEffect(() => {
    const q = search.trim().toLowerCase(); const fitted = fittedSearchRef.current; fittedSearchRef.current = q;
    if (!q || q === fitted) return;
    const matched: Pos[] = [];
    for (const n of nodes) { if (n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)) { const p = positions[n.id]; if (p) matched.push(p); } }
    if (matched.length) fitToBounds(matched);
  }, [search, nodes, positions, fitToBounds]);

  useEffect(() => {
    if (focusId === fittedFocusRef.current) return; fittedFocusRef.current = focusId;
    if (!focusId) return;
    const p = positions[focusId]; if (!p) return;
    const pts: Pos[] = [p];
    for (const e of edges) { if (e.from === focusId && positions[e.to]) pts.push(positions[e.to]); if (e.to === focusId && positions[e.from]) pts.push(positions[e.from]); }
    fitToBounds(pts);
  }, [focusId, nodes, edges, positions, fitToBounds]);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") { setFocusId(null); setSelected(null); setHover(null); setSearch(""); onNodeSelectRef.current?.(null); }
      else if (e.key === "0") fitAll();
      else if (e.key === "+" || e.key === "=") zoomBy(1.3);
      else if (e.key === "-" || e.key === "_") zoomBy(1 / 1.3);
    };
    window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler);
  }, [fitAll, zoomBy]);

  const focusNode = focusId ? nodes.find((n) => n.id === focusId) : undefined;
  const searchActive = search.trim().length > 0;

  if (nodes.length === 0) {
    return (
      <div ref={containerRef} className={cn("relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-background bg-dots", className)} style={{ width, height, minHeight }}>
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden rounded-2xl border border-border bg-background bg-dots", className)} style={{ width, height, minHeight }}>
      <svg ref={svgRef} role="img" aria-label="Dependency graph" data-lod="high" className="absolute inset-0 h-full w-full touch-none select-none"
        onPointerDown={handleSvgPointerDown} onPointerMove={handleSvgPointerMove} onPointerUp={handleSvgPointerUp} onPointerCancel={handleSvgPointerUp}>
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
}
