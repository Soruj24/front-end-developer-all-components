"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Upload,
  FileImage,
  FileText,
  X,
  CheckCircle,
  CloudUpload,
  AlertCircle,
} from "lucide-react";

const installCommand = `npx component-library@latest add upload-zone`;

const usageCode = `import { UploadZone } from "@/components/upload-zone";

<UploadZone
  accept={["image/*", "application/pdf"]}
  maxSize={10 * 1024 * 1024}
  onUpload={handleUpload}
/>`;

function DragDrop() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex justify-center py-8">
      <div
        className={`flex w-80 flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
      >
        <CloudUpload
          className={`mb-4 h-10 w-10 ${isDragging ? "text-primary" : "text-muted-foreground"}`}
        />
        <p className="text-sm font-medium">
          {isDragging ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          or click to browse
        </p>
      </div>
    </div>
  );
}

function FilePreview() {
  const [files, setFiles] = useState([
    { name: "design-system.pdf", size: "2.4 MB", type: "pdf" },
    { name: "screenshot.png", size: "1.1 MB", type: "image" },
  ]);

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center py-8">
      <div className="w-80 space-y-2">
        {files.map((file, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border bg-card p-3"
          >
            {file.type === "image" ? (
              <FileImage className="h-8 w-8 text-blue-500" />
            ) : (
              <FileText className="h-8 w-8 text-orange-500" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{file.size}</p>
            </div>
            <button
              onClick={() => removeFile(i)}
              className="rounded p-1 hover:bg-muted"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ))}
        {files.length === 0 && (
          <div className="rounded-lg border-2 border-dashed p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No files selected</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MultiUpload() {
  const [files, setFiles] = useState<string[]>([]);

  const addFiles = () => {
    const names = ["report.pdf", "photo.jpg", "data.csv", "notes.txt"];
    const available = names.filter((n) => !files.includes(n));
    if (available.length > 0) {
      setFiles([...files, available[0]]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <button
        onClick={addFiles}
        disabled={files.length >= 4}
        className="rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
      >
        {files.length >= 4 ? "Max files reached" : "Add File"}
      </button>
      <div className="w-80">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{files.length}/4 files</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(files.length / 4) * 100}%` }}
          />
        </div>
        <div className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              <span className="text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageUpload() {
  const [selected, setSelected] = useState<number | null>(null);
  const images = [
    { name: "hero-banner.jpg", color: "bg-blue-200 dark:bg-blue-900/40" },
    { name: "avatar.png", color: "bg-purple-200 dark:bg-purple-900/40" },
    { name: "logo.svg", color: "bg-green-200 dark:bg-green-900/40" },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`relative overflow-hidden rounded-lg border-2 transition-all ${
              selected === i
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-muted-foreground/25"
            }`}
          >
            <div className={`flex h-24 items-center justify-center ${img.color}`}>
              <FileImage className="h-8 w-8 text-muted-foreground/60" />
            </div>
            <div className="px-2 py-1.5">
              <p className="truncate text-xs">{img.name}</p>
            </div>
            {selected === i && (
              <div className="absolute right-1.5 top-1.5">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function DocumentUpload() {
  const [docs, setDocs] = useState([
    { name: "contract.pdf", status: "ready" as const },
    { name: "invoice.pdf", status: "ready" as const },
  ]);

  return (
    <div className="flex justify-center py-8">
      <div className="w-80 space-y-3">
        {docs.map((doc, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <FileText className="h-8 w-8 text-orange-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">{doc.name}</p>
              <p className="text-xs text-muted-foreground">PDF Document</p>
            </div>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-lg border-2 border-dashed p-4 hover:border-primary/50 hover:bg-primary/5">
          <Upload className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Add more documents</span>
        </div>
      </div>
    </div>
  );
}

function ProgressUpload() {
  const [uploads, setUploads] = useState([
    { name: "video.mp4", progress: 78 },
    { name: "backup.zip", progress: 45 },
    { name: "archive.tar.gz", progress: 100 },
  ]);

  return (
    <div className="flex justify-center py-8">
      <div className="w-80 space-y-3">
        {uploads.map((u, i) => (
          <div key={i} className="rounded-lg border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {u.progress === 100 ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Upload className="h-4 w-4 text-primary animate-pulse" />
                )}
                <span className="text-sm font-medium">{u.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{u.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full transition-all ${
                  u.progress === 100 ? "bg-green-500" : "bg-primary"
                }`}
                style={{ width: `${u.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadSuccess() {
  return (
    <div className="flex justify-center py-8">
      <div className="w-80 rounded-xl border bg-card p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <p className="text-lg font-semibold">Upload Complete</p>
        <p className="mt-1 text-sm text-muted-foreground">
          3 files uploaded successfully
        </p>
        <div className="mt-4 space-y-1.5">
          {["report.pdf", "photo.jpg", "data.csv"].map((f, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2 rounded-md bg-muted/50 px-3 py-1.5"
            >
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-xs">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UploadZonePage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { name: "Drag Drop", component: DragDrop },
    { name: "File Preview", component: FilePreview },
    { name: "Multi Upload", component: MultiUpload },
    { name: "Image Upload", component: ImageUpload },
    { name: "Document Upload", component: DocumentUpload },
    { name: "Progress Upload", component: ProgressUpload },
    { name: "Upload Success", component: UploadSuccess },
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Upload Zone
          </h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Drag-and-drop file upload zones with preview, progress, multi-file, and success states.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive upload zone variants.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {demos.map((demo, i) => (
            <button
              key={i}
              onClick={() => setActiveDemo(i)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeDemo === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {demo.name}
            </button>
          ))}
        </div>
        <ComponentPreview id={`upload-zone-${demos[activeDemo].name.toLowerCase().replace(/ /g, "-")}`}>
          <div className="w-full">
            <ActiveComponent />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">accept</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxSize</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">10485760</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">multiple</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
