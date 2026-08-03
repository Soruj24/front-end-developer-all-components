"use client";

import { useRef, useState, type DragEvent } from "react";
import { cn } from "@/lib/cn";
import type { UploadProps, UploadDropzoneProps } from "./Upload.types";

export function Upload({ accept, multiple = false, maxSize: _maxSize, onUpload, children, className }: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    onUpload?.(files);
  }

  return (
    <div className={cn("inline-flex", className)}>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} className="hidden" />
      <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        {children ?? "Choose files"}
      </button>
    </div>
  );
}

export function UploadDropzone({ accept, multiple = false, maxSize: _maxSize, onDrop, className }: UploadDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onDrop?.(files);
  }

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    onDrop?.(files);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={cn("flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors", dragging ? "border-primary bg-primary/5" : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700", className)}
    >
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} className="hidden" />
      <svg className="mb-2 h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Drag files here or click to browse</p>
    </div>
  );
}
