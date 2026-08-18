"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Link2, ArrowRight, ChevronDown } from "lucide-react";

const installCommand = `npx component-library@latest add anchor-navigation`;
const usageCode = `import { AnchorNavigation } from "@/components/anchor-navigation";

<AnchorNavigation
  anchors={[
    { id: "intro", label: "Introduction" },
    { id: "setup", label: "Setup" },
    { id: "usage", label: "Usage" },
  ]}
/>`;

interface Anchor {
  id: string;
  label: string;
}

const anchors: Anchor[] = [
  { id: "introduction", label: "Introduction" },
  { id: "installation", label: "Installation" },
  { id: "configuration", label: "Configuration" },
  { id: "api-reference", label: "API Reference" },
  { id: "examples", label: "Examples" },
];

function AnchorNavDemo({ items, variant = "default" }: { items: Anchor[]; variant?: "default" | "pills" | "underline" }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  return (
    <nav className="flex flex-col gap-1">
      {items.map((anchor) => (
        <button
          key={anchor.id}
          onClick={() => setActive(anchor.id)}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            variant === "pills"
              ? active === anchor.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              : variant === "underline"
              ? active === anchor.id ? "border-b-2 border-primary text-foreground" : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
              : active === anchor.id ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          }`}
        >
          <Link2 className="h-3.5 w-3.5" />
          {anchor.label}
          {active === anchor.id && <ArrowRight className="ml-auto h-3.5 w-3.5" />}
        </button>
      ))}
    </nav>
  );
}

function ScrollSpyDemo() {
  const [active, setActive] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sections = anchors.map((a) => document.getElementById(a.id));
      const scrollPos = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i]!.offsetTop <= scrollPos) {
          setActive(anchors[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-card p-4">
      <span className="text-xs font-semibold uppercase text-muted-foreground">Scroll Spy</span>
      {anchors.map((a) => (
        <div
          key={a.id}
          id={a.id}
          className={`rounded-md px-3 py-2 text-sm transition-colors ${active === a.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"}`}
        >
          {a.label}
        </div>
      ))}
    </div>
  );
}

function DropdownAnchorDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
      >
        Jump to Section <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-lg border bg-card shadow-lg">
          {anchors.map((a) => (
            <button
              key={a.id}
              onClick={() => setOpen(false)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AnchorNavigationPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Anchor Navigation</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          In-page anchor navigation with scroll-spy, sticky positioning, and multiple layout variants for long-form content.
        </p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Default Navigation</h2>
        <ComponentPreview>
          <div className="w-full max-w-xs">
            <AnchorNavDemo items={anchors} variant="default" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Pills Variant</h2>
        <ComponentPreview>
          <div className="w-full max-w-xs">
            <AnchorNavDemo items={anchors} variant="pills" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Underline Variant</h2>
        <ComponentPreview>
          <div className="w-full max-w-md">
            <AnchorNavDemo items={anchors} variant="underline" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Dropdown Anchor</h2>
        <ComponentPreview>
          <DropdownAnchorDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">anchors</td><td className="px-4 py-3 text-muted-foreground">Anchor[]</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{'"default" | "pills" | "underline"'}</td><td className="px-4 py-3 text-muted-foreground">{'"default"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">sticky</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">scrollSpy</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
