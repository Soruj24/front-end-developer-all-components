"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ScanLine } from "lucide-react";

const installCommand = `npx component-library@latest add scan-qr`;
const usageCode = `import { ScanQR } from "@/components/scan-qr";

<ScanQR
  onScan={(code) => handleScan(code)}
  size={200}
/>`;

export default function ScanQRPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Scan QR</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A QR code scanner component for reading and generating QR codes with camera integration and manual input.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Scanner Frame</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative h-48 w-48">
              <div className="absolute inset-0 rounded-lg border-2 border-dashed border-primary/50" />
              <div className="absolute left-0 top-0 h-6 w-6 border-l-4 border-t-4 border-primary rounded-tl-lg" />
              <div className="absolute right-0 top-0 h-6 w-6 border-r-4 border-t-4 border-primary rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-l-4 border-b-4 border-primary rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 h-6 w-6 border-r-4 border-b-4 border-primary rounded-br-lg" />
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary/50 animate-pulse" />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">QR Code Display</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="grid grid-cols-5 gap-1">
              {Array(25).fill(0).map((_, i) => (
                <div key={i} className={`h-6 w-6 ${[0,1,2,4,5,6,10,12,14,18,20,22,23,24].includes(i) ? "bg-foreground" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Manual Input</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
                <ScanLine className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Enter code manually</span>
              </div>
              <button className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Submit</button>
            </div>
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
                <td className="px-4 py-3 font-mono text-xs">onScan</td>
                <td className="px-4 py-3 text-muted-foreground">(code: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">200</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
