"use client";

import { useState, useCallback } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  DragDropZone,
  DragDropZoneIcon,
  DragDropZoneText,
  FileList,
} from "@/components/ui/DragDropZone";

const DRAG_DROP_SOURCE = `"use client";

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

export function DragDropZone({ onDrop, onChange, accept, multiple = true, maxSize, disabled = false, className, children, ...props }: DragDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const processFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    let accepted = Array.from(fileList);
    if (accept) { const types = accept.split(",").map((t) => t.trim()); accepted = accepted.filter((f) => types.some((t) => f.type === t || f.name.endsWith(t.replace("*", "")))); }
    if (maxSize) accepted = accepted.filter((f) => f.size <= maxSize);
    if (!multiple) accepted = accepted.slice(0, 1);
    if (accepted.length) { onDrop?.(accepted); onChange?.(accepted); }
  }, [accept, maxSize, multiple, onDrop, onChange]);

  return (
    <div role="button" tabIndex={disabled ? -1 : 0} aria-disabled={disabled} aria-label="Upload files by dropping or clicking"
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); !disabled && inputRef.current?.click(); } }}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); !disabled && setIsDragOver(true); }}
      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); }}
      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); !disabled && processFiles(e.dataTransfer.files); }}
      className={cn("group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-all duration-200",
        "hover:border-primary/50 hover:bg-primary/5",
        isDragOver ? "border-primary bg-primary/10 scale-[1.01]" : "border-border bg-card",
        disabled && "cursor-not-allowed opacity-50 hover:border-border hover:bg-card", className)}>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => { processFiles(e.target.files); e.target.value = ""; }} disabled={disabled} className="sr-only" tabIndex={-1} {...props} />
      {children}
    </div>
  );
}

export function DragDropZoneIcon({ isDragOver, className }: { isDragOver?: boolean; className?: string }) {
  return (
    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200",
      isDragOver ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary", className)}>
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>
    </div>
  );
}

export function DragDropZoneText({ isDragOver, label = "Drop files here or click to upload", description, className }: { isDragOver?: boolean; label?: string; description?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1 text-center", className)}>
      <p className="text-sm font-medium text-foreground">{isDragOver ? "Release to upload" : label}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}

export function FileList({ files, onRemove, className }: { files: { name: string; size: string; type: string }[]; onRemove?: (index: number) => void; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {files.map((f, i) => (
        <div key={\`\${f.name}-\${i}\`} className="group/item flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 transition-colors hover:bg-muted/50">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-sm">{f.type.startsWith("image") ? "\uD83D\uDDBC\uFE0F" : f.type.includes("pdf") ? "\uD83D\uDCC4" : "\uD83D\uDCCA"}</div>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-foreground">{f.name}</p><p className="text-xs text-muted-foreground">{f.size}</p></div>
          {onRemove && <button type="button" onClick={() => onRemove(i)} aria-label={\`Remove \${f.name}\`} className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover/item:opacity-100"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>}
        </div>
      ))}
    </div>
  );
}`;

const MOCK_FILES = [
  { name: "photo.jpg", size: "2.4 MB", type: "image/jpeg" },
  { name: "document.pdf", size: "156 KB", type: "application/pdf" },
  { name: "data.csv", size: "890 KB", type: "text/csv" },
];

const BASIC_CODE = `import { DragDropZone, DragDropZoneIcon, DragDropZoneText } from "@/components/ui/DragDropZone";

<DragDropZone onDrop={(files) => console.log(files)}>
  <DragDropZoneIcon />
  <DragDropZoneText description="Supports images, PDFs, and CSV files" />
</DragDropZone>`;

const FILE_LIST_CODE = `import { DragDropZone, DragDropZoneIcon, DragDropZoneText, FileList } from "@/components/ui/DragDropZone";

function UploadWithList() {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <DragDropZone onDrop={(f) => setFiles((p) => [...p, ...f])}>
        <DragDropZoneIcon />
        <DragDropZoneText description="Supports images, PDFs, and CSV files" />
      </DragDropZone>
      <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, j) => j !== i))} />
    </div>
  );
}`;

const ACCEPT_CODE = `import { DragDropZone, DragDropZoneIcon, DragDropZoneText } from "@/components/ui/DragDropZone";

<DragDropZone accept="image/*" multiple={false}>
  <DragDropZoneIcon />
  <DragDropZoneText label="Drop an image" description="Only image files accepted" />
</DragDropZone>`;

const DISABLED_CODE = `import { DragDropZone, DragDropZoneIcon, DragDropZoneText } from "@/components/ui/DragDropZone";

<DragDropZone disabled>
  <DragDropZoneIcon />
  <DragDropZoneText label="Upload disabled" />
</DragDropZone>`;

const COMPACT_CODE = `import { DragDropZone, DragDropZoneIcon, DragDropZoneText } from "@/components/ui/DragDropZone";

<DragDropZone className="p-5">
  <DragDropZoneIcon className="h-10 w-10" />
  <DragDropZoneText label="Compact zone" />
</DragDropZone>`;

export default function DragDropZonePage() {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState(MOCK_FILES);

  const handleDrop = useCallback((dropped: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...dropped.map((f) => ({
        name: f.name,
        size: `${Math.round(f.size / 1024)} KB`,
        type: f.type,
      })),
    ]);
  }, []);

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  return (
    <ComponentDocPage
      name="Drag Drop Zone"
      category="Forms"
      description="A drag-and-drop file upload zone with file type validation, size limits, keyboard support, and composable sub-components for icon, text, and file list."
    >
      <PreviewPanel filename="drag-drop-preview.tsx">
        <div className="flex w-full flex-col gap-4">
          <DragDropZone onDrop={handleDrop}>
            <DragDropZoneIcon isDragOver={dragOver} />
            <DragDropZoneText
              isDragOver={dragOver}
              description="Supports images, PDFs, and CSV files"
            />
          </DragDropZone>
          {files.length > 0 && (
            <FileList files={files} onRemove={removeFile} />
          )}
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={DRAG_DROP_SOURCE}
        filename="components/ui/DragDropZone/DragDropZone.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Basic" description="A simple drop zone with icon and text." code={BASIC_CODE} filename="basic.tsx">
          <div className="w-full max-w-md">
            <DragDropZone onDrop={handleDrop}>
              <DragDropZoneIcon />
              <DragDropZoneText description="Supports images, PDFs, and CSV files" />
            </DragDropZone>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With File List" description="Show uploaded files with remove buttons." code={FILE_LIST_CODE} filename="file-list.tsx">
          <div className="flex w-full max-w-md flex-col gap-4">
            <DragDropZone onDrop={handleDrop}>
              <DragDropZoneIcon />
              <DragDropZoneText description="Supports images, PDFs, and CSV files" />
            </DragDropZone>
            <FileList files={files} onRemove={removeFile} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Accept Only Images" description="Restrict to image files only, single selection." code={ACCEPT_CODE} filename="accept.tsx">
          <div className="w-full max-w-md">
            <DragDropZone accept="image/*" multiple={false} onDrop={handleDrop}>
              <DragDropZoneIcon />
              <DragDropZoneText label="Drop an image" description="Only image files accepted" />
            </DragDropZone>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Disabled" description="Non-interactive drop zone with reduced opacity." code={DISABLED_CODE} filename="disabled.tsx">
          <div className="w-full max-w-md">
            <DragDropZone disabled>
              <DragDropZoneIcon />
              <DragDropZoneText label="Upload disabled" />
            </DragDropZone>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Compact" description="Smaller padding for tight layouts." code={COMPACT_CODE} filename="compact.tsx">
          <div className="w-full max-w-md">
            <DragDropZone className="p-5" onDrop={handleDrop}>
              <DragDropZoneIcon className="h-10 w-10" />
              <DragDropZoneText label="Compact zone" />
            </DragDropZone>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
