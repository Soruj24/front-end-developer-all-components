"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Package } from "lucide-react";

const installCommand = `npx component-library@latest add box-package`;
const usageCode = `import { BoxPackage } from "@/components/ui/box-package";

<BoxPackage title="Package Name" version="1.0.0" />`;

export default function BoxPackagePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Box Package</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A package/box component for displaying product boxes, shipping packages, and item containers with metadata.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Package Card</h2><p className="mt-1 text-sm text-muted-foreground">A styled package display with icon and details.</p></div>
        <ComponentPreview id="box-package-card">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border bg-card p-6 max-w-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">component-library</h3>
              <p className="text-sm text-muted-foreground mt-1">A modern React component library for building beautiful UIs.</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">v2.1.0</span>
                <span>MIT License</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Shipping Box</h2><p className="mt-1 text-sm text-muted-foreground">A package with shipping status indicator.</p></div>
        <ComponentPreview id="box-package-shipping">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Package className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Package #PKG-2024</p>
                <p className="text-xs text-muted-foreground">Express Delivery</p>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-primary" />
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">In Transit</span>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Package Grid</h2><p className="mt-1 text-sm text-muted-foreground">Multiple packages displayed in a grid layout.</p></div>
        <ComponentPreview id="box-package-grid">
          <div className="w-full p-4">
            <div className="grid grid-cols-3 gap-3">
              {[{ name: "Core", size: "45 KB" }, { name: "Utils", size: "12 KB" }, { name: "Icons", size: "28 KB" }].map((pkg) => (
                <div key={pkg.name} className="rounded-lg border border-border bg-card p-4 text-center">
                  <Package className="h-8 w-8 mx-auto text-primary/60 mb-2" />
                  <p className="text-sm font-medium">{pkg.name}</p>
                  <p className="text-xs text-muted-foreground">{pkg.size}</p>
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
