import type { ReactNode } from "react";

export interface VariantMatrixAxis {
  id: string;
  label: string;
  sublabel?: string;
}

export interface VariantMatrixCell {
  id: string;
  row: string;
  column: string;
  label?: string;
  preview: ReactNode;
  config: string;
  tags?: string[];
}

export interface VariantMatrixLegend {
  label: string;
  className?: string;
}

export interface VariantMatrixProps {
  rows: VariantMatrixAxis[];
  columns: VariantMatrixAxis[];
  cells: VariantMatrixCell[];
  title?: string;
  description?: string;
  className?: string;
  searchable?: boolean;
  filterable?: boolean;
  copyable?: boolean;
  emptyMessage?: string;
  legend?: VariantMatrixLegend[];
}
