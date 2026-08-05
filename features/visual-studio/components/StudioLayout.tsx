"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../context/StudioContext";
import { LeftPanel } from "./LeftPanel/LeftPanel";
import { Canvas } from "./Canvas/Canvas";
import { PropertyPanel } from "./RightPanel/PropertyPanel";
import { BottomPanel } from "./BottomPanel/BottomPanel";
import { ExportModal } from "./ExportModal/ExportModal";

function SplitHandle({ onMove, className }: { onMove: (delta: number) => void; className?: string }) {
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const onMove_ = (ev: MouseEvent) => onMove(ev.movementX);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove_);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove_);
    window.addEventListener("mouseup", onUp);
  }, [onMove]);

  return (
    <div
      className={cn("w-1 cursor-col-resize bg-border hover:bg-primary/50 transition-colors", className)}
      onMouseDown={handleMouseDown}
    />
  );
}

function VerticalSplitHandle({ onMove, className }: { onMove: (delta: number) => void; className?: string }) {
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const onMove_ = (ev: MouseEvent) => onMove(ev.movementY);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove_);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove_);
    window.addEventListener("mouseup", onUp);
  }, [onMove]);

  return (
    <div
      className={cn("h-1 cursor-row-resize bg-border hover:bg-primary/50 transition-colors", className)}
      onMouseDown={handleMouseDown}
    />
  );
}

export function StudioLayout() {
  const { canvas, panel, setPanel, undo, redo, toggleGrid, clearCanvas, setViewport } = useStudio();
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "e") {
        e.preventDefault();
        setExportOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "g") {
        e.preventDefault();
        toggleGrid();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        const current = canvas.viewport.zoom;
        setViewport({ zoom: Math.min(3, current + 0.1) });
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        const current = canvas.viewport.zoom;
        setViewport({ zoom: Math.max(0.1, current - 0.1) });
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        setViewport({ zoom: 1, panX: 0, panY: 0 });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, toggleGrid, setViewport, canvas.viewport.zoom]);

  const moveLeftSplit = useCallback((delta: number) => {
    setPanel({ leftWidth: Math.max(200, Math.min(500, panel.leftWidth + delta)) });
  }, [panel.leftWidth, setPanel]);

  const moveRightSplit = useCallback((delta: number) => {
    setPanel({ rightWidth: Math.max(240, Math.min(500, panel.rightWidth - delta)) });
  }, [panel.rightWidth, setPanel]);

  const moveBottomSplit = useCallback((delta: number) => {
    setPanel({ bottomHeight: Math.max(100, Math.min(600, panel.bottomHeight - delta)) });
  }, [panel.bottomHeight, setPanel]);

  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-0 select-none flex-col overflow-hidden bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-foreground">Visual Studio</h1>
          <div className="h-4 w-px bg-border" />
          <button onClick={() => setPanel({ leftOpen: !panel.leftOpen })} className={cn("rounded px-2 py-1 text-xs transition-colors", panel.leftOpen ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
            Components
          </button>
          <button onClick={() => setPanel({ rightOpen: !panel.rightOpen })} className={cn("rounded px-2 py-1 text-xs transition-colors", panel.rightOpen ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
            Properties
          </button>
          <button onClick={() => setPanel({ bottomOpen: !panel.bottomOpen })} className={cn("rounded px-2 py-1 text-xs transition-colors", panel.bottomOpen ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
            Code
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearCanvas} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            Clear
          </button>
          <button onClick={() => setExportOpen(true)} className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Export
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-0 flex-1">
        {panel.leftOpen && (
          <>
            <LeftPanel />
            <SplitHandle onMove={moveLeftSplit} />
          </>
        )}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Canvas />
          {panel.bottomOpen && (
            <>
              <VerticalSplitHandle onMove={moveBottomSplit} />
              <BottomPanel />
            </>
          )}
        </div>

        {panel.rightOpen && (
          <>
            <SplitHandle onMove={moveRightSplit} />
            <div className="shrink-0" style={{ width: panel.rightWidth }}>
              <PropertyPanel />
            </div>
          </>
        )}
      </div>

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}
