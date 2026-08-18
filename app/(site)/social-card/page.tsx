"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const installCommand = `npx component-library@latest add social-card`;
const usageCode = `// usage`;

export default function SocialCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Social Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A card component designed for social media content with actions.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Social Card Demo</h2><p className="mt-1 text-sm text-muted-foreground">Social media style card with engagement actions.</p></div>
        <ComponentPreview id="social-card-demo"><div className="w-full p-4"><div className="max-w-sm overflow-hidden rounded-lg border bg-card">
          <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5" />
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div><p className="text-sm font-medium">Username</p><p className="text-xs text-muted-foreground">@username · 2h ago</p></div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">This is a social media post with some content about an interesting topic.</p>
            <div className="mt-4 flex items-center gap-4 text-muted-foreground">
              <button className="flex items-center gap-1.5 text-sm hover:text-red-500"><Heart className="h-4 w-4" /> 24</button>
              <button className="flex items-center gap-1.5 text-sm hover:text-primary"><MessageCircle className="h-4 w-4" /> 8</button>
              <button className="flex items-center gap-1.5 text-sm hover:text-primary"><Share2 className="h-4 w-4" /></button>
            </div>
          </div>
        </div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
