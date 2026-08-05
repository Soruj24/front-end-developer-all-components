import { stats } from "../constants/saas-data";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-20 text-center text-white">
      <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-medium backdrop-blur-sm">Now in Public Beta</span>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Make Data-Driven Decisions at Flow Speed</h1>
      <p className="max-w-xl text-base text-white/80">FlowState brings together analytics, collaboration, and automation in one powerful platform.</p>
      <div className="flex gap-4">
        <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">Start Free Trial</button>
        <button className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">Watch Demo</button>
      </div>
      <div className="flex items-center gap-4 text-xs text-white/60">
        <span>No credit card required</span>
        <span>·</span>
        <span>14-day free trial</span>
        <span>·</span>
        <span>Cancel anytime</span>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.id} className="text-center">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
