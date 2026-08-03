export type MessageVariant = "info" | "success" | "warning" | "error";

export interface MessageProps {
  variant?: MessageVariant;
  title?: string;
  description?: string;
  className?: string;
}
