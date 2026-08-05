"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CanvasNode, CanvasState, ResponsiveBreakpoint, ViewportState } from "../types/canvas";
import type { FavoriteItem, PanelState, PerformanceMetrics, RecentItem, StudioSettings } from "../types/studio";
import { DEFAULT_PANEL_STATE, DEFAULT_STUDIO_SETTINGS, DEFAULT_CANVAS, GRID_SNAP_SIZE } from "../constants/defaults";
import { generateCode, generateTailwindClasses, generateTypescriptTypes, generateDocumentation } from "../utils/codeGenerator";
import { buildTree, computeMetrics, type TreeNode } from "./studioHelpers";
import { useStudioActions } from "./useStudioActions";

export type { TreeNode };

interface StudioContextValue {
  canvas: CanvasState; panel: PanelState; settings: StudioSettings;
  generatedCode: string; generatedTailwind: string; generatedTypes: string; generatedDocs: string;
  componentTree: TreeNode[]; favorites: FavoriteItem[]; recentItems: RecentItem[]; performanceMetrics: PerformanceMetrics;
  addNode: (componentName: string, position: { x: number; y: number }) => string;
  addNodeToParent: (componentName: string, parentId: string) => string;
  updateNodeProps: (nodeId: string, props: Record<string, unknown>) => void;
  updateNodeVisual: (nodeId: string, visual: Partial<import("../types/canvas").VisualProps>) => void;
  updateNodeResponsive: (nodeId: string, breakpoint: ResponsiveBreakpoint, patch: Partial<import("../types/canvas").VisualProps>) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  updateNodeSize: (nodeId: string, size: { width: number; height: number }) => void;
  removeNode: (nodeId: string) => void; duplicateNode: (nodeId: string) => void;
  renameNode: (nodeId: string, name: string) => void;
  reorderNodes: (sourceId: string, targetId: string, position: "before" | "after" | "inside") => void;
  selectNode: (nodeId: string, multi?: boolean) => void; clearSelection: () => void;
  bringForward: (nodeId: string) => void; sendBackward: (nodeId: string) => void;
  lockNode: (nodeId: string) => void; toggleVisibility: (nodeId: string) => void;
  alignNodes: (action: string) => void; undo: () => void; redo: () => void;
  loadTemplate: (nodes: Record<string, CanvasNode>) => void; clearCanvas: () => void;
  setViewport: (patch: Partial<ViewportState>) => void; setPanel: (patch: Partial<PanelState>) => void;
  setSettings: (patch: Partial<StudioSettings>) => void; toggleGrid: () => void;
  toggleOutlines: () => void; setResponsiveMode: (mode: ResponsiveBreakpoint | null) => void;
  addFavorite: (componentName: string) => void; removeFavorite: (id: string) => void; addRecent: (componentName: string) => void;
  exportCode: () => string; copyCodeToClipboard: () => Promise<void>; downloadComponent: () => void;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used within StudioProvider");
  return ctx;
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const [canvas, setCanvas] = useState<CanvasState>(DEFAULT_CANVAS);
  const [panel, setPanelState] = useState<PanelState>(DEFAULT_PANEL_STATE);
  const [settings, setSettingsState] = useState<StudioSettings>(DEFAULT_STUDIO_SETTINGS);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  const snapToGrid = useCallback((val: number) => canvas.gridSnap ? Math.round(val / GRID_SNAP_SIZE) * GRID_SNAP_SIZE : val, [canvas.gridSnap]);

  const actions = useStudioActions({ canvas, setCanvas, setPanelState, setSettingsState, setFavorites, setRecentItems, snapToGrid });

  const generatedCode = useMemo(() => generateCode(canvas.nodes).fullFile, [canvas.nodes]);
  const generatedTailwind = useMemo(() => generateTailwindClasses(canvas.nodes), [canvas.nodes]);
  const generatedTypes = useMemo(() => generateTypescriptTypes(canvas.nodes), [canvas.nodes]);
  const generatedDocs = useMemo(() => generateDocumentation(canvas.nodes), [canvas.nodes]);
  const componentTree = useMemo(() => buildTree(canvas.nodes), [canvas.nodes]);
  const performanceMetrics = useMemo(() => computeMetrics(canvas.nodes), [canvas.nodes]);

  const value = useMemo<StudioContextValue>(() => ({
    canvas, panel, settings, generatedCode, generatedTailwind, generatedTypes,
    generatedDocs, componentTree, favorites, recentItems, performanceMetrics, ...actions,
  }), [canvas, panel, settings, generatedCode, generatedTailwind, generatedTypes,
    generatedDocs, componentTree, favorites, recentItems, performanceMetrics, actions]);

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}
