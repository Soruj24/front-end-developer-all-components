"use client";

import { InputGroup } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const INPUTGROUP_SOURCE = `"use client";

import { cn } from "@/lib/cn";
import type { InputGroupProps } from "./InputGroup.types";

export function InputGroup({ prefix, suffix, className, children }: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center rounded-xl border border-border bg-card transition-colors",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        "hover:border-muted-foreground/30",
        className,
      )}
    >
      {prefix && (
        <div className="flex shrink-0 items-center pl-3 text-sm text-muted-foreground">
          {prefix}
        </div>
      )}
      <div className="flex-1 [&>input]:w-full [&>input]:border-0 [&>input]:bg-transparent [&>input]:py-2.5 [&>input]:text-sm [&>input]:text-foreground [&>input]:placeholder:text-muted-foreground [&>input]:focus:outline-none focus:[&>input]:ring-0 [&>input]:focus:border-0">
        {children}
      </div>
      {suffix && (
        <div className="flex shrink-0 items-center pr-3 text-sm text-muted-foreground">
          {suffix}
        </div>
      )}
    </div>
  );
}`;

function SearchIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

export default function InputGroupPage() {
  return (
    <ComponentDocPage
      name="Input Group"
      category="Forms"
      description="Input fields with prepended or appended content like icons, text labels, or buttons. Useful for search bars, pricing inputs, and more."
    >
      <PreviewPanel filename="input-group-preview.tsx">
        <div className="w-full max-w-sm">
          <InputGroup prefix={<SearchIcon />}>
            <input type="text" placeholder="Search..." />
          </InputGroup>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={INPUTGROUP_SOURCE}
        filename="components/ui/InputGroup/InputGroup.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Icon Prefix"
          description="Add an icon before the input for visual context."
          code={`import { InputGroup } from "@/components/ui";
import { SearchIcon } from "lucide-react";

<InputGroup prefix={<SearchIcon />}>
  <input type="text" placeholder="Search..." />
</InputGroup>`}
          filename="icon-prefix.tsx"
        >
          <div className="w-full max-w-sm">
            <InputGroup prefix={<SearchIcon />}>
              <input type="text" placeholder="Search..." />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Text Prefix"
          description="Prepend text like a country code or label."
          code={`import { InputGroup } from "@/components/ui";

<InputGroup prefix="@">
  <input type="text" placeholder="username" />
</InputGroup>`}
          filename="text-prefix.tsx"
        >
          <div className="w-full max-w-sm">
            <InputGroup prefix="@">
              <input type="text" placeholder="username" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Text Suffix"
          description="Append text like a unit or extension."
          code={`import { InputGroup } from "@/components/ui";

<InputGroup suffix=".00">
  <input type="text" placeholder="0" />
</InputGroup>`}
          filename="text-suffix.tsx"
        >
          <div className="w-full max-w-sm">
            <InputGroup suffix=".00">
              <input type="text" placeholder="0" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Prefix & Suffix"
          description="Combine both prefix and suffix for URLs or formatted values."
          code={`import { InputGroup } from "@/components/ui";

<InputGroup prefix="https://" suffix=".com">
  <input type="text" placeholder="example" />
</InputGroup>`}
          filename="prefix-suffix.tsx"
        >
          <div className="w-full max-w-sm">
            <InputGroup prefix="https://" suffix=".com">
              <input type="text" placeholder="example" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Email Input"
          description="Mail icon prefix for email fields."
          code={`import { InputGroup } from "@/components/ui";
import { MailIcon } from "lucide-react";

<InputGroup prefix={<MailIcon />}>
  <input type="email" placeholder="you@example.com" />
</InputGroup>`}
          filename="email-input.tsx"
        >
          <div className="w-full max-w-sm">
            <InputGroup prefix={<MailIcon />}>
              <input type="email" placeholder="you@example.com" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Price Input"
          description="Dollar icon prefix for currency inputs."
          code={`import { InputGroup } from "@/components/ui";
import { DollarIcon } from "lucide-react";

<InputGroup prefix={<DollarIcon />}>
  <input type="number" placeholder="0.00" />
</InputGroup>`}
          filename="price-input.tsx"
        >
          <div className="w-full max-w-sm">
            <InputGroup prefix={<DollarIcon />}>
              <input type="number" placeholder="0.00" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Password Input"
          description="Lock icon prefix with password field."
          code={`import { InputGroup } from "@/components/ui";
import { LockIcon } from "lucide-react";

<InputGroup prefix={<LockIcon />}>
  <input type="password" placeholder="Enter password" />
</InputGroup>`}
          filename="password-input.tsx"
        >
          <div className="w-full max-w-sm">
            <InputGroup prefix={<LockIcon />}>
              <input type="password" placeholder="Enter password" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="URL Input"
          description="Globe icon prefix with URL suffix."
          code={`import { InputGroup } from "@/components/ui";
import { GlobeIcon } from "lucide-react";

<InputGroup prefix={<GlobeIcon />}>
  <input type="url" placeholder="https://example.com" />
</InputGroup>`}
          filename="url-input.tsx"
        >
          <div className="w-full max-w-sm">
            <InputGroup prefix={<GlobeIcon />}>
              <input type="url" placeholder="https://example.com" />
            </InputGroup>
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
