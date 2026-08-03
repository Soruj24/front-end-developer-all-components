"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { TreeProps, TreeItemProps } from "./Tree.types";

export function Tree({ data, defaultExpanded = [], expanded: controlledExpanded, onExpand, selected: controlledSelected, onSelect, className }: TreeProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

  const expanded = controlledExpanded ?? internalExpanded;
  const selected = controlledSelected ?? internalSelected;

  const toggle = useCallback((id: string) => {
    const next = expanded.includes(id) ? expanded.filter((e) => e !== id) : [...expanded, id];
    onExpand?.(next);
    if (!controlledExpanded) setInternalExpanded(next);
  }, [expanded, onExpand, controlledExpanded]);

  const select = useCallback((id: string) => {
    onSelect?.(id);
    if (!controlledSelected) setInternalSelected([id]);
  }, [onSelect, controlledSelected]);

  return (
    <div className={cn("text-sm", className)}>
      {data.map((node) => (
        <TreeItem key={node.id} node={node} level={0} expanded={expanded} selected={selected} onToggle={toggle} onSelect={select} />
      ))}
    </div>
  );
}

export function TreeItem({ node, level = 0, expanded, selected, onToggle, onSelect }: TreeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.includes(node.id);
  const isSelected = selected.includes(node.id);

  return (
    <div>
      <div
        className={cn("flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded", isSelected && "bg-zinc-100 dark:bg-zinc-800", node.disabled && "opacity-50 pointer-events-none")}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => hasChildren ? onToggle(node.id) : onSelect(node.id)}
      >
        {hasChildren && (
          <svg className={cn("h-4 w-4 shrink-0 transition-transform", isExpanded && "rotate-90")} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        )}
        {node.icon && <span className="shrink-0">{node.icon}</span>}
        <span className="truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} expanded={expanded} selected={selected} onToggle={onToggle} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
