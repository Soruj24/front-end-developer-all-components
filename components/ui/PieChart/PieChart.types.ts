import type { ReactNode } from "react";

export interface PieChartData {
  /** Label for this segment. */
  label: string;
  /** Numeric value. */
  value: number;
  /** CSS color string for the segment. */
  color: string;
}

export interface PieChartProps {
  /** Data array for chart segments. */
  data: PieChartData[];
  /** Chart type: "pie" (solid) or "donut" (with center hole). */
  type?: "pie" | "donut";
  /** Chart size in pixels. */
  size?: number;
  /** Inner radius for donut type (0 for pie). */
  innerRadius?: number;
  /** Gap between segments in degrees. */
  gap?: number;
  /** Show the interactive legend. */
  showLegend?: boolean;
  /** Show percentage labels on segments. */
  showLabels?: boolean;
  /** Content to render in the center of a donut chart. */
  centerContent?: ReactNode;
  /** Called when a segment is clicked. */
  onSegmentClick?: (data: PieChartData, index: number) => void;
  /** Called when a segment is hovered. */
  onSegmentHover?: (data: PieChartData | null, index: number | null) => void;
  /** Additional CSS classes for the container. */
  className?: string;
}
