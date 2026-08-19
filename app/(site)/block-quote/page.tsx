"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const BLOCK_QUOTE_SOURCE = `"use client";

interface BlockQuoteProps {
  author?: string;
  source?: string;
  children: React.ReactNode;
}

export function BlockQuote({ author, source, children }: BlockQuoteProps) {
  return (
    <blockquote className="border-l-4 border-primary py-2 pl-4">
      <p className="text-sm italic text-muted-foreground">{children}</p>
      {(author || source) && (
        <footer className="mt-2 text-xs text-muted-foreground">
          {author}
          {author && source ? ", " : ""}
          {source}
        </footer>
      )}
    </blockquote>
  );
}`;

const SIMPLE_EXAMPLE = `<BlockQuote author="Dieter Rams">
  Good design is as little design as possible.
</BlockQuote>`;

const TESTIMONIAL_EXAMPLE = `<div className="rounded-xl border border-border bg-card p-6">
  <div className="mb-3 flex gap-1">
    {"★★★★★".split("").map((s, i) => (
      <span key={i} className="text-sm text-yellow-500">{s}</span>
    ))}
  </div>
  <p>This component library has transformed how we build UIs.</p>
  <div className="mt-4 flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">JD</div>
    <div>
      <p className="text-sm font-medium">Jane Doe</p>
      <p className="text-xs text-muted-foreground">Senior Engineer</p>
    </div>
  </div>
</div>`;

const HIGHLIGHT_EXAMPLE = `<BlockQuote source="Steve Jobs">
  Design is not just what it looks like and feels like.
</BlockQuote>`;

function SimpleQuoteDemo() {
  return (
    <div className="w-full p-4">
      <blockquote className="border-l-4 border-primary pl-4 py-2">
        <p className="text-sm text-muted-foreground italic">Good design is as little design as possible. Less, but better.</p>
        <footer className="mt-2 text-xs text-muted-foreground">— Dieter Rams</footer>
      </blockquote>
    </div>
  );
}

function TestimonialCardDemo() {
  return (
    <div className="w-full p-4">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex gap-1 mb-3">{"★★★★★".split("").map((s, i) => <span key={i} className="text-yellow-500 text-sm">{s}</span>)}</div>
        <p className="text-sm leading-relaxed text-foreground">This component library has transformed how we build UIs. The quality and consistency are outstanding.</p>
        <div className="flex items-center gap-3 mt-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">JD</div>
          <div><p className="text-sm font-medium">Jane Doe</p><p className="text-xs text-muted-foreground">Senior Engineer</p></div>
        </div>
      </div>
    </div>
  );
}

function HighlightedQuoteDemo() {
  return (
    <div className="w-full p-4">
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
        <div className="text-4xl text-primary/30 font-serif leading-none mb-2">"</div>
        <p className="text-lg font-medium text-foreground">Design is not just what it looks like and feels like. Design is how it works.</p>
        <footer className="mt-3 text-sm text-muted-foreground">— Steve Jobs</footer>
      </div>
    </div>
  );
}

export default function BlockQuotePage() {
  return (
    <ComponentDocPage
      name="Block Quote"
      category="Data Display"
      description="A styled blockquote component for highlighting quotes, testimonials, and important excerpts in your content."
    >
      <PreviewPanel filename="block-quote.tsx">
        <SimpleQuoteDemo />
      </PreviewPanel>
      <SourceCodeViewer source={BLOCK_QUOTE_SOURCE} filename="components/ui/BlockQuote/BlockQuote.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Simple Quote" description="A basic blockquote with left border accent." code={SIMPLE_EXAMPLE}><SimpleQuoteDemo /></ExampleBlock>
        <ExampleBlock title="Testimonial Card" description="A styled testimonial with avatar and attribution." code={TESTIMONIAL_EXAMPLE}><TestimonialCardDemo /></ExampleBlock>
        <ExampleBlock title="Highlighted Quote" description="A prominent quote with background styling." code={HIGHLIGHT_EXAMPLE}><HighlightedQuoteDemo /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}