"use client";

import { useState } from "react";
import {
  useJobSearch,
  useBookmarks,
  FEATURED_JOBS,
  SIMILAR_JOBS,
  RECOMMENDED_JOBS,
  COMPANIES,
  COMPANY_REVIEWS,
  APPLICATIONS,
  RECRUITER,
  RECENT_SEARCHES,
  CAREER_RESOURCES,
  JobHeroSection,
  FeaturedJobCard,
  JobCard,
  JobFilters,
  ApplicationTracker,
  SavedJobs,
  RecruiterCard,
  CompanyCard,
  CompanyReviewCard,
  CareerResources,
  JobStats,
  MarketTrends,
  Newsletter,
  Footer,
  ALL_JOBS,
} from "@/features/job-board";

export default function JobBoardPage() {
  const { search, setSearch, location, setLocation, selectedTypes, toggleType, selectedLevels, toggleLevel, salaryMin, setSalaryMin, salaryMax, setSalaryMax, filteredJobs } = useJobSearch();
  const { bookmarked, toggle: toggleBookmark } = useBookmarks();
  const [activeJob, setActiveJob] = useState<number | null>(null);

  const savedJobs = ALL_JOBS.filter((j) => bookmarked.includes(j.id));

  return (
    <div className="min-h-screen bg-background">
      <JobHeroSection search={search} onSearchChange={setSearch} location={location} onLocationChange={setLocation} />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:px-8">
        <JobStats />

        <JobFilters selectedTypes={selectedTypes} onToggleType={toggleType} selectedLevels={selectedLevels} onToggleLevel={toggleLevel} salaryMin={salaryMin} onSalaryMinChange={setSalaryMin} salaryMax={salaryMax} onSalaryMaxChange={setSalaryMax} onLocationSelect={setLocation} />

        {/* Featured Jobs */}
        <div>
          <div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Featured Jobs</h2><p className="mt-1 text-sm text-muted-foreground">Top opportunities handpicked for you</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_JOBS.map((j) => <FeaturedJobCard key={j.id} job={j} isBookmarked={bookmarked.includes(j.id)} onToggleBookmark={toggleBookmark} />)}
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Job Listings */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="mb-4 flex items-end justify-between"><div><h2 className="text-2xl font-bold text-foreground">All Jobs</h2><p className="mt-1 text-sm text-muted-foreground">{filteredJobs.length} jobs found</p></div></div>
              <div className="space-y-4">
                {filteredJobs.map((j) => <JobCard key={j.id} job={j} isBookmarked={bookmarked.includes(j.id)} onToggleBookmark={toggleBookmark} isExpanded={activeJob === j.id} onToggleExpand={(id) => setActiveJob(id === activeJob ? null : id)} />)}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Prev</button>
              {[1, 2, 3, 4, 5].map((p) => <button key={p} className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${p === 1 ? "bg-blue-600 text-white" : "border border-border text-muted-foreground hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"}`}>{p}</button>)}
              <button className="rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Next</button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 space-y-6 lg:w-80">
            <SavedJobs jobs={savedJobs} />
            <ApplicationTracker applications={APPLICATIONS} />
            <RecruiterCard recruiter={RECRUITER} />
            <MarketTrends />
          </aside>
        </div>

        {/* Companies */}
        <div>
          <div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Top Companies</h2><p className="mt-1 text-sm text-muted-foreground">Explore companies hiring now</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {COMPANIES.map((c) => <CompanyCard key={c.name} company={c} />)}
          </div>
        </div>

        {/* Similar & Recommended */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Similar Jobs</h3>
            <div className="space-y-3">
              {SIMILAR_JOBS.map((j) => (
                <div key={j.id} className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-blue-300 dark:border-border dark:hover:border-blue-700">
                  <img src={j.companyLogo} alt={j.company} className="h-10 w-10 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{j.title}</p>
                    <p className="text-xs text-muted-foreground">{j.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{j.salary}</p>
                    <p className="text-xs text-muted-foreground">{j.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Recommended for You</h3>
            <div className="space-y-3">
              {RECOMMENDED_JOBS.map((j) => (
                <div key={j.id} className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-blue-300 dark:border-border dark:hover:border-blue-700">
                  <img src={j.companyLogo} alt={j.company} className="h-10 w-10 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{j.title}</p>
                      <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{j.match}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{j.company} · {j.salary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Company Reviews</h2><p className="mt-1 text-sm text-muted-foreground">What employees are saying</p></div>
          <div className="grid gap-6 sm:grid-cols-2">
            {COMPANY_REVIEWS.map((r) => <CompanyReviewCard key={r.company} review={r} />)}
          </div>
        </div>

        <CareerResources resources={CAREER_RESOURCES} />

        {/* Recent Searches */}
        <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {RECENT_SEARCHES.map((s) => (
              <button key={s} onClick={() => setSearch(s.split(" ").slice(0, 2).join(" "))} className="flex items-center gap-1.5 rounded-full bg-muted px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {s}
              </button>
            ))}
          </div>
        </div>

        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
