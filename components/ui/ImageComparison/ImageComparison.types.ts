import type { ReactNode } from "react";

export interface ImageComparisonProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent?: ReactNode;
  afterContent?: ReactNode;
  initialPosition?: number;
  height?: number;
  showLabels?: boolean;
  onPositionChange?: (position: number) => void;
  className?: string;
}
