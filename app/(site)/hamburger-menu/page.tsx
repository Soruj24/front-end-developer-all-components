"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Menu } from "lucide-react";

const installCommand = `npx component-library@latest add hamburger-menu`;
const usageCode = `// usage`;

export default function HamburgerMenuPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Hamburger Menu</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A classic hamburger menu icon that toggles between open and closed states with smooth animations.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Animated hamburger menu toggle with three lines.</p></div>
        <ComponentPreview id="hamburger-menu"><div className="w-full p-4"><div className="flex items-center justify-center gap-12"><button className="flex flex-col justify-center gap-1.5 w-8 h-8 group"><span className="block h-0.5 w-8 bg-foreground rounded-full transition-all duration-300 group-hover:bg-primary"></span><span className="block h-0.5 w-8 bg-foreground rounded-full transition-all duration-300 group-hover:bg-primary group-hover:w-6"></span><span className="block h-0.5 w-8 bg-foreground rounded-full transition-all duration-300 group-hover:bg-primary"></span></button><button className="flex flex-col justify-center gap-1.5 w-8 h-8 group"><span className="block h-0.5 w-8 bg-primary rounded-full transition-all duration-300 rotate-45 translate-y-2"></span><span className="block h-0.5 w-4 bg-primary rounded-full transition-all duration-300 opacity-0"></span><span className="block h-0.5 w-8 bg-primary rounded-full transition-all duration-300 -rotate-45 -translate-y-2"></span></button><button className="relative flex flex-col justify-center gap-1.5 w-8 h-8 group"><span className="block h-0.5 w-8 bg-foreground rounded-full transition-all duration-300"></span><span className="block h-0.5 w-5 bg-foreground rounded-full transition-all duration-300 group-hover:w-8"></span><span className="block h-0.5 w-3 bg-foreground rounded-full transition-all duration-300 group-hover:w-8"></span></button></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">isOpen</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onClick</td><td className="px-4 py-3 text-muted-foreground">() => void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">24</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
