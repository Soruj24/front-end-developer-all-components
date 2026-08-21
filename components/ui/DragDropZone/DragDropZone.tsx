"use client";

import { useState, useRef, useCallback, type DragEvent, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface DragDropZoneProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onDrop?: (files: File[]) => void;
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
}

export function DragDropZone({
  onDrop,
  onChange,
  accept,
  multiple = true,
  maxSize,
  disabled = false,
  className,
  children,
  ...props
}: DragDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      let accepted = Array.from(fileList);
      if (accept) {
        const types = accept.split(",").map((t) => t.trim());
        accepted = accepted.filter((f) =>
          types.some((t) => f.type === t || f.name.endsWith(t.replace("*", "")))
        );
      }
      if (maxSize) accepted = accepted.filter((f) => f.size <= maxSize);
      if (!multiple) accepted = accepted.slice(0, 1);
      if (accepted.length) {
        onDrop?.(accepted);
        onChange?.(accepted);
      }
    },
    [accept, maxSize, multiple, onDrop, onChange],
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (!disabled) processFiles(e.dataTransfer.files);
    },
    [disabled, processFiles],
  );

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label="Upload files by dropping or clicking"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-all duration-200",
        "hover:border-primary/50 hover:bg-primary/5",
        isDragOver
          ? "border-primary bg-primary/10 scale-[1.01]"
          : "border-border bg-card",
        disabled && "cursor-not-allowed opacity-50 hover:border-border hover:bg-card",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
        {...props}
      />
      {children}
    </div>
  );
}

export interface DragDropZoneIconProps {
  isDragOver?: boolean;
  className?: string;
}

export function DragDropZoneIcon({ isDragOver, className }: DragDropZoneIconProps) {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200",
        isDragOver
          ? "bg-primary/15 text-primary"
          : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
        className,
      )}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>
    </div>
  );
}

export interface DragDropZoneTextProps {
  isDragOver?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

export function DragDropZoneText({
  isDragOver,
  label = "Drop files here or click to upload",
  description,
  className,
}: DragDropZoneTextProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1 text-center", className)}>
      <p className="text-sm font-medium text-foreground">
        {isDragOver ? "Release to upload" : label}
      </p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export interface FileListProps {
  files: { name: string; size: string; type: string }[];
  onRemove?: (index: number) => void;
  className?: string;
}

export function FileList({ files, onRemove, className }: FileListProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {files.map((f, i) => (
        <div
          key={`${f.name}-${i}`}
          className="group/item flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 transition-colors hover:bg-muted/50"
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-sm">
            {f.type.startsWith("image")
              ? "\uD83D\uDDBC\uFE0F"
              : f.type.includes("pdf")
                ? "\uD83D\uDCC4"
                : "\uD83D\uDCCA"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{f.name}</p>
            <p className="text-xs text-muted-foreground">{f.size}</p>
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label={`Remove ${f.name}`}
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover/item:opacity-100"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
