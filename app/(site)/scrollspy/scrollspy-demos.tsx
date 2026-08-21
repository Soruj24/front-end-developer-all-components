"use client";

import { useState, useEffect } from "react";
import { Scrollspy, ScrollspyProgress, ScrollspyBackToTop } from "@/components/ui/Scrollspy";
import { useScrollspy } from "@/components/ui/Scrollspy";
import type { ScrollspyNavItem } from "@/components/ui/Scrollspy";
import { Home, Star, Zap, Shield, HelpCircle } from "lucide-react";

const navItems: ScrollspyNavItem[] = [
  { id: "hero", label: "Hero", icon: <Home className="h-4 w-4" /> },
  { id: "features", label: "Features", icon: <Zap className="h-4 w-4" /> },
  { id: "testimonials", label: "Testimonials", icon: <Star className="h-4 w-4" /> },
  { id: "pricing", label: "Pricing", icon: <Shield className="h-4 w-4" /> },
  { id: "faq", label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
];

const longSections = [
  { id: "hero", title: "Hero Section", content: "The hero section is the first thing visitors see. It should clearly communicate your value proposition, include a compelling headline, a brief description, and a strong call-to-action. Keep it clean and focused.", color: "bg-blue-500" },
  { id: "features", title: "Features", content: "Showcase your key features with clear icons and concise descriptions. Group related features together and highlight the most impactful ones. Use visual hierarchy to guide the reader's eye through the content.", color: "bg-emerald-500" },
  { id: "testimonials", title: "Testimonials", content: "Social proof builds trust. Include customer quotes, company logos, and real names with photos. Keep testimonials specific and results-focused. Short, impactful quotes work better than long paragraphs.", color: "bg-violet-500" },
  { id: "pricing", title: "Pricing", content: "Present pricing clearly with feature comparisons. Highlight the recommended plan. Include annual vs monthly toggle and a money-back guarantee to reduce friction.", color: "bg-amber-500" },
  { id: "faq", title: "FAQ", content: "Address common objections and questions. Organize by category, use expandable sections, and keep answers concise. Include a contact link for questions not covered.", color: "bg-rose-500" },
];

function SectionContent() {
  return (
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
  );
}

export function SidebarDemo() {
  const [active, setActive] = useState("hero");
  return (
    <div className="flex w-full gap-6">
      <div className="w-40 shrink-0 border-r border-border/60 pr-4">
        <Scrollspy items={navItems} variant="sidebar" onSectionChange={setActive} />
      </div>
      <SectionContent />
    </div>
  );
}

export function DotsDemo() {
  const [active, setActive] = useState("hero");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Scrollspy items={navItems} variant="dots" onSectionChange={setActive} />
        <span className="text-xs text-muted-foreground">Active: {active}</span>
      </div>
      <SectionContent />
    </div>
  );
}

export function PillsDemo() {
  const [active, setActive] = useState("hero");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Scrollspy items={navItems} variant="pills" onSectionChange={setActive} />
        <span className="text-xs text-muted-foreground">Active: {active}</span>
      </div>
      <SectionContent />
    </div>
  );
}

export function ProgressDemo() {
  const { activeId, progress } = useScrollspy(longSections.map((s) => s.id), 100);
  return (
    <div className="flex flex-col gap-6">
      <ScrollspyProgress progress={progress} />
      <SectionContent />
    </div>
  );
}

export function BackToTopDemo() {
  return (
    <div className="flex flex-col gap-6">
      <SectionContent />
      <ScrollspyBackToTop threshold={300} />
    </div>
  );
}
