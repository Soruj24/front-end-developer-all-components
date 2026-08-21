"use client";

import { useState, useCallback } from "react";
import {
  FileUpload,
  FileUploadPreview,
  formatFileSize,
  type FileItem,
} from "@/components/ui/FileUpload";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const FILE_UPLOAD_SOURCE = `"use client";

import { useState, useRef, useCallback, type DragEvent, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onFiles?: (files: File[]) => void; onChange?: (files: File[]) => void; accept?: string; multiple?: boolean; maxSize?: number; disabled?: boolean; variant?: "dropzone" | "button";
}
export interface FileUploadPreviewProps { files: FileItem[]; onRemove?: (index: number) => void; className?: string; }
export interface FileItem { file: File; name: string; size: string; type: string; }
export function formatFileSize(bytes: number): string { if (bytes < 1024) return \`\${bytes} B\`; if (bytes < 1024 * 1024) return \`\${(bytes / 1024).toFixed(1)} KB\`; return \`\${(bytes / (1024 * 1024)).toFixed(1)} MB\`; }

export function FileUpload({ onFiles, onChange, accept, multiple = true, maxSize, disabled = false, variant = "dropzone", className, children, ...props }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const processFiles = useCallback((fileList: FileList | null) => { if (!fileList) return; let accepted = Array.from(fileList); if (accept) { const types = accept.split(",").map((t) => t.trim()); accepted = accepted.filter((f) => types.some((t) => f.type === t || f.name.endsWith(t.replace("*", "")))); } if (maxSize) accepted = accepted.filter((f) => f.size <= maxSize); if (!multiple) accepted = accepted.slice(0, 1); if (accepted.length) { onFiles?.(accepted); onChange?.(accepted); } }, [accept, maxSize, multiple, onFiles, onChange]);

  if (variant === "button") {
    return <div className={cn("inline-flex", className)}><input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => { processFiles(e.target.files); e.target.value = ""; }} disabled={disabled} className="sr-only" tabIndex={-1} {...props} /><button type="button" onClick={() => !disabled && inputRef.current?.click()} disabled={disabled} className={cn("inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-muted hover:border-border focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-[0.98]", disabled && "pointer-events-none opacity-50")}>{children ?? <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>Upload file</>}</button></div>;
  }

  return (
    <div role="button" tabIndex={disabled ? -1 : 0} aria-disabled={disabled} aria-label="Upload files by dropping or clicking"
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); !disabled && inputRef.current?.click(); } }}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); !disabled && setIsDragOver(true); }}
      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); }}
      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); !disabled && processFiles(e.dataTransfer.files); }}
      className={cn("group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5", isDragOver ? "border-primary bg-primary/10 scale-[1.01]" : "border-border bg-card", disabled && "cursor-not-allowed opacity-50 hover:border-border hover:bg-card", className)}>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => { processFiles(e.target.files); e.target.value = ""; }} disabled={disabled} className="sr-only" tabIndex={-1} {...props} />
      {children ?? (<><div className={cn("flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200", isDragOver ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary")}><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg></div><div className="flex flex-col items-center gap-1 text-center"><p className="text-sm font-medium text-foreground">{isDragOver ? "Release to upload" : "Drop files here or click to upload"}</p><p className="text-xs text-muted-foreground">{accept ? \`Accepts: \${accept}\` : "All file types accepted"}{maxSize ? \` \u00B7 Max \${formatFileSize(maxSize)}\` : ""}</p></div></>)}
    </div>
  );
}

export function FileUploadPreview({ files, onRemove, className }: FileUploadPreviewProps) {
  return <div className={cn("flex flex-col gap-1", className)}>{files.map((f, i) => (<div key={\`\${f.name}-\${i}\`} className="group/item flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 transition-colors hover:bg-muted/50"><div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-sm">{f.type.startsWith("image/") ? "\uD83D\uDDBC\uFE0F" : f.type === "application/pdf" ? "\uD83D\uDCC4" : "\uD83D\uDCC1"}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-foreground">{f.name}</p><p className="text-xs text-muted-foreground">{f.size}</p></div>{onRemove && <button type="button" onClick={() => onRemove(i)} aria-label={\`Remove \${f.name}\`} className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover/item:opacity-100"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>}</div>))}</div>;
}`;

const MOCK_FILES: FileItem[] = [
  { file: new File([], "photo.jpg"), name: "photo.jpg", size: "2.4 MB", type: "image/jpeg" },
  { file: new File([], "document.pdf"), name: "document.pdf", size: "156 KB", type: "application/pdf" },
];

const BASIC_CODE = `import { FileUpload } from "@/components/ui/FileUpload";

<FileUpload onFiles={(files) => console.log(files)} />`;

const BUTTON_CODE = `import { FileUpload } from "@/components/ui/FileUpload";

<FileUpload variant="button">Choose file</FileUpload>`;

const ACCEPT_CODE = `import { FileUpload } from "@/components/ui/FileUpload";

<FileUpload accept="image/*" multiple={false} />`;

const WITH_PREVIEW_CODE = `import { useState } from "react";
import { FileUpload, FileUploadPreview, type FileItem } from "@/components/ui/FileUpload";

function UploadWithPreview() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const addFiles = (newFiles: File[]) => setFiles((prev) => [...prev, ...newFiles.map((f) => ({ file: f, name: f.name, size: formatFileSize(f.size), type: f.type }))]);
  return (
    <div>
      <FileUpload onFiles={addFiles} />
      <FileUploadPreview files={files} onRemove={(i) => setFiles((p) => p.filter((_, j) => j !== i))} />
    </div>
  );
}`;

const MAX_SIZE_CODE = `import { FileUpload } from "@/components/ui/FileUpload";

<FileUpload maxSize={5 * 1024 * 1024} accept="image/*" />`;

const DISABLED_CODE = `import { FileUpload } from "@/components/ui/FileUpload";

<FileUpload disabled />`;

export default function FileUploadPage() {
  const [files, setFiles] = useState<FileItem[]>(MOCK_FILES);

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...newFiles.map((f) => ({
        file: f,
        name: f.name,
        size: formatFileSize(f.size),
        type: f.type,
      })),
    ]);
  }, []);

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  return (
    <ComponentDocPage
      name="File Upload"
      category="Forms"
      description="File upload component with drag-and-drop zone and button variants. Supports file type validation, size limits, preview list with remove buttons, and keyboard accessibility."
    >
      <PreviewPanel filename="file-upload-preview.tsx">
        <div className="flex w-full max-w-md flex-col gap-4">
          <FileUpload onFiles={addFiles} />
          {files.length > 0 && (
            <FileUploadPreview files={files} onRemove={removeFile} />
          )}
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={FILE_UPLOAD_SOURCE}
        filename="components/ui/FileUpload/FileUpload.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Dropzone"
          description="Full drag-and-drop upload area."
          code={BASIC_CODE}
          filename="dropzone.tsx"
        >
          <div className="w-full max-w-md">
            <FileUpload onFiles={addFiles} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Button Variant"
          description="Compact button trigger for inline use."
          code={BUTTON_CODE}
          filename="button.tsx"
        >
          <FileUpload variant="button" onFiles={addFiles}>
            Choose file
          </FileUpload>
        </ExampleBlock>

        <ExampleBlock
          title="With Preview"
          description="Upload zone with file list and remove buttons."
          code={WITH_PREVIEW_CODE}
          filename="with-preview.tsx"
        >
          <div className="flex w-full max-w-md flex-col gap-4">
            <FileUpload onFiles={addFiles} />
            {files.length > 0 && (
              <FileUploadPreview files={files} onRemove={removeFile} />
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Accept Images Only"
          description="Restrict to image files, single selection."
          code={ACCEPT_CODE}
          filename="accept.tsx"
        >
          <div className="w-full max-w-md">
            <FileUpload accept="image/*" multiple={false} onFiles={addFiles} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Max Size"
          description="Limit upload to 5 MB."
          code={MAX_SIZE_CODE}
          filename="max-size.tsx"
        >
          <div className="w-full max-w-md">
            <FileUpload
              maxSize={5 * 1024 * 1024}
              accept="image/*"
              onFiles={addFiles}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive upload zone."
          code={DISABLED_CODE}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-md">
            <FileUpload disabled />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
