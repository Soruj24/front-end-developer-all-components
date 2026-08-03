export type BubbleVariant = "sent" | "received";

export interface BubbleProps {
  message: string;
  sender?: string;
  timestamp?: string;
  variant?: BubbleVariant;
  avatar?: string;
  className?: string;
}
