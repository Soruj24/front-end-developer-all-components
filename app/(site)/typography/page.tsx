"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const TYPOGRAPHY_SOURCE = `import { cn } from "@/lib/cn";
import { TypographyProps } from "./Typography.types";

const elementClasses = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  h6: "scroll-m-20 text-base font-semibold tracking-tight",
  p: "leading-7",
  blockquote: "border-l-2 border-border pl-6 italic text-muted-foreground",
  code: "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
};

const defaultElement = {
  h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6",
  p: "p", blockquote: "blockquote", code: "code",
  lead: "p", large: "p", small: "p", muted: "p",
} as const;

export default function Typography({ as = "p", className, children }: TypographyProps) {
  const Component = defaultElement[as] as keyof React.JSX.IntrinsicElements;
  return <Component className={cn(elementClasses[as], className)}>{children}</Component>;
}`;

const HEADINGS_SOURCE = `import Typography from "@/components/ui/Typography";

function HeadingsShowcase() {
  return (
    <div className="flex flex-col gap-2">
      <Typography as="h1">Heading 1</Typography>
      <Typography as="h2">Heading 2</Typography>
      <Typography as="h3">Heading 3</Typography>
      <Typography as="h4">Heading 4</Typography>
      <Typography as="h5">Heading 5</Typography>
      <Typography as="h6">Heading 6</Typography>
    </div>
  );
}`;

const BODY_SOURCE = `import Typography from "@/components/ui/Typography";

function BodyShowcase() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="p">
        The quick brown fox jumps over the lazy dog. This is a paragraph of
        text that demonstrates the default body styling.
      </Typography>
      <Typography as="small">
        This is smaller text for captions and fine print.
      </Typography>
      <Typography as="blockquote">
        "Design is not just what it looks like and feels like. Design is how it works."
      </Typography>
    </div>
  );
}`;

const INLINE_SOURCE = `import Typography from "@/components/ui/Typography";

function InlineShowcase() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="lead">This is lead text — larger and muted for introductions.</Typography>
      <Typography as="large">This is large text for emphasis.</Typography>
      <Typography as="p">
        Use <Typography as="code">inline code</Typography> for code references
        and <Typography as="small">small text</Typography> for fine print.
      </Typography>
      <Typography as="muted">This is muted text for secondary content.</Typography>
    </div>
  );
}`;

const TAG: Record<string, string> = {
  h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",
  p:"p",blockquote:"blockquote",code:"code",
  lead:"p",large:"p",small:"small",muted:"p",
};
const CLS: Record<string, string> = {
  h1:"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2:"scroll-m-20 text-3xl font-semibold tracking-tight",
  h3:"scroll-m-20 text-2xl font-semibold tracking-tight",
  h4:"scroll-m-20 text-xl font-semibold tracking-tight",
  h5:"scroll-m-20 text-lg font-semibold tracking-tight",
  h6:"scroll-m-20 text-base font-semibold tracking-tight",
  p:"leading-7",
  blockquote:"border-l-2 border-border pl-6 italic text-muted-foreground",
  code:"rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold",
  lead:"text-xl text-muted-foreground",large:"text-lg font-semibold",
  small:"text-sm font-medium leading-none",muted:"text-sm text-muted-foreground",
};
function Inline({ as = "p", className = "", children }: { as?: string; className?: string; children: React.ReactNode }) {
  const Tag = TAG[as] || "p";
  return <Tag className={`${CLS[as] || CLS.p} ${className}`}>{children}</Tag>;
}

export default function TypographyPage() {
  return (
    <ComponentDocPage
      name="Typography"
      category="Data Display"
      description="Styles for headings, paragraphs, lists, and other text elements. Provides semantic typography variants out of the box."
    >
      <PreviewPanel filename="typography-preview.tsx">
        <div className="flex flex-col gap-2">
          <Inline as="h1">Heading 1</Inline>
          <Inline as="h2">Heading 2</Inline>
          <Inline as="h3">Heading 3</Inline>
          <Inline as="p">
            The quick brown fox jumps over the lazy dog. This is a paragraph of
            text that demonstrates the default body styling.
          </Inline>
        </div>
      </PreviewPanel>
      <SourceCodeViewer
        source={TYPOGRAPHY_SOURCE}
        filename="components/ui/Typography/Typography.tsx"
        defaultExpanded
      />
      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Headings"
          description="Heading variants from h1 to h6."
          code={HEADINGS_SOURCE}
          filename="headings.tsx"
        >
          <div className="flex flex-col gap-2">
            <Inline as="h1">Heading 1</Inline>
            <Inline as="h2">Heading 2</Inline>
            <Inline as="h3">Heading 3</Inline>
            <Inline as="h4">Heading 4</Inline>
            <Inline as="h5">Heading 5</Inline>
            <Inline as="h6">Heading 6</Inline>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Body"
          description="Body text, small text, and blockquote styles."
          code={BODY_SOURCE}
          filename="body.tsx"
        >
          <div className="flex flex-col gap-4">
            <Inline as="p">
              The quick brown fox jumps over the lazy dog. This is a paragraph of
              text that demonstrates the default body styling.
            </Inline>
            <Inline as="small">
              This is smaller text for captions and fine print.
            </Inline>
            <Inline as="blockquote">
              &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
            </Inline>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Inline Variants"
          description="Lead, large, code, small, and muted text for specialized contexts."
          code={INLINE_SOURCE}
          filename="inline-variants.tsx"
        >
          <div className="flex flex-col gap-4">
            <Inline as="lead">
              This is lead text — larger and muted for introductions.
            </Inline>
            <Inline as="large">
              This is large text for emphasis.
            </Inline>
            <Inline as="p">
              Use <Inline as="code">inline code</Inline> for code references
              and <Inline as="small">small text</Inline> for fine print.
            </Inline>
            <Inline as="muted">This is muted text for secondary content.</Inline>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
