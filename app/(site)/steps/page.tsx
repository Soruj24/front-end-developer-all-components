"use client";

import { Steps, Step } from "@/components/ui/Steps";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const STEPS_SOURCE = `type StepStatus = "completed" | "current" | "upcoming";

const STATUS_INDICATOR = {
  completed: "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
  current: "bg-background text-primary ring-2 ring-primary shadow-sm shadow-primary/10",
  upcoming: "bg-muted text-muted-foreground",
};

function Steps({ children, className, orientation = "horizontal" }: StepsProps) {
  return (
    <div role="list" aria-label="Progress steps"
      className={cn(orientation === "horizontal" ? "flex items-start" : "flex flex-col", className)}>
      {children}
    </div>
  );
}

function Step({ title, description, status = "upcoming", icon }: StepProps) {
  return (
    <div role="listitem" className={cn("flex", /* layout classes */)}>
      <div className="flex flex-col items-center">
        <StepIndicator status={status} icon={icon} />
        <div className="mt-3 text-center">
          <p className="text-sm font-medium">{title}</p>
          {description && <p className="mt-0.5 text-xs">{description}</p>}
        </div>
      </div>
      {!isLast && <div className="mx-3 h-0.5 flex-1 self-center rounded-full bg-primary/bg-border" />}
    </div>
  );
}

function StepIndicator({ status, icon }: StepIndicatorProps) {
  return (
    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold", STATUS_INDICATOR[status])}>
      {icon ?? (status === "completed" ? <CheckIcon /> : status === "current" ? <Dot /> : null)}
    </div>
  );
}`;

export default function StepsPage() {
  return (
    <ComponentDocPage
      name="Steps"
      category="Navigation"
      description="Step indicators for multi-step workflows, onboarding flows, and progress tracking."
    >
      <PreviewPanel filename="steps-preview.tsx">
        <div className="w-full max-w-lg">
          <Steps>
            <Step title="Create account" description="Set up credentials" status="completed" />
            <Step title="Profile" description="Add personal info" status="current" />
            <Step title="Confirm" description="Review & submit" status="upcoming" />
          </Steps>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={STEPS_SOURCE}
        filename="components/ui/Steps/Steps.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Three-step indicator with status labels."
          code={`import { Steps, Step } from "@/components/ui/Steps";\n\n<Steps>\n  <Step title="Create account" status="completed" />\n  <Step title="Profile" status="current" />\n  <Step title="Confirm" status="upcoming" />\n</Steps>`}
          filename="default.tsx"
        >
          <div className="w-full max-w-lg">
            <Steps>
              <Step title="Create account" status="completed" />
              <Step title="Profile" status="current" />
              <Step title="Confirm" status="upcoming" />
            </Steps>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Descriptions"
          description="Steps with descriptive text below each title."
          code={`<Steps>\n  <Step title="Create account" description="Set up your credentials" status="completed" />\n  <Step title="Profile" description="Add personal info" status="current" />\n  <Step title="Confirm" description="Review & submit" status="upcoming" />\n</Steps>`}
          filename="with-descriptions.tsx"
        >
          <div className="w-full max-w-lg">
            <Steps>
              <Step title="Create account" description="Set up your credentials" status="completed" />
              <Step title="Profile" description="Add personal info" status="current" />
              <Step title="Confirm" description="Review & submit" status="upcoming" />
            </Steps>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Custom icons for each step stage."
          code={`<Steps>\n  <Step title="Cart" status="completed" icon={<span>&#x1F6D2;</span>} />\n  <Step title="Payment" status="current" icon={<span>&#x1F4B3;</span>} />\n  <Step title="Done" status="upcoming" icon={<span>&#x1F389;</span>} />\n</Steps>`}
          filename="with-icons.tsx"
        >
          <div className="w-full max-w-lg">
            <Steps>
              <Step title="Cart" description="Review items" status="completed" icon={<span>&#x1F6D2;</span>} />
              <Step title="Payment" description="Secure checkout" status="current" icon={<span>&#x1F4B3;</span>} />
              <Step title="Done" description="Order placed" status="upcoming" icon={<span>&#x1F389;</span>} />
            </Steps>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description="Steps arranged vertically."
          code={`<Steps orientation="vertical">\n  <Step title="Account" status="completed" />\n  <Step title="Profile" status="current" />\n  <Step title="Billing" status="upcoming" />\n</Steps>`}
          filename="vertical.tsx"
        >
          <div className="w-full max-w-sm">
            <Steps orientation="vertical">
              <Step title="Account" description="Create your account" status="completed" />
              <Step title="Profile" description="Add personal details" status="current" />
              <Step title="Billing" description="Set up payment" status="upcoming" />
            </Steps>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="All Completed"
          description="All steps finished."
          code={`<Steps>\n  <Step title="Step 1" status="completed" />\n  <Step title="Step 2" status="completed" />\n  <Step title="Step 3" status="completed" />\n</Steps>`}
          filename="all-completed.tsx"
        >
          <div className="w-full max-w-lg">
            <Steps>
              <Step title="Step 1" status="completed" />
              <Step title="Step 2" status="completed" />
              <Step title="Step 3" status="completed" />
            </Steps>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical Completed"
          description="Vertical layout with all steps completed."
          code={`<Steps orientation="vertical">\n  <Step title="Step 1" status="completed" />\n  <Step title="Step 2" status="completed" />\n  <Step title="Step 3" status="completed" />\n</Steps>`}
          filename="vertical-completed.tsx"
        >
          <div className="w-full max-w-sm">
            <Steps orientation="vertical">
              <Step title="Step 1" description="First step done" status="completed" />
              <Step title="Step 2" description="Second step done" status="completed" />
              <Step title="Step 3" description="All done" status="completed" />
            </Steps>
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">�</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">�</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
