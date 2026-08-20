"use client";

import { cn } from "@/lib/cn";
import type { AttachmentProps } from "./Attachment.types";
import {
  FileText,
  Image,
  FileArchive,
  Film,
  Music,
  File,
  Download,
  X,
  type LucideIcon,
} from "lucide-react";

function formatSize(bytes?: number): string {
  if (bytes === undefined) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ICON_MAP: Record<string, LucideIcon> = {
  image: Image,
  pdf: FileText,
  zip: FileArchive,
  archive: FileArchive,
  video: Film,
  audio: Music,
  msword: FileText,
  document: FileText,
  sheet: File,
  excel: File,
};

const COLOR_MAP: Record<string, string> = {
  image: "text-blue-500",
  pdf: "text-red-500",
  zip: "text-amber-500",
  archive: "text-amber-500",
  video: "text-purple-500",
  audio: "text-emerald-500",
  msword: "text-blue-600",
  document: "text-blue-600",
  sheet: "text-emerald-600",
  excel: "text-emerald-600",
};

const BG_MAP: Record<string, string> = {
  image: "bg-blue-500/10",
  pdf: "bg-red-500/10",
  zip: "bg-amber-500/10",
  archive: "bg-amber-500/10",
  video: "bg-purple-500/10",
  audio: "bg-emerald-500/10",
  msword: "bg-blue-500/10",
  document: "bg-blue-500/10",
  sheet: "bg-emerald-500/10",
  excel: "bg-emerald-500/10",
};

function matchType(type?: string): string {
  if (!type) return "";
  const lower = type.toLowerCase();
  for (const key of Object.keys(ICON_MAP)) {
    if (lower.includes(key)) return key;
  }
  if (lower.startsWith("image/")) return "image";
  return "";
}

export function Attachment({
  name,
  size,
  type,
  url,
  onRemove,
  className,
}: AttachmentProps) {
  const key = matchType(type);
  const IconComp = key ? ICON_MAP[key] : File;
  const iconColor = key ? COLOR_MAP[key] : "text-muted-foreground";
  const iconBg = key ? BG_MAP[key] : "bg-muted";

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5",
        "transition-colors duration-150 hover:bg-accent/50",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          iconBg,
        )}
      >
        <IconComp className={cn("h-4 w-4", iconColor)} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        {size !== undefined && (
          <p className="text-xs text-muted-foreground">{formatSize(size)}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        {url && (
          <a
            href={url}
            download
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground",
              "transition-colors duration-150 hover:bg-accent hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label={`Download ${name}`}
          >
            <Download className="h-3.5 w-3.5" />
          </a>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground",
              "transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-label={`Remove ${name}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
