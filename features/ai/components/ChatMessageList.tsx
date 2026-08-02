import type { AiMessage } from "../types";
import { ChatMessage } from "./ChatMessage";

export interface ChatMessageListProps {
  messages: AiMessage[];
  streamingMessageId?: string;
}

export function ChatMessageList({ messages, streamingMessageId }: ChatMessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Ask anything — the assistant will reply here.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          isStreaming={message.id === streamingMessageId}
        />
      ))}
    </div>
  );
}
