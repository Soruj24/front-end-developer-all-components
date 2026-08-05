"use client";

import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import { CANVAS_SIZES, ALIGNMENT_OPTIONS } from "../../constants/defaults";
import type { ResponsiveBreakpoint } from "../../types/canvas";

function ToolbarButton({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded text-xs transition-colors",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

function ResponsiveButton({ mode, current, onClick }: { mode: ResponsiveBreakpoint | null; current: ResponsiveBreakpoint | null; onClick: () => void }) {
  const labels: Record<string, string> = {
    sm: "📱 S",
    md: "📱 M",
    lg: "💻 L",
    xl: "🖥 XL",
    "2xl": "🖥 2XL",
  };
  return (
    <button
      onClick={onClick}
      title={`Responsive: ${mode ?? "Off"}`}
      className={cn(
        "flex h-7 items-center gap-1 rounded px-2 text-[10px] font-medium transition-colors",
        current === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {labels[mode ?? ""] ?? "Off"}
    </button>
  );
}

export function CanvasToolbar() {
  const { canvas, setViewport, undo, redo, toggleGrid, toggleOutlines, alignNodes } = useStudio();
  const { viewport } = canvas;

  const zoomIn = () => setViewport({ zoom: Math.min(3, viewport.zoom + 0.1) });
  const zoomOut = () => setViewport({ zoom: Math.max(0.1, viewport.zoom - 0.1) });
  const zoomReset = () => setViewport({ zoom: 1, panX: 0, panY: 0 });

  const hasSelection = canvas.selection.selectedIds.length > 0;
  const multiSelection = canvas.selection.selectedIds.length > 1;

  return (
    <div className="flex items-center gap-1 border-b border-border bg-card px-3 py-1.5">
      <ToolbarButton onClick={undo} disabled={canvas.historyIndex <= 0} title="Undo (Ctrl+Z)">
        ↶
      </ToolbarButton>
      <ToolbarButton onClick={redo} disabled={canvas.historyIndex >= canvas.history.length - 1} title="Redo (Ctrl+Y)">
        ↷
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-border" />

      <ToolbarButton onClick={toggleGrid} active={canvas.showGrid} title="Toggle Grid (Ctrl+G)">
        #
      </ToolbarButton>
      <ToolbarButton onClick={toggleOutlines} active={canvas.showOutlines} title="Toggle Outlines">
        ◻
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-border" />

      <ToolbarButton onClick={zoomOut} title="Zoom Out (Ctrl+-)">
        −
      </ToolbarButton>
      <button
        onClick={zoomReset}
        className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground min-w-[48px] text-center"
        title="Reset Zoom (Ctrl+0)"
      >
        {Math.round(viewport.zoom * 100)}%
      </button>
      <ToolbarButton onClick={zoomIn} title="Zoom In (Ctrl++)">
        +
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-border" />

      {multiSelection && (
        <>
          {ALIGNMENT_OPTIONS.map((opt) => (
            <ToolbarButton
              key={opt.id}
              onClick={() => alignNodes(opt.action)}
              title={opt.label}
            >
              {opt.icon}
            </ToolbarButton>
          ))}
          <div className="mx-1 h-4 w-px bg-border" />
        </>
      )}

      <div className="flex items-center gap-0.5">
        <span className="text-[10px] text-muted-foreground mr-1">Responsive:</span>
        {([null, "sm", "md", "lg", "xl", "2xl"] as const).map((mode) => (
          <ResponsiveButton
            key={mode ?? "off"}
            mode={mode}
            current={viewport.responsiveMode}
            onClick={() => setViewport({ responsiveMode: mode })}
          />
        ))}
      </div>

      <div className="flex-1" />

      <span className="text-[10px] text-muted-foreground">
        {Object.keys(canvas.nodes).length} component{Object.keys(canvas.nodes).length !== 1 ? "s" : ""}
        {hasSelection && ` · ${canvas.selection.selectedIds.length} selected`}
      </span>
    </div>
  );
}
