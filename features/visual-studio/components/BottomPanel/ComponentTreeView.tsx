"use client";

import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import type { TreeNode } from "../../context/StudioContext";

function TreeNodeItem({ node, selectedIds }: { node: TreeNode; selectedIds: string[] }) {
  const { selectNode } = useStudio();
  const isSelected = selectedIds.includes(node.id);
  return (
    <div>
      <button
        onClick={() => selectNode(node.id)}
        className={cn(
          "flex w-full items-center gap-1 rounded px-2 py-1 text-xs transition-colors",
          isSelected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
        )}
        style={{ paddingLeft: `${node.depth * 16 + 8}px` }}
      >
        <span className="text-[10px] text-muted-foreground">
          {node.children.length > 0 ? (isSelected ? "▾" : "▸") : "•"}
        </span>
        <span className="font-medium">{node.name}</span>
        <span className="ml-auto text-[10px] text-muted-foreground">{node.id.slice(0, 8)}</span>
      </button>
      {isSelected && node.children.map((child: TreeNode) => (
        <TreeNodeItem key={child.id} node={child} selectedIds={selectedIds} />
      ))}
    </div>
  );
}

export function ComponentTreeView() {
  const { componentTree, canvas } = useStudio();
  return (
    <div className="h-full overflow-auto p-2">
      {componentTree.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <div className="mb-2 text-2xl">📋</div>
          <div className="text-sm">No components on canvas</div>
        </div>
      ) : (
        <div className="flex flex-col">
          {componentTree.map((node) => (
            <TreeNodeItem key={node.id} node={node} selectedIds={canvas.selection.selectedIds} />
          ))}
        </div>
      )}
    </div>
  );
}
