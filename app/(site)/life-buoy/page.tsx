"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  LifeBuoy,
  HelpCircle,
  MessageCircle,
  BookOpen,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";

const installCommand = `npx shadcn@latest add life-buoy`;

const usageCode = `import { LifeBuoy } from "@/components/life-buoy";

export default function App() {
  return <LifeBuoy variant="default" size="md" />;
}`;

function HelpButtonDemo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        <HelpCircle className="h-4 w-4" />
        Need Help?
      </button>
      <button
        className="relative inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-sm transition-colors hover:bg-destructive/90"
      >
        <LifeBuoy className="h-4 w-4" />
        Support
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
      </button>
      <button
        className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <HelpCircle className="h-4 w-4" />
        Help Center
      </button>
    </div>
  );
}

function SupportWidgetDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-64 items-end justify-end rounded-lg border bg-muted/30 p-4">
      {isOpen && (
        <div className="mb-3 w-72 rounded-xl border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold">Support Chat</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              How can we help you today?
            </p>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}

function DocumentationLinkDemo() {
  return (
    <div className="flex flex-col gap-3">
      <a
        href="#"
        className="inline-flex items-center gap-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent"
      >
        <BookOpen className="h-5 w-5 text-blue-500" />
        <div>
          <p className="text-sm font-medium">Getting Started Guide</p>
          <p className="text-xs text-muted-foreground">
            Learn the basics of our platform
          </p>
        </div>
      </a>
      <a
        href="#"
        className="inline-flex items-center gap-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent"
      >
        <LifeBuoy className="h-5 w-5 text-green-500" />
        <div>
          <p className="text-sm font-medium">Troubleshooting</p>
          <p className="text-xs text-muted-foreground">
            Common issues and how to resolve them
          </p>
        </div>
      </a>
      <a
        href="#"
        className="inline-flex items-center gap-3 rounded-lg border bg-background p-4 shadow-sm transition-colors hover:bg-accent"
      >
        <HelpCircle className="h-5 w-5 text-purple-500" />
        <div>
          <p className="text-sm font-medium">API Reference</p>
          <p className="text-xs text-muted-foreground">
            Complete API documentation
          </p>
        </div>
      </a>
    </div>
  );
}

function FaqAccordionDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "Go to Settings > Security > Change Password. Enter your current password and the new one.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade at any time. The price difference will be prorated for the current billing period.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach us via the chat widget, email at support@example.com, or call us at 1-800-HELP.",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, index) => (
        <div key={index} className="rounded-lg border">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between p-4 text-left text-sm font-medium hover:bg-accent/50"
          >
            {faq.question}
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="border-t px-4 pb-4 pt-2 text-sm text-muted-foreground">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ContactSupportDemo() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-background p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <LifeBuoy className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Contact Support</h3>
      </div>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <textarea
          placeholder="Describe your issue..."
          rows={3}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Send Message
        </button>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Mail className="h-3 w-3" />
          support@example.com
        </span>
        <span className="inline-flex items-center gap-1">
          <Phone className="h-3 w-3" />
          1-800-HELP
        </span>
      </div>
    </div>
  );
}

function TooltipHelpDemo() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="relative inline-block">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/30 text-muted-foreground hover:bg-accent"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md">
            This field is required for your account
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-primary" />
          </div>
        )}
      </div>
      <div className="relative inline-block">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/30 text-muted-foreground hover:bg-accent"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
        {showTooltip && (
          <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md">
            Learn more about billing
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}

function OnboardingGuideDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Welcome", description: "Set up your profile and preferences" },
    { title: "Connect", description: "Link your accounts and integrations" },
    { title: "Create", description: "Start building your first project" },
  ];

  return (
    <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <LifeBuoy className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Getting Started</h3>
      </div>
      <div className="mb-4 flex items-center gap-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full ${
              index <= currentStep ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <div className="mb-6 space-y-2">
        <h4 className="font-medium">{steps[currentStep].title}</h4>
        <p className="text-sm text-muted-foreground">
          {steps[currentStep].description}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default function LifeBuoyPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-12 py-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <LifeBuoy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Life Buoy</h1>
          <Badge variant="secondary">Help & Support</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Help and support components for customer assistance, documentation,
          and onboarding experiences.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Help Button</h3>
          <p className="text-sm text-muted-foreground">
            Floating help button with tooltip and notification indicator.
          </p>
          <ComponentPreview>
            <HelpButtonDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Support Widget</h3>
          <p className="text-sm text-muted-foreground">
            Customer support chat widget with open/close toggle.
          </p>
          <ComponentPreview>
            <SupportWidgetDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Documentation Links</h3>
          <p className="text-sm text-muted-foreground">
            Help documentation navigation with icons.
          </p>
          <ComponentPreview>
            <DocumentationLinkDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">FAQ Accordion</h3>
          <p className="text-sm text-muted-foreground">
            Frequently asked questions with expandable sections.
          </p>
          <ComponentPreview>
            <FaqAccordionDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Contact Support</h3>
          <p className="text-sm text-muted-foreground">
            Contact form with support channels.
          </p>
          <ComponentPreview>
            <ContactSupportDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Tooltip Help</h3>
          <p className="text-sm text-muted-foreground">
            Tooltip with contextual help text.
          </p>
          <ComponentPreview>
            <TooltipHelpDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Onboarding Guide</h3>
          <p className="text-sm text-muted-foreground">
            Step-by-step user onboarding experience.
          </p>
          <ComponentPreview>
            <OnboardingGuideDemo />
          </ComponentPreview>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2 font-medium">Prop</th>
                <th className="p-2 font-medium">Type</th>
                <th className="p-2 font-medium">Default</th>
                <th className="p-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">variant</td>
                <td className="p-2 text-muted-foreground">string</td>
                <td className="p-2 text-muted-foreground">"default"</td>
                <td className="p-2 text-muted-foreground">
                  The visual style variant
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">size</td>
                <td className="p-2 text-muted-foreground">string</td>
                <td className="p-2 text-muted-foreground">"md"</td>
                <td className="p-2 text-muted-foreground">
                  The size of the component
                </td>
              </tr>
              <tr>
                <td className="p-2 font-mono text-xs">className</td>
                <td className="p-2 text-muted-foreground">string</td>
                <td className="p-2 text-muted-foreground">undefined</td>
                <td className="p-2 text-muted-foreground">
                  Additional CSS classes to apply
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
