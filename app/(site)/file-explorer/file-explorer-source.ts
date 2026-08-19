export const FILE_EXPLORER_SOURCE = `"use client";

import { useState } from "react";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";

export interface FileNode {
  name: string;
  type: "folder" | "file";
  children?: FileNode[];
}

export function FileExplorer({ root }: { root: FileNode }) {
  return (
    <div className="max-w-xs rounded-xl border border-border bg-card p-3 text-sm">
      <TreeItem node={root} depth={0} />
    </div>
  );
}

function TreeItem({ node, depth }: { node: FileNode; depth: number }) {
  const [open, setOpen] = useState(depth === 0);
  const isFolder = node.type === "folder";

  return (
    <div>
      <button
        type="button"
        onClick={() => isFolder && setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-muted"
        style={{ paddingLeft: depth * 20 + 8 }}
      >
        {isFolder ? (
          open ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )
        ) : (
          <div className="w-3" />
        )}
        {isFolder ? (
          <Folder className="h-4 w-4 text-blue-500" />
        ) : (
          <File className="h-4 w-4 text-gray-500" />
        )}
        <span className="flex-1 text-left">{node.name}</span>
      </button>
      {isFolder && open && node.children?.map((child) => (
        <TreeItem key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}`;