import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const attachmentRemovable: RegistryEntry = entry({
  id: "attachment-removable",
  title: "Removable",
  description: "Attachments with a remove button.",
  source: `import { useState } from "react";
import { Attachment } from "@/components/_attachment";

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

const initialFiles = [
  { filename: "design-system-v3.fig", size: "12.4 MB", icon: <FileIcon /> },
  { filename: "hero-banner.png", size: "2.1 MB", icon: <ImageIcon /> },
  { filename: "quarterly-report.pdf", size: "856 KB", icon: <PdfIcon /> },
  { filename: "source-code.zip", size: "4.7 MB", icon: <ZipIcon /> },
];

export default function AttachmentRemovable() {
  const [attachments, setAttachments] = useState(initialFiles);

  function removeFile(filename: string) {
    setAttachments((prev) => prev.filter((f) => f.filename !== filename));
  }

  return (
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
      {attachments.length < initialFiles.length && (
        <button
          type="button"
          onClick={() => setAttachments(initialFiles)}
          className="text-sm text-blue-500 hover:underline"
        >
          Reset files
        </button>
      )}
    </div>
  );
}`,
});
