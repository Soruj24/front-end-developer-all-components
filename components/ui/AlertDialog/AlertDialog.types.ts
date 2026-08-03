export type AlertDialogVariant = "default" | "destructive";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  variant?: AlertDialogVariant;
  className?: string;
}
