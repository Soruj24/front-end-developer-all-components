"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  useJobSearch,
  useBookmarks,
  FEATURED_JOBS,
  APPLICATIONS,
  RECRUITER,
  FeaturedJobCard,
  JobCard,
  JobFilters,
  ApplicationTracker,
  SavedJobs,
  RecruiterCard,
  MarketTrends,
  ALL_JOBS,
} from "@/features/job-board";



export default function JobBoardPage() {
  const { search, setSearch, location, setLocation, selectedTypes, toggleType, selectedLevels, toggleLevel, salaryMin, setSalaryMin, salaryMax, setSalaryMax, filteredJobs } = useJobSearch();
  const { bookmarked, toggle: toggleBookmark } = useBookmarks();
  const [activeJob, setActiveJob] = useState<number | null>(null);

  const savedJobs = ALL_JOBS.filter((j) => bookmarked.includes(j.id));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Job Board</h1>
          <Badge variant="primary">10 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Job board with search, filters, featured jobs, applications, company reviews, and career resources.
        </p>
      </header>

      

      

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Featured Jobs</h3>
          <p className="text-sm text-muted-foreground">Handpicked job opportunities with company logos and salary info.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6 rounded-lg border border-border bg-background">
            {FEATURED_JOBS.map((j) => <FeaturedJobCard key={j.id} job={j} isBookmarked={bookmarked.includes(j.id)} onToggleBookmark={toggleBookmark} />)}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Job Listings with Filters</h3>
          <p className="text-sm text-muted-foreground">Searchable job list with type, level, and salary filters.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <JobFilters selectedTypes={selectedTypes} onToggleType={toggleType} selectedLevels={selectedLevels} onToggleLevel={toggleLevel} salaryMin={salaryMin} onSalaryMinChange={setSalaryMin} salaryMax={salaryMax} onSalaryMaxChange={setSalaryMax} onLocationSelect={setLocation} />
            <div className="space-y-4 mt-6">
              {filteredJobs.map((j) => <JobCard key={j.id} job={j} isBookmarked={bookmarked.includes(j.id)} onToggleBookmark={toggleBookmark} isExpanded={activeJob === j.id} onToggleExpand={(id) => setActiveJob(id === activeJob ? null : id)} />)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Sidebar Widgets</h3>
          <p className="text-sm text-muted-foreground">Saved jobs, application tracker, and recruiter card.</p>
          <div className="grid gap-6 lg:grid-cols-3 p-6 rounded-lg border border-border bg-background">
            <SavedJobs jobs={savedJobs} />
            <ApplicationTracker applications={APPLICATIONS} />
            <div className="space-y-6">
              <RecruiterCard recruiter={RECRUITER} />
              <MarketTrends />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
