"use client";

import { Steps, Step } from "@/components/ui/Steps";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const STEPS_SOURCE = `type StepStatus = "completed" | "current" | "upcoming";

const statusClasses: Record<StepStatus, string> = {
  completed: "bg-green-500 text-white",
  current: "bg-blue-500 text-white",
  upcoming: "bg-zinc-200 text-zinc-500 dark:bg-zinc-700",
};

function Steps({ children, className }) {
  return <div className={\`flex items-center \${className ?? ""}\`}>{children}</div>;
}

function Step({ title, description, status = "upcoming", icon }) {
  return (
    <div className="flex items-center">
      <StepIndicator status={status} icon={icon} />
      <div className="ml-3">
        <p className={\`text-sm font-medium \${status === "upcoming" ? "text-zinc-400" : ""}\`}>{title}</p>
        {description && <p className="text-xs text-zinc-500">{description}</p>}
      </div>
    </div>
  );
}

function StepIndicator({ status, icon }) {
  return (
    <div className={\`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium \${statusClasses[status]}\`}>
      {icon ?? (status === "completed" ? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : null)}
    </div>
  );
}`;

const BASIC_CODE = `<Steps>
  <Step title="Create account" status="completed" />
  <Step title="Profile" status="current" />
  <Step title="Confirm" status="upcoming" />
</Steps>`;

const DESCRIPTION_CODE = `<Steps>
  <Step title="Create account" description="Set up your credentials" status="completed" />
  <Step title="Profile" description="Add personal info" status="current" />
  <Step title="Confirm" description="Review & submit" status="upcoming" />
</Steps>`;

const ICONS_CODE = `<Steps>
  <Step title="Account" status="completed" icon={<User className="h-4 w-4" />} />
  <Step title="Payment" status="current" icon={<CreditCard className="h-4 w-4" />} />
  <Step title="Done" status="upcoming" icon={<PartyPopper className="h-4 w-4" />} />
</Steps>`;

export default function StepsPage() {
  return (
    <ComponentDocPage
      name="Steps"
      category="Navigation"
      description="Step indicators for multi-step workflows, onboarding flows, and progress tracking. Supports completed, current, and upcoming states with optional icons and descriptions."
    >
      <PreviewPanel filename="steps-preview">
        <Steps>
          <Step title="Create account" description="Set up credentials" status="completed" />
          <Step title="Profile" description="Add personal info" status="current" />
          <Step title="Confirm" description="Review & submit" status="upcoming" />
        </Steps>
      </PreviewPanel>

      <SourceCodeViewer source={STEPS_SOURCE} filename="components/ui/Steps.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Simple three-step indicator with status labels." code={BASIC_CODE}>
          <Steps>
            <Step title="Create account" status="completed" />
            <Step title="Profile" status="current" />
            <Step title="Confirm" status="upcoming" />
          </Steps>
        </ExampleBlock>

        <ExampleBlock title="With Descriptions" description="Steps with descriptive text below each title." code={DESCRIPTION_CODE}>
          <Steps>
            <Step title="Create account" description="Set up your credentials" status="completed" />
            <Step title="Profile" description="Add personal info" status="current" />
            <Step title="Confirm" description="Review & submit" status="upcoming" />
          </Steps>
        </ExampleBlock>

        <ExampleBlock title="With Icons" description="Custom icons for each step stage." code={ICONS_CODE}>
          <Steps>
            <Step title="Cart" description="Review items" status="completed" icon={<span>🛒</span>} />
            <Step title="Payment" description="Secure checkout" status="current" icon={<span>💳</span>} />
            <Step title="Done" description="Order placed" status="upcoming" icon={<span>🎉</span>} />
          </Steps>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
