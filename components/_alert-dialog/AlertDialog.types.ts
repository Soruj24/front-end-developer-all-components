import type { ReactNode } from "react";

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: "default" | "destructive";
  onCancel?: () => void;
  onConfirm?: () => void;
  disabled?: boolean;
  trigger?: ReactNode;
}
