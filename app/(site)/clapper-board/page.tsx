"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CLAPPER_BOARD_SOURCE = `"use client";

import { cn } from "@/lib/cn";

interface ClapperBoardProps {
  scene?: string;
  take?: string;
  roll?: string;
  date?: string;
  production?: string;
  director?: string;
}

export function ClapperBoard({
  scene = "01",
  take = "03",
  roll = "A-001",
  date = "2024-01-15",
  production,
  director,
}: ClapperBoardProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-gray-900 text-white">
      <div className="relative">
        <div className="flex h-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={cn("flex-1", i % 2 === 0 ? "bg-white" : "bg-gray-900")}
              style={{ transform: "skewX(-12deg)" }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pt-10">
          <div className="h-1 w-full bg-gray-900" />
        </div>
      </div>
      <div className="p-4">
        {production && (
          <div className="mb-3">
            <p className="text-lg font-bold tracking-tight">{production}</p>
            {director && <p className="text-xs text-gray-400">Director: {director}</p>}
          </div>
        )}
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-gray-400">SCENE</span>
            <p className="font-mono text-lg">{scene}</p>
          </div>
          <div>
            <span className="text-gray-400">TAKE</span>
            <p className="font-mono text-lg">{take}</p>
          </div>
          <div>
            <span className="text-gray-400">ROLL</span>
            <p className="font-mono">{roll}</p>
          </div>
          <div>
            <span className="text-gray-400">DATE</span>
            <p className="font-mono">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

const BASIC_EXAMPLE = `<ClapperBoard scene={1} take={3} />`;

const PRODUCTION_EXAMPLE = `<ClapperBoard
  production="Sunset Boulevard"
  director="John Smith"
  scene={12}
  take={5}
  roll="034"
/>`;

const MINIMAL_EXAMPLE = `<ClapperBoard
  variant="minimal"
  scene={4}
  take={1}
  roll="B-002"
/>`;

function BasicClapperBoardDemo() {
  return (
    <div className="max-w-xs mx-auto">
      <div className="bg-gray-900 rounded-t-lg relative overflow-hidden">
        <div className="h-16 flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`flex-1 ${i % 2 === 0 ? "bg-white" : "bg-gray-900"}`} style={{ transform: `skewX(-12deg)` }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pt-12">
          <div className="h-1 w-full bg-gray-900 rotate-0" />
        </div>
      </div>
      <div className="bg-gray-900 rounded-b-lg p-4 text-white">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div><span className="text-gray-400">SCENE</span><p className="font-mono text-lg">01</p></div>
          <div><span className="text-gray-400">TAKE</span><p className="font-mono text-lg">03</p></div>
          <div><span className="text-gray-400">ROLL</span><p className="font-mono">A-001</p></div>
          <div><span className="text-gray-400">DATE</span><p className="font-mono">2024-01-15</p></div>
        </div>
      </div>
    </div>
  );
}

function ProductionInfoDemo() {
  return (
    <div className="max-w-sm mx-auto bg-gray-900 rounded-xl p-5 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <p className="text-lg font-bold tracking-tight">Sunset Boulevard</p>
          <p className="text-xs text-gray-400 mt-1">Director: John Smith</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">SB</div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        {[{ label: "SCENE", val: "12" }, { label: "TAKE", val: "05" }, { label: "Slate", val: "034" }].map((d) => (
          <div key={d.label} className="rounded-lg bg-white/10 p-2">
            <p className="text-[10px] text-gray-400 uppercase">{d.label}</p>
            <p className="font-mono text-lg">{d.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MinimalClapperBoardDemo() {
  return (
    <div className="max-w-xs mx-auto rounded-lg border border-border bg-card overflow-hidden">
      <div className="h-8 bg-foreground flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`flex-1 ${i % 2 === 0 ? "bg-background" : "bg-foreground"}`} style={{ transform: "skewX(-15deg)" }} />
        ))}
      </div>
      <div className="p-4">
        <div className="flex justify-between text-sm">
          <div><span className="text-muted-foreground text-xs">Scene</span><p className="font-medium">04</p></div>
          <div><span className="text-muted-foreground text-xs">Take</span><p className="font-medium">01</p></div>
          <div><span className="text-muted-foreground text-xs">Roll</span><p className="font-medium">B-002</p></div>
        </div>
      </div>
    </div>
  );
}

export default function ClapperBoardPage() {
  return (
    <ComponentDocPage
      name="Clapper Board"
      category="Data Display"
      description="A movie clapper board component for video editing, film production interfaces, and media project displays."
    >
      <PreviewPanel filename="clapper-board.tsx">
        <BasicClapperBoardDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CLAPPER_BOARD_SOURCE}
        filename="components/ui/ClapperBoard/ClapperBoard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Clapper Board" description="A classic movie clapper board design." code={BASIC_EXAMPLE}>
          <BasicClapperBoardDemo />
        </ExampleBlock>
        <ExampleBlock title="Production Info" description="Clapper board with full production details." code={PRODUCTION_EXAMPLE}>
          <ProductionInfoDemo />
        </ExampleBlock>
        <ExampleBlock title="Minimal Style" description="A simplified, modern clapper board design." code={MINIMAL_EXAMPLE}>
          <MinimalClapperBoardDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}