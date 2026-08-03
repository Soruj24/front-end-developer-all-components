import * as React from "react";
import { cn } from "@/lib/cn";
import type { MessageProps } from "./Message.types";
import { MESSAGE_STYLES } from "./Message.constants";

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "read") return <span className="text-xs">✓✓</span>;
  if (status === "delivered") return <span className="text-xs">✓✓</span>;
  return <span className="text-xs">✓</span>;
};

export function Message({ children, variant = "default", position = "received", avatar, author, timestamp, status, className, ...props }: MessageProps) {
  const isBubble = variant === "bubble";

  return (
    <div className={cn(MESSAGE_STYLES.base, MESSAGE_STYLES[position], isBubble && MESSAGE_STYLES.bubble, className)} {...props}>
      {avatar && <div className={cn(MESSAGE_STYLES.avatar)}>{avatar}</div>}
      <div className="flex flex-col">
        <div className={cn(
          MESSAGE_STYLES.content,
          position === "sent" ? MESSAGE_STYLES.sentContent : MESSAGE_STYLES.receivedContent,
          isBubble && "rounded-full",
        )}>
          {children}
        </div>
        {(author || timestamp || status) && (
          <div className={cn(MESSAGE_STYLES.meta, "flex items-center gap-2")}>
            {author && <span>{author}</span>}
            {timestamp && <span>{timestamp}</span>}
            {status && <StatusIcon status={status} />}
          </div>
        )}
      </div>
    </div>
  );
}
