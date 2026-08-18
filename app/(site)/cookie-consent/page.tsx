"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Cookie } from "lucide-react";

const installCommand = `npx component-library@latest add cookie-consent`;
const usageCode = `import { CookieConsent } from "@/components/ui/cookie-consent";

<CookieConsent onAccept={handleAccept} />`;

export default function CookieConsentPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Cookie Consent</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A cookie consent banner component for GDPR compliance with accept/reject options and preference management.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Bottom Banner</h2><p className="mt-1 text-sm text-muted-foreground">A banner that appears at the bottom of the screen.</p></div>
        <ComponentPreview id="cookie-consent-banner">
          <div className="w-full p-4">
            <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
              <Cookie className="h-8 w-8 text-amber-600 shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">We use cookies</p>
                <p className="text-xs text-muted-foreground mt-1">This website uses cookies to enhance your browsing experience and provide personalized content.</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-medium">Reject</button>
                <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">Accept All</button>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Categories</h2><p className="mt-1 text-sm text-muted-foreground">Consent banner with category toggles.</p></div>
        <ComponentPreview id="cookie-consent-categories">
          <div className="w-full p-4">
            <div className="max-w-md mx-auto rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="h-6 w-6 text-amber-600" />
                <p className="text-sm font-medium">Cookie Preferences</p>
              </div>
              <div className="space-y-3 mb-4">
                {[{ label: "Essential", desc: "Required for site functionality", checked: true, disabled: true }, { label: "Analytics", desc: "Help us improve our website", checked: true }, { label: "Marketing", desc: "Personalized advertisements", checked: false }].map((cat) => (
                  <div key={cat.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{cat.label}</p>
                      <p className="text-xs text-muted-foreground">{cat.desc}</p>
                    </div>
                    <div className={`h-5 w-9 rounded-full flex items-center px-0.5 ${cat.checked ? "bg-primary justify-end" : "bg-muted justify-start"}`}>
                      <div className="h-4 w-4 rounded-full bg-white shadow" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-md bg-muted text-foreground text-xs font-medium">Save Preferences</button>
                <button className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium">Accept All</button>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Floating Widget</h2><p className="mt-1 text-sm text-muted-foreground">A small cookie icon that expands on click.</p></div>
        <ComponentPreview id="cookie-consent-widget">
          <div className="w-full p-4">
            <div className="flex justify-end">
              <button className="h-12 w-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <Cookie className="h-5 w-5 text-amber-600" />
              </button>
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
