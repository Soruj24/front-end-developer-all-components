"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CanvasNode, CanvasState, ResponsiveBreakpoint, ViewportState } from "../types/canvas";
import type { FavoriteItem, PanelState, PerformanceMetrics, RecentItem, StudioSettings } from "../types/studio";
import { DEFAULT_PANEL_STATE, DEFAULT_STUDIO_SETTINGS, DEFAULT_CANVAS, GRID_SNAP_SIZE, DEFAULT_VISUAL_PROPS } from "../constants/defaults";
import { getComponentDef } from "../constants/components";
import { generateCode, generateTailwindClasses, generateTypescriptTypes, generateDocumentation } from "../utils/codeGenerator";

let nodeIdCounter = 0;
function nextNodeId(): string {
  return `node_${++nodeIdCounter}_${Date.now()}`;
}

interface StudioContextValue {
  canvas: CanvasState;
  panel: PanelState;
  settings: StudioSettings;
  generatedCode: string;
  generatedTailwind: string;
  generatedTypes: string;
  generatedDocs: string;
  componentTree: TreeNode[];
  favorites: FavoriteItem[];
  recentItems: RecentItem[];
  performanceMetrics: PerformanceMetrics;

  addNode: (componentName: string, position: { x: number; y: number }) => string;
  addNodeToParent: (componentName: string, parentId: string) => string;
  updateNodeProps: (nodeId: string, props: Record<string, unknown>) => void;
  updateNodeVisual: (nodeId: string, visual: Partial<import("../types/canvas").VisualProps>) => void;
  updateNodeResponsive: (nodeId: string, breakpoint: ResponsiveBreakpoint, patch: Partial<import("../types/canvas").VisualProps>) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  updateNodeSize: (nodeId: string, size: { width: number; height: number }) => void;
  removeNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  renameNode: (nodeId: string, name: string) => void;
  reorderNodes: (sourceId: string, targetId: string, position: "before" | "after" | "inside") => void;
  selectNode: (nodeId: string, multi?: boolean) => void;
  clearSelection: () => void;
  bringForward: (nodeId: string) => void;
  sendBackward: (nodeId: string) => void;
  lockNode: (nodeId: string) => void;
  toggleVisibility: (nodeId: string) => void;
  alignNodes: (action: string) => void;
  undo: () => void;
  redo: () => void;

  loadTemplate: (nodes: Record<string, CanvasNode>) => void;
  clearCanvas: () => void;

  setViewport: (patch: Partial<ViewportState>) => void;
  setPanel: (patch: Partial<PanelState>) => void;
  setSettings: (patch: Partial<StudioSettings>) => void;
  toggleGrid: () => void;
  toggleOutlines: () => void;
  setResponsiveMode: (mode: ResponsiveBreakpoint | null) => void;

  addFavorite: (componentName: string) => void;
  removeFavorite: (id: string) => void;
  addRecent: (componentName: string) => void;

  exportCode: () => string;
  copyCodeToClipboard: () => Promise<void>;
  downloadComponent: () => void;
}

export interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
  depth: number;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used within StudioProvider");
  return ctx;
}

function buildTree(nodes: Record<string, CanvasNode>): TreeNode[] {
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

function pushHistory(canvas: CanvasState, label: string): CanvasState {
  const entry = { nodes: { ...canvas.nodes }, timestamp: Date.now(), label };
  const newHistory = canvas.history.slice(0, canvas.historyIndex + 1);
  newHistory.push(entry);
  if (newHistory.length > 50) newHistory.shift();
  return { ...canvas, history: newHistory, historyIndex: newHistory.length - 1 };
}

function computeMetrics(nodes: Record<string, CanvasNode>): PerformanceMetrics {
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

export function StudioProvider({ children }: { children: ReactNode }) {
  const [canvas, setCanvas] = useState<CanvasState>(DEFAULT_CANVAS);
  const [panel, setPanelState] = useState<PanelState>(DEFAULT_PANEL_STATE);
  const [settings, setSettingsState] = useState<StudioSettings>(DEFAULT_STUDIO_SETTINGS);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  const snapToGrid = useCallback((val: number): number => {
    if (!canvas.gridSnap) return val;
    return Math.round(val / GRID_SNAP_SIZE) * GRID_SNAP_SIZE;
  }, [canvas.gridSnap]);

  const addNode = useCallback((componentName: string, position: { x: number; y: number }): string => {
    const def = getComponentDef(componentName);
    if (!def) return "";
    const id = nextNodeId();
    const newNode: CanvasNode = {
      id,
      type: def.isContainer ? "container" : "component",
      componentName,
      position: { x: snapToGrid(position.x), y: snapToGrid(position.y) },
      size: { ...def.defaultSize },
      parentId: null,
      children: [],
      props: { ...def.defaultProps },
      visual: { ...DEFAULT_VISUAL_PROPS },
      zIndex: Object.keys(canvas.nodes).length,
      locked: false,
      visible: true,
    };
    setCanvas((prev) => {
      const nodes = { ...prev.nodes, [id]: newNode };
      return pushHistory({ ...prev, nodes }, `Add ${componentName}`);
    });
    addRecent(componentName);
    return id;
  }, [canvas.nodes, snapToGrid]);

  const addNodeToParent = useCallback((componentName: string, parentId: string): string => {
    const def = getComponentDef(componentName);
    const parent = canvas.nodes[parentId];
    if (!def || !parent) return "";
    const id = nextNodeId();
    const childIndex = parent.children.length;
    const newNode: CanvasNode = {
      id,
      type: def.isContainer ? "container" : "component",
      componentName,
      position: { x: 16, y: 16 + childIndex * 60 },
      size: { ...def.defaultSize },
      parentId,
      children: [],
      props: { ...def.defaultProps },
      visual: { ...DEFAULT_VISUAL_PROPS },
      zIndex: childIndex,
      locked: false,
      visible: true,
    };
    setCanvas((prev) => {
      const updatedParent = { ...prev.nodes[parentId], children: [...prev.nodes[parentId].children, id] };
      const nodes = { ...prev.nodes, [id]: newNode, [parentId]: updatedParent };
      return pushHistory({ ...prev, nodes }, `Add ${componentName} to ${parent.componentName}`);
    });
    addRecent(componentName);
    return id;
  }, [canvas.nodes]);

  const updateNodeProps = useCallback((nodeId: string, props: Record<string, unknown>) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      const updated = { ...node, props: { ...node.props, ...props } };
      const nodes = { ...prev.nodes, [nodeId]: updated };
      return pushHistory({ ...prev, nodes }, `Edit ${node.componentName}`);
    });
  }, []);

  const updateNodeVisual = useCallback((nodeId: string, visual: Partial<import("../types/canvas").VisualProps>) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      const merged = { ...node.visual, ...visual };
      // Deep merge nested objects
      if (visual.padding) merged.padding = { ...node.visual.padding, ...visual.padding };
      if (visual.margin) merged.margin = { ...node.visual.margin, ...visual.margin };
      if (visual.background) merged.background = { ...node.visual.background, ...visual.background };
      if (visual.border) merged.border = { ...node.visual.border, ...visual.border };
      if (visual.typography) merged.typography = { ...node.visual.typography, ...visual.typography };
      if (visual.effects) merged.effects = { ...node.visual.effects, ...visual.effects };
      if (visual.hover) merged.hover = { ...node.visual.hover, ...visual.hover };
      if (visual.focus) merged.focus = { ...node.visual.focus, ...visual.focus };
      if (visual.darkMode) merged.darkMode = { ...node.visual.darkMode, ...visual.darkMode };
      const updated = { ...node, visual: merged };
      const nodes = { ...prev.nodes, [nodeId]: updated };
      return pushHistory({ ...prev, nodes }, `Style ${node.componentName}`);
    });
  }, []);

  const updateNodeResponsive = useCallback((nodeId: string, breakpoint: ResponsiveBreakpoint, patch: Partial<import("../types/canvas").VisualProps>) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      const responsive = { ...(node.responsive ?? {}) };
      const current = responsive[breakpoint] ?? {};
      responsive[breakpoint] = { ...current, ...patch };
      const updated = { ...node, responsive };
      const nodes = { ...prev.nodes, [nodeId]: updated };
      return pushHistory({ ...prev, nodes }, `Responsive ${breakpoint} for ${node.componentName}`);
    });
  }, []);

  const updateNodePosition = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node || node.locked) return prev;
      const updated = { ...node, position: { x: snapToGrid(position.x), y: snapToGrid(position.y) } };
      return { ...prev, nodes: { ...prev.nodes, [nodeId]: updated } };
    });
  }, [snapToGrid]);

  const updateNodeSize = useCallback((nodeId: string, size: { width: number; height: number }) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node || node.locked) return prev;
      const updated = { ...node, size: { width: Math.max(20, size.width), height: Math.max(20, size.height) } };
      return { ...prev, nodes: { ...prev.nodes, [nodeId]: updated } };
    });
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      const nodes = { ...prev.nodes };
      delete nodes[nodeId];
      const selection = {
        ...prev.selection,
        selectedIds: prev.selection.selectedIds.filter((id) => id !== nodeId),
      };
      return pushHistory({ ...prev, nodes, selection }, `Delete ${node.componentName}`);
    });
  }, []);

  const duplicateNode = useCallback((nodeId: string) => {
    setCanvas((prev) => {
      const original = prev.nodes[nodeId];
      if (!original) return prev;
      const id = nextNodeId();
      const dup: CanvasNode = {
        ...original,
        id,
        position: { x: original.position.x + 20, y: original.position.y + 20 },
        props: { ...original.props },
        zIndex: Object.keys(prev.nodes).length,
      };
      const nodes = { ...prev.nodes, [id]: dup };
      return pushHistory({ ...prev, nodes, selection: { ...prev.selection, selectedIds: [id] } }, `Duplicate ${original.componentName}`);
    });
  }, []);

  const renameNode = useCallback((nodeId: string, name: string) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      const updated = { ...node, componentName: name };
      const nodes = { ...prev.nodes, [nodeId]: updated };
      return pushHistory({ ...prev, nodes }, `Rename to ${name}`);
    });
  }, []);

  const reorderNodes = useCallback((sourceId: string, targetId: string, position: "before" | "after" | "inside") => {
    setCanvas((prev) => {
      const source = prev.nodes[sourceId];
      const target = prev.nodes[targetId];
      if (!source || !target) return prev;

      const nodes = { ...prev.nodes };

      if (position === "inside") {
        if (source.parentId) {
          const oldParent = nodes[source.parentId];
          if (oldParent) {
            nodes[source.parentId] = { ...oldParent, children: oldParent.children.filter((id) => id !== sourceId) };
          }
        }
        nodes[targetId] = { ...target, children: [...target.children, sourceId] };
        nodes[sourceId] = { ...source, parentId: targetId };
      } else {
        if (source.parentId) {
          const oldParent = nodes[source.parentId];
          if (oldParent) {
            nodes[source.parentId] = { ...oldParent, children: oldParent.children.filter((id) => id !== sourceId) };
          }
        }

        const newParentId = target.parentId;
        if (newParentId) {
          const parent = nodes[newParentId];
          if (parent) {
            const idx = parent.children.indexOf(targetId);
            const newChildren = [...parent.children.filter((id) => id !== sourceId)];
            if (position === "before") {
              newChildren.splice(idx, 0, sourceId);
            } else {
              newChildren.splice(idx + 1, 0, sourceId);
            }
            nodes[newParentId] = { ...parent, children: newChildren };
          }
          nodes[sourceId] = { ...source, parentId: newParentId };
        } else {
          nodes[sourceId] = { ...source, parentId: null };
        }
      }

      return pushHistory({ ...prev, nodes }, `Reorder ${source.componentName}`);
    });
  }, []);

  const selectNode = useCallback((nodeId: string, multi = false) => {
    setCanvas((prev) => ({
      ...prev,
      selection: {
        ...prev.selection,
        selectedIds: multi
          ? prev.selection.selectedIds.includes(nodeId)
            ? prev.selection.selectedIds.filter((id) => id !== nodeId)
            : [...prev.selection.selectedIds, nodeId]
          : [nodeId],
      },
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setCanvas((prev) => ({
      ...prev,
      selection: { ...prev.selection, selectedIds: [], marquee: null },
    }));
  }, []);

  const bringForward = useCallback((nodeId: string) => {
    setCanvas((prev) => {
      const nodes = { ...prev.nodes };
      const node = nodes[nodeId];
      if (!node) return prev;
      const maxZ = Math.max(...Object.values(nodes).map((n) => n.zIndex), 0);
      nodes[nodeId] = { ...node, zIndex: maxZ + 1 };
      return { ...prev, nodes };
    });
  }, []);

  const sendBackward = useCallback((nodeId: string) => {
    setCanvas((prev) => {
      const nodes = { ...prev.nodes };
      const node = nodes[nodeId];
      if (!node) return prev;
      const minZ = Math.min(...Object.values(nodes).map((n) => n.zIndex), 0);
      nodes[nodeId] = { ...node, zIndex: minZ - 1 };
      return { ...prev, nodes };
    });
  }, []);

  const lockNode = useCallback((nodeId: string) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      return { ...prev, nodes: { ...prev.nodes, [nodeId]: { ...node, locked: !node.locked } } };
    });
  }, []);

  const toggleVisibility = useCallback((nodeId: string) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      return { ...prev, nodes: { ...prev.nodes, [nodeId]: { ...node, visible: !node.visible } } };
    });
  }, []);

  const alignNodes = useCallback((action: string) => {
    setCanvas((prev) => {
      const ids = prev.selection.selectedIds;
      if (ids.length < 2) return prev;
      const nodes = ids.map((id) => prev.nodes[id]).filter(Boolean);
      const minX = Math.min(...nodes.map((n) => n.position.x));
      const maxX = Math.max(...nodes.map((n) => n.position.x + n.size.width));
      const minY = Math.min(...nodes.map((n) => n.position.y));
      const maxY = Math.max(...nodes.map((n) => n.position.y + n.size.height));
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      const updatedNodes = { ...prev.nodes };
      for (const id of ids) {
        const node = updatedNodes[id];
        if (!node) continue;
        let newPos = { ...node.position };
        switch (action) {
          case "left": newPos = { ...newPos, x: minX }; break;
          case "right": newPos = { ...newPos, x: maxX - node.size.width }; break;
          case "center-h": newPos = { ...newPos, x: centerX - node.size.width / 2 }; break;
          case "top": newPos = { ...newPos, y: minY }; break;
          case "bottom": newPos = { ...newPos, y: maxY - node.size.height }; break;
          case "center-v": newPos = { ...newPos, y: centerY - node.size.height / 2 }; break;
        }
        updatedNodes[id] = { ...node, position: newPos };
      }
      return pushHistory({ ...prev, nodes: updatedNodes }, "Align nodes");
    });
  }, []);

  const undo = useCallback(() => {
    setCanvas((prev) => {
      if (prev.historyIndex <= 0) return prev;
      const entry = prev.history[prev.historyIndex - 1];
      return { ...prev, nodes: { ...entry.nodes }, historyIndex: prev.historyIndex - 1 };
    });
  }, []);

  const redo = useCallback(() => {
    setCanvas((prev) => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;
      const entry = prev.history[prev.historyIndex + 1];
      return { ...prev, nodes: { ...entry.nodes }, historyIndex: prev.historyIndex + 1 };
    });
  }, []);

  const loadTemplate = useCallback((templateNodes: Record<string, CanvasNode>) => {
    setCanvas((prev) => {
      const nodes = { ...templateNodes };
      return pushHistory({ ...prev, nodes, selection: { selectedIds: [], marquee: null } }, "Load template");
    });
  }, []);

  const clearCanvas = useCallback(() => {
    setCanvas((prev) => {
      return pushHistory({ ...prev, nodes: {}, selection: { selectedIds: [], marquee: null } }, "Clear canvas");
    });
  }, []);

  const setViewport = useCallback((patch: Partial<ViewportState>) => {
    setCanvas((prev) => ({ ...prev, viewport: { ...prev.viewport, ...patch } }));
  }, []);

  const setPanel = useCallback((patch: Partial<PanelState>) => {
    setPanelState((prev) => ({ ...prev, ...patch }));
  }, []);

  const setSettings = useCallback((patch: Partial<StudioSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...patch }));
  }, []);

  const toggleGrid = useCallback(() => {
    setCanvas((prev) => ({ ...prev, showGrid: !prev.showGrid, gridSnap: !prev.gridSnap }));
  }, []);

  const toggleOutlines = useCallback(() => {
    setCanvas((prev) => ({ ...prev, showOutlines: !prev.showOutlines }));
  }, []);

  const setResponsiveMode = useCallback((mode: ResponsiveBreakpoint | null) => {
    setCanvas((prev) => ({ ...prev, viewport: { ...prev.viewport, responsiveMode: mode } }));
  }, []);

  const addFavorite = useCallback((componentName: string) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.componentName === componentName)) return prev;
      return [...prev, { id: `fav_${Date.now()}`, componentName, addedAt: Date.now() }];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const addRecent = useCallback((componentName: string) => {
    setRecentItems((prev) => {
      const filtered = prev.filter((r) => r.componentName !== componentName);
      return [{ componentName, usedAt: Date.now() }, ...filtered].slice(0, 20);
    });
  }, []);

  const exportCode = useCallback((): string => {
    const code = generateCode(canvas.nodes);
    return code.fullFile;
  }, [canvas.nodes]);

  const copyCodeToClipboard = useCallback(async (): Promise<void> => {
    const code = exportCode();
    await navigator.clipboard.writeText(code);
  }, [exportCode]);

  const downloadComponent = useCallback(() => {
    const code = exportCode();
    const blob = new Blob([code], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DesignedComponent.tsx";
    a.click();
    URL.revokeObjectURL(url);
  }, [exportCode]);

  const generatedCode = useMemo(() => generateCode(canvas.nodes).fullFile, [canvas.nodes]);
  const generatedTailwind = useMemo(() => generateTailwindClasses(canvas.nodes), [canvas.nodes]);
  const generatedTypes = useMemo(() => generateTypescriptTypes(canvas.nodes), [canvas.nodes]);
  const generatedDocs = useMemo(() => generateDocumentation(canvas.nodes), [canvas.nodes]);
  const componentTree = useMemo(() => buildTree(canvas.nodes), [canvas.nodes]);
  const performanceMetrics = useMemo(() => computeMetrics(canvas.nodes), [canvas.nodes]);

  const value = useMemo<StudioContextValue>(() => ({
    canvas, panel, settings, generatedCode, generatedTailwind, generatedTypes,
    generatedDocs, componentTree, favorites, recentItems, performanceMetrics,
    addNode, addNodeToParent, updateNodeProps, updateNodeVisual, updateNodeResponsive, updateNodePosition, updateNodeSize,
    removeNode, duplicateNode, renameNode, reorderNodes, selectNode, clearSelection,
    bringForward, sendBackward, lockNode, toggleVisibility, alignNodes,
    undo, redo, loadTemplate, clearCanvas,
    setViewport, setPanel, setSettings, toggleGrid, toggleOutlines, setResponsiveMode,
    addFavorite, removeFavorite, addRecent,
    exportCode, copyCodeToClipboard, downloadComponent,
  }), [
    canvas, panel, settings, generatedCode, generatedTailwind, generatedTypes,
    generatedDocs, componentTree, favorites, recentItems, performanceMetrics,
    addNode, addNodeToParent, updateNodeProps, updateNodeVisual, updateNodeResponsive, updateNodePosition, updateNodeSize,
    removeNode, duplicateNode, renameNode, reorderNodes, selectNode, clearSelection,
    bringForward, sendBackward, lockNode, toggleVisibility, alignNodes,
    undo, redo, loadTemplate, clearCanvas,
    setViewport, setPanel, setSettings, toggleGrid, toggleOutlines, setResponsiveMode,
    addFavorite, removeFavorite, addRecent,
    exportCode, copyCodeToClipboard, downloadComponent,
  ]);

  return (
    <StudioContext.Provider value={value}>
      {children}
    </StudioContext.Provider>
  );
}
