import type { ReactNode, HTMLAttributes } from "react";

export type MessageVariant = "default" | "bubble";
export type MessagePosition = "sent" | "received";
export type MessageStatus = "sent" | "delivered" | "read";

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: MessageVariant;
  position?: MessagePosition;
  avatar?: ReactNode;
  author?: string;
  timestamp?: ReactNode;
  status?: MessageStatus;
}
