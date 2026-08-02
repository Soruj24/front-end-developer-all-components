"use client";

import { ComponentPreview } from "@/components/preview";
import { Dock } from "@/components/ui";
import { dockApps, minimalApps } from "@/components/dock/demo";

export default function DockPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Dock
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A macOS-inspired launcher. Icons magnify around the cursor on
          pointer-capable devices, labels pop above on hover, running apps
          carry a dot, and everything — order included — is draggable,
          keyboard-accessible, responsive, and theme-aware.
        </p>
      </header>

      <ComponentPreview id="dock-magnifying">
        <div className="flex w-full items-end justify-center overflow-x-auto py-14">
          <Dock items={dockApps} ariaLabel="Application dock" />
        </div>
      </ComponentPreview>

      <ComponentPreview id="dock-minimal">
        <div className="flex w-full flex-col items-center gap-3 py-10">
          <Dock items={minimalApps} magnification={false} draggable={false} ariaLabel="Quick launch toolbar" />
          <p className="text-xs text-subtle">
            Same component, fewer features — ideal for compact toolbars that
            still need tooltips, active dots, and keyboard focus.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="dock-keyboard">
        <div className="flex w-full flex-col items-center gap-4 py-10">
          <Dock items={dockApps} ariaLabel="Dock — keyboard demo" />
          <p className="text-xs text-subtle">
            Tab into the dock, then use{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">←</kbd>{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">→</kbd> to
            move between apps,{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Home</kbd>/
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">End</kbd> to
            jump, and{" "}
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Enter</kbd> to
            launch. Drag any icon to reorder.
          </p>
        </div>
      </ComponentPreview>
    </div>
  );
}
