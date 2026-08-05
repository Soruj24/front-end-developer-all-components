"use client";

import type { Skill } from "../types/portfolio";

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-500 to-cyan-400",
  Backend: "from-green-500 to-emerald-400",
  DevOps: "from-orange-500 to-amber-400",
  Design: "from-pink-500 to-rose-400",
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="bg-zinc-950 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-wider text-blue-500">Expertise</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white">Skills & Technologies</h2>
        <p className="mt-4 max-w-2xl text-zinc-400">
          A curated stack refined over 8 years of building production applications at scale.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="mb-6 text-lg font-semibold text-white">{cat}</h3>
              <div className="flex flex-col gap-4">
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                          <span className="text-base">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-xs text-zinc-500">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${categoryColors[cat]}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
