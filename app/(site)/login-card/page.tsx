"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { LogIn } from "lucide-react";

const installCommand = `npx component-library@latest add login-card`;
const usageCode = `// usage`;

export default function LoginCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Login Card</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A login form card component with email/password fields, social login buttons, and validation states.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Login card with form fields and social login options.</p></div>
        <ComponentPreview id="login-card"><div className="w-full p-4"><div className="w-full max-w-sm mx-auto"><div className="rounded-xl border bg-background p-6 shadow-sm"><div className="text-center mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div><h2 className="text-lg font-semibold text-foreground">Welcome back</h2><p className="text-sm text-muted-foreground">Sign in to your account</p></div><div className="flex flex-col gap-4"><div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Email</label><input className="px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" /></div><div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Password</label><input className="px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" type="password" placeholder="Enter your password" /></div><button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Sign In</button></div><div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t"></div></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div></div><div className="flex gap-3"><button className="flex-1 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">Google</button><button className="flex-1 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">GitHub</button></div></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onSubmit</td><td className="px-4 py-3 text-muted-foreground">(data: {email: string; password: string}) => void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">loading</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">error</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
