"use client";

import { useState } from "react";
import { DirectionProvider, useDirection } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const DIRECTION_SOURCE = `"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/cn";

export type Direction = "ltr" | "rtl";

export interface DirectionProviderProps {
  dir?: Direction;
  children: React.ReactNode;
  className?: string;
}

const DirectionContext = createContext<Direction>("ltr");

export function useDirection() {
  return useContext(DirectionContext);
}

export function DirectionProvider({ dir = "ltr", children, className }: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={dir}>
      <div dir={dir} className={cn(dir === "rtl" && "text-right", className)}>
        {children}
      </div>
    </DirectionContext.Provider>
  );
}`;

const BASIC_CODE = `import { DirectionProvider, useDirection } from "@/components/ui";

<DirectionProvider dir="rtl">
  <YourComponent />
</DirectionProvider>

// Inside a child component:
const dir = useDirection(); // "ltr" | "rtl"`;

const HOOK_CODE = `const dir = useDirection(); // "ltr" or "rtl"`;

function DirectionDemo({ label }: { label: string }) {
  const dir = useDirection();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">
        {label}: <span className="text-blue-500">{dir}</span>
      </p>
      <p className="text-xs text-muted-foreground">align: {dir === "ltr" ? "left" : "right"}</p>
      <div className="flex items-center gap-2 text-sm">
        <span>{dir === "ltr" ? "← Back" : "Forward →"}</span>
        <span className="text-muted-foreground">·</span>
        <span>{dir === "ltr" ? "Forward" : "Back →"}</span>
      </div>
    </div>
  );
}

export default function DirectionPage() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  return (
    <ComponentDocPage
      name="Direction"
      category="Utilities"
      description="Provides RTL and LTR direction context to child components via DirectionProvider and the useDirection hook. Essential for multilingual interfaces."
    >
      <PreviewPanel filename="direction-preview">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDir("ltr")}
              className="rounded-md border px-3 py-1 text-sm"
            >
              LTR
            </button>
            <button
              type="button"
              onClick={() => setDir("rtl")}
              className="rounded-md border px-3 py-1 text-sm"
            >
              RTL
            </button>
          </div>
          <DirectionProvider dir={dir}>
            <div className="w-full max-w-xs rounded-lg border p-4">
              <DirectionDemo label="Current" />
            </div>
          </DirectionProvider>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={DIRECTION_SOURCE} filename="Direction.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic Usage"
          description="Wrap any subtree in DirectionProvider and read direction with useDirection."
          code={BASIC_CODE}
        >
          <PreviewPanel filename="basic.tsx">
            <div className="flex gap-6">
              <DirectionProvider dir="ltr">
                <div className="rounded border p-3 w-36">
                  <DirectionDemo label="LTR" />
                </div>
              </DirectionProvider>
              <DirectionProvider dir="rtl">
                <div className="rounded border p-3 w-36">
                  <DirectionDemo label="RTL" />
                </div>
              </DirectionProvider>
            </div>
          </PreviewPanel>
        </ExampleBlock>

        <ExampleBlock
          title="useDirection Hook"
          description="Consume the active direction from context anywhere inside a provider."
          code={HOOK_CODE}
        >
          <PreviewPanel filename="hook.tsx">
            <DirectionProvider dir="rtl">
              <div className="rounded border p-3 w-48">
                <DirectionDemo label="RTL" />
              </div>
            </DirectionProvider>
          </PreviewPanel>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
