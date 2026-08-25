"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add landing`;

const usageCode = `import { LandingPage } from "@/features/landing";

<LandingPage />`;

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const features = [
  {
    title: "Fast Performance",
    description:
      "Built for speed with optimized loading times across all devices and networks.",
    icon: "⚡",
  },
  {
    title: "Responsive Design",
    description:
      "Looks great on every device and screen size from mobile to desktop.",
    icon: "📱",
  },
  {
    title: "Accessible",
    description: "Designed with accessibility best practices for all users.",
    icon: "♿",
  },
  {
    title: "Secure",
    description: "Enterprise-grade security with end-to-end encryption.",
    icon: "🔒",
  },
  {
    title: "Scalable",
    description: "Grows with your business from startup to enterprise.",
    icon: "📈",
  },
  {
    title: "Collaborative",
    description: "Real-time collaboration tools for your entire team.",
    icon: "🤝",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechStart",
    text: "This platform transformed our workflow. We shipped 3x faster within the first month.",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer, DevCo",
    text: "The best developer experience I've had in years. Everything just works.",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager, AppNova",
    text: "Our team productivity increased dramatically after switching to this platform.",
  },
];

const logos = [
  "Acme Corp",
  "TechStart",
  "DevCo",
  "AppNova",
  "CloudBase",
  "DataFlow",
];

export default function LandingPage() {
  const [ctaStep, setCtaStep] = useState(0);
  const [email, setEmail] = useState("");

  const ctaSteps = [
    {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of teams already using our platform.",
      action: "Get Started →",
    },
    {
      title: "Almost there!",
      subtitle: "Enter your email and we'll set you up.",
      action: "Continue",
      input: true,
    },
    {
      title: "You're in! 🎉",
      subtitle: "Check your inbox for next steps.",
      action: "Done",
    },
  ];

  const handleCta = () => {
    if (ctaStep === 0) setCtaStep(1);
    else if (ctaStep === 1 && email) setCtaStep(2);
    else if (ctaStep === 2) setCtaStep(0);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Landing</h1>
          <Badge variant="primary">8 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Full landing page with animated elements, stats, testimonials, and multi-step CTA.
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

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Hero Section</h3>
          <p className="text-sm text-muted-foreground">Gradient hero with animated elements and CTA buttons.</p>
          <section className="relative flex flex-col items-center gap-6 overflow-hidden rounded-lg border bg-gradient-to-b from-zinc-50 px-6 py-20 text-center dark:border-border dark:from-zinc-900">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-indigo-400/20 blur-3xl animate-pulse" />
              <div className="absolute right-20 top-32 h-16 w-16 rounded-full bg-blue-400/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-10 left-1/3 h-24 w-24 rounded-full bg-purple-400/20 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
            </div>
            <h2 className="relative text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: "3s" }}>Build Better Products</span>
            </h2>
            <p className="relative max-w-xl text-muted-foreground dark:text-muted-foreground/70">A modern platform that helps teams ship faster with fewer bugs.</p>
            <div className="relative flex gap-4">
              <Link href="/" className="rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-muted dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted">Get Started</Link>
              <Link href="/" className="rounded-md border px-6 py-2.5 text-sm font-medium hover:bg-muted dark:hover:bg-muted">Learn More</Link>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Logo Cloud</h3>
          <p className="text-sm text-muted-foreground">Partner logos displayed in a dashed border section.</p>
          <section className="flex flex-wrap items-center justify-center gap-8 rounded-lg border border-dashed px-6 py-8 dark:border-border">
            {logos.map((logo) => (
              <span key={logo} className="text-sm font-semibold tracking-wide text-muted-foreground/70 dark:text-muted-foreground">{logo}</span>
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Features Grid</h3>
          <p className="text-sm text-muted-foreground">Feature cards with icons, titles, and descriptions.</p>
          <section className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-lg border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-border">
                <div className="mb-3 text-2xl">{f.icon}</div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{f.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Animated Stats</h3>
          <p className="text-sm text-muted-foreground">Counting animation triggered on scroll into view.</p>
          <section className="grid gap-6 rounded-lg border bg-muted/40 px-6 py-12 text-center dark:border-border dark:bg-zinc-900 md:grid-cols-3">
            {[{ value: 50000, suffix: "+", label: "Active Users" }, { value: 1000, suffix: "+", label: "Companies" }, { value: 99.9, suffix: "%", label: "Uptime" }].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Testimonials</h3>
          <p className="text-sm text-muted-foreground">Customer testimonials with star ratings.</p>
          <section className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-lg border p-6 dark:border-border">
                <div className="mb-3 text-2xl text-amber-400">{"★".repeat(5)}</div>
                <p className="mb-4 text-sm italic text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Multi-Step CTA</h3>
          <p className="text-sm text-muted-foreground">Interactive multi-step call-to-action with email input.</p>
          <section className="flex flex-col items-center gap-6 rounded-lg border bg-zinc-900 px-6 py-16 text-center text-white dark:border-border dark:bg-muted">
            <h2 className="text-3xl font-bold">{ctaSteps[ctaStep].title}</h2>
            <p className="max-w-md text-muted-foreground/70">{ctaSteps[ctaStep].subtitle}</p>
            {ctaSteps[ctaStep].input && (
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full max-w-xs rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20" />
            )}
            <button onClick={handleCta} className="rounded-md bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 hover:bg-muted">{ctaSteps[ctaStep].action}</button>
            {ctaStep > 0 && (
              <button onClick={() => setCtaStep(0)} className="text-xs text-muted-foreground hover:text-zinc-300">Start over</button>
            )}
          </section>
        </div>
      </section>


    </div>
  );
}
