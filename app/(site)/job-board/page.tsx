"use client";

import { useState } from "react";

const jobTypes = ["Remote", "Full-Time", "Part-Time", "Contract", "Freelance", "Internship"];
const experienceLevels = ["Entry", "Mid", "Senior", "Lead", "Principal"];
const categories = ["Engineering", "Design", "Marketing", "Sales", "Finance", "HR", "Legal", "Operations", "Data", "Product"];
const locations = ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Chicago, IL", "Remote"];

const featuredJobs = [
  { id: 1, title: "Senior Frontend Engineer", company: "TechCorp", location: "San Francisco, CA", salary: "$150k - $200k", type: "Full-Time", remote: true, urgent: true, logo: "T", color: "from-blue-500 to-blue-700" },
  { id: 2, title: "Product Designer", company: "DesignStudio", location: "New York, NY", salary: "$120k - $160k", type: "Full-Time", remote: false, urgent: false, logo: "D", color: "from-purple-500 to-purple-700" },
  { id: 3, title: "DevOps Engineer", company: "CloudBase", location: "Remote", salary: "$140k - $180k", type: "Contract", remote: true, urgent: true, logo: "C", color: "from-emerald-500 to-emerald-700" },
];

const allJobs = [
  { id: 4, title: "Backend Engineer", company: "DataFlow", location: "Austin, TX", salary: "$130k - $170k", type: "Full-Time", remote: true, skills: ["Go", "PostgreSQL", "Kubernetes"], posted: "2h ago" },
  { id: 5, title: "UX Researcher", company: "UserFirst", location: "Seattle, WA", salary: "$100k - $140k", type: "Full-Time", remote: false, skills: ["User Testing", "Figma", "Qualitative"], posted: "5h ago" },
  { id: 6, title: "Marketing Lead", company: "GrowthX", location: "New York, NY", salary: "$110k - $150k", type: "Part-Time", remote: true, skills: ["SEO", "Content Strategy", "Analytics"], posted: "1d ago" },
  { id: 7, title: "Data Scientist", company: "InsightAI", location: "Remote", salary: "$160k - $210k", type: "Full-Time", remote: true, skills: ["Python", "ML", "TensorFlow"], posted: "3d ago" },
  { id: 8, title: "iOS Developer", company: "AppFlow", location: "Chicago, IL", salary: "$120k - $160k", type: "Contract", remote: false, skills: ["Swift", "UIKit", "Core Data"], posted: "1w ago" },
  { id: 9, title: "HR Coordinator", company: "PeopleFirst", location: "San Francisco, CA", salary: "$70k - $90k", type: "Full-Time", remote: true, skills: ["Onboarding", "Payroll", "Compliance"], posted: "2w ago" },
  { id: 10, title: "Security Analyst", company: "SecureNet", location: "Remote", salary: "$130k - $170k", type: "Full-Time", remote: true, skills: ["Pen Testing", "SIEM", "Cloud Sec"], posted: "3d ago" },
  { id: 11, title: "Frontend Developer", company: "WebCraft", location: "Austin, TX", salary: "$100k - $140k", type: "Freelance", remote: true, skills: ["React", "TypeScript", "Tailwind"], posted: "6h ago" },
  { id: 12, title: "Financial Analyst", company: "CapitalWise", location: "New York, NY", salary: "$90k - $120k", type: "Full-Time", remote: false, skills: ["Excel", "Modeling", "Forecasting"], posted: "1d ago" },
];

const savedJobs = [allJobs[0], allJobs[2]];

const applications = [
  { id: 1, title: "Senior Frontend Engineer", company: "TechCorp", status: "Interview", stage: "Technical Screen", date: "Aug 5, 2026" },
  { id: 2, title: "Product Designer", company: "DesignStudio", status: "Applied", stage: "Under Review", date: "Jul 28, 2026" },
  { id: 3, title: "DevOps Engineer", company: "CloudBase", status: "Rejected", stage: "Closed", date: "Jul 20, 2026" },
  { id: 4, title: "Backend Engineer", company: "DataFlow", status: "Offer", stage: "Negotiation", date: "Aug 1, 2026" },
];

const companies = [
  { name: "TechCorp", logo: "T", color: "from-blue-500 to-blue-700", openRoles: 12, rating: 4.5, size: "1,000 - 5,000" },
  { name: "DesignStudio", logo: "D", color: "from-purple-500 to-purple-700", openRoles: 8, rating: 4.3, size: "200 - 500" },
  { name: "CloudBase", logo: "C", color: "from-emerald-500 to-emerald-700", openRoles: 15, rating: 4.7, size: "500 - 1,000" },
  { name: "DataFlow", logo: "DF", color: "from-amber-500 to-amber-700", openRoles: 6, rating: 4.1, size: "100 - 200" },
  { name: "UserFirst", logo: "UF", color: "from-rose-500 to-rose-700", openRoles: 4, rating: 4.4, size: "50 - 100" },
  { name: "GrowthX", logo: "GX", color: "from-cyan-500 to-cyan-700", openRoles: 9, rating: 4.6, size: "500 - 1,000" },
];

const reviews = [
  { company: "TechCorp", rating: 4.5, text: "Great engineering culture with solid growth opportunities.", role: "Senior Engineer", date: "2 months ago" },
  { company: "DesignStudio", rating: 4.3, text: "Creative environment with great work-life balance.", role: "Product Designer", date: "1 month ago" },
];

const similarJobs = [
  { id: 13, title: "Staff Frontend Engineer", company: "ScaleUp", salary: "$180k - $230k", type: "Full-Time" },
  { id: 14, title: "React Engineer", company: "BuildRight", salary: "$140k - $180k", type: "Full-Time" },
  { id: 15, title: "UI Engineer", company: "PixelPerfect", salary: "$130k - $170k", type: "Contract" },
];

const recommendedJobs = [
  { id: 16, title: "Full Stack Developer", company: "StackComplete", salary: "$120k - $160k", match: 95, skills: ["React", "Node", "Postgres"] },
  { id: 17, title: "Technical Writer", company: "DocuWell", salary: "$90k - $120k", match: 88, skills: ["Documentation", "API", "Markdown"] },
  { id: 18, title: "Cloud Architect", company: "SkyNet", salary: "$170k - $220k", match: 82, skills: ["AWS", "Azure", "Terraform"] },
];

const recentSearches = ["frontend engineer san francisco", "remote react developer", "product designer nyc", "devops engineer contract", "data scientist remote"];

const careerResources = [
  { title: "How to Ace Your Technical Interview", reads: "12k", icon: "🎯" },
  { title: "Salary Negotiation Guide 2026", reads: "8.5k", icon: "💰" },
  { title: "Remote Work Best Practices", reads: "6.3k", icon: "🏠" },
  { title: "Building a Standout Portfolio", reads: "4.7k", icon: "📁" },
];

const recruiter = {
  name: "Sarah Mitchell", title: "Senior Tech Recruiter", company: "TechCorp", avatar: "SM", email: "sarah@techcorp.com", phone: "+1 (555) 123-4567",
};

const statusColors: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Interview: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "text-amber-400" : "text-muted-foreground"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating}</span>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{subtitle}</p>}
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-white p-6 transition-all dark:border-border dark:bg-zinc-900 ${className}`}>
      {children}
    </div>
  );
}

export default function JobBoardPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState(50);
  const [salaryMax, setSalaryMax] = useState(250);
  const [bookmarked, setBookmarked] = useState<number[]>([1, 4]);
  const [activeJob, setActiveJob] = useState<number | null>(null);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const toggleType = (t: string) => {
    setSelectedTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  };
  const toggleLevel = (l: string) => {
    setSelectedLevels((prev) => prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]);
  };
  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const filteredJobs = allJobs.filter((j) => {
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (selectedTypes.length && !selectedTypes.includes(j.type)) return false;
    return true;
  });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      {/* Hero */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Job Board</h1>
        <p className="text-muted-foreground">Find your next opportunity from thousands of curated listings.</p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Active Jobs", value: "12,847" },
          { label: "Companies", value: "3,421" },
          { label: "New This Week", value: "1,893" },
          { label: "Avg. Salary", value: "$132k" },
        ].map((s) => (
          <Card key={s.label}>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Keyword</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Job title, skill, or keyword" className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
            </div>
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Location</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, state, or remote" className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
            </div>
          </div>
          <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Search</button>
        </div>
      </Card>

      {/* Job Type Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {jobTypes.map((t) => (
          <button key={t} onClick={() => toggleType(t)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedTypes.includes(t) ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}>{t}</button>
        ))}
      </div>

      {/* Experience Level Filter */}
      <div className="flex flex-wrap gap-2">
        <span className="mr-2 flex items-center text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">Experience:</span>
        {experienceLevels.map((l) => (
          <button key={l} onClick={() => toggleLevel(l)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedLevels.includes(l) ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}>{l}</button>
        ))}
      </div>

      {/* Salary Range Slider */}
      <Card>
        <SectionTitle title="Salary Range" subtitle={`$${salaryMin}k - $${salaryMax}k`} />
        <div className="mt-4 flex items-center gap-4">
          <input type="range" min={30} max={300} value={salaryMin} onChange={(e) => setSalaryMin(Math.min(Number(e.target.value), salaryMax - 10))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-blue-600 dark:bg-muted" />
          <input type="range" min={30} max={300} value={salaryMax} onChange={(e) => setSalaryMax(Math.max(Number(e.target.value), salaryMin + 10))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-blue-600 dark:bg-muted" />
        </div>
      </Card>

      {/* Categories Browse */}
      <Card>
        <SectionTitle title="Browse by Category" subtitle="Find jobs in your field" />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((cat) => (
            <button key={cat} className="rounded-lg border border-border px-4 py-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-border dark:text-muted-foreground dark:hover:border-blue-700 dark:hover:text-blue-400">{cat}</button>
          ))}
        </div>
      </Card>

      {/* Location Filter */}
      <Card>
        <SectionTitle title="Popular Locations" />
        <div className="mt-4 flex flex-wrap gap-2">
          {locations.map((loc) => (
            <button key={loc} onClick={() => setLocation(loc)} className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-border dark:text-muted-foreground/70 dark:hover:border-blue-700 dark:hover:text-blue-400">{loc}</button>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Job Listings */}
        <div className="flex-1 space-y-6">
          {/* Featured Jobs */}
          <div>
            <SectionTitle title="Featured Jobs" subtitle="Top opportunities handpicked for you" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((j) => (
                <div key={j.id} className={`group relative overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900 ${activeJob === j.id ? "ring-2 ring-blue-500" : ""}`} onClick={() => setActiveJob(j.id === activeJob ? null : j.id)}>
                  <div className={`flex h-24 items-center justify-center bg-gradient-to-br ${j.color}`}>
                    <span className="text-3xl font-bold text-white/90">{j.logo}</span>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{j.title}</h3>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{j.company}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); toggleBookmark(j.id); }} className="shrink-0">
                        <svg className={`h-5 w-5 ${bookmarked.includes(j.id) ? "text-blue-600 fill-blue-600" : "text-muted-foreground/70 hover:text-muted-foreground"}`} fill={bookmarked.includes(j.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {j.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {j.salary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {j.remote && <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Remote</span>}
                      {j.urgent && <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">Urgent</span>}
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{j.type}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 rounded-lg bg-blue-600 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700">Easy Apply</button>
                      <button className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Save</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Listing Cards */}
          <div>
            <SectionTitle title="All Jobs" subtitle={`${filteredJobs.length} jobs found`} />
            <div className="mt-4 space-y-4">
              {filteredJobs.map((j) => (
                <div key={j.id} className={`rounded-xl border border-border bg-white p-5 transition-all hover:shadow-md dark:border-border dark:bg-zinc-900 ${activeJob === j.id ? "ring-2 ring-blue-500" : ""}`} onClick={() => setActiveJob(j.id === activeJob ? null : j.id)}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-sm font-bold text-blue-700 dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-300">
                        {j.company[0]}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground">{j.title}</h3>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{j.company} · {j.location}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{j.salary}</span>
                          <span className="text-xs text-muted-foreground/70">·</span>
                          <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{j.posted}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {j.skills.map((s) => (
                            <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <button onClick={(e) => { e.stopPropagation(); toggleBookmark(j.id); }}>
                        <svg className={`h-5 w-5 ${bookmarked.includes(j.id) ? "text-blue-600 fill-blue-600" : "text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300"}`} fill={bookmarked.includes(j.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      <button className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700">Easy Apply</button>
                    </div>
                  </div>
                  {activeJob === j.id && (
                    <div className="mt-4 border-t border-border pt-4 dark:border-border">
                      <p className="text-sm text-muted-foreground">We are looking for a talented {j.title} to join {j.company}. You will work on cutting-edge projects with a team of experienced professionals. This is a {j.type.toLowerCase()} position based in {j.location}.</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Apply Now</button>
                        <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Save for Later</button>
                        <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Share</button>
                        <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-border dark:text-red-400 dark:hover:bg-red-900/20">Report</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Prev</button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button key={p} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${p === 1 ? "bg-blue-600 text-white" : "border border-border text-muted-foreground hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"}`}>{p}</button>
            ))}
            <button className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Next</button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 space-y-6 lg:w-80">
          {/* Saved Jobs */}
          <Card>
            <SectionTitle title="Saved Jobs" subtitle={`${savedJobs.length} saved`} />
            <div className="mt-4 space-y-3">
              {savedJobs.map((j) => (
                <div key={j.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 text-xs font-bold text-blue-700 dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-300">{j.company[0]}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{j.title}</p>
                    <p className="text-xs text-muted-foreground">{j.company}</p>
                  </div>
                </div>
              ))}
              <button className="w-full rounded-lg border border-border py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">View All Saved</button>
            </div>
          </Card>

          {/* Application Tracker */}
          <Card>
            <SectionTitle title="Applications" subtitle="Track your progress" />
            <div className="mt-4 space-y-3">
              {applications.map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{a.company} · {a.stage}</p>
                    <p className="text-xs text-muted-foreground/70">{a.date}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          </Card>

          {/* Resume Upload */}
          <Card>
            <SectionTitle title="Resume" subtitle={resumeUploaded ? "resume_2026.pdf" : "Upload your resume"} />
            <div className="mt-4">
              {resumeUploaded ? (
                <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
                  <svg className="h-8 w-8 shrink-0 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">resume_2026.pdf</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">Uploaded successfully</p>
                  </div>
                </div>
              ) : (
                <button onClick={() => setResumeUploaded(true)} className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-4 text-sm text-muted-foreground transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-border dark:hover:border-blue-500">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  Upload Resume
                </button>
              )}
            </div>
          </Card>

          {/* Cover Letter Editor */}
          <Card>
            <SectionTitle title="Cover Letter" />
            <div className="mt-4">
              {showCoverLetter ? (
                <div className="space-y-3">
                  <textarea defaultValue="Dear Hiring Manager,\n\nI am excited to apply for this position..." rows={4} className="w-full rounded-lg border border-border bg-white p-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100" />
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Save</button>
                    <button onClick={() => setShowCoverLetter(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowCoverLetter(true)} className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Write Cover Letter
                </button>
              )}
            </div>
          </Card>

          {/* Interview Scheduler */}
          <Card>
            <SectionTitle title="Interview Scheduler" />
            <div className="mt-4">
              {showScheduler ? (
                <div className="space-y-3">
                  <input type="date" className="w-full rounded-lg border border-border bg-white p-2.5 text-sm outline-none transition-colors focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100" />
                  <select className="w-full rounded-lg border border-border bg-white p-2.5 text-sm outline-none transition-colors focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100">
                    <option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option><option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option>
                  </select>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Schedule</button>
                    <button onClick={() => setShowScheduler(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Cancel</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowScheduler(true)} className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Schedule Interview
                </button>
              )}
            </div>
          </Card>

          {/* Job Alert Form */}
          <Card>
            <SectionTitle title="Job Alert" subtitle="Get notified about new jobs" />
            <div className="mt-4 space-y-3">
              {showAlertForm ? (
                <div className="space-y-3">
                  <input placeholder="job@email.com" className="w-full rounded-lg border border-border bg-white p-2.5 text-sm outline-none transition-colors focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
                  <select className="w-full rounded-lg border border-border bg-white p-2.5 text-sm outline-none transition-colors focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100">
                    <option>Daily</option><option>Weekly</option><option>Instant</option>
                  </select>
                  <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Create Alert</button>
                </div>
              ) : (
                <button onClick={() => setShowAlertForm(true)} className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  Set Up Job Alert
                </button>
              )}
            </div>
          </Card>

          {/* Quick Apply Form */}
          <Card>
            <SectionTitle title="Quick Apply" />
            {showApplyForm ? (
              <div className="mt-4 space-y-3">
                <input placeholder="Full Name" className="w-full rounded-lg border border-border bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100" />
                <input placeholder="Email" className="w-full rounded-lg border border-border bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100" />
                <input placeholder="Phone" className="w-full rounded-lg border border-border bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100" />
                <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Submit Application</button>
                <button onClick={() => setShowApplyForm(false)} className="w-full rounded-lg border border-border py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setShowApplyForm(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Quick Apply
              </button>
            )}
          </Card>

          {/* Recruiter Profile */}
          <Card>
            <SectionTitle title="Contact Recruiter" />
            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">{recruiter.avatar}</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{recruiter.name}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{recruiter.title} at {recruiter.company}</p>
                <div className="mt-2 space-y-1">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {recruiter.email}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {recruiter.phone}
                  </p>
                </div>
                <button className="mt-3 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">Send Message</button>
              </div>
            </div>
          </Card>

          {/* Job Stats */}
          <Card>
            <SectionTitle title="Job Stats" />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-muted/40 p-3 dark:bg-muted/50">
                <p className="text-lg font-bold text-foreground">847</p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3 dark:bg-muted/50">
                <p className="text-lg font-bold text-foreground">124</p>
                <p className="text-xs text-muted-foreground">Applicants</p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3 dark:bg-muted/50">
                <p className="text-lg font-bold text-foreground">32</p>
                <p className="text-xs text-muted-foreground">Hiring</p>
              </div>
            </div>
          </Card>

          {/* Skill Match */}
          <Card>
            <SectionTitle title="Skill Match" subtitle="How you compare" />
            <div className="mt-4 space-y-3">
              {[
                { skill: "React", match: 95 },
                { skill: "TypeScript", match: 90 },
                { skill: "Node.js", match: 75 },
                { skill: "Python", match: 45 },
              ].map((s) => (
                <div key={s.skill}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{s.skill}</span>
                    <span className="text-xs text-muted-foreground">{s.match}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full transition-all ${s.match >= 80 ? "bg-emerald-500" : s.match >= 60 ? "bg-amber-500" : "bg-zinc-400"}`} style={{ width: `${s.match}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      {/* Company Cards */}
      <div>
        <SectionTitle title="Top Companies" subtitle="Explore companies hiring now" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {companies.map((c) => (
            <Card key={c.name} className="text-center">
              <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${c.color}`}>
                <span className="text-lg font-bold text-white">{c.logo}</span>
              </div>
              <h3 className="font-semibold text-foreground">{c.name}</h3>
              <RatingStars rating={c.rating} />
              <p className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground/70">{c.size} employees</p>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{c.openRoles} open roles</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Reviews */}
      <div>
        <SectionTitle title="Company Reviews" subtitle="What employees are saying" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <Card key={r.company}>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{r.company}</h3>
                <RatingStars rating={r.rating} />
              </div>
              <p className="text-sm text-muted-foreground">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-muted-foreground">{r.role}</span>
                <span>·</span>
                <span>{r.date}</span>
              </div>
            </Card>
          ))}
          <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-sm text-muted-foreground transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-border dark:hover:border-blue-500">
            + Write a Review
          </button>
        </div>
      </div>

      {/* Similar Jobs */}
      <Card>
        <SectionTitle title="Similar Jobs" subtitle="Based on your recent activity" />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {similarJobs.map((j) => (
            <div key={j.id} className="rounded-lg border border-border p-4 transition-colors hover:border-blue-300 dark:border-border dark:hover:border-blue-700">
              <h3 className="font-medium text-foreground">{j.title}</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{j.company}</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{j.salary}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground dark:text-muted-foreground/70">{j.type}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommended Jobs */}
      <Card>
        <SectionTitle title="Recommended for You" subtitle="Based on your skills and experience" />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {recommendedJobs.map((j) => (
            <div key={j.id} className="rounded-lg border border-border p-4 transition-colors hover:border-blue-300 dark:border-border dark:hover:border-blue-700">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{j.title}</h3>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{j.company}</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{j.match}%</span>
              </div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{j.salary}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {j.skills.map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Searches */}
      <Card>
        <SectionTitle title="Recent Searches" />
        <div className="mt-4 flex flex-wrap gap-2">
          {recentSearches.map((s) => (
            <button key={s} onClick={() => setSearch(s.split(" ").slice(0, 2).join(" "))} className="flex items-center gap-1.5 rounded-full bg-muted px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {s}
            </button>
          ))}
          <button className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-muted-foreground/70 transition-colors hover:text-muted-foreground">Clear All</button>
        </div>
      </Card>

      {/* Career Resources */}
      <div>
        <SectionTitle title="Career Resources" subtitle="Articles to help your job search" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {careerResources.map((r) => (
            <Card key={r.title}>
              <div className="mb-2 text-2xl">{r.icon}</div>
              <h3 className="text-sm font-medium text-foreground">{r.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.reads} reads</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Salary Comparison */}
      <Card>
        <SectionTitle title="Salary Comparison" subtitle="Average salaries by role" />
        <div className="mt-4 space-y-4">
          {[
            { role: "Frontend Engineer", junior: 80, mid: 120, senior: 180 },
            { role: "Backend Engineer", junior: 85, mid: 130, senior: 190 },
            { role: "DevOps Engineer", junior: 90, mid: 135, senior: 195 },
            { role: "Data Scientist", junior: 95, mid: 140, senior: 210 },
          ].map((r) => (
            <div key={r.role}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{r.role}</span>
                <span className="text-xs text-muted-foreground">${r.senior}k max</span>
              </div>
              <div className="flex h-6 items-center gap-1 rounded-lg bg-muted p-0.5 dark:bg-muted">
                <div className="h-full rounded-md bg-blue-400 text-center text-[10px] leading-6 text-white" style={{ width: `${(r.junior / r.senior) * 100}%` }}>${r.junior}k</div>
                <div className="h-full rounded-md bg-blue-500 text-center text-[10px] leading-6 text-white" style={{ width: `${((r.mid - r.junior) / r.senior) * 100}%` }}>${r.mid}k</div>
                <div className="h-full rounded-md bg-blue-600 text-center text-[10px] leading-6 text-white" style={{ width: `${((r.senior - r.mid) / r.senior) * 100}%` }}>${r.senior}k</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Market Trends */}
      <Card>
        <SectionTitle title="Job Market Trends" subtitle="What's happening in your industry" />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+12%</p>
            <p className="text-sm text-muted-foreground">Tech job growth this quarter</p>
            <p className="mt-1 text-xs text-muted-foreground">Compared to last quarter</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.2 days</p>
            <p className="text-sm text-muted-foreground">Average time to hire</p>
            <p className="mt-1 text-xs text-muted-foreground">Down from 5.8 days</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">68%</p>
            <p className="text-sm text-muted-foreground">Remote-friendly roles</p>
            <p className="mt-1 text-xs text-muted-foreground">Up from 52% last year</p>
          </div>
        </div>
      </Card>

      {/* Footer / Newsletter */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Never miss an opportunity</h2>
            <p className="text-sm text-muted-foreground">Get daily job alerts matching your preferences delivered to your inbox.</p>
          </div>
          <div className="flex w-full shrink-0 gap-2 sm:w-auto">
            <input placeholder="your@email.com" className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
            <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Subscribe</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
