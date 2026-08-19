"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ArrowUp, ArrowDown, Maximize2, Minimize2, Eye, Target } from "lucide-react";
import { SCROLLPROGRESS_SOURCE, READING_EXAMPLE, PAGE_EXAMPLE, BAR_EXAMPLE, INDICATOR_EXAMPLE, TOTOP_EXAMPLE, CONTENT_EXAMPLE, SECTION_EXAMPLE } from "./scroll-progress-source";

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Reading Progress</span>
        <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">{progress}%</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex gap-2">
        <button onClick={() => setProgress(Math.max(0, progress - 10))} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm hover:bg-accent"><ArrowDown className="mr-1 h-4 w-4" />-10%</button>
        <button onClick={() => setProgress(Math.min(100, progress + 10))} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm hover:bg-accent"><ArrowUp className="mr-1 h-4 w-4" />+10%</button>
      </div>
    </div>
  );
}

function PageProgress() {
  const [progress, setProgress] = useState(35);
  return (
    <div className="w-full space-y-4">
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
        <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white drop-shadow-md">{progress}%</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Scroll to see page progress</span>
        <button onClick={() => setProgress((p) => (p + 15) % 115)} className="text-xs text-primary underline">Simulate scroll</button>
      </div>
    </div>
  );
}

function ProgressBar() {
  const [height, setHeight] = useState(4);
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <button onClick={() => setHeight(Math.max(2, height - 2))} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-2 py-1 text-sm hover:bg-accent"><Minimize2 className="h-4 w-4" /></button>
        <span className="text-sm font-medium">Height: {height}px</span>
        <button onClick={() => setHeight(Math.min(16, height + 2))} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-2 py-1 text-sm hover:bg-accent"><Maximize2 className="h-4 w-4" /></button>
      </div>
      <div className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" style={{ height: `${height}px`, width: "75%" }} />
    </div>
  );
}

function ScrollIndicator() {
  const [position, setPosition] = useState(0);
  return (
    <div className="w-full space-y-4">
      <div className="relative h-40 w-full rounded-lg border bg-muted/50 p-4">
        <div className="flex h-full flex-col justify-between text-xs text-muted-foreground">
          <span>Top</span>
          <span>Bottom</span>
        </div>
        <div className="absolute left-4 right-4 h-8 rounded-md bg-primary/20 border-2 border-dashed border-primary/50 transition-all duration-300" style={{ top: `${position}%` }} />
      </div>
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <input type="range" min={0} max={80} value={position} onChange={(e) => setPosition(Number(e.target.value))} className="flex-1" />
        <span className="text-sm tabular-nums">{Math.round((position / 80) * 100)}%</span>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setVisible(!visible)} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">Toggle visibility</button>
      </div>
      <div className="relative h-32 rounded-lg border bg-muted/50">
        {visible && (
          <div className="absolute bottom-4 right-4">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"><ArrowUp className="h-5 w-5" /></button>
          </div>
        )}
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Click the button in the bottom-right corner</div>
      </div>
    </div>
  );
}

function ContentProgress() {
  const [expanded, setExpanded] = useState(3);
  const paragraphs = [
    "Introduction to scroll progress tracking in modern web applications.",
    "Understanding the Intersection Observer API and its applications.",
    "Building custom scroll progress components with React hooks.",
    "Styling progress indicators with CSS transitions and animations.",
    "Advanced patterns for multi-section content tracking.",
    "Performance optimization for scroll event handlers.",
    "Final thoughts and best practices for production use.",
  ];
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Visible sections: {expanded}/{paragraphs.length}</span>
      </div>
      <div className="space-y-2 rounded-lg border p-4">
        {paragraphs.slice(0, expanded).map((p, i) => (
          <p key={i} className="text-sm text-muted-foreground">{p}</p>
        ))}
      </div>
      <button onClick={() => setExpanded(Math.min(paragraphs.length, expanded + 1))} className="text-sm text-primary underline">{expanded < paragraphs.length ? "Load more content" : "All content loaded"}</button>
    </div>
  );
}

function SectionProgress() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["Overview", "Features", "Pricing", "FAQ", "Contact"];
  return (
    <div className="w-full space-y-4">
      <nav className="flex items-center gap-1 rounded-lg border p-1">
        {sections.map((s, i) => (
          <button key={i} onClick={() => setActiveSection(i)} className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeSection === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{s}</button>
        ))}
      </nav>
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">Currently viewing section {activeSection + 1} of {sections.length}: {sections[activeSection]}</p>
      </div>
    </div>
  );
}

export default function ScrollProgressPage() {
  return (
    <ComponentDocPage
      name="Scroll Progress"
      category="Navigation"
      description="Display scroll progress indicators and reading position trackers for your content."
    >
      <PreviewPanel filename="scroll-progress.tsx">
        <ReadingProgress />
      </PreviewPanel>

      <SourceCodeViewer source={SCROLLPROGRESS_SOURCE} filename="components/ui/ScrollProgress/ScrollProgress.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Reading Progress" description="Track reading position with a percentage bar." code={READING_EXAMPLE}>
          <ReadingProgress />
        </ExampleBlock>
        <ExampleBlock title="Page Progress" description="Top-of-page progress indicator with label." code={PAGE_EXAMPLE}>
          <PageProgress />
        </ExampleBlock>
        <ExampleBlock title="Progress Bar" description="Adjustable-height gradient progress bar." code={BAR_EXAMPLE}>
          <ProgressBar />
        </ExampleBlock>
        <ExampleBlock title="Scroll Indicator" description="Draggable indicator of scroll position." code={INDICATOR_EXAMPLE}>
          <ScrollIndicator />
        </ExampleBlock>
        <ExampleBlock title="Scroll To Top" description="Button that appears to jump back to the top." code={TOTOP_EXAMPLE}>
          <ScrollToTop />
        </ExampleBlock>
        <ExampleBlock title="Content Progress" description="Progress tied to content reveal in sections." code={CONTENT_EXAMPLE}>
          <ContentProgress />
        </ExampleBlock>
        <ExampleBlock title="Section Progress" description="Highlight the currently active section." code={SECTION_EXAMPLE}>
          <SectionProgress />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
