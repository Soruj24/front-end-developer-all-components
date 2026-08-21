export type SkeletonListVariant = "simple" | "avatar" | "icon" | "card" | "notification";

export interface SkeletonListProps {
  /** Number of rows to render. */
  rows?: number;
  /** Visual variant. */
  variant?: SkeletonListVariant;
  /** Show a border around the container. */
  bordered?: boolean;
  /** Additional CSS classes. */
  className?: string;
}
