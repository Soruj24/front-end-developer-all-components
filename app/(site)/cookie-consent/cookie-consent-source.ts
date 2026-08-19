export const COOKIE_CONSENT_SOURCE = `"use client";

import { useState } from "react";
import { Cookie } from "lucide-react";

interface CookieCategory {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
}

interface CookieConsentProps {
  onAccept?: () => void;
  onReject?: () => void;
  onSave?: (categories: CookieCategory[]) => void;
}

const DEFAULT_CATEGORIES: CookieCategory[] = [
  { label: "Essential", desc: "Required for site functionality", checked: true, disabled: true },
  { label: "Analytics", desc: "Help us improve our website", checked: true },
  { label: "Marketing", desc: "Personalized advertisements", checked: false },
];

export function CookieConsent({ onAccept, onReject, onSave }: CookieConsentProps) {
  const [visible, setVisible] = useState(true);
  const [preferences, setPreferences] = useState(false);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const toggle = (label: string) =>
    setCategories((prev) =>
      prev.map((c) => (c.label === label && !c.disabled ? { ...c, checked: !c.checked } : c))
    );

  if (!visible) return null;

  const dismiss = (fn?: () => void) => {
    fn?.();
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-lg">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
          <Cookie className="h-5 w-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">We use cookies</p>
          <p className="mt-1 text-xs text-muted-foreground">
            This website uses cookies to enhance your browsing experience and provide personalized content.
          </p>
          {preferences && (
            <div className="mt-3 space-y-2">
              {categories.map((cat) => (
                <div key={cat.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">{cat.label}</p>
                    <p className="text-[11px] text-muted-foreground">{cat.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(cat.label)}
                    className={"flex h-5 w-9 items-center rounded-full px-0.5 " + (cat.checked ? "justify-end bg-primary" : "justify-start bg-muted")}
                  >
                    <span className="h-4 w-4 rounded-full bg-white shadow" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button type="button" onClick={() => setPreferences((p) => !p)} className="rounded-md bg-muted px-3 py-1.5 text-xs font-medium">
            {preferences ? "Save" : "Preferences"}
          </button>
          <button type="button" onClick={() => dismiss(onReject)} className="rounded-md bg-muted px-3 py-1.5 text-xs font-medium">
            Reject
          </button>
          <button type="button" onClick={() => dismiss(onAccept)} className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}`;

export const BANNER_EXAMPLE = `<CookieConsent onAccept={handleAccept} onReject={handleReject} />`;

export const CATEGORIES_EXAMPLE = `<CookieConsent
  onSave={(categories) => saveConsent(categories)}
/>`;

export const WIDGET_EXAMPLE = `<button className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-lg hover:scale-110 transition-transform">
  <Cookie className="h-5 w-5 text-amber-600" />
</button>`;