import { footerSections } from "../constants/saas-data";

export function CTASection() {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-16 text-center text-white">
      <h2 className="text-3xl font-bold">Ready to get started?</h2>
      <p className="mt-3 text-white/80">Join 50,000+ teams already using FlowState.</p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">Start Free Trial</button>
        <button className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">Talk to Sales</button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 pt-12 dark:border-zinc-800">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">FlowState</span>
          </div>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Analytics, collaboration, and automation in one platform.</p>
        </div>
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{section.title}</h4>
            <ul className="mt-3 space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 py-6 sm:flex-row dark:border-zinc-800">
        <p className="text-xs text-zinc-400">&copy; 2026 FlowState. All rights reserved.</p>
        <div className="flex gap-4">
          {["Twitter", "GitHub", "LinkedIn", "Discord"].map((s) => (
            <a key={s} href="#" className="text-xs text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
