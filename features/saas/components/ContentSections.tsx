import Image from "next/image";
import { caseStudies, howItWorks, integrations } from "../constants/saas-data";

export function HowItWorksSection() {
  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">How it works</h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">Get started in three simple steps.</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-3">
        {howItWorks.map((h) => (
          <div key={h.id} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">{h.step}</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{h.title}</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{h.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IntegrationsSection() {
  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Integrates with your stack</h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">200+ native integrations to connect your tools.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {integrations.map((i) => (
          <div key={i.id} className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 p-4 transition-colors hover:border-blue-200 dark:border-zinc-800 dark:hover:border-blue-800">
            <span className="text-3xl">{i.logo}</span>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{i.name}</p>
            <p className="text-xs text-zinc-500">{i.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CaseStudiesSection() {
  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Customer success stories</h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">Real results from real teams.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <div key={cs.id} className="overflow-hidden rounded-xl border border-zinc-200 transition-colors hover:shadow-sm dark:border-zinc-800">
            <div className="relative h-40">
              <Image src={cs.image} alt={cs.company} fill className="object-cover" sizes="400px" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">{cs.industry}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{cs.company}</h3>
              <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">{cs.metric}</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{cs.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
