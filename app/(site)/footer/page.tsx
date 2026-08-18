"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add footer`;

const usageCode = `import { Footer } from "@/components/footer";

<Footer
  logo="MyApp"
  columns={footerColumns}
  socialLinks={socialLinks}
/>`;

const products = ["Overview", "Features", "Pricing", "Changelog"];
const resources = ["Docs", "Blog", "Community", "Support"];
const company = ["About", "Careers", "Press", "Contact"];
const legal = ["Privacy", "Terms", "Cookie Policy"];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "日本語" },
];

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function PaymentIcon({ type }: { type: string }) {
  return (
    <span className="inline-flex h-6 w-10 items-center justify-center rounded border border-border bg-white text-[10px] font-bold text-muted-foreground/70 dark:border-border dark:bg-muted dark:text-muted-foreground">
      {type}
    </span>
  );
}

const footerProps = [
  { prop: "logo", type: "string | ReactNode", default: "-", required: "Yes" },
  { prop: "columns", type: "FooterColumn[]", default: "-", required: "Yes" },
  { prop: "socialLinks", type: "SocialLink[]", default: "[]", required: "No" },
  { prop: "showNewsletter", type: "boolean", default: "true", required: "No" },
  { prop: "showBackToTop", type: "boolean", default: "true", required: "No" },
];

export default function FooterPage() {
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Footer</h1>
          <Badge variant="primary">1 example</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A feature-rich footer with newsletter signup, social SVGs, payment
          icons, language selector, and back-to-top.
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

        <ComponentPreview id="footer-full">
          <footer className="relative w-full rounded-lg border border-border">
            <div className="grid gap-10 p-8 sm:grid-cols-2 lg:grid-cols-5">
              <div className="flex flex-col gap-4 lg:col-span-1">
                <span className="text-lg font-bold tracking-tight">Logo</span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Building the future of web development, one component at a time.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-muted-foreground dark:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted dark:hover:text-zinc-200">
                    <TwitterIcon />
                  </a>
                  <a href="#" className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-muted-foreground dark:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted dark:hover:text-zinc-200">
                    <GitHubIcon />
                  </a>
                  <a href="#" className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-muted-foreground dark:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted dark:hover:text-zinc-200">
                    <LinkedInIcon />
                  </a>
                  <a href="#" className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-muted-foreground dark:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted dark:hover:text-zinc-200">
                    <YouTubeIcon />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold">Product</span>
                {products.map((item) => (
                  <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:hover:text-zinc-50">
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold">Resources</span>
                {resources.map((item) => (
                  <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:hover:text-zinc-50">
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold">Company</span>
                {company.map((item) => (
                  <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:hover:text-zinc-50">
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold">Legal</span>
                {legal.map((item) => (
                  <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:hover:text-zinc-50">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-black/[.08] px-8 py-6 dark:border-white/[.145]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">We accept</span>
                  <div className="flex gap-2">
                    <PaymentIcon type="Visa" />
                    <PaymentIcon type="MC" />
                    <PaymentIcon type="Amex" />
                    <PaymentIcon type="PayPal" />
                    <PaymentIcon type="Apple" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <select
            value={lang}
            aria-label="Language"
            onChange={(e) => setLang(e.target.value)}
                    className="rounded-md border border-border bg-white px-3 py-1.5 text-xs text-muted-foreground dark:border-border dark:bg-muted dark:text-muted-foreground"
                  >
                    {languages.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-44 rounded-md border border-border bg-white px-3 py-1.5 text-xs text-muted-foreground placeholder-zinc-400 dark:border-border dark:bg-muted dark:text-muted-foreground"
                      required
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 dark:bg-foreground dark:text-background dark:hover:bg-muted"
                    >
                      {subscribed ? "✓ Sent!" : "Subscribe"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-black/[.08] px-8 py-5 dark:border-white/[.145] sm:flex-row">
              <p className="text-xs text-muted-foreground/70">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-xs text-muted-foreground/70 transition-colors hover:text-muted-foreground dark:hover:text-zinc-200"
              >
                <span>↑</span>
                Back to top
              </button>
            </div>
          </footer>
        </ComponentPreview>
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
              {footerProps.map((row, i) => (
                <tr key={row.prop} className={i < footerProps.length - 1 ? "border-b" : ""}>
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.default}</td>
                  <td className="px-4 py-3">{row.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
