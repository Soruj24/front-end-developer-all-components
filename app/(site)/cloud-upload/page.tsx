"use client";

import { CloudUpload, ArrowUp } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CLOUD_UPLOAD_SOURCE = `"use client";

import { useState } from "react";
import { CloudUpload, ArrowUp, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface UploadedFile {
  name: string;
  size: number;
  status: "uploading" | "complete";
}

export function CloudUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([
    { name: "photo.png", size: 2.4, status: "uploading" },
    { name: "report.pdf", size: 1.2, status: "complete" },
  ]);
  const [progress, setProgress] = useState(48);
  const [dragging, setDragging] = useState(false);

  const remove = (name: string) => setFiles((prev) => prev.filter((f) => f.name !== name));

  return (
    <div className="w-full max-w-md">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        className={cn(
          "flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-border"
        )}
      >
        <CloudUpload className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm font-medium">Drop files here or click to upload</p>
        <p className="text-xs text-muted-foreground">Images, documents, and videos up to 50MB</p>
      </div>

      <div className="mt-4 space-y-3">
        {files.map((file) => (
          <div key={file.name} className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary/10">
              <ArrowUp className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              {file.status === "uploading" && (
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: \`\${progress}%\` }} />
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{file.size} MB</span>
            <button onClick={() => remove(file.name)} className="text-muted-foreground hover:text-foreground" aria-label="Remove file">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`;

const DROPZONE_EXAMPLE = `<CloudUpload onUpload={handleUpload} />`;

const PROGRESS_EXAMPLE = `<CloudUpload
  files={[{ name: "photo.png", size: "2.4 MB", progress: 48 }]}
/>`;

const FILELIST_EXAMPLE = `<CloudUpload
  files={[
    { name: "report.pdf", size: "1.2 MB", status: "complete" },
    { name: "image.png", size: "3.4 MB", status: "uploading" },
    { name: "data.csv", size: "890 KB", status: "queued" },
  ]}
/>`;

function DropZoneDemo() {
  return (
    <div className="max-w-md mx-auto rounded-xl border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
      <CloudUpload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
      <p className="text-sm font-medium">Drop files here or click to upload</p>
      <p className="text-xs text-muted-foreground mt-1">Supports images, documents, and videos up to 50MB</p>
    </div>
  );
}

function UploadProgressDemo() {
  return (
    <div className="max-w-md mx-auto rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <ArrowUp className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">photo.png</p>
          <p className="text-xs text-muted-foreground">2.4 MB of 5.0 MB</p>
        </div>
        <span className="text-xs font-medium text-primary">48%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: "48%" }} />
      </div>
    </div>
  );
}

function FileListDemo() {
  return (
    <div className="max-w-md mx-auto space-y-3">
      <div className="rounded-xl border-2 border-dashed border-border p-6 text-center cursor-pointer">
        <CloudUpload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Add more files</p>
      </div>
      {[{ name: "report.pdf", size: "1.2 MB", status: "Complete" }, { name: "image.png", size: "3.4 MB", status: "Uploading" }, { name: "data.csv", size: "890 KB", status: "Queued" }].map((f) => (
        <div key={f.name} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs">📄</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{f.name}</p>
            <p className="text-xs text-muted-foreground">{f.size}</p>
          </div>
          <span className={`text-xs ${f.status === "Complete" ? "text-green-600" : f.status === "Uploading" ? "text-primary" : "text-muted-foreground"}`}>{f.status}</span>
        </div>
      ))}
    </div>
  );
}

export default function CloudUploadPage() {
  return (
    <ComponentDocPage
      name="Cloud Upload"
      category="Forms"
      description="A cloud upload component with drag-and-drop support, progress indicators, and file type validation."
    >
      <PreviewPanel filename="cloud-upload.tsx">
        <DropZoneDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CLOUD_UPLOAD_SOURCE}
        filename="components/ui/CloudUpload/CloudUpload.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Drop Zone" description="A drag-and-drop upload zone with icon and text." code={DROPZONE_EXAMPLE}>
          <DropZoneDemo />
        </ExampleBlock>
        <ExampleBlock title="Upload Progress" description="Upload zone with active progress bar." code={PROGRESS_EXAMPLE}>
          <UploadProgressDemo />
        </ExampleBlock>
        <ExampleBlock title="File List" description="Upload zone with list of selected files." code={FILELIST_EXAMPLE}>
          <FileListDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}