"use client";

import { Message } from "@/components/ui/Message";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const MESSAGE_SOURCE = `"use client";

import { cn } from "@/lib/cn";

type MessageVariant = "info" | "success" | "warning" | "error";

interface MessageProps {
  variant?: MessageVariant;
  title?: string;
  description?: string;
  className?: string;
}

const variantStyles: Record<MessageVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  success: "border-green-200 bg-green-50 text-green-900",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
  error: "border-red-200 bg-red-50 text-red-900",
};

const variantIcons: Record<MessageVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕",
};

export function Message({
  variant = "info",
  title,
  description,
  className,
}: MessageProps) {
  return (
    <div className={cn("flex items-start gap-3 rounded-md border p-4", variantStyles[variant], className)}>
      <span className="mt-0.5 text-lg leading-none">{variantIcons[variant]}</span>
      <div className="flex-1 space-y-1">
        {title && <p className="text-sm font-medium leading-none">{title}</p>}
        {description && <p className="text-sm leading-relaxed opacity-80">{description}</p>}
      </div>
    </div>
  );
}`;

const VARIANTS_SOURCE = `import { Message } from "@/components/ui/Message";

function VariantsShowcase() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <Message variant="info" title="Info" description="This is an informational message." />
      <Message variant="success" title="Success" description="Operation completed successfully." />
      <Message variant="warning" title="Warning" description="Please review before proceeding." />
      <Message variant="error" title="Error" description="Something went wrong." />
    </div>
  );
}`;

const TITLE_ONLY_SOURCE = `import { Message } from "@/components/ui/Message";

function TitleOnlyShowcase() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <Message variant="info" title="Server is starting..." />
      <Message variant="success" title="Changes saved" />
      <Message variant="error" title="Connection failed" />
    </div>
  );
}`;

const CUSTOM_CLASS_SOURCE = `import { Message } from "@/components/ui/Message";

function CustomClassShowcase() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <Message
        variant="success"
        title="Deployed"
        description="Your app is live."
        className="max-w-sm"
      />
    </div>
  );
}`;

export default function MessagePage() {
  return (
    <ComponentDocPage
      name="Message"
      category="Feedback"
      description="A styled alert message component with variant-based colors, icons, title, and description for inline feedback."
    >
      <PreviewPanel filename="message-preview.tsx">
        <div className="flex flex-col gap-3 w-full max-w-lg">
          <Message variant="info" title="Info" description="This is an informational message." />
          <Message variant="success" title="Success" description="Operation completed successfully." />
          <Message variant="warning" title="Warning" description="Please review before proceeding." />
          <Message variant="error" title="Error" description="Something went wrong." />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={MESSAGE_SOURCE}
        filename="components/ui/Message.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Variants"
          description="Four semantic variants: info, success, warning, and error."
          code={VARIANTS_SOURCE}
          filename="variants.tsx"
        >
          <div className="flex flex-col gap-3 w-full max-w-lg">
            <Message variant="info" title="Info" description="This is an informational message." />
            <Message variant="success" title="Success" description="Operation completed successfully." />
            <Message variant="warning" title="Warning" description="Please review before proceeding." />
            <Message variant="error" title="Error" description="Something went wrong." />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Title Only"
          description="Messages can display just a title without description."
          code={TITLE_ONLY_SOURCE}
          filename="title-only.tsx"
        >
          <div className="flex flex-col gap-3 w-full max-w-lg">
            <Message variant="info" title="Server is starting..." />
            <Message variant="success" title="Changes saved" />
            <Message variant="error" title="Connection failed" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Width"
          description="Apply custom classes to constrain or expand the message width."
          code={CUSTOM_CLASS_SOURCE}
          filename="custom-class.tsx"
        >
          <div className="flex flex-col gap-3 w-full max-w-lg">
            <Message
              variant="success"
              title="Deployed"
              description="Your app is live."
              className="max-w-sm"
            />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
