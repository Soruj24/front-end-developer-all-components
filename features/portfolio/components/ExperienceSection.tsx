"use client";

import type { Experience } from "../types/portfolio";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="bg-black px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">Career</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white">Work Experience</h2>

        <div className="mt-16 space-y-0">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative flex gap-8">
              {idx < experiences.length - 1 && (
                <div className="absolute left-[19px] top-14 h-[calc(100%-32px)] w-px bg-zinc-800" />
              )}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900">
                {exp.current ? (
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
                )}
              </div>
              <div className="flex-1 pb-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{exp.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-500">
                      {exp.startDate} — {exp.endDate}
                    </span>
                    {exp.current && (
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                        Current
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
