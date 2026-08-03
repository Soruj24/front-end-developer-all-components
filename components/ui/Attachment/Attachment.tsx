"use client";

import { cn } from "@/lib/cn";
import type { AttachmentProps } from "./Attachment.types";

function formatSize(bytes?: number): string {
  if (bytes === undefined) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type?: string): string {
  if (!type) return "📄";
  if (type.startsWith("image/")) return "🖼️";
  if (type.includes("pdf")) return "📕";
  if (type.includes("zip") || type.includes("archive")) return "📦";
  if (type.includes("video")) return "🎬";
  if (type.includes("audio")) return "🎵";
  return "📄";
}

export function Attachment({
  name,
  size,
  type,
  url,
  onRemove,
  className,
}: AttachmentProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border bg-zinc-50 px-3 py-2 dark:bg-zinc-800",
        className
      )}
    >
      <span className="text-xl">{getFileIcon(type)}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        {size !== undefined && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {formatSize(size)}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1">
        {url && (
          <a
            href={url}
            download
            className="rounded p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700"
            aria-label={`Download ${name}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="rounded p-1 text-zinc-500 hover:bg-red-100 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-900/30"
            aria-label={`Remove ${name}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
