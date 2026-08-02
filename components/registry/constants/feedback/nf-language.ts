import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfLanguage: RegistryEntry = entry({
    id: "nf-language",
    title: "Language Picker 404",
    description: "Let visitors choose their language and see the error in it.",
    source: `import { useState } from "react";

export default function NfLanguage() {
  const languages = [
    { code: "en", label: "English", native: "English" },
    { code: "es", label: "Spanish", native: "Español" },
    { code: "fr", label: "French", native: "Français" },
    { code: "de", label: "German", native: "Deutsch" },
    { code: "ja", label: "Japanese", native: "日本語" },
    { code: "ko", label: "Korean", native: "한국어" },
  ];
  const [selectedLang, setSelectedLang] = useState(languages[0].code);
  const msgs: Record<string, string> = {
    en: "Page not found",
    es: "Página no encontrada",
    fr: "Page non trouvée",
    de: "Seite nicht gefunden",
    ja: "ページが見つかりません",
    ko: "페이지를 찾을 수 없음",
  };

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <h1 className="text-7xl font-bold text-zinc-200 dark:text-zinc-700">404</h1>
      <p className="mt-2 text-sm text-zinc-500">Choose your language</p>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={\`rounded-lg border px-4 py-3 text-sm transition-all \${
              selectedLang === lang.code
                ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-300"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
            }\`}
          >
            <div className="font-medium">{lang.native}</div>
            <div className="mt-0.5 text-[10px] text-zinc-400">{lang.label}</div>
          </button>
        ))}
      </div>
      <p className="mt-5 text-xs text-zinc-400">{msgs[selectedLang]}</p>
      <button className="mt-5 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary">Go Home</button>
    </div>
  );
}`,
  });
