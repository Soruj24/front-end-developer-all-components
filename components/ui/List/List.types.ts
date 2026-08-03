import type { ReactNode } from "react";

export interface ListProps {
  children: ReactNode;
  ordered?: boolean;
  className?: string;
}

export interface ListItemProps {
  children: ReactNode;
  className?: string;
}

export interface ListIconProps {
  className?: string;
}
