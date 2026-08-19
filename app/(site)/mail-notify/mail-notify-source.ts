export const MAIL_NOTIFY_SOURCE = `"use client";

import { Mail } from "lucide-react";

export interface MailCardProps {
  subject: string;
  preview: string;
  time?: string;
  read?: boolean;
  onRead?: () => void;
}

export function MailCard({ subject, preview, time = "now", read = false, onRead }: MailCardProps) {
  return (
    <div
      onClick={onRead}
      className={\`flex items-start gap-3 rounded-lg border p-4 transition-colors \${read ? "bg-muted/40" : "border-primary/40 bg-background"}\`}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Mail className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {!read && <span className="h-2 w-2 rounded-full bg-primary" />}
          <p className="truncate text-sm font-medium">{subject}</p>
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{preview}</p>
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">{time}</span>
    </div>
  );
}`;