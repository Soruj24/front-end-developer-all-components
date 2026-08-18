"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { User } from "lucide-react";

const installCommand = `npx component-library@latest add user-card`;
const usageCode = `// usage`;

export default function UserCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">User Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A profile card displaying user information with avatar and details.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">User Card Demo</h2><p className="mt-1 text-sm text-muted-foreground">User profile card with avatar and stats.</p></div>
        <ComponentPreview id="user-card-demo"><div className="w-full p-4"><div className="max-w-xs overflow-hidden rounded-lg border bg-card p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">JD</div>
            <h3 className="mt-3 font-medium">John Doe</h3>
            <p className="text-sm text-muted-foreground">@johndoe</p>
            <p className="mt-1 text-xs text-muted-foreground">Product Designer</p>
            <div className="mt-4 flex gap-6 text-center">
              <div><p className="text-sm font-semibold">1.2k</p><p className="text-xs text-muted-foreground">Followers</p></div>
              <div><p className="text-sm font-semibold">340</p><p className="text-xs text-muted-foreground">Following</p></div>
              <div><p className="text-sm font-semibold">89</p><p className="text-xs text-muted-foreground">Posts</p></div>
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
