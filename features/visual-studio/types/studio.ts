export type PanelSide = "left" | "right";
export type BottomTab = "code" | "tree" | "warnings" | "accessibility" | "performance";
export type LeftTab = "components" | "templates" | "favorites" | "recent" | "ai";
export type ExportTab = "code" | "download" | "share";

export interface PanelState {
  leftOpen: boolean;
  leftWidth: number;
  rightOpen: boolean;
  rightWidth: number;
  bottomOpen: boolean;
  bottomHeight: number;
  bottomTab: BottomTab;
  leftTab: LeftTab;
}

export interface StudioSettings {
  darkMode: boolean;
  snapToGrid: boolean;
  showOutlines: boolean;
  responsiveBreakpoint: "sm" | "md" | "lg" | "xl" | "2xl";
  autoGenerate: boolean;
}

export interface ExportFormat {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  nodes: Record<string, unknown>;
  props: Record<string, unknown>;
  tags: string[];
  createdAt: number;
}

export interface FavoriteItem {
  id: string;
  componentName: string;
  addedAt: number;
}

export interface RecentItem {
  componentName: string;
  usedAt: number;
}

export interface AlignmentOption {
  id: string;
  label: string;
  icon: string;
  action: "left" | "center-h" | "right" | "top" | "center-v" | "bottom" | "distribute-h" | "distribute-v";
}

export interface PerformanceMetrics {
  nodeCount: number;
  maxDepth: number;
  totalTailwindClasses: number;
  estimatedBundleSize: string;
}
