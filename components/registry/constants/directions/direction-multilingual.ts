import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const directionMultilingual: RegistryEntry = entry({
  id: "direction-multilingual",
  title: "Multilingual Demo",
  description: "Full multilingual UI with language switcher and RTL support.",
  source: `"use client";

import { useState } from "react";
import { DirectionProvider } from "@/components/_direction";

const languages = [
  { code: "ltr", label: "English", flag: "🇺🇸", text: "Hello, welcome to our platform!" },
  { code: "rtl", label: "Arabic", flag: "🇸🇦", text: "!مرحباً بكم في منصتنا" },
];

export default function DirectionMultilingual() {
  const [lang, setLang] = useState<"ltr" | "rtl">("ltr");
  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code as "ltr" | "rtl")}
            className={\`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium \${
              lang === l.code
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "border hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }\`}
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>
      <DirectionProvider dir={lang}>
        <div className="rounded-lg border p-6">
          <p className="text-lg font-semibold">{current.text}</p>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              {lang === "ltr" ? "Get Started" : "ابدأ الآن"}
            </button>
            <button
              type="button"
              className="rounded-md border px-4 py-2 text-sm"
            >
              {lang === "ltr" ? "Learn More" : "اعرف المزيد"}
            </button>
          </div>
        </div>
      </DirectionProvider>
    </div>
  );
}`,
});
