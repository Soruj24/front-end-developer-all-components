import type { ReactNode } from "react";

export interface InfiniteScrollProps {
  children: ReactNode;
  loadMore: () => void;
  loading?: boolean;
  hasMore?: boolean;
  endMessage?: ReactNode;
  loader?: ReactNode;
  threshold?: number;
  className?: string;
}
