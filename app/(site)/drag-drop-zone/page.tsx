"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button } from "@/components/ui";

const installCommand = "npx component-library@latest add drag-drop-zone";

const usageCode = `import { DragDropZone } from "@/components/ui";

export default function Example() {
  return <DragDropZone onDrop={(files) => console.log(files)} />;
}`;

const mockFiles = [
  { name: "photo.jpg", size: "2.4 MB", type: "image/jpeg" },
  { name: "document.pdf", size: "156 KB", type: "application/pdf" },
  { name: "data.csv", size: "890 KB", type: "text/csv" },
];

export default function DragDropZonePage() {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState(mockFiles);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setFiles((prev) => [...prev, { name: "uploaded-file.txt", size: "12 KB", type: "text/plain" }]);
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Drag Drop Zone</h1>
          <Badge variant="primary">Upload</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Drag-and-drop file upload zone with file type validation, size limits, and preview thumbnails.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Drop Zone</h3>
          <ComponentPreview id="drag-drop-zone-default">
            <div
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-10 transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <p className="text-sm font-medium">Drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground">Supports images, PDFs, and CSV files</p>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">File List</h3>
          <ComponentPreview id="drag-drop-zone-list">
            <Card className="w-full max-w-md">
              <CardContent className="p-3">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 border-b border-border py-2 last:border-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-xs">
                      {f.type.startsWith("image") ? "🖼" : f.type.includes("pdf") ? "📄" : "📊"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.size}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(i)}>✕</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="drag-drop-zone-interactive">
            <div className="w-full max-w-md">
              <div
                className={`mb-3 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <p className="text-sm">{dragOver ? "Drop to upload!" : "Drag & drop files here"}</p>
                <Button size="sm" variant="outline" onClick={() => setFiles((prev) => [...prev, { name: "new-file.txt", size: "1 KB", type: "text/plain" }])}>Browse</Button>
              </div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">{files.length} file(s)</p>
              <div className="max-h-40 overflow-y-auto">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-muted">
                    <span className="flex-1 truncate">{f.name}</span>
                    <span className="text-xs text-muted-foreground">{f.size}</span>
                    <button onClick={() => removeFile(i)} className="text-xs text-destructive hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onDrop</td>
                <td className="px-4 py-3 text-muted-foreground">(files: File[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}