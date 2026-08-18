"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add comic-panel`;
const usageCode = `import { ComicPanel } from "@/components/ui/comic-panel";

<ComicPanel layout="2x2">
  <div>Panel 1</div>
  <div>Panel 2</div>
  <div>Panel 3</div>
  <div>Panel 4</div>
</ComicPanel>`;

export default function ComicPanelPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Comic Panel</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A comic-style panel layout component for creating storyboard grids, comic strips, and narrative sequences.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">2x2 Grid</h2><p className="mt-1 text-sm text-muted-foreground">A classic 4-panel comic layout.</p></div>
        <ComponentPreview id="comic-panel-2x2">
          <div className="w-full p-4">
            <div className="grid grid-cols-2 gap-1 max-w-md mx-auto border-2 border-foreground rounded-lg overflow-hidden">
              {[
                { bg: "bg-blue-100 dark:bg-blue-900/30", text: "The hero arrives" },
                { bg: "bg-green-100 dark:bg-green-900/30", text: "A challenge appears" },
                { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "The battle begins" },
                { bg: "bg-red-100 dark:bg-red-900/30", text: "Victory!" },
              ].map((panel, i) => (
                <div key={i} className={`${panel.bg} aspect-square flex items-center justify-center p-4 border border-foreground/20`}>
                  <p className="text-sm font-medium text-center">{panel.text}</p>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Speech Bubbles</h2><p className="mt-1 text-sm text-muted-foreground">Panels with character dialogue.</p></div>
        <ComponentPreview id="comic-panel-speech">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto">
              <div className="relative rounded-lg border-2 border-foreground bg-yellow-50 dark:bg-yellow-950/30 p-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-foreground/30 relative mb-4 max-w-[80%]">
                  <p className="text-sm">Hello there!</p>
                  <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-foreground/30 rotate-45" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-foreground/30 relative max-w-[80%] ml-auto">
                  <p className="text-sm">General Kenobi!</p>
                  <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-foreground/30 rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Action Panels</h2><p className="mt-1 text-sm text-muted-foreground">Dynamic panels with action effects.</p></div>
        <ComponentPreview id="comic-panel-action">
          <div className="w-full p-4">
            <div className="max-w-md mx-auto space-y-1">
              <div className="bg-red-100 dark:bg-red-900/30 border-2 border-foreground rounded-lg p-4 text-center">
                <p className="text-lg font-bold italic tracking-wider">POW!</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-blue-100 dark:bg-blue-900/30 border-2 border-foreground rounded-lg p-4 text-center aspect-square flex items-center justify-center">
                  <p className="text-sm font-bold italic">ZAP!</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 border-2 border-foreground rounded-lg p-4 text-center aspect-square flex items-center justify-center">
                  <p className="text-sm font-bold italic">WHAM!</p>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
