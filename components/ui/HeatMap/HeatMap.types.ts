export interface HeatMapProps {
  data: number[][];
  rowLabels?: string[];
  columnLabels?: string[];
  colorScale?: (value: number) => string;
  label?: string;
  className?: string;
}

export interface HeatMapCellProps {
  value: number;
  row: number;
  col: number;
  rowLabel?: string;
  colLabel?: string;
  colorScale?: (value: number) => string;
  onHover?: (cell: { row: number; col: number } | null) => void;
  isHovered?: boolean;
}

export interface HeatMapLegendProps {
  colorScale?: (value: number) => string;
  min?: number;
  max?: number;
  steps?: number;
  className?: string;
}
