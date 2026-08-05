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

export default function SaasPage() {
  return (
    <div className="flex flex-col gap-16 p-4 sm:p-8">
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
  );
}
