"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import type { CanvasNode } from "../../types/canvas";
import { HierarchyActions } from "./HierarchyActions";

interface DragIndicator {
  nodeId: string | null;
  position: "before" | "after" | "inside" | null;
}

interface Props {
  node: CanvasNode;
  depth: number;
  selectedIds: string[];
  expandedIds: Set<string>;
  dragIndicator: DragIndicator;
  onToggle: (id: string) => void;
  onSelect: (id: string, multi: boolean) => void;
  onDragOver: (id: string, e: React.DragEvent) => void;
  onDrop: (sourceId: string, targetId: string, position: "before" | "after" | "inside") => void;
}

export function HierarchyNode({
  node, depth, selectedIds, expandedIds, dragIndicator,
  onToggle, onSelect, onDragOver, onDrop,
}: Props) {
  const { renameNode } = useStudio();
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState(node.componentName);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedIds.includes(node.id);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = rect.height;
    let pos: "before" | "after" | "inside" = "inside";
    if (y < h * 0.25) pos = "before";
    else if (y > h * 0.75) pos = "after";
    onDragOver(node.id, e);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (sourceId && sourceId !== node.id) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const y = e.clientY - rect.top;
      const h = rect.height;
      let pos: "before" | "after" | "inside" = "inside";
      if (y < h * 0.25) pos = "before";
      else if (y > h * 0.75) pos = "after";
      onDrop(sourceId, node.id, pos);
    }
  };

  const startRename = () => {
    setTempName(node.componentName);
    setIsRenaming(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const commitRename = () => {
    if (tempName.trim() && tempName !== node.componentName) {
      renameNode(node.id, tempName.trim());
    }
    setIsRenaming(false);
  };

  return (
    <div>
      <div
        draggable={!isRenaming}
        onDragStart={(e) => e.dataTransfer.setData("text/plain", node.id)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={(e) => onSelect(node.id, e.shiftKey || e.metaKey)}
        onDoubleClick={startRename}
        className={cn(
          "group flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors cursor-pointer",
          isSelected && "bg-primary/10 text-primary",
          !isSelected && "text-foreground hover:bg-muted",
          dragIndicator.nodeId === node.id && dragIndicator.position === "before" && "border-t-2 border-primary",
          dragIndicator.nodeId === node.id && dragIndicator.position === "after" && "border-b-2 border-primary",
          dragIndicator.nodeId === node.id && dragIndicator.position === "inside" && "bg-primary/5"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}
          className="flex h-4 w-4 shrink-0 items-center justify-center text-[10px] text-muted-foreground hover:text-foreground"
        >
          {hasChildren ? (isExpanded ? "▾" : "▸") : "•"}
        </button>

        <span className="shrink-0 text-[10px] text-muted-foreground">{node.zIndex}</span>

        {isRenaming ? (
          <input
            ref={inputRef}
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitRename();
              if (e.key === "Escape") setIsRenaming(false);
            }}
            className="flex-1 bg-transparent px-0.5 text-xs outline-none ring-1 ring-primary/50"
            autoFocus
          />
        ) : (
          <span className="flex-1 truncate font-medium">{node.componentName}</span>
        )}

        <HierarchyActions nodeId={node.id} visible={node.visible} locked={node.locked} />

        {!isRenaming && (
          <span className="ml-1 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100">
            {node.id.slice(0, 6)}
          </span>
        )}
      </div>

      {hasChildren && isExpanded && node.children.map((childId) => {
        const { canvas } = useStudio();
        const childNode = canvas.nodes[childId];
        if (!childNode) return null;
        return (
          <HierarchyNode
            key={childId}
            node={childNode}
            depth={depth + 1}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            dragIndicator={dragIndicator}
            onToggle={onToggle}
            onSelect={onSelect}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        );
      })}
    </div>
  );
}
