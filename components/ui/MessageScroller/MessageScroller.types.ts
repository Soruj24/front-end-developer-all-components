export interface MessageItem {
  id: string;
  content: string;
  timestamp?: string;
}

export interface MessageScrollerProps {
  messages: MessageItem[];
  autoScroll?: boolean;
  className?: string;
}
