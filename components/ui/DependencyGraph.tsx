"use client";

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

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

interface Pos {
  x: number;
  y: number;
}

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

/* ------------------------------------------------------------------ */
/* Geometry constants                                                  */
/* ------------------------------------------------------------------ */

const NODE_W = 152;
const NODE_H = 46;
const GAP_X = 64;
const GAP_Y = 28;
const PAD = 48;
const MIN_SCALE = 0.2;
const MAX_SCALE = 3;
const MINI_W = 176;
const MINI_H = 124;

const KIND_FILL: Record<string, string> = {
  app: "fill-primary",
  module: "fill-primary",
  component: "fill-primary",
  ui: "fill-primary",
  page: "fill-info",
  service: "fill-info",
  lib: "fill-warning",
  db: "fill-warning",
  queue: "fill-warning",
  hooks: "fill-success",
  package: "fill-success",
  util: "fill-muted-foreground",
  middleware: "fill-muted-foreground",
};

const STATUS_FILL: Record<string, string> = {
  ok: "fill-success",
  warn: "fill-warning",
  error: "fill-danger",
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

let instanceCounter = 0;

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

/** Longest-path layered layout: sources on the left, leaves on the right. */
function computeLayout(nodes: GraphNode[], edges: GraphEdge[]): Record<string, Pos> {
  const layer: Record<string, number> = {};
  for (const n of nodes) layer[n.id] = 0;
  let changed = true;
  let guard = 0;
  while (changed && guard <= nodes.length) {
    changed = false;
    guard += 1;
    for (const e of edges) {
      if (e.to in layer && e.from in layer && layer[e.to] < layer[e.from] + 1) {
        layer[e.to] = layer[e.from] + 1;
        changed = true;
      }
    }
  }
  const groups = new Map<number, GraphNode[]>();
  for (const n of nodes) {
    const l = layer[n.id] ?? 0;
    const list = groups.get(l);
    if (list) list.push(n);
    else groups.set(l, [n]);
  }
  const positions: Record<string, Pos> = {};
  for (const [l, list] of groups) {
    list.forEach((n, i) => {
      positions[n.id] = {
        x: PAD + l * (NODE_W + GAP_X),
        y: PAD + i * (NODE_H + GAP_Y),
      };
    });
  }
  return positions;
}

function computeBounds(positions: Record<string, Pos>): Bounds {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of Object.values(positions)) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x + NODE_W);
    maxY = Math.max(maxY, p.y + NODE_H);
  }
  if (!Number.isFinite(minX)) {
    return { minX: 0, minY: 0, maxX: NODE_W, maxY: NODE_H, width: NODE_W, height: NODE_H };
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

function edgePath(from: Pos, to: Pos): string {
  const x1 = from.x + NODE_W;
  const y1 = from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_H / 2;
  const dx = clamp(Math.abs(x2 - x1) * 0.5, 24, 90);
  if (x2 >= x1) {
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  }
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    </svg>
  );
}

function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function PlusIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function MinusIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

function FitIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2m8 0h2a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Memoized SVG pieces                                                 */
/* ------------------------------------------------------------------ */

interface NodeViewProps {
  node: GraphNode;
  x: number;
  y: number;
  dimmed: boolean;
  highlighted: boolean;
  selected: boolean;
  focused: boolean;
  onPointerDown: (e: ReactPointerEvent<SVGGElement>, id: string, pos: Pos) => void;
  onPointerMove: (e: ReactPointerEvent<SVGGElement>) => void;
  onPointerUp: (e: ReactPointerEvent<SVGGElement>, node: GraphNode) => void;
  onPointerEnter: (id: string) => void;
  onPointerLeave: (id: string) => void;
  onKeyDown: (e: ReactKeyboardEvent<SVGGElement>, node: GraphNode) => void;
}

const NodeView = memo(function NodeView({
  node,
  x,
  y,
  dimmed,
  highlighted,
  selected,
  focused,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerEnter,
  onPointerLeave,
  onKeyDown,
}: NodeViewProps) {
  const kindFill = KIND_FILL[node.kind ?? ""] ?? "fill-foreground";
  return (
    <g
      data-node
      transform={`translate(${x} ${y})`}
      role="button"
      tabIndex={0}
      aria-label={node.label}
      className="cursor-grab outline-none"
      pointerEvents={dimmed ? "none" : "auto"}
      style={{ opacity: dimmed ? 0.15 : 1, transition: "opacity 160ms ease" }}
      onPointerDown={(e) => onPointerDown(e, node.id, { x, y })}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => onPointerUp(e, node)}
      onPointerEnter={() => onPointerEnter(node.id)}
      onPointerLeave={() => onPointerLeave(node.id)}
      onKeyDown={(e) => onKeyDown(e, node)}
    >
      <rect
        width={NODE_W}
        height={NODE_H}
        rx={11}
        className={cn("fill-surface stroke-border", (highlighted || focused) && "stroke-primary")}
        vectorEffect="non-scaling-stroke"
      />
      {selected && (
        <rect
          x={-1.5}
          y={-1.5}
          width={NODE_W + 3}
          height={NODE_H + 3}
          rx={12}
          fill="none"
          className="stroke-ring"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      )}
      <circle cx={13} cy={NODE_H / 2} r={4} className={kindFill} />
      <text
        x={26}
        y={20}
        fontSize={13}
        fontWeight={600}
        className="graph-lod-label fill-foreground"
      >
        {node.label}
      </text>
      <text
        x={26}
        y={35}
        fontSize={10}
        className="graph-lod-label fill-muted-foreground"
      >
        {node.kind ?? node.id}
      </text>
      {node.status && <circle cx={NODE_W - 14} cy={NODE_H / 2} r={3.5} className={STATUS_FILL[node.status] ?? "fill-success"} />}
    </g>
  );
});

const EdgePath = memo(function EdgePath({
  d,
  highlighted,
  dimmed,
  markerId,
}: {
  d: string;
  highlighted: boolean;
  dimmed: boolean;
  markerId: string;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={highlighted ? "var(--color-primary)" : "var(--color-border)"}
      strokeWidth={highlighted ? 2 : 1.2}
      vectorEffect="non-scaling-stroke"
      markerEnd={`url(#${markerId})`}
      pointerEvents="none"
      style={{ opacity: dimmed ? 0.18 : highlighted ? 1 : 0.7, transition: "opacity 160ms ease" }}
    />
  );
});

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function DependencyGraph({
  nodes,
  edges,
  width = "100%",
  height,
  minHeight = 480,
  className,
  onNodeSelect,
  searchable = true,
  minimap = true,
  focusable = true,
  emptyMessage = "Nothing to render yet",
}: DependencyGraphProps) {
  const [instanceId] = useState(() => `dg-${instanceCounter++}`);
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

  useEffect(() => {
    onNodeSelectRef.current = onNodeSelect;
  }, [onNodeSelect]);

  const layout = useMemo(() => computeLayout(nodes, edges), [nodes, edges]);
  const positions = useMemo(() => {
    const merged: Record<string, Pos> = {};
    for (const id of Object.keys(layout)) merged[id] = layout[id];
    for (const id of Object.keys(dragged)) merged[id] = dragged[id];
    return merged;
  }, [layout, dragged]);
  const bounds = useMemo(() => computeBounds(positions), [positions]);

  useEffect(() => {
    positionsRef.current = positions;
    boundsRef.current = bounds;
  });

  const derived = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matched = new Set<string>();
    if (q) {
      for (const n of nodes) {
        if (n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)) matched.add(n.id);
      }
    }
    const active = focusId ?? hover;
    const neighbors = new Set<string>();
    if (active) {
      for (const e of edges) {
        if (e.from === active) neighbors.add(e.to);
        if (e.to === active) neighbors.add(e.from);
      }
    }
    const nodeDim = new Map<string, boolean>();
    const nodeHi = new Map<string, boolean>();
    for (const n of nodes) {
      if (q) {
        nodeDim.set(n.id, !matched.has(n.id));
        nodeHi.set(n.id, matched.has(n.id));
      } else if (active) {
        const inNb = n.id === active || neighbors.has(n.id);
        nodeDim.set(n.id, !inNb);
        nodeHi.set(n.id, inNb);
      }
    }
    return { active, neighbors, matched, nodeDim, nodeHi };
  }, [nodes, edges, search, focusId, hover]);

  const nodeItems = useMemo(
    () =>
      nodes
        .map((n) => {
          const p = positions[n.id];
          if (!p) return null;
          return {
            node: n,
            x: p.x,
            y: p.y,
            dimmed: derived.nodeDim.get(n.id) ?? false,
            highlighted: derived.nodeHi.get(n.id) ?? false,
            selected: n.id === selected,
            focused: n.id === focusId,
          };
        })
        .filter((v): v is NonNullable<typeof v> => Boolean(v)),
    [nodes, positions, derived, selected, focusId]
  );

  const edgeItems = useMemo(
    () =>
      edges
        .map((e) => {
          const from = positions[e.from];
          const to = positions[e.to];
          if (!from || !to) return null;
          const active = derived.active;
          const highlighted =
            derived.matched.size > 0
              ? derived.matched.has(e.from) && derived.matched.has(e.to)
              : active !== null && (e.from === active || e.to === active);
          return {
            key: `${e.from}-->${e.to}`,
            d: edgePath(from, to),
            highlighted,
            dimmed: !highlighted && (derived.matched.size > 0 || active !== null),
          };
        })
        .filter((v): v is NonNullable<typeof v> => Boolean(v)),
    [edges, positions, derived]
  );

  const minimapGeo = useMemo(() => {
    const s = Math.min((MINI_W - 14) / Math.max(bounds.width, 1), (MINI_H - 14) / Math.max(bounds.height, 1)) * 0.98;
    const ox = (MINI_W - bounds.width * s) / 2 - bounds.minX * s;
    const oy = (MINI_H - bounds.height * s) / 2 - bounds.minY * s;
    const dots = nodes
      .map((n) => {
        const p = positions[n.id];
        if (!p) return null;
        return { id: n.id, x: ox + p.x * s, y: oy + p.y * s, kind: n.kind };
      })
      .filter((v): v is NonNullable<typeof v> => Boolean(v));
    return { s, ox, oy, dots };
  }, [nodes, positions, bounds]);

  useEffect(() => {
    minimapGeoRef.current = minimapGeo;
  });

  /* ------------------------------------------------------------------ */
  /* Transform helpers (imperative — pan/zoom never re-renders React)   */
  /* ------------------------------------------------------------------ */

  const updateMinimapViewport = useCallback(() => {
    const rect = minimapViewportRef.current;
    const geo = minimapGeoRef.current;
    const b = boundsRef.current;
    if (!rect || !geo || !b) return;
    const t = transformRef.current;
    const size = sizeRef.current;
    const x0 = -t.x / t.k;
    const y0 = -t.y / t.k;
    rect.setAttribute("x", String(geo.ox + x0 * geo.s));
    rect.setAttribute("y", String(geo.oy + y0 * geo.s));
    rect.setAttribute("width", String((size.w / t.k) * geo.s));
    rect.setAttribute("height", String((size.h / t.k) * geo.s));
  }, []);

  const applyTransform = useCallback(() => {
    const t = transformRef.current;
    const g = viewportRef.current;
    if (g) g.setAttribute("transform", `translate(${t.x} ${t.y}) scale(${t.k})`);
    if (svgRef.current) svgRef.current.setAttribute("data-lod", t.k < 0.45 ? "low" : "high");
    if (zoomLabelRef.current) zoomLabelRef.current.textContent = `${Math.round(t.k * 100)}%`;
    updateMinimapViewport();
  }, [updateMinimapViewport]);

  const fitToBounds = useCallback(
    (points: Pos[]) => {
      if (points.length === 0) return;
      const size = sizeRef.current;
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const p of points) {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x + NODE_W);
        maxY = Math.max(maxY, p.y + NODE_H);
      }
      const bw = maxX - minX + PAD * 2;
      const bh = maxY - minY + PAD * 2;
      const t = transformRef.current;
      t.k = clamp(Math.min(size.w / Math.max(bw, 1), size.h / Math.max(bh, 1)), MIN_SCALE, 1.2);
      t.x = size.w / 2 - ((minX + maxX) / 2) * t.k;
      t.y = size.h / 2 - ((minY + maxY) / 2) * t.k;
      applyTransform();
    },
    [applyTransform]
  );

  const fitAll = useCallback(() => {
    fitToBounds(Object.values(positionsRef.current));
  }, [fitToBounds]);

  const zoomBy = useCallback(
    (factor: number) => {
      const t = transformRef.current;
      const size = sizeRef.current;
      const k = clamp(t.k * factor, MIN_SCALE, MAX_SCALE);
      const cx = size.w / 2;
      const cy = size.h / 2;
      t.x = cx - ((cx - t.x) / t.k) * k;
      t.y = cy - ((cy - t.y) / t.k) * k;
      t.k = k;
      applyTransform();
    },
    [applyTransform]
  );

  /* ------------------------------------------------------------------ */
  /* Interactions                                                       */
  /* ------------------------------------------------------------------ */

  const handleNodePointerDown = useCallback(
    (e: ReactPointerEvent<SVGGElement>, id: string, pos: Pos) => {
      e.stopPropagation();
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      nodeDragRef.current = {
        id,
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startPos: pos,
        moved: false,
      };
    },
    []
  );

  const handleNodePointerMove = useCallback((e: ReactPointerEvent<SVGGElement>) => {
    const d = nodeDragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startClientX;
    const dy = e.clientY - d.startClientY;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    if (d.moved) {
      const k = transformRef.current.k;
      setDragged((prev) => ({
        ...prev,
        [d.id]: { x: d.startPos.x + dx / k, y: d.startPos.y + dy / k },
      }));
    }
  }, []);

  const handleNodePointerUp = useCallback((e: ReactPointerEvent<SVGGElement>, node: GraphNode) => {
    const d = nodeDragRef.current;
    nodeDragRef.current = null;
    if (d && d.pointerId === e.pointerId && !d.moved) {
      setSelected(node.id);
      setHover(node.id);
      setFocusId(node.id);
      onNodeSelectRef.current?.(node);
    }
  }, []);

  const handleNodeEnter = useCallback((id: string) => {
    if (!nodeDragRef.current) setHover(id);
  }, []);

  const handleNodeLeave = useCallback((id: string) => {
    setHover((h) => (h === id ? null : h));
  }, []);

  const handleNodeKeyDown = useCallback((e: ReactKeyboardEvent<SVGGElement>, node: GraphNode) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(node.id);
      setHover(node.id);
      setFocusId(node.id);
      onNodeSelectRef.current?.(node);
    }
  }, []);

  const handleSvgPointerDown = useCallback((e: ReactPointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      tx: transformRef.current.x,
      ty: transformRef.current.y,
      moved: false,
    };
  }, []);

  const handleSvgPointerMove = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointersRef.current.size >= 2) {
        const pts = Array.from(pointersRef.current.values());
        const a = pts[0];
        const b = pts[1];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const last = pinchRef.current;
        if (last) {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const anchorX = last.midX - rect.left;
            const anchorY = last.midY - rect.top;
            const t = transformRef.current;
            const gx = (anchorX - t.x) / t.k;
            const gy = (anchorY - t.y) / t.k;
            const k = clamp(t.k * (dist / Math.max(last.dist, 1)), MIN_SCALE, MAX_SCALE);
            t.k = k;
            t.x = midX - rect.left - gx * k;
            t.y = midY - rect.top - gy * k;
            applyTransform();
          }
        }
        pinchRef.current = { dist, midX, midY };
        return;
      }
      const d = dragRef.current;
      if (!d || d.pointerId !== e.pointerId) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (Math.abs(dx) + Math.abs(dy) > 2) d.moved = true;
      if (d.moved) {
        const t = transformRef.current;
        t.x = d.tx + dx;
        t.y = d.ty + dy;
        applyTransform();
      }
    },
    [applyTransform]
  );

  const handleSvgPointerUp = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      pointersRef.current.delete(e.pointerId);
      pinchRef.current = null;
      const d = dragRef.current;
      dragRef.current = null;
      if (d && d.pointerId === e.pointerId && !d.moved) {
        setFocusId(null);
        setSelected(null);
        setHover(null);
        onNodeSelectRef.current?.(null);
      }
    },
    []
  );

  const centerOnMini = useCallback(
    (clientX: number, clientY: number) => {
      const svg = minimapRef.current;
      const geo = minimapGeoRef.current;
      const b = boundsRef.current;
      const t = transformRef.current;
      if (!svg || !geo || !b) return;
      const rect = svg.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      const gx = (mx - geo.ox) / geo.s;
      const gy = (my - geo.oy) / geo.s;
      const size = sizeRef.current;
      t.x = size.w / 2 - gx * t.k;
      t.y = size.h / 2 - gy * t.k;
      applyTransform();
    },
    [applyTransform]
  );

  const handleMiniPointerDown = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      miniDragRef.current = e.pointerId;
      centerOnMini(e.clientX, e.clientY);
    },
    [centerOnMini]
  );

  const handleMiniPointerMove = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      if (miniDragRef.current !== e.pointerId) return;
      centerOnMini(e.clientX, e.clientY);
    },
    [centerOnMini]
  );

  const handleMiniPointerUp = useCallback((e: ReactPointerEvent<SVGSVGElement>) => {
    if (miniDragRef.current === e.pointerId) miniDragRef.current = null;
  }, []);

  /* Wheel zoom (native listener so preventDefault works). */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const t = transformRef.current;
      const factor = Math.pow(1.0016, -e.deltaY);
      const k = clamp(t.k * factor, MIN_SCALE, MAX_SCALE);
      t.x = mx - ((mx - t.x) / t.k) * k;
      t.y = my - ((my - t.y) / t.k) * k;
      t.k = k;
      applyTransform();
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [applyTransform]);

  /* Initial fit + refit when the data (layout) changes. */
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      sizeRef.current = { w: Math.max(r.width, 320), h: Math.max(r.height, 320) };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    fitAll();
    return () => ro.disconnect();
  }, [layout, fitAll]);

  /* Auto-fit to search matches when the query changes. */
  useEffect(() => {
    const q = search.trim().toLowerCase();
    const fitted = fittedSearchRef.current;
    fittedSearchRef.current = q;
    if (!q || q === fitted) return;
    const matched: Pos[] = [];
    for (const n of nodes) {
      if (n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)) {
        const p = positions[n.id];
        if (p) matched.push(p);
      }
    }
    if (matched.length) fitToBounds(matched);
  }, [search, nodes, positions, fitToBounds]);

  /* Auto-fit to the neighborhood when focus mode engages. */
  useEffect(() => {
    if (focusId === fittedFocusRef.current) return;
    fittedFocusRef.current = focusId;
    if (!focusId) return;
    const p = positions[focusId];
    if (!p) return;
    const pts: Pos[] = [p];
    for (const e of edges) {
      if (e.from === focusId && positions[e.to]) pts.push(positions[e.to]);
      if (e.to === focusId && positions[e.from]) pts.push(positions[e.from]);
    }
    fitToBounds(pts);
  }, [focusId, nodes, edges, positions, fitToBounds]);

  /* Keyboard: Esc clears, 0 fits, +/− zoom. */
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocusId(null);
        setSelected(null);
        setHover(null);
        setSearch("");
        onNodeSelectRef.current?.(null);
      } else if (e.key === "0") {
        fitAll();
      } else if (e.key === "+" || e.key === "=") {
        zoomBy(1.3);
      } else if (e.key === "-" || e.key === "_") {
        zoomBy(1 / 1.3);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fitAll, zoomBy]);

  const focusNode = focusId ? nodes.find((n) => n.id === focusId) : undefined;
  const searchActive = search.trim().length > 0;

  if (nodes.length === 0) {
    return (
      <div
        ref={containerRef}
        className={cn("relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-background bg-dots", className)}
        style={{ width, height, minHeight }}
      >
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-background bg-dots",
        className
      )}
      style={{ width, height, minHeight }}
    >
      <svg
        ref={svgRef}
        role="img"
        aria-label="Dependency graph"
        data-lod="high"
        className="absolute inset-0 h-full w-full touch-none select-none"
        onPointerDown={handleSvgPointerDown}
        onPointerMove={handleSvgPointerMove}
        onPointerUp={handleSvgPointerUp}
        onPointerCancel={handleSvgPointerUp}
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            markerUnits="userSpaceOnUse"
            orient="auto"
            style={{ color: "var(--color-border)" }}
          >
            <path d="M0 0L10 5L0 10z" fill="currentColor" />
          </marker>
        </defs>
        <g ref={viewportRef} transform="translate(0 0) scale(1)">
          {edgeItems.map((e) => (
            <EdgePath key={e.key} d={e.d} highlighted={e.highlighted} dimmed={e.dimmed} markerId={markerId} />
          ))}
          {nodeItems.map(({ node, x, y, dimmed, highlighted, selected: isSelected, focused }) => (
            <NodeView
              key={node.id}
              node={node}
              x={x}
              y={y}
              dimmed={dimmed}
              highlighted={highlighted}
              selected={isSelected}
              focused={focused}
              onPointerDown={handleNodePointerDown}
              onPointerMove={handleNodePointerMove}
              onPointerUp={handleNodePointerUp}
              onPointerEnter={handleNodeEnter}
              onPointerLeave={handleNodeLeave}
              onKeyDown={handleNodeKeyDown}
            />
          ))}
        </g>
      </svg>

      {searchable && (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center p-3 sm:p-4">
          <div className="pointer-events-auto flex w-full max-w-xs items-center gap-2 rounded-xl border border-border bg-surface/95 px-3 py-2 shadow-card backdrop-blur">
            <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search nodes…"
              spellCheck={false}
              aria-label="Search graph nodes"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
            />
            {searchActive ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="shrink-0 rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            ) : (
              <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {nodes.length} nodes
              </span>
            )}
          </div>
        </div>
      )}

      {focusable && focusNode && (
        <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary shadow-card">
          <span className="truncate">Focus: {focusNode.label}</span>
          <button
            type="button"
            onClick={() => {
              setFocusId(null);
              setSelected(null);
            }}
            aria-label="Exit focus mode"
            className="rounded-full p-0.5 transition-colors hover:bg-primary/15"
          >
            <CloseIcon className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-xl border border-border bg-surface/95 p-1 shadow-card backdrop-blur">
        <button
          type="button"
          onClick={() => zoomBy(1.35)}
          aria-label="Zoom in"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => zoomBy(1 / 1.35)}
          aria-label="Zoom out"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={fitAll}
          aria-label="Fit graph"
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <FitIcon className="h-4 w-4" />
        </button>
        <span ref={zoomLabelRef} className="w-11 text-center text-[11px] font-medium tabular-nums text-muted-foreground">
          100%
        </span>
      </div>

      {minimap && (
        <div className="absolute bottom-3 right-3 hidden h-24 w-32 overflow-hidden rounded-xl border border-border bg-surface/95 p-1 shadow-card backdrop-blur sm:block sm:h-28 sm:w-40">
          <svg
            ref={minimapRef}
            viewBox={`0 0 ${MINI_W} ${MINI_H}`}
            className="h-full w-full cursor-pointer touch-none select-none"
            onPointerDown={handleMiniPointerDown}
            onPointerMove={handleMiniPointerMove}
            onPointerUp={handleMiniPointerUp}
            onPointerCancel={handleMiniPointerUp}
            aria-hidden="true"
          >
            <rect width={MINI_W} height={MINI_H} className="fill-transparent" />
            {minimapGeo.dots.map((d) => (
              <rect
                key={d.id}
                x={d.x}
                y={d.y}
                width={Math.max(2, NODE_W * minimapGeo.s)}
                height={Math.max(2, NODE_H * minimapGeo.s)}
                rx={2}
                className="fill-foreground"
                opacity={0.55}
              />
            ))}
            <rect
              ref={minimapViewportRef}
              x={0}
              y={0}
              width={40}
              height={40}
              rx={4}
              className="fill-primary/10 stroke-primary"
              strokeWidth={1.2}
              pointerEvents="none"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
