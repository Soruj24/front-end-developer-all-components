import type { ReactNode } from "react";

export type StepStatus = "completed" | "current" | "upcoming";

export interface StepsProps {
  children: ReactNode;
  currentStep?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export interface StepProps {
  title: string;
  description?: string;
  status?: StepStatus;
  icon?: ReactNode;
  className?: string;
}

export interface StepIndicatorProps {
  status: StepStatus;
  icon?: ReactNode;
  className?: string;
}
