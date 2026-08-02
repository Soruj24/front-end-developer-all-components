import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfContact: RegistryEntry = entry({
    id: "nf-contact",
    title: "Contact 404",
    description: "A not-found page that points visitors to email and live chat support.",
    source: `export default function NfContact() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <h1 className="text-7xl font-bold text-zinc-200 dark:text-zinc-700">404</h1>
      <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">Still stuck?</p>
      <p className="text-sm text-zinc-400">Contact our support team</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <a href="mailto:support@example.com" className="flex items-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition-all hover:border-indigo-300 hover:text-primary dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:border-indigo-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Email
        </a>
        <a href="#" className="flex items-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition-all hover:border-indigo-300 hover:text-primary dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:border-indigo-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Live Chat
        </a>
      </div>
      <button className="mt-6 text-sm text-zinc-400 underline underline-offset-2 hover:text-zinc-600">Go Home</button>
    </div>
  );
}`,
  });
