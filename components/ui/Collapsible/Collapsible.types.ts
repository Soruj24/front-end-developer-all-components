export interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
