import { useCallback } from "react";
import type { CanvasNode, CanvasState, ResponsiveBreakpoint, ViewportState } from "../types/canvas";
import type { FavoriteItem, PanelState, RecentItem, StudioSettings } from "../types/studio";
import { DEFAULT_VISUAL_PROPS } from "../constants/defaults";
import { getComponentDef } from "../constants/components";
import { generateCode } from "../utils/codeGenerator";
import { nextNodeId, pushHistory } from "./studioHelpers";

interface ActionsParams {
  canvas: CanvasState;
  setCanvas: React.Dispatch<React.SetStateAction<CanvasState>>;
  setPanelState: React.Dispatch<React.SetStateAction<PanelState>>;
  setSettingsState: React.Dispatch<React.SetStateAction<StudioSettings>>;
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
  setRecentItems: React.Dispatch<React.SetStateAction<RecentItem[]>>;
  snapToGrid: (val: number) => number;
}

export function useStudioActions({
  canvas, setCanvas, setPanelState, setSettingsState,
  setFavorites, setRecentItems, snapToGrid,
}: ActionsParams) {
  const addNode = useCallback((componentName: string, position: { x: number; y: number }): string => {
    const def = getComponentDef(componentName);
    if (!def) return "";
    const id = nextNodeId();
    const newNode: CanvasNode = {
      id, type: def.isContainer ? "container" : "component", componentName,
      position: { x: snapToGrid(position.x), y: snapToGrid(position.y) },
      size: { ...def.defaultSize }, parentId: null, children: [],
      props: { ...def.defaultProps }, visual: { ...DEFAULT_VISUAL_PROPS },
      zIndex: Object.keys(canvas.nodes).length, locked: false, visible: true,
    };
    setCanvas((prev) => pushHistory({ ...prev, nodes: { ...prev.nodes, [id]: newNode } }, `Add ${componentName}`));
    setRecentItems((prev) => [...prev, { id: `rec_${Date.now()}`, componentName, usedAt: Date.now() }]);
    return id;
  }, [canvas.nodes, snapToGrid, setCanvas, setRecentItems]);

  const addNodeToParent = useCallback((componentName: string, parentId: string): string => {
    const def = getComponentDef(componentName);
    const parent = canvas.nodes[parentId];
    if (!def || !parent) return "";
    const id = nextNodeId();
    const childIndex = parent.children.length;
    const newNode: CanvasNode = {
      id, type: def.isContainer ? "container" : "component", componentName,
      position: { x: 16, y: 16 + childIndex * 60 }, size: { ...def.defaultSize },
      parentId, children: [], props: { ...def.defaultProps },
      visual: { ...DEFAULT_VISUAL_PROPS }, zIndex: childIndex, locked: false, visible: true,
    };
    setCanvas((prev) => {
      const updatedParent = { ...prev.nodes[parentId], children: [...prev.nodes[parentId].children, id] };
      return pushHistory({ ...prev, nodes: { ...prev.nodes, [id]: newNode, [parentId]: updatedParent } }, `Add ${componentName} to ${parent.componentName}`);
    });
    return id;
  }, [canvas.nodes, setCanvas]);

  const updateNodeProps = useCallback((nodeId: string, props: Record<string, unknown>) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      return pushHistory({ ...prev, nodes: { ...prev.nodes, [nodeId]: { ...node, props: { ...node.props, ...props } } } }, `Edit ${node.componentName}`);
    });
  }, [setCanvas]);

  const updateNodeVisual = useCallback((nodeId: string, visual: Partial<import("../types/canvas").VisualProps>) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      const merged = { ...node.visual, ...visual };
      if (visual.padding) merged.padding = { ...node.visual.padding, ...visual.padding };
      if (visual.margin) merged.margin = { ...node.visual.margin, ...visual.margin };
      if (visual.background) merged.background = { ...node.visual.background, ...visual.background };
      if (visual.border) merged.border = { ...node.visual.border, ...visual.border };
      if (visual.typography) merged.typography = { ...node.visual.typography, ...visual.typography };
      if (visual.effects) merged.effects = { ...node.visual.effects, ...visual.effects };
      if (visual.hover) merged.hover = { ...node.visual.hover, ...visual.hover };
      if (visual.focus) merged.focus = { ...node.visual.focus, ...visual.focus };
      if (visual.darkMode) merged.darkMode = { ...node.visual.darkMode, ...visual.darkMode };
      return pushHistory({ ...prev, nodes: { ...prev.nodes, [nodeId]: { ...node, visual: merged } } }, `Style ${node.componentName}`);
    });
  }, [setCanvas]);

  const updateNodeResponsive = useCallback((nodeId: string, breakpoint: ResponsiveBreakpoint, patch: Partial<import("../types/canvas").VisualProps>) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      const responsive = { ...(node.responsive ?? {}) };
      responsive[breakpoint] = { ...(responsive[breakpoint] ?? {}), ...patch };
      return pushHistory({ ...prev, nodes: { ...prev.nodes, [nodeId]: { ...node, responsive } } }, `Responsive ${breakpoint}`);
    });
  }, [setCanvas]);

  const updateNodePosition = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node || node.locked) return prev;
      return { ...prev, nodes: { ...prev.nodes, [nodeId]: { ...node, position: { x: snapToGrid(position.x), y: snapToGrid(position.y) } } } };
    });
  }, [snapToGrid, setCanvas]);

  const updateNodeSize = useCallback((nodeId: string, size: { width: number; height: number }) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node || node.locked) return prev;
      return { ...prev, nodes: { ...prev.nodes, [nodeId]: { ...node, size: { width: Math.max(20, size.width), height: Math.max(20, size.height) } } } };
    });
  }, [setCanvas]);

  const removeNode = useCallback((nodeId: string) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      const nodes = { ...prev.nodes };
      delete nodes[nodeId];
      return pushHistory({ ...prev, nodes, selection: { ...prev.selection, selectedIds: prev.selection.selectedIds.filter((id) => id !== nodeId) } }, `Delete ${node.componentName}`);
    });
  }, [setCanvas]);

  const duplicateNode = useCallback((nodeId: string) => {
    setCanvas((prev) => {
      const original = prev.nodes[nodeId];
      if (!original) return prev;
      const id = nextNodeId();
      const dup: CanvasNode = { ...original, id, position: { x: original.position.x + 20, y: original.position.y + 20 }, props: { ...original.props }, zIndex: Object.keys(prev.nodes).length };
      return pushHistory({ ...prev, nodes: { ...prev.nodes, [id]: dup }, selection: { ...prev.selection, selectedIds: [id] } }, `Duplicate ${original.componentName}`);
    });
  }, [setCanvas]);

  const renameNode = useCallback((nodeId: string, name: string) => {
    setCanvas((prev) => {
      const node = prev.nodes[nodeId];
      if (!node) return prev;
      return pushHistory({ ...prev, nodes: { ...prev.nodes, [nodeId]: { ...node, componentName: name } } }, `Rename to ${name}`);
    });
  }, [setCanvas]);

  const reorderNodes = useCallback((sourceId: string, targetId: string, position: "before" | "after" | "inside") => {
    setCanvas((prev) => {
      const source = prev.nodes[sourceId];
      const target = prev.nodes[targetId];
      if (!source || !target) return prev;
      const nodes = { ...prev.nodes };
      if (position === "inside") {
        if (source.parentId) { const p = nodes[source.parentId]; if (p) nodes[source.parentId] = { ...p, children: p.children.filter((id) => id !== sourceId) }; }
        nodes[targetId] = { ...target, children: [...target.children, sourceId] };
        nodes[sourceId] = { ...source, parentId: targetId };
      } else {
        if (source.parentId) { const p = nodes[source.parentId]; if (p) nodes[source.parentId] = { ...p, children: p.children.filter((id) => id !== sourceId) }; }
        const pid = target.parentId;
        if (pid) {
          const parent = nodes[pid];
          if (parent) { const idx = parent.children.indexOf(targetId); const c = [...parent.children.filter((id) => id !== sourceId)]; c.splice(position === "before" ? idx : idx + 1, 0, sourceId); nodes[pid] = { ...parent, children: c }; }
          nodes[sourceId] = { ...source, parentId: pid };
        } else {
          nodes[sourceId] = { ...source, parentId: null };
        }
      }
      return pushHistory({ ...prev, nodes }, `Reorder ${source.componentName}`);
    });
  }, [setCanvas]);

  const selectNode = useCallback((nodeId: string, multi = false) => {
    setCanvas((prev) => ({
      ...prev,
      selection: { ...prev.selection, selectedIds: multi ? (prev.selection.selectedIds.includes(nodeId) ? prev.selection.selectedIds.filter((id) => id !== nodeId) : [...prev.selection.selectedIds, nodeId]) : [nodeId] },
    }));
  }, [setCanvas]);

  const clearSelection = useCallback(() => setCanvas((prev) => ({ ...prev, selection: { ...prev.selection, selectedIds: [], marquee: null } })), [setCanvas]);
  const bringForward = useCallback((nodeId: string) => setCanvas((prev) => { const n = prev.nodes[nodeId]; if (!n) return prev; return { ...prev, nodes: { ...prev.nodes, [nodeId]: { ...n, zIndex: Math.max(...Object.values(prev.nodes).map((x) => x.zIndex), 0) + 1 } } }; }), [setCanvas]);
  const sendBackward = useCallback((nodeId: string) => setCanvas((prev) => { const n = prev.nodes[nodeId]; if (!n) return prev; return { ...prev, nodes: { ...prev.nodes, [nodeId]: { ...n, zIndex: Math.min(...Object.values(prev.nodes).map((x) => x.zIndex), 0) - 1 } } }; }), [setCanvas]);
  const lockNode = useCallback((nodeId: string) => setCanvas((prev) => { const n = prev.nodes[nodeId]; if (!n) return prev; return { ...prev, nodes: { ...prev.nodes, [nodeId]: { ...n, locked: !n.locked } } }; }), [setCanvas]);
  const toggleVisibility = useCallback((nodeId: string) => setCanvas((prev) => { const n = prev.nodes[nodeId]; if (!n) return prev; return { ...prev, nodes: { ...prev.nodes, [nodeId]: { ...n, visible: !n.visible } } }; }), [setCanvas]);

  const alignNodes = useCallback((action: string) => {
    setCanvas((prev) => {
      const ids = prev.selection.selectedIds;
      if (ids.length < 2) return prev;
      const ns = ids.map((id) => prev.nodes[id]).filter(Boolean);
      const minX = Math.min(...ns.map((n) => n.position.x));
      const maxX = Math.max(...ns.map((n) => n.position.x + n.size.width));
      const minY = Math.min(...ns.map((n) => n.position.y));
      const maxY = Math.max(...ns.map((n) => n.position.y + n.size.height));
      const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
      const u = { ...prev.nodes };
      for (const id of ids) { const n = u[id]; if (!n) continue; let p = { ...n.position }; if (action === "left") p.x = minX; else if (action === "right") p.x = maxX - n.size.width; else if (action === "center-h") p.x = cx - n.size.width / 2; else if (action === "top") p.y = minY; else if (action === "bottom") p.y = maxY - n.size.height; else if (action === "center-v") p.y = cy - n.size.height / 2; u[id] = { ...n, position: p }; }
      return pushHistory({ ...prev, nodes: u }, "Align nodes");
    });
  }, [setCanvas]);

  const undo = useCallback(() => setCanvas((prev) => { if (prev.historyIndex <= 0) return prev; const e = prev.history[prev.historyIndex - 1]; return { ...prev, nodes: { ...e.nodes }, historyIndex: prev.historyIndex - 1 }; }), [setCanvas]);
  const redo = useCallback(() => setCanvas((prev) => { if (prev.historyIndex >= prev.history.length - 1) return prev; const e = prev.history[prev.historyIndex + 1]; return { ...prev, nodes: { ...e.nodes }, historyIndex: prev.historyIndex + 1 }; }), [setCanvas]);
  const loadTemplate = useCallback((t: Record<string, CanvasNode>) => setCanvas((p) => pushHistory({ ...p, nodes: { ...t }, selection: { selectedIds: [], marquee: null } }, "Load template")), [setCanvas]);
  const clearCanvas = useCallback(() => setCanvas((p) => pushHistory({ ...p, nodes: {}, selection: { selectedIds: [], marquee: null } }, "Clear canvas")), [setCanvas]);
  const setViewport = useCallback((patch: Partial<ViewportState>) => setCanvas((p) => ({ ...p, viewport: { ...p.viewport, ...patch } })), [setCanvas]);
  const setPanel = useCallback((patch: Partial<PanelState>) => setPanelState((p) => ({ ...p, ...patch })), [setPanelState]);
  const setSettings = useCallback((patch: Partial<StudioSettings>) => setSettingsState((p) => ({ ...p, ...patch })), [setSettingsState]);
  const toggleGrid = useCallback(() => setCanvas((p) => ({ ...p, showGrid: !p.showGrid, gridSnap: !p.gridSnap })), [setCanvas]);
  const toggleOutlines = useCallback(() => setCanvas((p) => ({ ...p, showOutlines: !p.showOutlines })), [setCanvas]);
  const setResponsiveMode = useCallback((mode: ResponsiveBreakpoint | null) => setCanvas((p) => ({ ...p, viewport: { ...p.viewport, responsiveMode: mode } })), [setCanvas]);
  const addFavorite = useCallback((c: string) => setFavorites((p) => p.some((f) => f.componentName === c) ? p : [...p, { id: `fav_${Date.now()}`, componentName: c, addedAt: Date.now() }]), [setFavorites]);
  const removeFavorite = useCallback((id: string) => setFavorites((p) => p.filter((f) => f.id !== id)), [setFavorites]);
  const addRecent = useCallback((c: string) => setRecentItems((p) => [...p, { id: `rec_${Date.now()}`, componentName: c, usedAt: Date.now() }].slice(-20)), [setRecentItems]);
  const exportCode = useCallback(() => generateCode(canvas.nodes).fullFile, [canvas.nodes]);
  const copyCodeToClipboard = useCallback(async () => { await navigator.clipboard.writeText(exportCode()); }, [exportCode]);
  const downloadComponent = useCallback(() => { const c = exportCode(); const b = new Blob([c], { type: "text/typescript" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "DesignedComponent.tsx"; a.click(); URL.revokeObjectURL(u); }, [exportCode]);

  return {
    addNode, addNodeToParent, updateNodeProps, updateNodeVisual, updateNodeResponsive,
    updateNodePosition, updateNodeSize, removeNode, duplicateNode, renameNode, reorderNodes,
    selectNode, clearSelection, bringForward, sendBackward, lockNode, toggleVisibility,
    alignNodes, undo, redo, loadTemplate, clearCanvas,
    setViewport, setPanel, setSettings, toggleGrid, toggleOutlines, setResponsiveMode,
    addFavorite, removeFavorite, addRecent, exportCode, copyCodeToClipboard, downloadComponent,
  };
}
