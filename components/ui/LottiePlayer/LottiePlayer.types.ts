import type { ReactNode } from "react";

export interface LottiePlayerProps {
  animation?: ReactNode;
  playing?: boolean;
  loop?: boolean;
  speed?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onLoop?: () => void;
  className?: string;
}
