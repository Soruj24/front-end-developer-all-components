interface JobHeroSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
}

export function JobHeroSection({ search, onSearchChange, location, onLocationChange }: JobHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 sm:py-24 lg:px-8">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">12,847 open positions</span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Find your dream job</h1>
          <p className="mt-4 text-lg text-white/60">Discover opportunities at the world&apos;s best companies. Your next chapter starts here.</p>
        </div>
        <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Job title, skill, or keyword"
              className="w-full rounded-lg border-0 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 shadow-lg outline-none placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-white/20 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <input
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="City, state, or remote"
              className="w-full rounded-lg border-0 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 shadow-lg outline-none placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-white/20 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
            />
          </div>
          <button className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-zinc-900 shadow-lg transition-all duration-200 hover:bg-zinc-100 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
