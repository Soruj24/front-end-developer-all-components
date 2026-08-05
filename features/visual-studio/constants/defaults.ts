import type { PanelState, StudioSettings } from "../types";
import type { CanvasState, VisualProps } from "../types/canvas";

export const DEFAULT_VISUAL_PROPS: VisualProps = {
  width: "auto",
  height: "auto",
  display: "block",
  flexDirection: "col",
  gap: 0,
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  background: { color: "", gradientFrom: "", gradientVia: "", gradientTo: "", gradientDirection: "to-r" },
  border: { width: 0, color: "#e5e7eb", style: "solid", radius: 0, radiusTopLeft: 0, radiusTopRight: 0, radiusBottomLeft: 0, radiusBottomRight: 0 },
  typography: { fontSize: 16, fontWeight: "400", fontFamily: "sans", color: "", textAlign: "left", lineHeight: 1.5, letterSpacing: 0, textTransform: "none", textDecoration: "none" },
  effects: { opacity: 100, blur: 0, shadow: "none" },
  hover: { enabled: false },
  focus: { enabled: false, ringColor: "#6366f1", ringWidth: 2, ringOffset: 2 },
  darkMode: { enabled: false },
};

export const DEFAULT_PANEL_STATE: PanelState = {
  leftOpen: true,
  leftWidth: 280,
  rightOpen: true,
  rightWidth: 320,
  bottomOpen: true,
  bottomHeight: 280,
  bottomTab: "code",
  leftTab: "components",
};

export const DEFAULT_STUDIO_SETTINGS: StudioSettings = {
  darkMode: false,
  snapToGrid: true,
  showOutlines: true,
  responsiveBreakpoint: "lg",
  autoGenerate: true,
};

export const DEFAULT_CANVAS: CanvasState = {
  nodes: {},
  edges: [],
  drag: { isDragging: false, nodeId: null, offset: { x: 0, y: 0 } },
  resize: { isResizing: false, nodeId: null, handle: null, startSize: { width: 0, height: 0 }, startPos: { x: 0, y: 0 } },
  selection: { selectedIds: [], marquee: null },
  viewport: { zoom: 1, panX: 0, panY: 0, responsiveMode: null },
  history: [],
  historyIndex: -1,
  gridSnap: true,
  showGrid: true,
  snapSize: 8,
  showOutlines: true,
};

export const GRID_SNAP_SIZE = 8;
export const MIN_CANVAS_ZOOM = 0.1;
export const MAX_CANVAS_ZOOM = 3;
export const ZOOM_STEP = 0.1;

export const MIN_NODE_SIZE = 20;
export const MAX_NODE_SIZE = 2000;

export const DEVICE_PRESETS = [
  { id: "desktop", label: "Desktop", width: 1440, height: 900, icon: "Monitor" },
  { id: "laptop", label: "Laptop", width: 1280, height: 800, icon: "Laptop" },
  { id: "tablet", label: "Tablet", width: 768, height: 1024, icon: "Tablet" },
  { id: "mobile", label: "Mobile", width: 375, height: 812, icon: "Smartphone" },
] as const;

export const CANVAS_SIZES = [
  { id: "free", label: "Free Canvas", width: 1200, height: 800 },
  { id: "phone", label: "Phone (375)", width: 375, height: 812 },
  { id: "tablet", label: "Tablet (768)", width: 768, height: 1024 },
  { id: "desktop", label: "Desktop (1440)", width: 1440, height: 900 },
] as const;

export const SHADOW_PRESETS = [
  { id: "none", label: "None", value: "none" },
  { id: "xs", label: "XS", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  { id: "sm", label: "SM", value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" },
  { id: "md", label: "MD", value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
  { id: "lg", label: "LG", value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
  { id: "xl", label: "XL", value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
  { id: "2xl", label: "2XL", value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
] as const;

export const COLOR_PRESETS = [
  "#000000", "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#f3f4f6", "#ffffff",
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981",
  "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7",
  "#d946ef", "#ec4899", "#f43f5e",
];

export const ANIMATION_PRESETS = [
  { id: "none", label: "None", value: "" },
  { id: "fade-in", label: "Fade In", value: "animate-fade-in" },
  { id: "fade-in-up", label: "Fade In Up", value: "animate-fade-in-up" },
  { id: "fade-in-down", label: "Fade In Down", value: "animate-fade-in-down" },
  { id: "scale-in", label: "Scale In", value: "animate-scale-in" },
  { id: "slide-in-left", label: "Slide In Left", value: "animate-slide-in-left" },
  { id: "slide-in-right", label: "Slide In Right", value: "animate-slide-in-right" },
  { id: "pop", label: "Pop", value: "animate-pop" },
  { id: "shimmer", label: "Shimmer", value: "animate-shimmer" },
] as const;

export const DURATION_PRESETS = [
  { id: "fast", label: "Fast", value: 150 },
  { id: "base", label: "Base", value: 200 },
  { id: "slow", label: "Slow", value: 400 },
  { id: "slower", label: "Slower", value: 600 },
] as const;

export const EASING_PRESETS = [
  { id: "standard", label: "Standard", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { id: "in", label: "Ease In", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { id: "out", label: "Ease Out", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { id: "in-out", label: "Ease In-Out", value: "cubic-bezier(0.65, 0, 0.35, 1)" },
  { id: "spring", label: "Spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
] as const;

export const RESPONSIVE_BREAKPOINTS = [
  { id: "sm", label: "Small", maxWidth: 640 },
  { id: "md", label: "Medium", maxWidth: 768 },
  { id: "lg", label: "Large", maxWidth: 1024 },
  { id: "xl", label: "XL", maxWidth: 1280 },
  { id: "2xl", label: "2XL", maxWidth: 1536 },
] as const;

export const ALIGNMENT_OPTIONS = [
  { id: "left", label: "Align Left", icon: "⬅", action: "left" as const },
  { id: "center-h", label: "Center Horizontally", icon: "↔", action: "center-h" as const },
  { id: "right", label: "Align Right", icon: "➡", action: "right" as const },
  { id: "top", label: "Align Top", icon: "⬆", action: "top" as const },
  { id: "center-v", label: "Center Vertically", icon: "↕", action: "center-v" as const },
  { id: "bottom", label: "Align Bottom", icon: "⬇", action: "bottom" as const },
] as const;

export const KEYBOARD_SHORTCUTS = [
  { key: "Ctrl+Z", action: "Undo" },
  { key: "Ctrl+Y", action: "Redo" },
  { key: "Ctrl+D", action: "Duplicate" },
  { key: "Ctrl+A", action: "Select All" },
  { key: "Delete", action: "Delete Selected" },
  { key: "Ctrl+E", action: "Export" },
  { key: "Ctrl+G", action: "Toggle Grid" },
  { key: "Ctrl++", action: "Zoom In" },
  { key: "Ctrl+-", action: "Zoom Out" },
  { key: "Ctrl+0", action: "Reset Zoom" },
] as const;

export const FONT_FAMILY_OPTIONS = [
  { value: "sans", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Monospace" },
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Menlo, monospace", label: "Menlo" },
];

export const FONT_WEIGHT_OPTIONS = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extra Bold" },
  { value: "900", label: "Black" },
];

export const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
  { value: "justify", label: "Justify" },
];

export const TEXT_TRANSFORM_OPTIONS = [
  { value: "none", label: "None" },
  { value: "uppercase", label: "UPPERCASE" },
  { value: "lowercase", label: "lowercase" },
  { value: "capitalize", label: "Capitalize" },
];

export const DISPLAY_OPTIONS = [
  { value: "block", label: "Block" },
  { value: "flex", label: "Flex" },
  { value: "grid", label: "Grid" },
  { value: "inline-block", label: "Inline Block" },
  { value: "inline-flex", label: "Inline Flex" },
  { value: "hidden", label: "Hidden" },
];

export const FLEX_DIRECTION_OPTIONS = [
  { value: "row", label: "Row" },
  { value: "col", label: "Column" },
  { value: "row-reverse", label: "Row Reverse" },
  { value: "col-reverse", label: "Column Reverse" },
];

export const GRADIENT_DIRECTION_OPTIONS = [
  { value: "to-r", label: "Right" },
  { value: "to-l", label: "Left" },
  { value: "to-t", label: "Top" },
  { value: "to-b", label: "Bottom" },
  { value: "to-tr", label: "Top Right" },
  { value: "to-bl", label: "Bottom Left" },
];

export const ICON_PRESETS = [
  "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown",
  "ChevronRight", "ChevronLeft", "ChevronUp", "ChevronDown",
  "Check", "X", "Plus", "Minus",
  "Search", "Settings", "User", "Heart",
  "Star", "Eye", "EyeOff", "Lock", "Unlock",
  "Home", "Bell", "Mail", "Phone",
  "Calendar", "Clock", "File", "Folder",
  "Image", "Video", "Music", "Download",
  "Upload", "Trash", "Edit", "Copy",
  "Share", "Link", "ExternalLink", "RefreshCw",
  "Loader", "AlertCircle", "Info", "CheckCircle",
];
