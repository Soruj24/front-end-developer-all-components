import type { ReactNode } from "react";

export interface ScrollspyNavItem {
  /** Section ID to track. */
  id: string;
  /** Display label. */
  label: string;
  /** Optional icon. */
  icon?: ReactNode;
}

export interface ScrollspyProps {
  /** Navigation items to track. */
  items: ScrollspyNavItem[];
  /** Offset from top of viewport (px) to trigger active state. */
  offset?: number;
  /** Show a progress bar. */
  showProgress?: boolean;
  /** Called when the active section changes. */
  onSectionChange?: (id: string) => void;
  /** Layout variant. */
  variant?: "sidebar" | "dots" | "pills";
  /** Additional CSS classes. */
  className?: string;
}

export interface ScrollspyProgressProps {
  /** Current scroll percentage (0–100). */
  progress: number;
  /** Additional CSS classes. */
  className?: string;
}

export interface ScrollspyBackToTopProps {
  /** Show the button only after scrolling past this threshold (px). */
  threshold?: number;
  /** Additional CSS classes. */
  className?: string;
}
