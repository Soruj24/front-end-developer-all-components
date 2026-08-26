import Link from "next/link";
import {
  Search,
  Eye,
  FileText,
  LayoutGrid,
  ClipboardCopy,
  Package,
  TestTube,
  Rocket,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const steps = [
  { icon: Search, label: "Discover", href: "/components" },
  { icon: Eye, label: "Preview", href: "/components" },
  { icon: FileText, label: "Read Docs", href: "/components" },
  { icon: LayoutGrid, label: "Choose Example", href: "/components" },
  { icon: ClipboardCopy, label: "Copy Source", href: "/components" },
  { icon: Package, label: "Integrate", href: "/docs" },
  { icon: TestTube, label: "Test", href: "/docs" },
  { icon: Rocket, label: "Ship", href: "/docs" },
];

export function DeveloperWorkflow() {
  return (
    <section className="border-b border-border/40 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Workflow"
          title="From Component to Production"
          description="A complete developer workflow — from discovery to deployment."
        />

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <Link
                href={step.href}
                className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-background px-4 py-3 transition-all duration-200 hover:border-border hover:shadow-card"
              >
                <step.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {step.label}
                </span>
              </Link>
              {i < steps.length - 1 && (
                <svg
                  className="h-4 w-4 flex-shrink-0 text-muted-foreground/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
