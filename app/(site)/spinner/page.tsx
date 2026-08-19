"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Spinner } from "@/components/ui";

const SPINNER_SOURCE = `import { SpinnerProps } from "@/components/ui/Spinner";

const sizeMap: Record<string, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

function Spinner({ size = "md", color, className = "" }: SpinnerProps) {
  return (
    <svg
      className={\`animate-spin \${sizeMap[size]} \${className}\`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke={color || "currentColor"} strokeWidth="3" strokeLinecap="round" className="opacity-20" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color || "currentColor"} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default Spinner;`;

const DEFAULT_CODE = `<Spinner />`;

const SIZE_CODE = `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`;

const COLOR_CODE = `<Spinner color="#3b82f6" />
<Spinner color="#ef4444" />
<Spinner color="#22c55e" />`;

export default function SpinnerPage() {
  return (
    <ComponentDocPage
      name="Spinner"
      category="Feedback"
      description="An animated spinner for indicating loading states."
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <PreviewPanel filename="Spinner.tsx">
          <Spinner />
        </PreviewPanel>
        <SourceCodeViewer
          source={SPINNER_SOURCE}
          filename="components/ui/Spinner.tsx"
          defaultExpanded
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>
        <ExampleBlock
          title="Default"
          description="The default spinner with medium size."
          code={DEFAULT_CODE}
          filename="Example.tsx"
        >
          <Spinner />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three available sizes: small, medium, and large."
          code={SIZE_CODE}
          filename="Sizes.tsx"
        >
          <div className="flex items-center gap-6">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Colors"
          description="Pass a color prop to customize the spinner color."
          code={COLOR_CODE}
          filename="Colors.tsx"
        >
          <div className="flex items-center gap-6">
            <Spinner color="#3b82f6" />
            <Spinner color="#ef4444" />
            <Spinner color="#22c55e" />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
