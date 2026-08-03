import * as React from "react";
import { cn } from "@/lib/cn";
import type { AttachmentProps } from "./Attachment.types";
import { ATTACHMENT_STYLES } from "./Attachment.constants";

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </svg>
);

const RemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function Attachment({ filename, size, variant = "default", sizeProp = "md", icon, onRemove, removable = true, className }: AttachmentProps) {
  return (
    <div className={cn(ATTACHMENT_STYLES.base, ATTACHMENT_STYLES[sizeProp], ATTACHMENT_STYLES[variant], className)}>
      <span className="flex-shrink-0">{icon ?? <FileIcon />}</span>
      <div className="flex flex-col">
        <span className="font-medium">{filename}</span>
        {size && <span className="text-xs opacity-70">{size}</span>}
      </div>
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 rounded p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={`Remove ${filename}`}
        >
          <RemoveIcon />
        </button>
      )}
    </div>
  );
}
