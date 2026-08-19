"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Camera } from "lucide-react";

const CAMERALENS_SOURCE = `"use client";

interface CameraLensProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { outer: "h-16 w-16", ring: "h-10 w-10", lens: "h-6 w-6" },
  md: { outer: "h-24 w-24", ring: "h-16 w-16", lens: "h-10 w-10" },
  lg: { outer: "h-32 w-32", ring: "h-20 w-20", lens: "h-12 w-12" },
};

export function CameraLens({ size = "md", className = "" }: CameraLensProps) {
  const s = sizes[size];
  return (
    <div className={"rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg " + s.outer + " " + className}>
      <div className={"rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center " + s.ring}>
        <div className={"rounded-full bg-gradient-to-br from-blue-900 to-blue-700 " + s.lens} />
      </div>
    </div>
  );
}`;

const SIZES_CODE = `<CameraLens size="sm" />
<CameraLens size="md" />
<CameraLens size="lg" />`;

const VIEWFINDER_CODE = `<div className="relative rounded-xl bg-gray-900 aspect-[4/3] flex items-center justify-center overflow-hidden">
  <div className="absolute inset-4 border border-white/20 rounded">
    <div className="absolute top-1/3 left-0 right-0 border-t border-white/10" />
    <div className="absolute top-2/3 left-0 right-0 border-t border-white/10" />
    <div className="absolute left-1/3 top-0 bottom-0 border-l border-white/10" />
    <div className="absolute left-2/3 top-0 bottom-0 border-l border-white/10" />
  </div>
  <Camera className="h-8 w-8 text-white/40" />
</div>`;

const APERTURE_CODE = `{["f/1.4", "f/2.0", "f/2.8", "f/4.0"].map((aperture) => (
  <button key={aperture} className="flex flex-col items-center gap-1">
    <div className="h-12 w-12 rounded-full border-2 flex items-center justify-center">
      <div className="rounded-full bg-foreground/10 h-6 w-6" />
    </div>
    <span className="text-[10px] text-muted-foreground">{aperture}</span>
  </button>
))}`;

function LensSizesDemo() {
  return (
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
  );
}

function ViewfinderDemo() {
  return (
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
  );
}

function ApertureDemo() {
  return (
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
  );
}

export default function CameraLensPage() {
  return (
    <ComponentDocPage
      name="Camera Lens"
      category="Data Display"
      description="A camera lens visual component for photography apps, media players, and visual effect overlays."
    >
      <PreviewPanel filename="camera-lens.tsx">
        <LensSizesDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CAMERALENS_SOURCE}
        filename="components/ui/CameraLens/CameraLens.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Lens Sizes" description="Camera lens in different sizes with aperture effect." code={SIZES_CODE}>
          <LensSizesDemo />
        </ExampleBlock>
        <ExampleBlock title="Viewfinder Overlay" description="A lens with viewfinder grid lines for composition." code={VIEWFINDER_CODE}>
          <ViewfinderDemo />
        </ExampleBlock>
        <ExampleBlock title="Aperture Selector" description="Lens with selectable aperture stops." code={APERTURE_CODE}>
          <ApertureDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}