export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type NodeType = "component" | "container" | "text";

export type ResponsiveBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveOverride {
  sm?: Partial<VisualProps>;
  md?: Partial<VisualProps>;
  lg?: Partial<VisualProps>;
  xl?: Partial<VisualProps>;
  "2xl"?: Partial<VisualProps>;
}

export interface AnimationConfig {
  enter?: string;
  exit?: string;
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface SpacingValue {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BorderValue {
  width: number;
  color: string;
  style: string;
  radius: number;
  radiusTopLeft: number;
  radiusTopRight: number;
  radiusBottomLeft: number;
  radiusBottomRight: number;
}

export interface TypographyValue {
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  color: string;
  textAlign: string;
  lineHeight: number;
  letterSpacing: number;
  textTransform: string;
  textDecoration: string;
}

export interface BackgroundValue {
  color: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  gradientDirection: string;
}

export interface EffectValue {
  opacity: number;
  blur: number;
  shadow: string;
}

export interface HoverState {
  enabled: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  scale?: number;
  opacity?: number;
  shadow?: string;
  translateY?: number;
}

export interface FocusState {
  enabled: boolean;
  ringColor?: string;
  ringWidth?: number;
  ringOffset?: number;
}

export interface DarkModeOverrides {
  enabled: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export interface VisualProps {
  width: number | string;
  height: number | string;
  display: string;
  flexDirection: string;
  gap: number;
  padding: SpacingValue;
  margin: SpacingValue;
  background: BackgroundValue;
  border: BorderValue;
  typography: TypographyValue;
  effects: EffectValue;
  hover: HoverState;
  focus: FocusState;
  darkMode: DarkModeOverrides;
}

export interface CanvasNode {
  id: string;
  type: NodeType;
  componentName: string;
  position: Position;
  size: Size;
  parentId: string | null;
  children: string[];
  props: Record<string, unknown>;
  visual: VisualProps;
  zIndex: number;
  locked: boolean;
  visible: boolean;
  responsive?: ResponsiveOverride;
  animation?: AnimationConfig;
}

export interface CanvasEdge {
  id: string;
  source: string;
  target: string;
  type: "contain" | "sibling";
}

export interface DragState {
  isDragging: boolean;
  nodeId: string | null;
  offset: Position;
}

export interface ResizeState {
  isResizing: boolean;
  nodeId: string | null;
  handle: string | null;
  startSize: Size;
  startPos: Position;
}

export interface SelectionState {
  selectedIds: string[];
  marquee: MarqueeRect | null;
}

export interface MarqueeRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ViewportState {
  zoom: number;
  panX: number;
  panY: number;
  responsiveMode: ResponsiveBreakpoint | null;
}

export interface HistoryEntry {
  nodes: Record<string, CanvasNode>;
  timestamp: number;
  label: string;
}

export interface CanvasState {
  nodes: Record<string, CanvasNode>;
  edges: CanvasEdge[];
  drag: DragState;
  resize: ResizeState;
  selection: SelectionState;
  viewport: ViewportState;
  history: HistoryEntry[];
  historyIndex: number;
  gridSnap: boolean;
  showGrid: boolean;
  snapSize: number;
  showOutlines: boolean;
}
