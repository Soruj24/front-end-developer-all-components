import type { ReactNode } from "react";

export interface ComparisonColumn {
  /** Column identifier. */
  title: string;
  /** Custom header content (overrides title). */
  header?: ReactNode;
  /** Whether the column is highlighted. */
  highlighted?: boolean;
}

export interface ComparisonRow {
  /** Row label. */
  label: string;
  /** Values for each column. */
  values: ReactNode[];
}

export interface ComparisonTableProps {
  /** Column definitions. */
  columns: ComparisonColumn[];
  /** Row data. Each row has a label and values matching column count. */
  rows: ComparisonRow[];
  /** Index of the currently highlighted column (-1 for none). */
  highlightedColumn?: number;
  /** Called when a column header is clicked. */
  onColumnSelect?: (index: number) => void;
  /** Whether to show alternating row backgrounds. */
  striped?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Show compact layout. */
  compact?: boolean;
}

export interface ComparisonCardsProps {
  /** Plan data. */
  plans: {
    name: string;
    price: string;
    period?: string;
    highlighted?: boolean;
    badge?: string;
    features: { label: string; value: string | boolean }[];
    cta?: string;
  }[];
  /** Called when a CTA button is clicked. */
  onCtaClick?: (planName: string) => void;
  /** Additional CSS classes. */
  className?: string;
}
