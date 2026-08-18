"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";

const installCommand = `npx component-library@latest add aspect-container`;

const usageCode = `import { AspectContainer } from "@/components/ui/AspectContainer";

<AspectContainer ratio="16/9">
  <img src="/hero.jpg" alt="Hero" className="h-full w-full object-cover" />
</AspectContainer>

<AspectContainer ratio="4/3">
  <video src="/demo.mp4" controls className="h-full w-full object-cover" />
</AspectContainer>`;

function AspectRatio16x9() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RectangleHorizontal className="h-4 w-4" />
        <span>16:9</span>
      </div>
      <div className="w-full max-w-md overflow-hidden rounded-lg border">
        <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">16:9 Container</span>
        </div>
      </div>
    </div>
  );
}

function AspectRatio4x3() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RectangleVertical className="h-4 w-4" />
        <span>4:3</span>
      </div>
      <div className="w-full max-w-xs overflow-hidden rounded-lg border">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">4:3 Container</span>
        </div>
      </div>
    </div>
  );
}

function AspectRatio1x1() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Square className="h-4 w-4" />
        <span>1:1</span>
      </div>
      <div className="w-full max-w-[200px] overflow-hidden rounded-lg border">
        <div className="relative aspect-square bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">1:1 Container</span>
        </div>
      </div>
    </div>
  );
}

function AspectRatioResponsive() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Responsive aspect ratios</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[21/9] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">21:9</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-video bg-gradient-to-r from-violet-500/20 to-pink-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">16:9</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[4/3] bg-gradient-to-r from-green-500/20 to-teal-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">4:3</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-square bg-gradient-to-r from-rose-500/20 to-red-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">1:1</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[3/4] bg-gradient-to-r from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">3:4</span>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <div className="aspect-[9/16] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">9:16</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AspectRatioImageGrid() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Image grid with consistent aspect ratios</p>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="overflow-hidden rounded-lg border">
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">{i}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AspectContainerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Aspect Container</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Maintain consistent aspect ratios for media elements. Supports any ratio like 16:9, 4:3, 1:1, and custom values for responsive layouts.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">16:9 Ratio</h2>
          <p className="mt-1 text-sm text-muted-foreground">Standard widescreen aspect ratio for video and hero images.</p>
        </div>
        <ComponentPreview id="aspect-16-9">
          <AspectRatio16x9 />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">4:3 Ratio</h2>
          <p className="mt-1 text-sm text-muted-foreground">Classic standard ratio for photos and presentations.</p>
        </div>
        <ComponentPreview id="aspect-4-3">
          <AspectRatio4x3 />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">1:1 Ratio</h2>
          <p className="mt-1 text-sm text-muted-foreground">Perfect square for avatars, thumbnails, and social media.</p>
        </div>
        <ComponentPreview id="aspect-1-1">
          <AspectRatio1x1 />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Responsive Ratios</h2>
          <p className="mt-1 text-sm text-muted-foreground">Multiple aspect ratios in a responsive grid.</p>
        </div>
        <ComponentPreview id="aspect-responsive">
          <AspectRatioResponsive />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Image Grid</h2>
          <p className="mt-1 text-sm text-muted-foreground">Uniform image grid with square aspect ratios.</p>
        </div>
        <ComponentPreview id="aspect-image-grid">
          <AspectRatioImageGrid />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">ratio</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{`"16/9"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
