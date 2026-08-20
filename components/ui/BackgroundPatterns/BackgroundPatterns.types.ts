export type PatternId =
  | "dots"
  | "grid"
  | "diagonal"
  | "waves"
  | "hexagons"
  | "triangles"
  | "circles"
  | "diamonds"
  | "stars"
  | "crosses"
  | "zigzag"
  | "checks"
  | "halftone"
  | "noise"
  | "circuit"
  | "plus";

export interface BackgroundPatternsProps {
  variant?: PatternId;
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}
