import type { ReactNode, HTMLAttributes } from "react";

export type ItemVariant = "default" | "selected" | "disabled";

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: ItemVariant;
  icon?: ReactNode;
  inset?: boolean;
  textValue?: string;
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
}
