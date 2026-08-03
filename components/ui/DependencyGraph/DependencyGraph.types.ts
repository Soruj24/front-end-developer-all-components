export interface GraphNode {
  id: string;
  label: string;
  kind?: string;
  status?: "ok" | "warn" | "error";
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface DependencyGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width?: number | string;
  height?: number | string;
  minHeight?: number;
  className?: string;
  onNodeSelect?: (node: GraphNode | null) => void;
  searchable?: boolean;
  minimap?: boolean;
  focusable?: boolean;
  emptyMessage?: string;
}

export interface Pos {
  x: number;
  y: number;
}

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}
