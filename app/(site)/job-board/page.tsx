"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import {
  useJobSearch,
  useBookmarks,
  useJobCompare,
  useRecentlyViewed,
  useJobAlerts,
  FEATURED_JOBS,
  APPLICATIONS,
  RECRUITER,
  ALL_JOBS,
  FeaturedJobCard,
  JobCard,
  JobFilters,
  ApplicationTracker,
  SavedJobs,
  RecruiterCard,
  MarketTrends,
  JobDetailModal,
  JobCompare,
  SortingBar,
  Pagination,
  JobAlerts,
  SalaryInsights,
  SkillsMatch,
  ApplicationTimeline,
  InterviewPrep,
  CompanyInsights,
  JobSeekerTips,
  Footer,
  JobMapView,
  SalaryCalculator,
  CompanyDirectory,
  CompanyCompare,
  JobCategories,
  JobApplicationStats,
  CareerPathPlanner,
  JobMarketReportCard,
  CoverLetterTips,
  type Job,
  type SortOption,
} from "@/features/job-board";

const PER_PAGE = 6;

export default function JobBoardPage() {
  const { search, setSearch, location, setLocation, selectedTypes, toggleType, selectedLevels, toggleLevel, salaryMin, setSalaryMin, salaryMax, setSalaryMax, filteredJobs } = useJobSearch();
  const { bookmarked, toggle: toggleBookmark } = useBookmarks();
  const { compareList, addToCompare, removeFromCompare, clearCompare, isInCompare } = useJobCompare();
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();
  const { alerts, addAlert, removeAlert, toggleAlert } = useJobAlerts();

  const [activeJob, setActiveJob] = useState<number | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userSkills] = useState<string[]>(["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"]);

  const savedJobs = ALL_JOBS.filter((j) => bookmarked.includes(j.id));

  const categoryFilteredJobs = useMemo(() => {
    if (!selectedCategory) return filteredJobs;
    return filteredJobs.filter((j) => j.category === selectedCategory);
  }, [filteredJobs, selectedCategory]);

  const sortedJobs = useMemo(() => {
    const jobs = [...categoryFilteredJobs];
    switch (sortBy) {
      case "salary-high":
        return jobs.sort((a, b) => b.salaryMax - a.salaryMax);
      case "salary-low":
        return jobs.sort((a, b) => a.salaryMin - b.salaryMin);
      case "date-new":
        return jobs;
      case "date-old":
        return jobs.reverse();
      default:
        return jobs;
    }
  }, [categoryFilteredJobs, sortBy]);

  const totalPages = Math.ceil(sortedJobs.length / PER_PAGE);
  const paginatedJobs = sortedJobs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    addRecentlyViewed(job);
  };

  const handleApply = (id: number) => {
    alert(`Application submitted for job #${id}!`);
    setSelectedJob(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">Job Board</h1>
          <Badge variant="primary">30+ features</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          Complete job board platform with search, filters, sorting, pagination, job comparison, alerts, salary calculator, career path planner, company insights, and interview prep.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Jobs", value: "12,847", icon: "💼" },
          { label: "Companies", value: "3,421", icon: "🏢" },
          { label: "New This Week", value: "1,893", icon: "🆕" },
          { label: "Avg. Salary", value: "$165k", icon: "💰" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="text-lg font-bold tabular-nums text-zinc-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Featured Jobs</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_JOBS.map((j) => (
            <FeaturedJobCard key={j.id} job={j} isBookmarked={bookmarked.includes(j.id)} onToggleBookmark={toggleBookmark} />
          ))}
        </div>
      </section>

      <section>
        <JobCategories onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Job Listings {selectedCategory && <span className="text-base font-normal text-zinc-500 dark:text-zinc-400">in {selectedCategory}</span>}
                </h2>
                {compareList.length > 0 && (
                  <button onClick={() => document.getElementById("compare-section")?.scrollIntoView({ behavior: "smooth" })} className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">
                    Compare ({compareList.length})
                  </button>
                )}
              </div>

              <SortingBar sortBy={sortBy} onSortChange={setSortBy} totalResults={sortedJobs.length} perPage={PER_PAGE} currentPage={currentPage} />

              <div className="space-y-3">
                {paginatedJobs.map((j) => (
                  <div key={j.id} className="relative">
                    <JobCard
                      job={j}
                      isBookmarked={bookmarked.includes(j.id)}
                      onToggleBookmark={toggleBookmark}
                      isExpanded={activeJob === j.id}
                      onToggleExpand={(id) => {
                        setActiveJob(id === activeJob ? null : id);
                        const job = ALL_JOBS.find((j) => j.id === id);
                        if (job) handleJobClick(job);
                      }}
                    />
                    <div className="absolute right-4 top-4 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isInCompare(j.id)) addToCompare(j);
                        }}
                        className={`rounded-lg p-1.5 text-xs transition-colors ${isInCompare(j.id) ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"}`}
                        title={isInCompare(j.id) ? "In compare list" : "Add to compare"}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobClick(j);
                        }}
                        className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                        title="View details"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>

            <div id="compare-section">
              <JobCompare jobs={compareList} onRemove={removeFromCompare} onClear={clearCompare} />
            </div>

            <JobMapView jobs={sortedJobs} onJobClick={handleJobClick} />
          </div>

          <div className="w-full space-y-4 xl:w-80">
            <JobFilters selectedTypes={selectedTypes} onToggleType={toggleType} selectedLevels={selectedLevels} onToggleLevel={toggleLevel} salaryMin={salaryMin} onSalaryMinChange={setSalaryMin} salaryMax={salaryMax} onSalaryMaxChange={setSalaryMax} onLocationSelect={setLocation} />

            <SavedJobs jobs={savedJobs} />

            <JobAlerts alerts={alerts} onAdd={addAlert} onRemove={removeAlert} onToggle={toggleAlert} />

            <ApplicationTimeline applications={APPLICATIONS} />

            <JobApplicationStats />

            <RecruiterCard recruiter={RECRUITER} />

            <MarketTrends />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Salary Tools</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <SalaryCalculator />
          <SalaryInsights />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Career Development</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <CareerPathPlanner />
          <CoverLetterTips />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Interview Preparation</h2>
        <InterviewPrep />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Market Intelligence</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <JobMarketReportCard />
          <CompanyDirectory />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Company Insights</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <CompanyInsights />
          <CompanyCompare />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">Career Tips</h2>
        <JobSeekerTips />
      </section>

      <Footer />

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isBookmarked={bookmarked.includes(selectedJob.id)}
          onToggleBookmark={toggleBookmark}
          onClose={() => setSelectedJob(null)}
          onApply={handleApply}
          userSkills={userSkills}
        />
      )}
    </div>
  );
}
