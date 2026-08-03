import type { ReactNode } from "react";

export interface InputGroupProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  className?: string;
  children: ReactNode;
}
