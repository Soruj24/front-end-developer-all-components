"use client";

import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";

interface Props {
  nodeId: string;
  visible: boolean;
  locked: boolean;
}

export function HierarchyActions({ nodeId, visible, locked }: Props) {
  const { toggleVisibility, lockNode, duplicateNode, removeNode } = useStudio();

  return (
    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={(e) => { e.stopPropagation(); toggleVisibility(nodeId); }}
        className={cn(
          "h-4 w-4 flex items-center justify-center rounded hover:bg-muted",
          !visible && "text-muted-foreground line-through"
        )}
        title={visible ? "Hide" : "Show"}
      >
        {visible ? "👁" : "👁‍🗨"}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); lockNode(nodeId); }}
        className={cn(
          "h-4 w-4 flex items-center justify-center rounded hover:bg-muted",
          locked && "text-amber-500"
        )}
        title={locked ? "Unlock" : "Lock"}
      >
        {locked ? "🔒" : "🔓"}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); duplicateNode(nodeId); }}
        className="h-4 w-4 flex items-center justify-center rounded hover:bg-muted"
        title="Duplicate"
      >
        ⧉
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); removeNode(nodeId); }}
        className="h-4 w-4 flex items-center justify-center rounded hover:bg-destructive/20 text-destructive"
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
}
