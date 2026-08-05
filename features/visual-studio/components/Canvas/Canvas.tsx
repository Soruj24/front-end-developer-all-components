"use client";

import { useCallback, useRef } from "react";
import { useStudio } from "../../context/StudioContext";
import { CanvasNodeComponent } from "./CanvasNode";
import { CanvasToolbar } from "./CanvasToolbar";

export function Canvas() {
  const {
    canvas, addNode, selectNode, clearSelection,
    updateNodePosition, removeNode, duplicateNode,
  } = useStudio();
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const componentName = e.dataTransfer.getData("application/visual-studio-component");
    if (!componentName || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.viewport.zoom - canvas.viewport.panX;
    const y = (e.clientY - rect.top) / canvas.viewport.zoom - canvas.viewport.panY;
    const id = addNode(componentName, { x, y });
    if (id) selectNode(id);
  }, [addNode, selectNode, canvas.viewport]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains("canvas-bg")) {
      clearSelection();
    }
  }, [clearSelection]);

  const handleNodeDragStart = useCallback((nodeId: string, e: React.MouseEvent) => {
    const node = canvas.nodes[nodeId];
    if (!node || node.locked) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragOffset.current = {
      x: e.clientX / canvas.viewport.zoom - node.position.x,
      y: e.clientY / canvas.viewport.zoom - node.position.y,
    };
    const onMove = (ev: MouseEvent) => {
      if (!canvasRef.current) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = (ev.clientX - canvasRect.left) / canvas.viewport.zoom - dragOffset.current.x + canvas.viewport.panX;
      const y = (ev.clientY - canvasRect.top) / canvas.viewport.zoom - dragOffset.current.y + canvas.viewport.panY;
      updateNodePosition(nodeId, { x: Math.max(0, x), y: Math.max(0, y) });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [canvas.nodes, canvas.viewport, updateNodePosition]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const selected = canvas.selection.selectedIds;
    if (e.key === "Delete" || e.key === "Backspace") {
      selected.forEach((id) => removeNode(id));
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
      e.preventDefault();
      selected.forEach((id) => duplicateNode(id));
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      e.preventDefault();
      Object.keys(canvas.nodes).forEach((id) => selectNode(id, true));
    }
  }, [canvas.selection.selectedIds, canvas.nodes, removeNode, duplicateNode, selectNode]);

  const sortedNodes = Object.values(canvas.nodes)
    .sort((a, b) => a.zIndex - b.zIndex);

  const responsiveWidth = canvas.viewport.responsiveMode === "sm" ? 640
    : canvas.viewport.responsiveMode === "md" ? 768
    : canvas.viewport.responsiveMode === "lg" ? 1024
    : canvas.viewport.responsiveMode === "xl" ? 1280
    : canvas.viewport.responsiveMode === "2xl" ? 1536
    : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <CanvasToolbar />
      <div
        ref={canvasRef}
        className="relative min-h-0 flex-1 overflow-auto bg-gray-50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseDown={handleCanvasMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div
          className="canvas-bg absolute inset-0"
          style={{
            backgroundImage: canvas.showGrid
              ? "radial-gradient(circle, #d1d5db 1px, transparent 1px)"
              : "none",
            backgroundSize: `${8 * canvas.viewport.zoom}px ${8 * canvas.viewport.zoom}px`,
            transform: `translate(${canvas.viewport.panX}px, ${canvas.viewport.panY}px)`,
          }}
        />
        <div
          className="relative"
          style={{
            transform: `scale(${canvas.viewport.zoom})`,
            transformOrigin: "0 0",
            minWidth: responsiveWidth ?? 1200,
            minHeight: 800,
          }}
        >
          {responsiveWidth && (
            <div
              className="absolute inset-0 border-2 border-dashed border-primary/30 pointer-events-none"
              style={{ width: responsiveWidth }}
            />
          )}
          {sortedNodes.map((node) => (
            <CanvasNodeComponent
              key={node.id}
              node={node}
              isSelected={canvas.selection.selectedIds.includes(node.id)}
              onSelect={selectNode}
              onDragStart={handleNodeDragStart}
              showOutlines={canvas.showOutlines}
            />
          ))}
          {sortedNodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="mb-3 text-5xl opacity-40">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 3v18M3 9h18" />
                  </svg>
                </div>
                <div className="text-lg font-medium">Drag components here</div>
                <div className="mt-1 text-sm">or click a component in the left panel</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
