interface JobHeroSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
}

export function JobHeroSection({ search, onSearchChange, location, onLocationChange }: JobHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-15" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">12,847 open positions</span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Find your dream job</h1>
          <p className="mt-4 text-lg text-white/80">Discover opportunities at the world&apos;s best companies. Your next chapter starts here.</p>
        </div>
        <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Job title, skill, or keyword" className="w-full rounded-xl border-0 bg-white py-3.5 pl-10 pr-4 text-sm shadow-xl outline-none dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          </div>
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <input value={location} onChange={(e) => onLocationChange(e.target.value)} placeholder="City, state, or remote" className="w-full rounded-xl border-0 bg-white py-3.5 pl-10 pr-4 text-sm shadow-xl outline-none dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          </div>
          <button className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 shadow-xl transition-colors hover:bg-blue-50">Search</button>
        </div>
      </div>
    </section>
  );
}
