"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Camera } from "lucide-react";

const installCommand = `npx component-library@latest add camera-lens`;
const usageCode = `import { CameraLens } from "@/components/ui/camera-lens";

<CameraLens size="lg" />`;

export default function CameraLensPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Camera Lens</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A camera lens visual component for photography apps, media players, and visual effect overlays.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Lens Sizes</h2><p className="mt-1 text-sm text-muted-foreground">Camera lens in different sizes with aperture effect.</p></div>
        <ComponentPreview id="camera-lens-sizes">
          <div className="w-full p-4">
            <div className="flex items-end gap-6 justify-center">
              {["sm", "md", "lg"].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div className={`${size === "sm" ? "h-16 w-16" : size === "md" ? "h-24 w-24" : "h-32 w-32"} rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg`}>
                    <div className={`${size === "sm" ? "h-10 w-10" : size === "md" ? "h-16 w-16" : "h-20 w-20"} rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center`}>
                      <div className={`${size === "sm" ? "h-6 w-6" : size === "md" ? "h-10 w-10" : "h-12 w-12"} rounded-full bg-gradient-to-br from-blue-900 to-blue-700`} />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Viewfinder Overlay</h2><p className="mt-1 text-sm text-muted-foreground">A lens with viewfinder grid lines for composition.</p></div>
        <ComponentPreview id="camera-lens-viewfinder">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto">
              <div className="relative rounded-xl bg-gray-900 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-4 border border-white/20 rounded">
                  <div className="absolute top-1/3 left-0 right-0 border-t border-white/10" />
                  <div className="absolute top-2/3 left-0 right-0 border-t border-white/10" />
                  <div className="absolute left-1/3 top-0 bottom-0 border-l border-white/10" />
                  <div className="absolute left-2/3 top-0 bottom-0 border-l border-white/10" />
                </div>
                <Camera className="h-8 w-8 text-white/40" />
                <div className="absolute top-2 left-2 text-[10px] text-white/50">REC</div>
                <div className="absolute bottom-2 right-2 text-[10px] text-white/50">f/2.8</div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Aperture Selector</h2><p className="mt-1 text-sm text-muted-foreground">Lens with selectable aperture stops.</p></div>
        <ComponentPreview id="camera-lens-aperture">
          <div className="w-full p-4">
            <div className="flex gap-3 justify-center">
              {["f/1.4", "f/2.0", "f/2.8", "f/4.0"].map((aperture) => (
                <button key={aperture} className="flex flex-col items-center gap-1">
                  <div className={`h-12 w-12 rounded-full border-2 ${aperture === "f/2.8" ? "border-primary" : "border-border"} flex items-center justify-center`}>
                    <div className={`rounded-full bg-foreground/10 ${aperture === "f/1.4" ? "h-8 w-8" : aperture === "f/2.0" ? "h-7 w-7" : aperture === "f/2.8" ? "h-6 w-6" : "h-4 w-4"}`} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{aperture}</span>
                </button>
              ))}
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
