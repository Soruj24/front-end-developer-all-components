"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Loader } from "lucide-react";

const installCommand = `npx component-library@latest add loading-bar`;
const usageCode = `// usage`;

export default function LoadingBarPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Loading Bar</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An animated loading bar component with indeterminate and determinate modes for page or content loading states.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Loading bars in indeterminate and determinate modes.</p></div>
        <ComponentPreview id="loading-bar"><div className="w-full p-4"><div className="flex flex-col gap-6 w-full max-w-md"><div className="flex flex-col gap-2"><span className="text-xs font-medium text-muted-foreground">Indeterminate</span><div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted"><div className="absolute inset-y-0 left-0 w-1/3 bg-primary rounded-full" style={{animation:"loading 1.5s ease-in-out infinite"}}></div></div></div><div className="flex flex-col gap-2"><span className="text-xs font-medium text-muted-foreground">Progress: 65%</span><div className="relative h-2 w-full overflow-hidden rounded-full bg-muted"><div className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500" style={{width:"65%"}}></div></div></div><div className="flex flex-col gap-2"><span className="text-xs font-medium text-muted-foreground">Gradient variant</span><div className="relative h-2 w-full overflow-hidden rounded-full bg-muted"><div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"></div></div></div><div className="flex flex-col gap-2"><span className="text-xs font-medium text-muted-foreground">Striped variant</span><div className="relative h-3 w-full overflow-hidden rounded-full bg-muted"><div className="absolute inset-y-0 left-0 w-2/3 bg-primary rounded-full overflow-hidden"></div></div></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">indeterminate</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{"default"} | {"gradient"} | {"striped"}</td><td className="px-4 py-3 text-muted-foreground">{"default"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">{"sm"} | {"md"} | {"lg"}</td><td className="px-4 py-3 text-muted-foreground">{"md"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
