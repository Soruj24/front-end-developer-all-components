"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add floating-label`;
const usageCode = `import { FloatingLabel } from "@/components/ui/floating-label";

<FloatingLabel label="Email" value={email} onChange={setEmail} />`;

export default function FloatingLabelPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Floating Label</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A floating label input component that animates the label from placeholder to above the input on focus or when filled.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Default State</h2><p className="mt-1 text-sm text-muted-foreground">Input fields with floating labels in different states.</p></div>
        <ComponentPreview id="floating-label-default">
          <div className="w-full p-4">
            <div className="max-w-sm space-y-4">
              {[
                { label: "Full Name", value: "", placeholder: false },
                { label: "Email", value: "john@example.com", placeholder: false },
                { label: "Phone", value: "", placeholder: true },
              ].map((field) => (
                <div key={field.label} className="relative">
                  <input type="text" defaultValue={field.value} placeholder={field.placeholder ? field.label : ""} className="peer w-full px-3 pt-5 pb-2 rounded-lg border border-border bg-transparent text-sm outline-none focus:border-primary" />
                  <label className={`absolute transition-all text-sm ${field.value || !field.placeholder ? "top-1.5 left-3 text-[10px] text-primary" : "top-3 left-3 text-sm text-muted-foreground peer-focus:top-1.5 peer-focus:left-3 peer-focus:text-[10px] peer-focus:text-primary"}`}>{field.label}</label>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Error</h2><p className="mt-1 text-sm text-muted-foreground">Floating labels with error state styling.</p></div>
        <ComponentPreview id="floating-label-error">
          <div className="w-full p-4">
            <div className="max-w-sm space-y-4">
              <div className="relative">
                <input type="email" defaultValue="invalid-email" className="peer w-full px-3 pt-5 pb-2 rounded-lg border border-red-500 bg-transparent text-sm outline-none" />
                <label className="absolute top-1.5 left-3 text-[10px] text-red-500">Email</label>
                <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
              </div>
              <div className="relative">
                <input type="text" defaultValue="hello" className="peer w-full px-3 pt-5 pb-2 rounded-lg border border-green-500 bg-transparent text-sm outline-none" />
                <label className="absolute top-1.5 left-3 text-[10px] text-green-600">Username</label>
                <p className="text-xs text-green-600 mt-1">Username is available</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Text Area</h2><p className="mt-1 text-sm text-muted-foreground">Floating label for textarea fields.</p></div>
        <ComponentPreview id="floating-label-textarea">
          <div className="w-full p-4">
            <div className="max-w-sm">
              <div className="relative">
                <textarea defaultValue="This is a longer message that spans multiple lines in the textarea." rows={4} className="peer w-full px-3 pt-5 pb-2 rounded-lg border border-border bg-transparent text-sm outline-none resize-none focus:border-primary" />
                <label className="absolute top-1.5 left-3 text-[10px] text-primary">Message</label>
              </div>
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
