import type { ReactNode } from "react";

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  defaultExpanded?: string[];
  expanded?: string[];
  onExpand?: (ids: string[]) => void;
  selected?: string[];
  onSelect?: (id: string) => void;
  className?: string;
}

export interface TreeItemProps {
  node: TreeNode;
  level?: number;
  expanded: string[];
  selected: string[];
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}
