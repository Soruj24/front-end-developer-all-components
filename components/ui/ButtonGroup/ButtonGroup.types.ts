export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps {
  className?: string;
  children: React.ReactNode;
  orientation?: ButtonGroupOrientation;
}
