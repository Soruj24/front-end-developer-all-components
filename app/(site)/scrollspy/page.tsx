"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Eye, ArrowUp } from "lucide-react";

const installCommand = `npx component-library@latest add scrollspy`;

const usageCode = `import { ScrollSpy } from "@/components/scrollspy";

<ScrollSpy
  sections={["intro", "features", "pricing"]}
  renderLink={(id, active) => (
    <a href={\\\`#\\\${id}\\\`} className={active ? "active" : ""}>
      {id}
    </a>
  )}
/>`;

const navItems = [
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "testimonials", label: "Testimonials" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const longSections = [
  {
    id: "hero",
    title: "Hero Section",
    content: "The hero section is the first thing visitors see. It should clearly communicate your value proposition, include a compelling headline, a brief description, and a strong call-to-action. Keep it clean and focused.",
    color: "bg-blue-500",
  },
  {
    id: "features",
    title: "Features",
    content: "Showcase your key features with clear icons and concise descriptions. Group related features together and highlight the most impactful ones. Use visual hierarchy to guide the reader's eye through the content.",
    color: "bg-emerald-500",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    content: "Social proof builds trust. Include customer quotes, company logos, and real names with photos. Keep testimonials specific and results-focused. Short, impactful quotes work better than long paragraphs.",
    color: "bg-violet-500",
  },
  {
    id: "pricing",
    title: "Pricing",
    content: "Present pricing clearly with feature comparisons. Highlight the recommended plan. Include annual vs monthly toggle and a money-back guarantee to reduce friction.",
    color: "bg-amber-500",
  },
  {
    id: "faq",
    title: "FAQ",
    content: "Address common objections and questions. Organize by category, use expandable sections, and keep answers concise. Include a contact link for questions not covered.",
    color: "bg-rose-500",
  },
];

export default function ScrollspyPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      const sections = longSections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: 0 };
        const rect = el.getBoundingClientRect();
        return { id: s.id, top: Math.abs(rect.top - 100) };
      });
      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Scrollspy</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Track scroll position and highlight the current section in navigation. Includes progress indicators and smooth transitions.
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

      <ComponentPreview id="scrollspy-sidebar">
        <div className="flex w-full gap-6">
          <nav className="flex w-40 flex-col gap-1 border-r border-border pr-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all ${
                  activeSection === item.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    activeSection === item.id ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex-1 flex flex-col gap-12">
            {longSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-20">
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${section.color}`} />
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="scrollspy-progress">
        <div className="w-full">
          <div className="sticky top-0 z-10 mb-6">
            <div className="h-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Scroll progress</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {longSections.map((section) => (
              <div key={section.id} id={`progress-${section.id}`} className="scroll-mt-20">
                <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="scrollspy-dots">
        <div className="flex items-center gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className={`h-3 w-3 rounded-full transition-all ${
                activeSection === item.id
                  ? "bg-primary ring-4 ring-primary/20"
                  : "bg-muted-foreground/20 hover:bg-muted-foreground/40"
              }`}
              title={item.label}
            />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="scrollspy-back-to-top">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowUp className="h-4 w-4" />
            Back to Top
          </button>
          <span className="text-sm text-muted-foreground">Scroll position: {Math.round(scrollProgress)}%</span>
        </div>
      </ComponentPreview>

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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">sections</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">offset</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showProgress</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onSectionChange</td>
                <td className="px-4 py-3 text-muted-foreground">(id: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
