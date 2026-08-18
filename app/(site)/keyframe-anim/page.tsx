"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Play } from "lucide-react";

const installCommand = `npx component-library@latest add keyframe-anim`;
const usageCode = `// usage`;

export default function KeyframeAnimPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Keyframe Anim</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A keyframe animation component that triggers CSS animations based on scroll position or interaction events.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Keyframe animations triggered on scroll and hover.</p></div>
        <ComponentPreview id="keyframe-anim"><div className="w-full p-4"><div className="flex flex-col gap-6"><div className="grid grid-cols-3 gap-4"><div className="h-24 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse flex items-center justify-center"><span className="text-sm font-medium text-white">Pulse</span></div><div className="h-24 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 animate-bounce flex items-center justify-center"><span className="text-sm font-medium text-white">Bounce</span></div><div className="h-24 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 animate-spin flex items-center justify-center"><span className="text-sm font-medium text-white">Spin</span></div></div><div className="grid grid-cols-3 gap-4"><div className="h-24 rounded-lg bg-gradient-to-r from-green-500 to-green-600 animate-ping flex items-center justify-center"><span className="text-sm font-medium text-white">Ping</span></div><div className="h-24 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center hover:animate-bounce transition-all"><span className="text-sm font-medium text-white">Hover Bounce</span></div><div className="h-24 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center hover:animate-pulse transition-all"><span className="text-sm font-medium text-white">Hover Pulse</span></div></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">animation</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{"pulse"}</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">trigger</td><td className="px-4 py-3 text-muted-foreground">{"scroll"} | {"hover"} | {"mount"}</td><td className="px-4 py-3 text-muted-foreground">{"mount"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">duration</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{"1s"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">children</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
