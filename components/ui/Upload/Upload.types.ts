import type { ReactNode } from "react";

export interface UploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onUpload?: (files: File[]) => void;
  children?: ReactNode;
  className?: string;
}

export interface UploadDropzoneProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onDrop?: (files: File[]) => void;
  className?: string;
}
