"use client";

import { useState } from "react";
import { Attachment } from "@/components/_attachment";
import { ComponentPreview } from "@/components/preview";

const variants = ["default", "outline", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

function FileIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ZipIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

const files = [
  { filename: "design-system-v3.fig", size: "12.4 MB", icon: <FileIcon /> },
  { filename: "hero-banner.png", size: "2.1 MB", icon: <ImageIcon /> },
  { filename: "quarterly-report.pdf", size: "856 KB", icon: <PdfIcon /> },
  { filename: "source-code.zip", size: "4.7 MB", icon: <ZipIcon /> },
];

export default function AttachmentPage() {
  const [attachments, setAttachments] = useState(files);

  function removeFile(filename: string) {
    setAttachments((prev) => prev.filter((f) => f.filename !== filename));
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Attachment</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Displays a file attachment with icon, name, and size. Supports removable
          attachments, different variants, and sizes for various use cases.
        </p>
      </header>

      <ComponentPreview id="attachment-default">
        <div className="flex flex-col gap-2">
          {files.map((file) => (
            <Attachment key={file.filename} filename={file.filename} size={file.size} icon={file.icon} />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="attachment-variants">
        <div className="flex flex-col gap-3">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground capitalize">{variant}</p>
              <Attachment filename="report.pdf" size="1.2 MB" variant={variant} icon={<PdfIcon />} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="attachment-sizes">
        <div className="flex flex-col gap-3">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground capitalize">{size}</p>
              <Attachment filename="design.fig" size="8.5 MB" sizeProp={size} icon={<FileIcon />} />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="attachment-removable">
        <div className="flex flex-col gap-2">
          {attachments.map((file) => (
            <Attachment
              key={file.filename}
              filename={file.filename}
              size={file.size}
              icon={file.icon}
              removable
              onRemove={() => removeFile(file.filename)}
            />
          ))}
          {attachments.length === 0 && (
            <p className="text-sm text-muted-foreground">All files removed.</p>
          )}
          {attachments.length < files.length && (
            <button
              type="button"
              onClick={() => setAttachments(files)}
              className="text-sm text-blue-500 hover:underline"
            >
              Reset files
            </button>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="attachment-custom-icon">
        <div className="flex flex-col gap-2">
          <Attachment
            filename="presentation.pptx"
            size="15.3 MB"
            icon={
              <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            }
          />
          <Attachment
            filename="database.sql"
            size="340 KB"
            icon={
              <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            }
          />
          <Attachment
            filename="video-demo.mp4"
            size="256 MB"
            icon={
              <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
