"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const MARQUEE_SCROLL_SOURCE = `"use client";

import type { ReactNode } from "react";

interface MarqueeScrollProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

const MARQUEE_KEYFRAMES =
  "@keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }";

export function MarqueeScroll({
  children,
  speed = 15,
  reverse = false,
  pauseOnHover = true,
  className,
}: MarqueeScrollProps) {
  return (
    <div className={"relative overflow-hidden py-4 " + (className ?? "")}>
      <div
        className="flex w-max gap-8 whitespace-nowrap"
        style={{
          animation:
            "marquee-scroll " + speed + "s linear infinite" + (reverse ? " reverse" : ""),
        }}
        onMouseEnter={
          pauseOnHover
            ? (e) => {
                e.currentTarget.style.animationPlayState = "paused";
              }
            : undefined
        }
        onMouseLeave={
          pauseOnHover
            ? (e) => {
                e.currentTarget.style.animationPlayState = "running";
              }
            : undefined
        }
      >
        {children}
        {children}
      </div>
      <style>{MARQUEE_KEYFRAMES}</style>
    </div>
  );
}`;

const TEXT_MARQUEE_CODE = `const words = ["React", "TypeScript", "Next.js", "Tailwind", "Node.js", "Prisma", "Vercel", "Figma"];

<MarqueeScroll speed={15}>
  {words.map((word) => (
    <span key={word} className="text-2xl font-bold text-foreground/10">{word}</span>
  ))}
</MarqueeScroll>`;

const TAG_MARQUEE_CODE = `const tags = Array.from({ length: 6 }, (_, i) => "Tag " + (i + 1));

<MarqueeScroll speed={12} reverse pauseOnHover>
  {tags.map((tag) => (
    <div key={tag} className="flex-none rounded-full border px-6 py-3">
      <span className="text-sm font-medium text-foreground">{tag}</span>
    </div>
  ))}
</MarqueeScroll>`;

function MarqueeDemo() {
  const words = ["React", "TypeScript", "Next.js", "Tailwind", "Node.js", "Prisma", "Vercel", "Figma"];
  const tags = Array.from({ length: 6 }, (_, i) => `Tag ${i + 1}`);

  return (
    <div className="w-full p-4">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex flex-col gap-6 overflow-hidden">
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-8 whitespace-nowrap" style={{ animation: "marquee 15s linear infinite" }}>
            {[...words, ...words].map((w, i) => (
              <span key={i} className="text-2xl font-bold text-foreground/10">{w}</span>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-6 whitespace-nowrap" style={{ animation: "marquee 12s linear infinite reverse" }}>
            {[...tags, ...tags].map((t, i) => (
              <div key={i} className="flex-none rounded-full border px-6 py-3">
                <span className="text-sm font-medium text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarqueeScrollPage() {
  return (
    <ComponentDocPage
      name="Marquee Scroll"
      category="Animation"
      description="An infinite scrolling marquee component that continuously moves content horizontally or vertically."
    >
      <PreviewPanel filename="marquee-scroll.tsx">
        <MarqueeDemo />
      </PreviewPanel>

      <SourceCodeViewer source={MARQUEE_SCROLL_SOURCE} filename="components/ui/MarqueeScroll/MarqueeScroll.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Text Marquee" description="Large words scrolling continuously." code={TEXT_MARQUEE_CODE} filename="text-marquee.tsx">
          <div className="w-full p-4">
            <style>{`
              @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
            `}</style>
            <div className="relative overflow-hidden py-4">
              <div className="flex gap-8 whitespace-nowrap" style={{ animation: "marquee 15s linear infinite" }}>
                {[...["React", "TypeScript", "Next.js", "Tailwind", "Node.js", "Prisma", "Vercel", "Figma"], ...["React", "TypeScript", "Next.js", "Tailwind", "Node.js", "Prisma", "Vercel", "Figma"]].map((w, i) => (
                  <span key={i} className="text-2xl font-bold text-foreground/10">{w}</span>
                ))}
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Tag Marquee" description="Pill tags scrolling in reverse with pause on hover." code={TAG_MARQUEE_CODE} filename="tag-marquee.tsx">
          <div className="w-full p-4">
            <style>{`
              @keyframes marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
            `}</style>
            <div className="relative overflow-hidden py-4">
              <div className="flex gap-6 whitespace-nowrap" style={{ animation: "marquee 12s linear infinite reverse" }}>
                {[...Array.from({ length: 6 }, (_, i) => `Tag ${i + 1}`), ...Array.from({ length: 6 }, (_, i) => `Tag ${i + 1}`)].map((t, i) => (
                  <div key={i} className="flex-none rounded-full border px-6 py-3">
                    <span className="text-sm font-medium text-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}