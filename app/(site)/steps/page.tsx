"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Steps, Step } from "@/components/ui/Steps";
import { Stepper } from "@/components/ui/Stepper";
import {
  User,
  CreditCard,
  PartyPopper,
  ShoppingCart,
  Package,
  Truck,
  Settings,
  Rocket,
  Star,
} from "lucide-react";

const installCommand = `npx component-library@latest add steps`;

const usageCode = `import { Steps, Step } from "@/components/ui/Steps";
import { Stepper } from "@/components/ui/Stepper";

// Compound component
<Steps>
  <Step title="Step 1" status="completed" />
  <Step title="Step 2" status="current" />
  <Step title="Step 3" status="upcoming" />
</Steps>

// Data-driven stepper
<Stepper
  steps={[
    { label: "Account", description: "Create account" },
    { label: "Profile", description: "Fill profile" },
    { label: "Confirm", description: "Review" },
  ]}
  currentStep={1}
/>`;

function BasicSteps() {
  return (
    <Steps>
      <Step title="Create account" description="Set up your credentials" status="completed" />
      <Step title="Profile" description="Add personal info" status="current" />
      <Step title="Confirm" description="Review & submit" status="upcoming" />
    </Steps>
  );
}

function StepsWithIcons() {
  return (
    <Steps>
      <Step title="Account" description="Create your account" status="completed" icon={<User className="h-4 w-4" />} />
      <Step title="Payment" description="Add payment method" status="current" icon={<CreditCard className="h-4 w-4" />} />
      <Step title="Done" description="Confirmation" status="upcoming" icon={<PartyPopper className="h-4 w-4" />} />
    </Steps>
  );
}

function CheckoutFlow() {
  return (
    <Steps>
      <Step title="Cart" description="Review items" status="completed" icon={<ShoppingCart className="h-4 w-4" />} />
      <Step title="Shipping" description="Delivery address" status="completed" icon={<Package className="h-4 w-4" />} />
      <Step title="Payment" description="Secure checkout" status="current" icon={<CreditCard className="h-4 w-4" />} />
      <Step title="Delivery" description="Track your order" status="upcoming" icon={<Truck className="h-4 w-4" />} />
    </Steps>
  );
}

function HorizontalStepper() {
  const [current, setCurrent] = useState(0);
  const steps = [
    { label: "Account", description: "Create account" },
    { label: "Profile", description: "Fill profile" },
    { label: "Settings", description: "Configure" },
    { label: "Done", description: "Launch" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Stepper steps={steps} currentStep={current} onStepClick={setCurrent} />
      <div className="flex justify-center gap-2">
        <button disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c - 1))} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Back</button>
        <button disabled={current === steps.length - 1} onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))} className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

function VerticalStepper() {
  const [current, setCurrent] = useState(1);
  const steps = [
    { label: "Personal Info", description: "Name and contact details" },
    { label: "Address", description: "Shipping and billing" },
    { label: "Payment", description: "Card or bank details" },
    { label: "Confirm", description: "Review your order" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Stepper steps={steps} currentStep={current} orientation="vertical" onStepClick={setCurrent} />
    </div>
  );
}

function NumberedStepper() {
  return (
    <Stepper
      steps={[
        { label: "Research", description: "Gather requirements" },
        { label: "Design", description: "Create mockups" },
        { label: "Develop", description: "Build the product" },
        { label: "Test", description: "QA and validation" },
        { label: "Launch", description: "Deploy to production" },
      ]}
      currentStep={2}
      variant="numbered"
    />
  );
}

function DotsStepper() {
  return (
    <Stepper
      steps={[
        { label: "Phase 1" },
        { label: "Phase 2" },
        { label: "Phase 3" },
        { label: "Phase 4" },
      ]}
      currentStep={1}
      variant="dots"
    />
  );
}

function VerticalWithContent() {
  const steps = [
    { label: "Personal Information", description: "Enter your name and email" },
    { label: "Verification", description: "Verify your identity" },
    { label: "Setup Complete", description: "You're all set" },
  ];
  return (
    <div className="rounded-lg border border-border p-6">
      <Stepper steps={steps} currentStep={1} orientation="vertical" />
    </div>
  );
}

function FourStepFlow() {
  const [current, setCurrent] = useState(0);
  const steps = [
    { label: "Details", description: "Project information" },
    { label: "Team", description: "Assign members" },
    { label: "Budget", description: "Cost breakdown" },
    { label: "Review", description: "Final approval" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Stepper steps={steps} currentStep={current} onStepClick={setCurrent} />
      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <span className="text-sm text-muted-foreground">Step {current + 1} of {steps.length}</span>
        <div className="flex gap-2">
          <button disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c - 1))} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50">Previous</button>
          <button disabled={current === steps.length - 1} onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))} className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}

function CustomIconsStepper() {
  return (
    <Stepper
      steps={[
        { label: "Details", description: "Basic info" },
        { label: "Media", description: "Upload photos" },
        { label: "Publish", description: "Go live" },
      ]}
      currentStep={0}
      variant="default"
    />
  );
}

function OnboardingFlow() {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-6">
      <h3 className="mb-4 text-sm font-medium">Getting Started</h3>
      <Steps>
        <Step title="Welcome" description="Tour the platform" status="completed" icon={<Star className="h-4 w-4" />} />
        <Step title="Profile" description="Complete your profile" status="completed" icon={<User className="h-4 w-4" />} />
        <Step title="Connect" description="Link integrations" status="current" icon={<Settings className="h-4 w-4" />} />
        <Step title="Launch" description="Start your first project" status="upcoming" icon={<Rocket className="h-4 w-4" />} />
      </Steps>
    </div>
  );
}

export default function StepsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Steps</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Step indicators for multi-step workflows, onboarding flows, and progress tracking. Supports horizontal and vertical layouts with numbered, icon, and dot variants.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Basic */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic</h2>
          <p className="mt-1 text-sm text-muted-foreground">Simple three-step indicator with status labels.</p>
        </div>
        <ComponentPreview id="steps-basic">
          <BasicSteps />
        </ComponentPreview>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">Steps with custom icons for each stage.</p>
        </div>
        <ComponentPreview id="steps-icons">
          <StepsWithIcons />
        </ComponentPreview>
      </section>

      {/* Checkout Flow */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Checkout Flow</h2>
          <p className="mt-1 text-sm text-muted-foreground">E-commerce checkout progress tracker.</p>
        </div>
        <ComponentPreview id="steps-checkout">
          <CheckoutFlow />
        </ComponentPreview>
      </section>

      {/* Horizontal Stepper */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Horizontal Stepper</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive stepper with back/next navigation.</p>
        </div>
        <ComponentPreview id="steps-horizontal">
          <HorizontalStepper />
        </ComponentPreview>
      </section>

      {/* Vertical Stepper */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical Stepper</h2>
          <p className="mt-1 text-sm text-muted-foreground">Vertical layout with descriptions.</p>
        </div>
        <ComponentPreview id="steps-vertical">
          <VerticalStepper />
        </ComponentPreview>
      </section>

      {/* Numbered */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Numbered</h2>
          <p className="mt-1 text-sm text-muted-foreground">Five-step numbered progress indicator.</p>
        </div>
        <ComponentPreview id="steps-numbered">
          <NumberedStepper />
        </ComponentPreview>
      </section>

      {/* Dots */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Dots</h2>
          <p className="mt-1 text-sm text-muted-foreground">Minimal dot-based step indicator.</p>
        </div>
        <ComponentPreview id="steps-dots">
          <DotsStepper />
        </ComponentPreview>
      </section>

      {/* Vertical with Content */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical with Card</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stepper inside a card container.</p>
        </div>
        <ComponentPreview id="steps-vertical-card">
          <VerticalWithContent />
        </ComponentPreview>
      </section>

      {/* Four Step Flow */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Multi-Step Form</h2>
          <p className="mt-1 text-sm text-muted-foreground">Four-step form with navigation controls.</p>
        </div>
        <ComponentPreview id="steps-multi">
          <FourStepFlow />
        </ComponentPreview>
      </section>

      {/* Custom Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default Variant</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stepper with checkmarks for completed steps.</p>
        </div>
        <ComponentPreview id="steps-default">
          <CustomIconsStepper />
        </ComponentPreview>
      </section>

      {/* Onboarding */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Onboarding Flow</h2>
          <p className="mt-1 text-sm text-muted-foreground">User onboarding with styled card wrapper.</p>
        </div>
        <ComponentPreview id="steps-onboarding">
          <OnboardingFlow />
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>

        {/* Steps */}
        <div className="overflow-hidden rounded-lg border">
          <div className="bg-muted/50 px-4 py-2 text-sm font-medium">Steps / Step</div>
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
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;completed&quot; | &quot;current&quot; | &quot;upcoming&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;upcoming&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">Check icon for completed</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Stepper */}
        <div className="overflow-hidden rounded-lg border">
          <div className="bg-muted/50 px-4 py-2 text-sm font-medium">Stepper</div>
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
                <td className="px-4 py-3 font-mono text-xs">steps</td>
                <td className="px-4 py-3 text-muted-foreground">Step[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">currentStep</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;numbered&quot; | &quot;dots&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;numbered&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onStepClick</td>
                <td className="px-4 py-3 text-muted-foreground">(step: number) =&gt; void</td>
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
