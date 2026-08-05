"use client";

import { useCallback } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import type { CanvasNode as CanvasNodeType, VisualProps } from "../../types/canvas";

interface Props {
  node: CanvasNodeType;
  isSelected: boolean;
  onSelect: (id: string, multi: boolean) => void;
  onDragStart: (id: string, e: React.MouseEvent) => void;
  showOutlines: boolean;
}

function visualToStyle(visual: VisualProps): React.CSSProperties {
  const style: React.CSSProperties = {};

  // Spacing
  if (visual.padding.top) style.paddingTop = visual.padding.top;
  if (visual.padding.right) style.paddingRight = visual.padding.right;
  if (visual.padding.bottom) style.paddingBottom = visual.padding.bottom;
  if (visual.padding.left) style.paddingLeft = visual.padding.left;
  if (visual.margin.top) style.marginTop = visual.margin.top;
  if (visual.margin.right) style.marginRight = visual.margin.right;
  if (visual.margin.bottom) style.marginBottom = visual.margin.bottom;
  if (visual.margin.left) style.marginLeft = visual.margin.left;

  // Layout
  if (visual.display) style.display = visual.display as "flex" | "block" | "grid";
  if (visual.flexDirection) style.flexDirection = visual.flexDirection as "row" | "column";
  if (visual.gap) style.gap = visual.gap;

  // Background
  if (visual.background.color) style.backgroundColor = visual.background.color;
  if (visual.background.gradientFrom || visual.background.gradientVia || visual.background.gradientTo) {
    const stops: string[] = [];
    if (visual.background.gradientFrom) stops.push(visual.background.gradientFrom);
    if (visual.background.gradientVia) stops.push(visual.background.gradientVia);
    if (visual.background.gradientTo) stops.push(visual.background.gradientTo);
    style.backgroundImage = `linear-gradient(${visual.background.gradientDirection || "to right"}, ${stops.join(", ")})`;
  }

  // Border
  if (visual.border.radius) style.borderRadius = visual.border.radius;
  if (visual.border.width) style.borderWidth = visual.border.width;
  if (visual.border.color) style.borderColor = visual.border.color;
  if (visual.border.style && visual.border.style !== "none") style.borderStyle = visual.border.style;

  // Typography
  if (visual.typography.fontSize) style.fontSize = visual.typography.fontSize;
  if (visual.typography.fontWeight) style.fontWeight = Number(visual.typography.fontWeight) || 400;
  if (visual.typography.lineHeight) style.lineHeight = visual.typography.lineHeight;
  if (visual.typography.letterSpacing) style.letterSpacing = visual.typography.letterSpacing;
  if (visual.typography.textAlign) style.textAlign = visual.typography.textAlign as "left" | "center" | "right";
  if (visual.typography.color) style.color = visual.typography.color;
  if (visual.typography.textTransform) style.textTransform = visual.typography.textTransform as "uppercase" | "lowercase" | "capitalize";

  // Effects
  if (visual.effects.opacity !== undefined && visual.effects.opacity < 100) {
    style.opacity = visual.effects.opacity / 100;
  }
  if (visual.effects.blur) style.filter = `blur(${visual.effects.blur}px)`;

  return style;
}

function NodeContent({ node }: { node: CanvasNodeType }) {
  const p = node.props;
  const vStyle = visualToStyle(node.visual);

  switch (node.componentName) {
    case "button":
      return (
        <button
          className="inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground pointer-events-none"
          style={{ ...vStyle, borderRadius: typeof p.borderRadius === "number" ? p.borderRadius : vStyle.borderRadius }}
        >
          {typeof p.loading === "boolean" && p.loading ? "Loading..." : (p.text as string) ?? "Button"}
        </button>
      );
    case "text":
      return (
        <p className="m-0 p-0 text-foreground" style={{ ...vStyle, fontSize: p.fontSize as number, fontWeight: p.fontWeight as string, color: p.color as string || vStyle.color }}>
          {(p.text as string) ?? "Text"}
        </p>
      );
    case "heading":
      return (
        <h2 className="m-0 p-0 text-foreground" style={{ ...vStyle, fontSize: p.fontSize as number, fontWeight: p.fontWeight as string, color: p.color as string || vStyle.color }}>
          {(p.text as string) ?? "Heading"}
        </h2>
      );
    case "input":
      return (
        <input
          type={(p.inputType as string) ?? "text"}
          placeholder={(p.placeholder as string) ?? ""}
          className="h-full w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-foreground pointer-events-none"
          style={vStyle}
          readOnly
        />
      );
    case "badge":
      return (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary" style={vStyle}>
          {(p.text as string) ?? "Badge"}
        </span>
      );
    case "card":
      return (
        <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm" style={{ ...vStyle, borderRadius: typeof p.borderRadius === "number" ? p.borderRadius : vStyle.borderRadius }}>
          <div className="text-xs text-gray-400">Card Content</div>
        </div>
      );
    case "alert":
      return (
        <div className="flex h-full w-full items-center gap-3 rounded-lg bg-blue-50 p-4 text-blue-800" style={{ ...vStyle, borderRadius: typeof p.borderRadius === "number" ? p.borderRadius : vStyle.borderRadius }}>
          <div className="text-lg">ℹ</div>
          <div>
            <div className="text-sm font-semibold">{(p.title as string) ?? "Alert"}</div>
            <div className="text-xs">{(p.description as string) ?? ""}</div>
          </div>
        </div>
      );
    case "avatar":
      return (
        <div
          className="flex h-full w-full items-center justify-center rounded-full text-sm font-medium text-white"
          style={{ ...vStyle, backgroundColor: (p.backgroundColor as string) || "#6366f1", borderRadius: typeof p.borderRadius === "number" ? p.borderRadius : vStyle.borderRadius }}
        >
          {(p.initials as string) ?? "AV"}
        </div>
      );
    case "divider":
      return <hr className="h-full w-full border-0" style={{ ...vStyle, borderTop: `1px solid ${p.color ?? "#e5e7eb"}` }} />;
    case "image":
      return (
        <div className="flex h-full w-full items-center justify-center rounded bg-gray-100 text-xs text-gray-400" style={vStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {p.src ? <img src={p.src as string} alt={p.alt as string} className="h-full w-full rounded object-cover" /> : "Image"}
        </div>
      );
    case "progress":
      return (
        <div className="h-full w-full overflow-hidden rounded-full bg-gray-200" style={{ ...vStyle, height: p.height as number ?? 8, borderRadius: typeof p.borderRadius === "number" ? p.borderRadius : vStyle.borderRadius }}>
          <div className="h-full rounded-full bg-primary" style={{ width: `${p.value ?? 60}%` }} />
        </div>
      );
    case "checkbox":
      return (
        <label className="flex h-full items-center gap-2 text-sm text-foreground" style={vStyle}>
          <div className={cn("flex h-4 w-4 items-center justify-center rounded border", p.checked ? "bg-primary border-primary text-white" : "border-gray-300")}>
            {p.checked ? <span className="text-[10px]">✓</span> : null}
          </div>
          {(p.label as string) ?? "Checkbox"}
        </label>
      );
    case "toggle":
      return (
        <label className="flex h-full items-center gap-2 text-sm text-foreground" style={vStyle}>
          <div className={cn("relative h-5 w-9 rounded-full transition-colors", p.checked ? "bg-primary" : "bg-gray-200")}>
            <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform", p.checked ? "translate-x-4" : "translate-x-0.5")} />
          </div>
          {(p.label as string) ?? "Toggle"}
        </label>
      );
    case "link":
      return (
        <span className="text-sm text-primary underline" style={vStyle}>{(p.text as string) ?? "Link"}</span>
      );
    case "spinner":
      return (
        <div className="h-full w-full animate-spin rounded-full border-2 border-gray-200 border-t-primary" style={vStyle} />
      );
    case "skeleton":
      return <div className="h-full w-full animate-pulse rounded bg-gray-200" style={vStyle} />;
    case "tooltip":
      return (
        <span className="inline-flex items-center gap-1 text-sm text-foreground" style={vStyle}>
          {(p.text as string) ?? "Tooltip"}
          <span className="text-xs text-gray-400">ⓘ</span>
        </span>
      );
    case "navbar":
      return (
        <nav className="flex h-full w-full items-center justify-between border-b border-gray-200 bg-white px-4">
          <span className="text-sm font-bold">{(p.brand as string) ?? "Brand"}</span>
          <div className="flex gap-4 text-sm text-gray-600">
            {(p.items as string ?? "Home,About").split(",").slice(0, 3).map((item: string) => (
              <span key={item}>{item.trim()}</span>
            ))}
          </div>
        </nav>
      );
    case "container":
      return (
        <div className="flex h-full w-full items-center justify-center rounded border border-dashed border-gray-300 text-xs text-gray-400">
          Container ({node.children.length} children)
        </div>
      );
    case "textarea":
      return (
        <textarea
          placeholder={(p.placeholder as string) ?? ""}
          className="h-full w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-foreground pointer-events-none resize-none"
          readOnly
        />
      );
    case "select":
      return (
        <div className="flex h-full w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm text-foreground">
          <span className="text-gray-400">{(p.placeholder as string) ?? "Select..."}</span>
          <span className="text-gray-400">▾</span>
        </div>
      );
    case "table":
      return (
        <div className="h-full w-full overflow-hidden rounded border border-gray-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50">
                {(p.columns as string ?? "Col1,Col2").split(",").slice(0, 3).map((col: string) => (
                  <th key={col} className="px-2 py-1 text-left font-medium text-gray-600">{col.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.min(2, (p.rows as number) ?? 2) }).map((_, i) => (
                <tr key={i} className="border-t border-gray-100">
                  {(p.columns as string ?? "Col1,Col2").split(",").slice(0, 3).map((_: string, j: number) => (
                    <td key={j} className="px-2 py-1 text-gray-500">Data {i + 1}.{j + 1}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "list":
      return (
        <ul className="m-0 list-disc pl-4 text-sm text-foreground" style={{ gap: p.gap as number }}>
          {(p.items as string ?? "Item 1,Item 2").split(",").slice(0, 4).map((item: string) => (
            <li key={item}>{item.trim()}</li>
          ))}
        </ul>
      );
    case "pagination":
      return (
        <div className="flex h-full items-center gap-1">
          {[1, 2, 3].map((n) => (
            <div key={n} className={cn("flex h-8 w-8 items-center justify-center rounded text-xs", n === 1 ? "bg-primary text-white" : "bg-gray-100 text-gray-600")}>
              {n}
            </div>
          ))}
        </div>
      );
    default:
      return <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">{node.componentName}</div>;
  }
}

export function CanvasNodeComponent({ node, isSelected, onSelect, onDragStart, showOutlines }: Props) {
  const { updateNodeSize } = useStudio();

  const handleResizeStart = useCallback((e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = node.size.width;
    const startH = node.size.height;
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let w = startW;
      let h = startH;
      if (handle.includes("e")) w = Math.max(20, w + dx);
      if (handle.includes("s")) h = Math.max(20, h + dy);
      if (handle.includes("w")) w = Math.max(20, w - dx);
      if (handle.includes("n")) h = Math.max(20, h - dy);
      updateNodeSize(node.id, { width: w, height: h });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [node.id, node.size, updateNodeSize]);

  if (!node.visible) return null;

  const handles = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];
  const handlePos: Record<string, string> = {
    n: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-n-resize",
    s: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-s-resize",
    e: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-e-resize",
    w: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-w-resize",
    ne: "top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-ne-resize",
    nw: "top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nw-resize",
    se: "bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-se-resize",
    sw: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-sw-resize",
  };

  return (
    <div
      className={cn(
        "absolute select-none group/node",
        isSelected && "ring-2 ring-primary ring-offset-1",
        node.locked && "opacity-70",
        showOutlines && !isSelected && "outline outline-1 outline-gray-200 outline-offset-1"
      )}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: node.size.width,
        height: node.size.height,
        zIndex: node.zIndex,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onSelect(node.id, e.shiftKey);
        onDragStart(node.id, e);
      }}
    >
      <NodeContent node={node} />
      {isSelected && handles.map((h) => (
        <div
          key={h}
          className={cn("absolute h-2 w-2 rounded-full bg-primary border-2 border-white", handlePos[h])}
          onMouseDown={(e) => handleResizeStart(e, h)}
        />
      ))}
      {isSelected && (
        <div className="absolute -top-6 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground whitespace-nowrap pointer-events-none">
          {node.componentName}
        </div>
      )}
    </div>
  );
}
