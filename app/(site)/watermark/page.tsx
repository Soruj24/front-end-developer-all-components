"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Droplet, Eye, EyeOff, Lock, Shield, Image, FileText } from "lucide-react";

const installCommand = `npx shadcn@latest add watermark`;

const usageCode = `import { Watermark } from "@/components/ui/watermark";

export function WatermarkDemo() {
  return (
    <Watermark text="Confidential">
      <div className="p-8">
        <h3>Protected Content</h3>
        <p>This content has a watermark overlay.</p>
      </div>
    </Watermark>
  );
}`;

function TextWatermark() {
  const [text, setText] = useState("DRAFT");
  const [visible, setVisible] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Watermark text"
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
        <button
          onClick={() => setVisible(!visible)}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent"
        >
          {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
      </div>
      <div className="relative min-h-[150px] rounded-lg border bg-white p-6">
        {visible && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <span className="rotate-[-30deg] text-6xl font-bold text-gray-400 select-none">
              {text}
            </span>
          </div>
        )}
        <div className="relative">
          <h4 className="text-lg font-semibold">Document Content</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            This is sample content with a text watermark overlay.
          </p>
        </div>
      </div>
    </div>
  );
}

function ImageWatermark() {
  const [opacity, setOpacity] = useState(0.1);
  const [position, setPosition] = useState("center");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Opacity: {Math.round(opacity * 100)}%</span>
        <input
          type="range"
          min={1}
          max={50}
          value={opacity * 100}
          onChange={(e) => setOpacity(Number(e.target.value) / 100)}
          className="flex-1"
        />
      </div>
      <div className="flex gap-2">
        {["center", "tile", "corner"].map((p) => (
          <button
            key={p}
            onClick={() => setPosition(p)}
            className={`rounded-md px-3 py-1.5 text-sm capitalize ${
              position === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="relative min-h-[150px] rounded-lg border bg-white p-6">
        {position === "center" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity }}>
            <Image className="h-24 w-24 text-gray-300" />
          </div>
        )}
        {position === "tile" && (
          <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
            <div className="grid grid-cols-4 gap-4 p-4">
              {Array(12).fill(0).map((_, i) => (
                <Image key={i} className="h-8 w-8 text-gray-300" />
              ))}
            </div>
          </div>
        )}
        {position === "corner" && (
          <div className="absolute bottom-4 right-4 pointer-events-none" style={{ opacity }}>
            <Image className="h-16 w-16 text-gray-300" />
          </div>
        )}
        <div className="relative">
          <h4 className="text-lg font-semibold">Protected Document</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Image watermark with adjustable opacity and position.
          </p>
        </div>
      </div>
    </div>
  );
}

function DiagonalPattern() {
  const [spacing, setSpacing] = useState(80);
  const [angle, setAngle] = useState(-45);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs">Spacing: {spacing}px</span>
          <input
            type="range"
            min={40}
            max={120}
            value={spacing}
            onChange={(e) => setSpacing(Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Angle: {angle}deg</span>
          <input
            type="range"
            min={-90}
            max={90}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
      <div className="relative min-h-[150px] rounded-lg border bg-white p-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px)",
          }}
        />
        <div className="relative">
          <h4 className="text-lg font-semibold">Pattern Watermark</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Diagonal line pattern as a subtle watermark.
          </p>
        </div>
      </div>
    </div>
  );
}

function CenteredWatermark() {
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(48);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Watermark text"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs">Size: {fontSize}px</span>
          <input
            type="range"
            min={24}
            max={96}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
      <div className="relative min-h-[150px] rounded-lg border bg-white p-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="rotate-[-30deg] font-bold text-gray-200 select-none whitespace-nowrap"
            style={{ fontSize: `${fontSize}px` }}
          >
            {text}
          </span>
        </div>
        <div className="relative">
          <h4 className="text-lg font-semibold">Centered Watermark</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Large centered text watermark with adjustable size.
          </p>
        </div>
      </div>
    </div>
  );
}

function SubtleMark() {
  const [intensity, setIntensity] = useState(5);
  const [type, setType] = useState("dots");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {["dots", "lines", "grid"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-md px-3 py-1.5 text-sm capitalize ${
                type === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Intensity: {intensity}%</span>
          <input
            type="range"
            min={1}
            max={20}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
      <div className="relative min-h-[150px] rounded-lg border bg-white p-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: intensity / 100 }}
        >
          {type === "dots" && (
            <div className="h-full w-full" style={{
              backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />
          )}
          {type === "lines" && (
            <div className="h-full w-full" style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, #000 19px, #000 20px)",
            }} />
          )}
          {type === "grid" && (
            <div className="h-full w-full" style={{
              backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />
          )}
        </div>
        <div className="relative">
          <h4 className="text-lg font-semibold">Subtle Pattern</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Very subtle pattern overlay for gentle watermarking.
          </p>
        </div>
      </div>
    </div>
  );
}

function CopyrightMark() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [owner, setOwner] = useState("Your Company");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Copyright owner"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-24 rounded-md border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="relative min-h-[150px] rounded-lg border bg-white p-6">
        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
          <span className="text-xs text-gray-400">
            &copy; {year} {owner}. All rights reserved.
          </span>
        </div>
        <div className="relative">
          <h4 className="text-lg font-semibold">Copyright Footer</h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Standard copyright notice as a subtle footer watermark.
          </p>
        </div>
      </div>
    </div>
  );
}

function BrandingWatermark() {
  const [brand, setBrand] = useState("Acme Inc");
  const [show, setShow] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Brand name"
        />
        <button
          onClick={() => setShow(!show)}
          className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm ${
            show ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <Shield className="mr-1 h-4 w-4" />
          {show ? "Visible" : "Hidden"}
        </button>
      </div>
      <div className="relative min-h-[150px] rounded-lg border bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        {show && (
          <div className="absolute top-4 left-4 pointer-events-none">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
              <Lock className="h-3 w-3 text-white/70" />
              <span className="text-xs text-white/70">{brand}</span>
            </div>
          </div>
        )}
        {show && (
          <div className="absolute bottom-4 right-4 pointer-events-none">
            <span className="text-xs text-white/30">Protected by {brand}</span>
          </div>
        )}
        <div className="relative flex h-full items-center justify-center">
          <div className="text-center text-white">
            <FileText className="mx-auto mb-2 h-8 w-8 text-white/50" />
            <p className="text-sm text-white/70">Premium Content</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WatermarkPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="secondary">New</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          <Droplet className="mr-2 inline h-8 w-8" />
          Watermark
        </h1>
        <p className="text-lg text-muted-foreground">
          Add text, image, and pattern watermarks to protect your content.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Text Watermark</h3>
          <ComponentPreview>
            <TextWatermark />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Image Watermark</h3>
          <ComponentPreview>
            <ImageWatermark />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Diagonal Pattern</h3>
          <ComponentPreview>
            <DiagonalPattern />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Centered Watermark</h3>
          <ComponentPreview>
            <CenteredWatermark />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Subtle Mark</h3>
          <ComponentPreview>
            <SubtleMark />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Copyright Mark</h3>
          <ComponentPreview>
            <CopyrightMark />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Branding Watermark</h3>
          <ComponentPreview>
            <BrandingWatermark />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Prop</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Default</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">text</td>
                <td className="p-3">string</td>
                <td className="p-3">undefined</td>
                <td className="p-3">Text content for watermark</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">image</td>
                <td className="p-3">string</td>
                <td className="p-3">undefined</td>
                <td className="p-3">Image URL for watermark</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">opacity</td>
                <td className="p-3">number</td>
                <td className="p-3">0.1</td>
                <td className="p-3">Watermark opacity (0-1)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">position</td>
                <td className="p-3">"center" | "tile" | "corner"</td>
                <td className="p-3">"center"</td>
                <td className="p-3">Watermark position</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">rotate</td>
                <td className="p-3">number</td>
                <td className="p-3">-30</td>
                <td className="p-3">Rotation angle in degrees</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3">string</td>
                <td className="p-3">undefined</td>
                <td className="p-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
