"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CloudUpload, ArrowUp } from "lucide-react";

const installCommand = `npx component-library@latest add cloud-upload`;
const usageCode = `import { CloudUpload } from "@/components/ui/cloud-upload";

<CloudUpload onUpload={handleUpload} />`;

export default function CloudUploadPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Cloud Upload</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A cloud upload component with drag-and-drop support, progress indicators, and file type validation.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Drop Zone</h2><p className="mt-1 text-sm text-muted-foreground">A drag-and-drop upload zone with icon and text.</p></div>
        <ComponentPreview id="cloud-upload-dropzone">
          <div className="w-full p-4">
            <div className="max-w-md mx-auto rounded-xl border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <CloudUpload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">Supports images, documents, and videos up to 50MB</p>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Upload Progress</h2><p className="mt-1 text-sm text-muted-foreground">Upload zone with active progress bar.</p></div>
        <ComponentPreview id="cloud-upload-progress">
          <div className="w-full p-4">
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
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">File List</h2><p className="mt-1 text-sm text-muted-foreground">Upload zone with list of selected files.</p></div>
        <ComponentPreview id="cloud-upload-files">
          <div className="w-full p-4">
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
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
