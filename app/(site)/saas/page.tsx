import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Navbar,
  HeroSection,
  FeaturesSection,
  PricingSection,
  TestimonialsSection,
  HowItWorksSection,
  IntegrationsSection,
  CaseStudiesSection,
  FAQSection,
  CTASection,
  Footer,
} from "@/features/saas";

const installCommand = `npx component-library@latest add saas`;

const usageCode = `import {
  Navbar, HeroSection, FeaturesSection, PricingSection,
  TestimonialsSection, HowItWorksSection, IntegrationsSection,
  CaseStudiesSection, FAQSection, CTASection, Footer
} from "@/features/saas";

<SaasPage />`;

export default function SaasPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">SaaS</h1>
          <Badge variant="primary">11 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Complete SaaS landing page with navbar, hero, features, pricing, testimonials, integrations, FAQ, and CTA.
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

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
        <p className="text-sm text-muted-foreground">Full SaaS landing page with all sections.</p>
        <div className="rounded-lg border border-border bg-background overflow-hidden">
          <Navbar />
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
          <HowItWorksSection />
          <IntegrationsSection />
          <CaseStudiesSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </div>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
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
                <td className="px-4 py-3 font-mono text-xs">features</td>
                <td className="px-4 py-3 text-muted-foreground">Feature[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">pricingPlans</td>
                <td className="px-4 py-3 text-muted-foreground">PricingPlan[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">testimonials</td>
                <td className="px-4 py-3 text-muted-foreground">Testimonial[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">integrations</td>
                <td className="px-4 py-3 text-muted-foreground">Integration[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">faq</td>
                <td className="px-4 py-3 text-muted-foreground">FaqItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
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
