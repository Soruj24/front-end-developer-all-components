"use client";

import { useState, useCallback } from "react";
import { useStudio } from "../../context/StudioContext";
import { HierarchyNode } from "./HierarchyNode";

interface DragIndicator {
  nodeId: string | null;
  position: "before" | "after" | "inside" | null;
}

export function ComponentHierarchy() {
  const { canvas, componentTree, selectNode, reorderNodes } = useStudio();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [dragIndicator, setDragIndicator] = useState<DragIndicator>({ nodeId: null, position: null });

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedIds(new Set(Object.keys(canvas.nodes)));
  }, [canvas.nodes]);

  const collapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-2 py-1">
        <span className="text-xs font-medium">Layers</span>
        <div className="flex gap-1">
          <button onClick={expandAll} className="rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted">
            Expand
          </button>
          <button onClick={collapseAll} className="rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted">
            Collapse
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-1">
        {componentTree.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <div className="mb-2 text-2xl">📋</div>
            <div className="text-sm">No components on canvas</div>
            <div className="text-[10px]">Drag components from the left panel</div>
          </div>
        ) : (
          componentTree.map((treeNode) => {
            const canvasNode = canvas.nodes[treeNode.id];
            if (!canvasNode) return null;
            return (
              <HierarchyNode
                key={treeNode.id}
                node={canvasNode}
                depth={0}
                selectedIds={canvas.selection.selectedIds}
                expandedIds={expandedIds}
                dragIndicator={dragIndicator}
                onToggle={toggleExpand}
                onSelect={selectNode}
                onDragOver={(id) => setDragIndicator({ nodeId: id, position: null })}
                onDrop={(sourceId, targetId, pos) => {
                  reorderNodes(sourceId, targetId, pos);
                  setDragIndicator({ nodeId: null, position: null });
                }}
              />
            );
          })
        )}
      </div>
      <div className="border-t px-2 py-1 text-[10px] text-muted-foreground">
        {Object.keys(canvas.nodes).length} components
      </div>
    </div>
  );
}
