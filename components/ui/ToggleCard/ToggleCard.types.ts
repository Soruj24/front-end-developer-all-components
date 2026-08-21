import type { ReactNode } from "react";

export interface ToggleCardProps {
  /** Card title. */
  title: string;
  /** Optional description text. */
  description?: string;
  /** Optional icon displayed in the card. */
  icon?: ReactNode;
  /** Whether the toggle is on. */
  enabled?: boolean;
  /** Called when the toggle state changes. */
  onChange?: (enabled: boolean) => void;
  /** Disable the entire card. */
  disabled?: boolean;
  /** Additional CSS classes. */
  className?: string;
}
