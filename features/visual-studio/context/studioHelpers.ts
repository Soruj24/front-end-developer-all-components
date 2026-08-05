import type { CanvasNode, CanvasState } from "../types/canvas";
import type { PerformanceMetrics } from "../types/studio";
import { getComponentDef } from "../constants/components";

export interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
  depth: number;
}

export function buildTree(nodes: Record<string, CanvasNode>): TreeNode[] {
  const nodeMap = new Map(Object.entries(nodes));
  const childrenMap = new Map<string, string[]>();
  for (const node of Object.values(nodes)) {
    if (node.parentId) {
      const arr = childrenMap.get(node.parentId) ?? [];
      arr.push(node.id);
      childrenMap.set(node.parentId, arr);
    }
  }
  function buildNode(id: string, depth: number): TreeNode {
    const node = nodeMap.get(id);
    const childIds = childrenMap.get(id) ?? [];
    return {
      id,
      name: node?.componentName ?? "Unknown",
      children: childIds.map((cid) => buildNode(cid, depth + 1)),
      depth,
    };
  }
  return Object.values(nodes)
    .filter((n) => n.parentId === null)
    .sort((a, b) => a.zIndex - b.zIndex)
    .map((n) => buildNode(n.id, 0));
}

export function pushHistory(canvas: CanvasState, label: string): CanvasState {
  const entry = { nodes: { ...canvas.nodes }, timestamp: Date.now(), label };
  const newHistory = canvas.history.slice(0, canvas.historyIndex + 1);
  newHistory.push(entry);
  if (newHistory.length > 50) newHistory.shift();
  return { ...canvas, history: newHistory, historyIndex: newHistory.length - 1 };
}

export function computeMetrics(nodes: Record<string, CanvasNode>): PerformanceMetrics {
  const nodeCount = Object.keys(nodes).length;
  let maxDepth = 0;
  const visited = new Set<string>();

  function getDepth(nodeId: string): number {
    if (visited.has(nodeId)) return 0;
    visited.add(nodeId);
    const node = nodes[nodeId];
    if (!node || node.children.length === 0) return 0;
    const childDepths = node.children.map((cid) => getDepth(cid) + 1);
    return Math.max(...childDepths, 0);
  }

  for (const node of Object.values(nodes)) {
    if (!node.parentId) {
      const depth = getDepth(node.id);
      if (depth > maxDepth) maxDepth = depth;
    }
  }

  const allClasses = Object.values(nodes).map((n) => {
    const def = getComponentDef(n.componentName);
    return def ? n.componentName : "";
  }).filter(Boolean);

  const estimatedSize = nodeCount * 0.5;

  return {
    nodeCount,
    maxDepth,
    totalTailwindClasses: allClasses.length * 4,
    estimatedBundleSize: `~${estimatedSize.toFixed(1)}KB`,
  };
}

let nodeIdCounter = 0;
export function nextNodeId(): string {
  return `node_${++nodeIdCounter}_${Date.now()}`;
}
