"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const GRADIENT_TEXT_SOURCE = `"use client";

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: string;
  animated?: boolean;
  className?: string;
}

export function GradientText({
  children,
  gradient = "from-blue-600 to-cyan-500",
  animated = false,
  className,
}: GradientTextProps) {
  return (
    <span
      className={[
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradient,
        animated ? "bg-[length:200%_auto]" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      {children}
    </span>
  );
}`;

const STYLES_CODE = `<p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Blue to Cyan</p>
<p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Purple to Pink</p>
<p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">Amber to Red</p>
<p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Green to Emerald</p>`;

const ANIMATED_CODE = `<p className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto]"
  style={{ animation: "gradient-move 3s ease infinite" }}>
  Animated Gradient
</p>`;

const MULTISTOP_CODE = `<p className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">Rainbow Text</p>
<p className="text-xl font-semibold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Modern Gradient</p>
<p className="text-lg bg-gradient-to-r from-teal-400 to-sky-500 bg-clip-text text-transparent">Ocean Breeze</p>`;

export default function GradientTextPage() {
  return (
    <ComponentDocPage
      name="Gradient Text"
      category="Data Display"
      description="A gradient text component for creating colorful, animated, and visually striking text effects using CSS gradients."
    >
      <PreviewPanel filename="gradient-text.tsx">
        <style>{`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        <div className="flex w-full flex-col items-center gap-4 py-4">
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Blue to Cyan</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Purple to Pink</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: "gradient-move 3s ease infinite" }}>Animated Gradient</p>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={GRADIENT_TEXT_SOURCE} filename="components/ui/GradientText/GradientText.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Gradient Styles" description="Different gradient text presets." code={STYLES_CODE} filename="gradient-styles.tsx">
          <div className="w-full p-4">
            <div className="space-y-4 text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Blue to Cyan</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Purple to Pink</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">Amber to Red</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Green to Emerald</p>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Animated Gradient" description="Text with animated gradient backgrounds." code={ANIMATED_CODE} filename="animated-gradient.tsx">
          <div className="w-full p-4">
            <style>{`
              @keyframes gradient-move {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: "gradient-move 3s ease infinite" }}>Animated Gradient</p>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Multi-stop Gradient" description="Text with multiple color stops." code={MULTISTOP_CODE} filename="multi-stop-gradient.tsx">
          <div className="w-full p-4">
            <div className="space-y-3 text-center">
              <p className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">Rainbow Text</p>
              <p className="text-xl font-semibold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Modern Gradient</p>
              <p className="text-lg bg-gradient-to-r from-teal-400 to-sky-500 bg-clip-text text-transparent">Ocean Breeze</p>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}