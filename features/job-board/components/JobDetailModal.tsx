import { useEffect, useRef } from "react";
import type { Job } from "../types";

interface JobDetailModalProps {
  job: Job;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onClose: () => void;
  onApply: (id: number) => void;
  userSkills?: string[];
}

export function JobDetailModal({ job, isBookmarked, onToggleBookmark, onClose, onApply, userSkills = [] }: JobDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const matchedSkills = job.skills.filter((s) => userSkills.includes(s));
  const missingSkills = job.skills.filter((s) => !userSkills.includes(s));
  const matchPercentage = job.skills.length > 0 ? Math.round((matchedSkills.length / job.skills.length) * 100) : 0;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/95">
          <div className="flex items-center gap-3">
            <img src={job.companyLogo} alt={job.company} className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">{job.title}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {job.location}
            </span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">{job.salary}</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span className="text-zinc-500 dark:text-zinc-400">{job.type}</span>
            <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
            <span className="text-zinc-500 dark:text-zinc-400">{job.posted}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.remote && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Remote</span>
            )}
            {job.urgent && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">Urgent</span>
            )}
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{job.experience}</span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{job.category}</span>
          </div>

          {userSkills.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Skills Match</h3>
                <span className={`text-sm font-bold ${matchPercentage >= 70 ? "text-emerald-600 dark:text-emerald-400" : matchPercentage >= 40 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                  {matchPercentage}%
                </span>
              </div>
              <div className="mb-3 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div className={`h-full rounded-full transition-all duration-500 ${matchPercentage >= 70 ? "bg-emerald-500" : matchPercentage >= 40 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${matchPercentage}%` }} />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchedSkills.map((s) => (
                  <span key={s} className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{s}</span>
                ))}
                {missingSkills.map((s) => (
                  <span key={s} className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">About the Role</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{job.description}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span key={s} className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">Benefits & Perks</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {job.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center gap-3 border-t border-zinc-100 bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/95">
          <button
            onClick={() => onApply(job.id)}
            className="flex-1 rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Apply Now
          </button>
          <button
            onClick={() => onToggleBookmark(job.id)}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isBookmarked
                ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {isBookmarked ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
