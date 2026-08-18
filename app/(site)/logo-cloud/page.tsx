"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Image } from "lucide-react";

const installCommand = `npx component-library@latest add logo-cloud`;
const usageCode = `// usage`;

export default function LogoCloudPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Logo Cloud</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A logo cloud/carousel component that showcases partner or client logos in a responsive grid or scrolling marquee.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Logo cloud with grid and marquee display.</p></div>
        <ComponentPreview id="logo-cloud"><div className="w-full p-4"><div className="flex flex-col gap-8"><div className="grid grid-cols-4 gap-6 items-center">{["Acme Corp","Globex","Initech","Umbrella","Hooli","Stark","Wayne","Wonka"].map((name,i)=>(<div key={i} className="flex items-center justify-center p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors"><span className="text-sm font-semibold text-muted-foreground">{name}</span></div>))}</div><div className="overflow-hidden"><div className="flex gap-8 animate-[scroll_20s_linear_infinite]">{["Acme","Globex","Initech","Umbrella","Hooli","Stark","Wayne","Wonka","Acme","Globex"].map((name,i)=>(<span key={i} className="flex-none text-lg font-bold text-muted-foreground/40">{name}</span>))}</div></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">logos</td><td className="px-4 py-3 text-muted-foreground">{"{name: string; url?: string}[]"}</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{"grid"} | {"marquee"}</td><td className="px-4 py-3 text-muted-foreground">{"grid"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">columns</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">4</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
