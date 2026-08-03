import type { ReactNode } from "react";

export type AttachmentVariant = "default" | "outline" | "ghost";
export type AttachmentSize = "sm" | "md" | "lg";

export interface AttachmentProps {
  filename: string;
  size?: string;
  variant?: AttachmentVariant;
  sizeProp?: AttachmentSize;
  icon?: ReactNode;
  onRemove?: () => void;
  removable?: boolean;
  className?: string;
}
