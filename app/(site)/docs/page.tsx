"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "installation", label: "Installation" },
  { id: "project-structure", label: "Project Structure" },
  { id: "usage", label: "Usage" },
  { id: "customization", label: "Customization" },
  { id: "faq", label: "FAQ" },
];

const installSteps = [
  {
    step: 1,
    title: "Create a new Next.js project",
    code: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir",
    filename: "Terminal",
  },
  {
    step: 2,
    title: "Install required dependencies",
    code: "npm install clsx tailwind-merge",
    filename: "Terminal",
  },
  {
    step: 3,
    title: "Create the utility function",
    code: `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
    filename: "lib/cn.ts",
  },
];

const projectStructure = `my-app/
├── app/
│   ├── (site)/
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Site layout
│   │   └── components/       # Your pages
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── home/                 # Home page components
│   └── layout/               # Layout components
├── lib/
│   └── cn.ts                 # Utility function
├── public/                   # Static assets
├── styles/
│   └── globals.css           # Design tokens
└── package.json`;

const usageExamples = [
  {
    title: "Import a component",
    description: "Copy any component file into your project and import it.",
    code: `import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <Button variant="primary" size="lg">
      Get Started
    </Button>
  )
}`,
    filename: "app/page.tsx",
  },
  {
    title: "Use the cn utility",
    description: "Merge Tailwind classes conditionally with the cn helper.",
    code: `import { cn } from "@/lib/cn"

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-6",
        className
      )}
      {...props}
    />
  )
}`,
    filename: "components/card.tsx",
  },
  {
    title: "Customize with props",
    description: "Most components support variant props for quick customization.",
    code: `import { Button } from "@/components/ui/button"

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
    filename: "app/page.tsx",
  },
];

const customizationTips = [
  {
    title: "Design Tokens",
    description: "All colors, spacing, and typography are defined as CSS custom properties in globals.css.",
    code: `/* styles/globals.css */
:root {
  --primary: oklch(0.56 0.23 277.117);
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --border: oklch(0.922 0 0);
  /* ... */
}`,
    filename: "styles/globals.css",
  },
  {
    title: "Theme Switching",
    description: "Dark mode is built-in using CSS custom properties and the dark variant.",
    code: `// Toggle dark mode
document.documentElement.classList.toggle("dark")

// Or use next-themes
import { ThemeProvider } from "next-themes"

<ThemeProvider attribute="class">
  {children}
</ThemeProvider>`,
    filename: "app/layout.tsx",
  },
  {
    title: "Component Variants",
    description: "Extend components by adding new variants to the variant objects.",
    code: `type Variant = "primary" | "secondary" | "outline"

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border bg-transparent",
}

// Add your own
const myVariant = "bg-violet-600 text-white"`,
    filename: "components/button.tsx",
  },
];

const faqItems = [
  {
    question: "Do I need to install Tailwind CSS?",
    answer: "Yes, this library is built with Tailwind CSS v4. Make sure it's configured in your project.",
  },
  {
    question: "Can I use these components with JavaScript?",
    answer: "While the components are written in TypeScript, you can use them in JavaScript projects by removing type annotations.",
  },
  {
    question: "Are the components accessible?",
    answer: "Yes, all components follow WAI-ARIA best practices with proper roles, labels, and keyboard navigation.",
  },
  {
    question: "How do I customize the theme?",
    answer: "Edit the CSS custom properties in styles/globals.css. All design tokens are centralized there.",
  },
  {
    question: "Can I use these in a production app?",
    answer: "Absolutely. The components are production-ready, lightweight, and follow best practices.",
  },
  {
    question: "Do you support server components?",
    answer: "Yes, most components are compatible with React Server Components. Client-only components are marked with 'use client'.",
  },
];

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label ? `Copy ${label}` : "Copy"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150",
        copied
          ? "bg-success/10 text-success"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      )}
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-background shadow-card">
      {filename && (
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-2">
          <span className="font-mono text-[11px] text-muted-foreground">{filename}</span>
          <CopyButton value={code} label={filename} />
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code className="text-foreground/80">{code}</code>
      </pre>
    </div>
  );
}

function StepCard({ step, title, code, filename }: { step: number; title: string; code: string; filename: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-background shadow-card transition-all duration-200 hover:border-ring/30">
      <div className="flex items-center gap-3 border-b border-border/60 bg-muted/30 px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {step}
        </span>
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>
      <CodeBlock code={code} filename={filename} />
    </div>
  );
}

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("installation");

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Documentation
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Getting Started
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Everything you need to know to start building with our component library.
            Copy, paste, and customize.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-1 rounded-xl border border-border/60 bg-muted/30 p-1 backdrop-blur">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-2xl border border-border/60 bg-background/80 p-6 backdrop-blur sm:p-8">
          {/* Installation */}
          {activeTab === "installation" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Quick Start</h2>
                <p className="mt-2 text-muted-foreground">
                  Get up and running in under 2 minutes. Follow these steps to set up your project.
                </p>
              </div>
              <div className="space-y-4">
                {installSteps.map((s) => (
                  <StepCard key={s.step} {...s} />
                ))}
              </div>
              <div className="rounded-xl border border-success/20 bg-success/5 p-4">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-foreground">You're all set!</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npm run dev</code> to start your development server.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Structure */}
          {activeTab === "project-structure" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Project Structure</h2>
                <p className="mt-2 text-muted-foreground">
                  The library follows a clean, modular structure. Here's how files are organized.
                </p>
              </div>
              <CodeBlock code={projectStructure} filename="Project Structure" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                  <h3 className="text-sm font-semibold text-foreground">components/ui/</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reusable UI primitives like Button, Input, Card. Copy these directly into your project.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                  <h3 className="text-sm font-semibold text-foreground">lib/cn.ts</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Utility function for merging Tailwind CSS classes. Required by most components.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                  <h3 className="text-sm font-semibold text-foreground">styles/globals.css</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Design tokens, CSS variables, and global styles. Customize your theme here.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                  <h3 className="text-sm font-semibold text-foreground">app/(site)/</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Route group for your pages. Each folder becomes a route.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Usage */}
          {activeTab === "usage" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">How to Use</h2>
                <p className="mt-2 text-muted-foreground">
                  Learn the basic patterns for using components in your project.
                </p>
              </div>
              <div className="space-y-6">
                {usageExamples.map((example) => (
                  <div key={example.title} className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{example.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{example.description}</p>
                    </div>
                    <CodeBlock code={example.code} filename={example.filename} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customization */}
          {activeTab === "customization" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Customization</h2>
                <p className="mt-2 text-muted-foreground">
                  Make the components your own. Customize colors, spacing, and more.
                </p>
              </div>
              <div className="space-y-6">
                {customizationTips.map((tip) => (
                  <div key={tip.title} className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{tip.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                    <CodeBlock code={tip.code} filename={tip.filename} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
                <p className="mt-2 text-muted-foreground">
                  Common questions about using the component library.
                </p>
              </div>
              <div className="space-y-3">
                {faqItems.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-border/60 bg-muted/20"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/40">
                      {item.question}
                      <svg className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <div className="border-t border-border/60 px-4 pb-4 pt-3">
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Ready to build?{" "}
            <Link href="/components" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
              Browse all components
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
