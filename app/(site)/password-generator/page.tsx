"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { PasswordGenerator } from "@/components/ui/PasswordGenerator";
import { PASSWORD_GENERATOR_SOURCE } from "./password-generator-source";

const BASIC_CODE = `import { PasswordGenerator } from "@/components/ui/PasswordGenerator";

<PasswordGenerator />`;

const CUSTOM_CODE = `import { PasswordGenerator } from "@/components/ui/PasswordGenerator";

<PasswordGenerator
  length={16}
  includeUppercase
  includeNumbers
  includeSymbols
/>`;

const NO_OPTIONS_CODE = `import { PasswordGenerator } from "@/components/ui/PasswordGenerator";

<PasswordGenerator showOptions={false} />`;

const NO_STRENGTH_CODE = `import { PasswordGenerator } from "@/components/ui/PasswordGenerator";

<PasswordGenerator showStrength={false} />`;

const MINIMAL_CODE = `import { PasswordGenerator } from "@/components/ui/PasswordGenerator";

<PasswordGenerator showOptions={false} showStrength={false} />`;

export default function PasswordGeneratorPage() {
  const [lastGenerated, setLastGenerated] = useState("");

  return (
    <ComponentDocPage
      name="Password Generator"
      category="Utilities"
      description="Generate secure random passwords with customizable length, character sets, strength indicator, and one-click copy to clipboard."
    >
      <PreviewPanel filename="password-generator.tsx">
        <PasswordGenerator onGenerate={setLastGenerated} />
      </PreviewPanel>

      <SourceCodeViewer
        source={PASSWORD_GENERATOR_SOURCE}
        filename="components/ui/PasswordGenerator/PasswordGenerator.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="With All Options"
          description="Full generator with uppercase, numbers, and symbols enabled."
          code={CUSTOM_CODE}
          filename="full-options.tsx"
        >
          <PasswordGenerator
            length={16}
            includeUppercase
            includeNumbers
            includeSymbols
          />
        </ExampleBlock>

        <ExampleBlock
          title="Without Options Panel"
          description="Display only the password output and strength indicator."
          code={NO_OPTIONS_CODE}
          filename="no-options.tsx"
        >
          <PasswordGenerator showOptions={false} />
        </ExampleBlock>

        <ExampleBlock
          title="Without Strength Indicator"
          description="Display options panel but hide the strength bar."
          code={NO_STRENGTH_CODE}
          filename="no-strength.tsx"
        >
          <PasswordGenerator showStrength={false} />
        </ExampleBlock>

        <ExampleBlock
          title="Minimal"
          description="Compact password output only, no options or strength."
          code={MINIMAL_CODE}
          filename="minimal.tsx"
        >
          <PasswordGenerator showOptions={false} showStrength={false} />
        </ExampleBlock>

        <ExampleBlock
          title="With onGenerate Callback"
          description="Track the last generated password via a callback."
          code={`<PasswordGenerator onGenerate={(pw) => console.log(pw)} />`}
          filename="callback.tsx"
        >
          <div className="w-full max-w-md space-y-3">
            <PasswordGenerator onGenerate={setLastGenerated} />
            {lastGenerated && (
              <div className="rounded-lg border border-border/60 bg-muted/50 px-3 py-2">
                <p className="text-xs text-muted-foreground">Last generated:</p>
                <code className="block font-mono text-xs text-foreground break-all">{lastGenerated}</code>
              </div>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Presets"
          description="Common password configurations as presets."
          code={`<PasswordGenerator length={8} includeSymbols={false} showStrength={false} />
<PasswordGenerator length={16} includeSymbols showStrength={false} />
<PasswordGenerator length={32} includeSymbols showStrength={false} />`}
          filename="presets.tsx"
        >
          <div className="flex flex-col gap-6 w-full max-w-md">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Simple (8 chars)</p>
              <PasswordGenerator length={8} includeSymbols={false} showStrength={false} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Standard (16 chars)</p>
              <PasswordGenerator length={16} includeSymbols showStrength={false} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">High Security (32 chars)</p>
              <PasswordGenerator length={32} includeSymbols showStrength={false} />
            </div>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
