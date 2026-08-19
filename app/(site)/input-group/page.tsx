"use client";

import { InputGroup } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const INPUTGROUP_SOURCE = `import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface InputGroupProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function InputGroup({ prefix, suffix, className, children }: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center rounded-md border bg-white dark:bg-zinc-900 dark:border-zinc-700",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
        className,
      )}
    >
      {prefix && (
        <div className="flex items-center pl-3 text-sm text-muted-foreground">
          {prefix}
        </div>
      )}
      <div className="flex-1 [&>input]:border-0 [&>input]:focus:ring-0 [&>input]:w-full [&>input]:bg-transparent [&>input]:py-2">
        {children}
      </div>
      {suffix && (
        <div className="flex items-center pr-3 text-sm text-muted-foreground">
          {suffix}
        </div>
      )}
    </div>
  );
}`;

const PREFIX_SOURCE = `import { InputGroup } from "@/components/ui";

function PrefixExample() {
  return (
    <InputGroup prefix="@">
      <input type="text" placeholder="username" />
    </InputGroup>
  );
}`;

const SUFFIX_SOURCE = `import { InputGroup } from "@/components/ui";

function SuffixExample() {
  return (
    <InputGroup suffix=".00">
      <input type="text" placeholder="0" />
    </InputGroup>
  );
}`;

const BOTH_SOURCE = `import { InputGroup } from "@/components/ui";

function BothExample() {
  return (
    <InputGroup prefix="https://" suffix=".com">
      <input type="text" placeholder="example" />
    </InputGroup>
  );
}`;

function SearchIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Prefix" description="Add content before the input." code={PREFIX_SOURCE}>
          <div className="w-full max-w-sm">
            <InputGroup prefix="@">
              <input type="text" placeholder="username" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Suffix" description="Add content after the input." code={SUFFIX_SOURCE}>
          <div className="w-full max-w-sm">
            <InputGroup suffix=".00">
              <input type="text" placeholder="0" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Prefix & Suffix" description="Combine both prefix and suffix." code={BOTH_SOURCE}>
          <div className="w-full max-w-sm">
            <InputGroup prefix="https://" suffix=".com">
              <input type="text" placeholder="example" />
            </InputGroup>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Search Bar" description="Icon prefix for search inputs." code={PREFIX_SOURCE}>
          <div className="w-full max-w-sm">
            <InputGroup prefix={<SearchIcon />}>
              <input type="text" placeholder="Search..." />
            </InputGroup>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
