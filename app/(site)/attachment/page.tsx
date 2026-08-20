"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Attachment } from "@/components/ui/Attachment";

const ATTACHMENT_SOURCE = `"use client";

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
} from "lucide-react";

function formatSize(bytes?: number): string {
  if (bytes === undefined) return "";
  if (bytes < 1024) return \`\${bytes} B\`;
  if (bytes < 1024 * 1024) return \`\${(bytes / 1024).toFixed(1)} KB\`;
  return \`\${(bytes / (1024 * 1024)).toFixed(1)} MB\`;
}

function getFileIcon(type?: string) {
  if (!type) return File;
  if (type.startsWith("image/")) return Image;
  if (type.includes("pdf")) return FileText;
  if (type.includes("zip") || type.includes("archive")) return FileArchive;
  if (type.includes("video")) return Film;
  if (type.includes("audio")) return Music;
  return File;
}

function getFileColor(type?: string): string {
  if (!type) return "text-muted-foreground";
  if (type.startsWith("image/")) return "text-blue-500";
  if (type.includes("pdf")) return "text-red-500";
  if (type.includes("zip") || type.includes("archive")) return "text-amber-500";
  if (type.includes("video")) return "text-purple-500";
  if (type.includes("audio")) return "text-emerald-500";
  if (type.includes("msword") || type.includes("document")) return "text-blue-600";
  if (type.includes("sheet") || type.includes("excel")) return "text-emerald-600";
  return "text-muted-foreground";
}

function getFileBg(type?: string): string {
  if (!type) return "bg-muted";
  if (type.startsWith("image/")) return "bg-blue-500/10";
  if (type.includes("pdf")) return "bg-red-500/10";
  if (type.includes("zip") || type.includes("archive")) return "bg-amber-500/10";
  if (type.includes("video")) return "bg-purple-500/10";
  if (type.includes("audio")) return "bg-emerald-500/10";
  if (type.includes("msword") || type.includes("document")) return "bg-blue-500/10";
  if (type.includes("sheet") || type.includes("excel")) return "bg-emerald-500/10";
  return "bg-muted";
}

export function Attachment({
  name,
  size,
  type,
  url,
  onRemove,
  className,
}: AttachmentProps) {
  const Icon = getFileIcon(type);
  const iconColor = getFileColor(type);
  const iconBg = getFileBg(type);

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
        <Icon className={cn("h-4 w-4", iconColor)} />
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
            aria-label={\`Download \${name}\`}
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
            aria-label={\`Remove \${name}\`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}`;

const BASIC_EXAMPLE = `<Attachment name="report.pdf" size={876544} type="application/pdf" />`;

const WITH_URL_EXAMPLE = `<Attachment name="photo.png" size={2202009} type="image/png" url="/downloads/photo.png" />`;

const REMOVABLE_EXAMPLE = `<Attachment
  name="document.docx"
  size={524288}
  type="application/msword"
  onRemove={() => console.log("removed")}
/>`;

const MULTIPLE_EXAMPLE = `<Attachment name="image.png" size={2202009} type="image/png" />
<Attachment name="report.pdf" size={876544} type="application/pdf" />
<Attachment name="archive.zip" size={4928307} type="application/zip" />`;

const FILE_TYPES_EXAMPLE = `<Attachment name="photo.png" size={2200000} type="image/png" />
<Attachment name="report.pdf" size={876000} type="application/pdf" />
<Attachment name="song.mp3" size={5400000} type="audio/mpeg" />
<Attachment name="clip.mp4" size={32000000} type="video/mp4" />
<Attachment name="backup.zip" size={4900000} type="application/zip" />`;

const COMPACT_EXAMPLE = `<Attachment
  name="notes.txt"
  size={1024}
  type="text/plain"
  className="py-1.5"
/>`;

function PlaygroundDemo() {
  const [files, setFiles] = useState([
    { name: "design-v3.fig", size: 13000000, type: "application/octet-stream" },
    { name: "hero.png", size: 2200000, type: "image/png" },
    { name: "report.pdf", size: 876000, type: "application/pdf" },
    { name: "source.zip", size: 4900000, type: "application/zip" },
    { name: "song.mp3", size: 5400000, type: "audio/mpeg" },
  ]);

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  function resetFiles() {
    setFiles([
      { name: "design-v3.fig", size: 13000000, type: "application/octet-stream" },
      { name: "hero.png", size: 2200000, type: "image/png" },
      { name: "report.pdf", size: 876000, type: "application/pdf" },
      { name: "source.zip", size: 4900000, type: "application/zip" },
      { name: "song.mp3", size: 5400000, type: "audio/mpeg" },
    ]);
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      {files.map((file) => (
        <Attachment
          key={file.name}
          name={file.name}
          size={file.size}
          type={file.type}
          onRemove={() => removeFile(file.name)}
        />
      ))}
      {files.length === 0 && (
        <button
          type="button"
          onClick={resetFiles}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Reset files
        </button>
      )}
    </div>
  );
}

export default function AttachmentPage() {
  return (
    <ComponentDocPage
      name="Attachment"
      category="Forms"
      description="Displays a file attachment with icon, name, and size. Supports removable attachments, download links, and file-type-specific color coding."
    >
      <PreviewPanel filename="attachment-preview">
        <div className="flex w-full max-w-lg flex-col gap-2">
          <Attachment
            name="design-v3.fig"
            size={13000000}
            type="application/octet-stream"
            onRemove={() => {}}
          />
          <Attachment
            name="hero.png"
            size={2200000}
            type="image/png"
            url="/downloads/hero.png"
            onRemove={() => {}}
          />
          <Attachment
            name="report.pdf"
            size={876000}
            type="application/pdf"
            onRemove={() => {}}
          />
          <Attachment
            name="source.zip"
            size={4900000}
            type="application/zip"
            onRemove={() => {}}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ATTACHMENT_SOURCE}
        filename="components/ui/Attachment/Attachment.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Basic"
          description="Simple file attachment with name and formatted size."
          code={BASIC_EXAMPLE}
        >
          <div className="flex w-full max-w-lg flex-col gap-2">
            <Attachment
              name="report.pdf"
              size={876544}
              type="application/pdf"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Download"
          description="Attachment with a download URL link."
          code={WITH_URL_EXAMPLE}
        >
          <div className="flex w-full max-w-lg flex-col gap-2">
            <Attachment
              name="photo.png"
              size={2202009}
              type="image/png"
              url="/downloads/photo.png"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Removable"
          description="Attachment with a remove button that appears on hover."
          code={REMOVABLE_EXAMPLE}
        >
          <div className="flex w-full max-w-lg flex-col gap-2">
            <Attachment
              name="document.docx"
              size={524288}
              type="application/msword"
              onRemove={() => {}}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="File Types"
          description="Color-coded icons for different file types."
          code={FILE_TYPES_EXAMPLE}
        >
          <div className="flex w-full max-w-lg flex-col gap-2">
            <Attachment name="photo.png" size={2200000} type="image/png" />
            <Attachment name="report.pdf" size={876000} type="application/pdf" />
            <Attachment name="song.mp3" size={5400000} type="audio/mpeg" />
            <Attachment name="clip.mp4" size={32000000} type="video/mp4" />
            <Attachment name="backup.zip" size={4900000} type="application/zip" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Multiple Files"
          description="List of attachments with different file types."
          code={MULTIPLE_EXAMPLE}
        >
          <div className="flex w-full max-w-lg flex-col gap-2">
            <Attachment
              name="image.png"
              size={2202009}
              type="image/png"
            />
            <Attachment
              name="report.pdf"
              size={876544}
              type="application/pdf"
            />
            <Attachment
              name="archive.zip"
              size={4928307}
              type="application/zip"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Compact"
          description="Reduced padding for tight layouts."
          code={COMPACT_EXAMPLE}
        >
          <div className="flex w-full max-w-lg flex-col gap-2">
            <Attachment
              name="notes.txt"
              size={1024}
              type="text/plain"
              className="py-1.5"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Interactive demo — remove files and reset."
          code={FILE_TYPES_EXAMPLE}
        >
          <PlaygroundDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
