"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add underline-text`;
const usageCode = `import { UnderlineText } from "@/components/_underline-text";

<UnderlineText variant="solid">Solid underline</UnderlineText>
<UnderlineText variant="dashed">Dashed underline</UnderlineText>`;

function UnderlineSample({ variant, label }: { variant: string; label: string }) {
  const styles: Record<string, string> = {
    solid: "underline decoration-solid underline-offset-4",
    dashed: "underline decoration-dashed underline-offset-4",
    dotted: "underline decoration-dotted underline-offset-4",
    wavy: "underline decoration-wavy underline-offset-4",
    thick: "underline decoration-2 underline-offset-4",
    double: "underline decoration-double underline-offset-4",
  };
  return (
    <span className={`text-lg font-medium ${styles[variant] || ""}`}>{label}</span>
  );
}

export default function UnderlineTextPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Underline Text</h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Text underlines with various styles including solid, dashed, dotted, wavy, and double variants.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Underline Styles</h2>
        <div className="flex flex-wrap gap-6">
          <UnderlineSample variant="solid" label="Solid underline" />
          <UnderlineSample variant="dashed" label="Dashed underline" />
          <UnderlineSample variant="dotted" label="Dotted underline" />
          <UnderlineSample variant="wavy" label="Wavy underline" />
          <UnderlineSample variant="thick" label="Thick underline" />
          <UnderlineSample variant="double" label="Double underline" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Variants</h2>
        <div className="flex flex-wrap gap-6">
          <span className="underline decoration-primary underline-offset-4">Primary</span>
          <span className="underline decoration-success underline-offset-4">Success</span>
          <span className="underline decoration-warning underline-offset-4">Warning</span>
          <span className="underline decoration-danger underline-offset-4">Danger</span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">In Context</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This paragraph contains <span className="font-medium underline decoration-primary underline-offset-4">underlined text</span> that demonstrates how underlines work inline with regular content, including{" "}
          <span className="underline decoration-dashed underline-offset-4">dashed sections</span> and{" "}
          <span className="underline decoration-wavy underline-offset-4">wavy highlights</span>.
        </p>
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;solid&quot; | &quot;dashed&quot; | &quot;dotted&quot; | &quot;wavy&quot; | &quot;thick&quot; | &quot;double&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;solid&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
