"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Eye, EyeOff, Layers, Lock, Unlock, Settings, X } from "lucide-react";

const installCommand = "npx component-library@latest add overlay-blur";

const usageCode = `import { useState } from "react";

export function OverlayBlur({ children, intensity = "md", visible = true }) {
  const blurMap = { sm: "blur-sm", md: "blur-md", lg: "blur-lg" };

  return (
    <div className="relative">
      {children}
      {visible && (
        <div className={clsx(
          "absolute inset-0 bg-background/30 backdrop-blur",
          blurMap[intensity]
        )} />
      )}
    </div>
  );
}`;

function BlurOverlay() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="w-full max-w-md">
      <div className="relative rounded-xl overflow-hidden h-48 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Background content</p>
        </div>
        {visible && (
          <div className="absolute inset-0 backdrop-blur-md bg-background/30 flex items-center justify-center">
            <span className="text-lg font-semibold text-foreground">Blurred Overlay</span>
          </div>
        )}
      </div>
      <button onClick={() => setVisible(!visible)} className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-foreground hover:bg-muted/80 transition-colors">
        {visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        {visible ? "Remove blur" : "Apply blur"}
      </button>
    </div>
  );
}

function ModalBlur() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-md">
      <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
        Open Modal
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-80 rounded-2xl border bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Confirm Action</h3>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">This action cannot be undone. Are you sure you want to proceed?</p>
            <div className="flex gap-2">
              <button onClick={() => setOpen(false)} className="flex-1 px-3 py-2 rounded-lg bg-muted text-sm font-medium text-foreground">Cancel</button>
              <button onClick={() => setOpen(false)} className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BackdropBlur() {
  const [intensity, setIntensity] = useState("md");
  const levels = ["sm", "md", "lg"];

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 mb-3">
        {levels.map((l) => (
          <button key={l} onClick={() => setIntensity(l)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${intensity === l ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="relative rounded-xl overflow-hidden h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-green-500/30" />
        <div className={`absolute inset-0 bg-background/${intensity === "sm" ? "10" : intensity === "md" ? "20" : "30"} backdrop-blur-${intensity} flex items-center justify-center`}>
          <span className="text-sm font-medium text-foreground">blur-{intensity}</span>
        </div>
      </div>
    </div>
  );
}

function ContentBlur() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="w-full max-w-md">
      <div className="relative rounded-xl border p-6">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Premium Content</span>
        </div>
        <div className={`text-sm text-muted-foreground leading-relaxed transition-all duration-500 ${revealed ? "" : "blur-md select-none"}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        {!revealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={() => setRevealed(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-lg">
              <Unlock className="h-4 w-4" /> Reveal content
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageBlur() {
  const [blur, setBlur] = useState(true);
  return (
    <div className="w-full max-w-md">
      <div className="relative rounded-xl overflow-hidden h-48 bg-muted">
        <div className={`absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20 transition-all duration-500 ${blur ? "blur-lg" : ""}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-foreground">Image placeholder</span>
        </div>
      </div>
      <button onClick={() => setBlur(!blur)} className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-foreground">
        {blur ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
        {blur ? "Show image" : "Hide image"}
      </button>
    </div>
  );
}

function PrivacyBlur() {
  const [hideSensitive, setHideSensitive] = useState(true);
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Account Details</span>
          <button onClick={() => setHideSensitive(!hideSensitive)} className="p-1 rounded hover:bg-muted">
            {hideSensitive ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Email</span>
            <span className={`text-xs text-foreground ${hideSensitive ? "blur-sm select-none" : ""}`}>user@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Phone</span>
            <span className={`text-xs text-foreground ${hideSensitive ? "blur-sm select-none" : ""}`}>+1 (555) 123-4567</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Card</span>
            <span className={`text-xs text-foreground ${hideSensitive ? "blur-sm select-none" : ""}`}>**** **** **** 4242</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingBlur() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full max-w-md">
      <div className="relative rounded-xl border overflow-hidden">
        <div className={`p-6 transition-all duration-300 ${loading ? "blur-sm" : ""}`}>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-5/6" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-8 bg-muted rounded w-20" />
            <div className="h-8 bg-muted rounded w-20" />
          </div>
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <div className="flex flex-col items-center gap-2">
              <Settings className="h-6 w-6 text-muted-foreground animate-spin" />
              <span className="text-xs text-muted-foreground">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <button onClick={() => setLoading(!loading)} className="mt-3 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-foreground">
        {loading ? "Show content" : "Show loading"}
      </button>
    </div>
  );
}

export default function OverlayBlurPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Overlay Blur</h1>
          <Badge variant="primary">7 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A blur overlay component that creates a frosted glass effect over content with adjustable blur intensity. Includes modal, backdrop, content, image, privacy, and loading variants.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Blur Overlay</h3>
          <ComponentPreview id="overlay-blur-basic">
            <BlurOverlay />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Modal Blur</h3>
          <ComponentPreview id="overlay-blur-modal">
            <ModalBlur />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Backdrop Blur</h3>
          <ComponentPreview id="overlay-blur-backdrop">
            <BackdropBlur />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Content Blur</h3>
          <ComponentPreview id="overlay-blur-content">
            <ContentBlur />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Image Blur</h3>
          <ComponentPreview id="overlay-blur-image">
            <ImageBlur />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Privacy Blur</h3>
          <ComponentPreview id="overlay-blur-privacy">
            <PrivacyBlur />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Loading Blur</h3>
          <ComponentPreview id="overlay-blur-loading">
            <LoadingBlur />
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 font-mono text-xs">visible</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">intensity</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\""}</td>
                <td className="px-4 py-3 text-muted-foreground">"md"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"bg-background/30"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
