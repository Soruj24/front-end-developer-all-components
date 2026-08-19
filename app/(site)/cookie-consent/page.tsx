"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CONTACT_CARD_SOURCE } from "./contact-card-source";
import { COOKIE_CONSENT_SOURCE, BANNER_EXAMPLE, CATEGORIES_EXAMPLE, WIDGET_EXAMPLE } from "./cookie-consent-source";

export default function CookieConsentPage() {
  return (
    <ComponentDocPage
      name="Cookie Consent"
      category="Feedback"
      description="A cookie consent banner component for GDPR compliance with accept/reject options and preference management."
    >
      <PreviewPanel filename="cookie-consent.tsx">
        <div className="w-full p-4">
          <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
            <svg className="h-8 w-8 text-amber-600 shrink-0 mt-1" aria-hidden="true" focusable="false">
              <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 1a11 11 0 1 1 0 22A11.011 11.011 0 0 1 12 3z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">We use cookies</p>
              <p className="text-xs text-muted-foreground mt-1">This website uses cookies to enhance your browsing experience and provide personalized content.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-medium">Reject</button>
              <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">Accept All</button>
            </div>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={COOKIE_CONSENT_SOURCE}
        filename="components/ui/CookieConsent/CookieConsent.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Bottom Banner" description="A banner that appears at the bottom of the screen." code={BANNER_EXAMPLE}>
          <div className="w-full p-4">
            <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
              <svg className="h-8 w-8 text-amber-600 shrink-0 mt-1" aria-hidden="true" focusable="false" />
              <div className="flex-1">
                <p className="text-sm font-medium">We use cookies</p>
                <p className="text-xs text-muted-foreground mt-1">This website uses cookies to enhance your browsing experience and provide personalized content.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-medium">Reject</button>
                <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">Accept All</button>
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Categories" description="Consent banner with category toggles." code={CATEGORIES_EXAMPLE}>
          <div className="w-full p-4">
            <div className="max-w-md mx-auto rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <svg className="h-6 w-6 text-amber-600" aria-hidden="true" focusable="false" />
                <p className="text-sm font-medium">Cookie Preferences</p>
              </div>
              <div className="space-y-3 mb-4">
                {[{ label: "Essential", desc: "Required for site functionality", checked: true, disabled: true }, { label: "Analytics", desc: "Help us improve our website", checked: true }, { label: "Marketing", desc: "Personalized advertisements", checked: false }].map((cat) => (
                  <div key={cat.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{cat.label}</p>
                      <p className="text-xs text-muted-foreground">{cat.desc}</p>
                    </div>
                    <div className={`h-5 w-9 rounded-full flex items-center px-0.5 ${cat.checked ? "bg-primary justify-end" : "bg-muted justify-start"}`}>
                      <div className="h-4 w-4 rounded-full bg-white shadow" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-md bg-muted text-foreground text-xs font-medium">Save Preferences</button>
                <button className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium">Accept All</button>
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Floating Widget" description="A small cookie icon that expands on click." code={WIDGET_EXAMPLE}>
          <div className="w-full p-4">
            <div className="flex justify-end">
              <button className="h-12 w-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="h-5 w-5 text-amber-600" aria-hidden="true" focusable="false" />
              </button>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}