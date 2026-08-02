"use client";

import Link from "next/link";

const skills = {
  Frontend: [
    { name: "React / Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 88 },
    { name: "Vue.js", level: 70 },
  ],
  Backend: [
    { name: "Node.js / Express", level: 90 },
    { name: "PostgreSQL", level: 82 },
    { name: "Python / FastAPI", level: 75 },
    { name: "GraphQL", level: 78 },
  ],
  Tools: [
    { name: "Git / GitHub", level: 92 },
    { name: "Docker / K8s", level: 76 },
    { name: "AWS / Vercel", level: 80 },
    { name: "Figma", level: 65 },
  ],
};

const projects = [
  { id: 1, title: "E-Commerce Platform", description: "A full-featured online store with payment processing, inventory management, and real-time analytics dashboards.", tags: ["React", "Node.js", "PostgreSQL", "Stripe"], live: "https://example.com", github: "https://github.com/example" },
  { id: 2, title: "Task Management App", description: "Collaborative project management tool with kanban boards, time tracking, and team collaboration features.", tags: ["Next.js", "TypeScript", "Prisma", "Tailwind"], live: "https://example.com", github: "https://github.com/example" },
  { id: 3, title: "AI Content Generator", description: "Leveraging LLMs to generate marketing copy, blog posts, and social media content with fine-tuned models.", tags: ["Python", "FastAPI", "OpenAI", "React"], live: "https://example.com", github: "https://github.com/example" },
  { id: 4, title: "Real-Time Chat Application", description: "Scalable messaging platform supporting group chats, file sharing, and message search across channels.", tags: ["Socket.io", "Express", "MongoDB", "React"], live: "https://example.com", github: "https://github.com/example" },
  { id: 5, title: "Weather Dashboard", description: "Interactive weather visualization with historical data, forecasts, and severe weather alerts using D3.js.", tags: ["D3.js", "TypeScript", "GraphQL", "Vercel"], live: "https://example.com", github: "https://github.com/example" },
  { id: 6, title: "Fitness Tracker", description: "Mobile-first fitness app with workout logging, progress charts, and personalized training plans.", tags: ["React Native", "Firebase", "Node.js", "Expo"], live: "https://example.com", github: "https://github.com/example" },
];

const experience = [
  { company: "TechCorp Inc.", role: "Senior Frontend Engineer", date: "Jan 2024 - Present", description: "Leading the frontend architecture for a SaaS platform serving 50K+ users. Driving migration from CRA to Next.js and implementing design system.", tech: ["React", "Next.js", "TypeScript", "Storybook"] },
  { company: "StartupXYZ", role: "Full-Stack Developer", date: "Jun 2021 - Dec 2023", description: "Built and shipped 3 products from ideation to production. Architected microservices backend and led a team of 4 developers.", tech: ["Node.js", "PostgreSQL", "React", "Docker"] },
  { company: "WebAgency", role: "Frontend Developer", date: "Jan 2019 - May 2021", description: "Developed responsive web applications for diverse clients across e-commerce, healthcare, and education sectors.", tech: ["Vue.js", "JavaScript", "Sass", "WordPress"] },
  { company: "Freelance", role: "Web Developer", date: "Jun 2017 - Dec 2018", description: "Built websites and web applications for small businesses and startups. Managed client relationships and project timelines.", tech: ["HTML/CSS", "JavaScript", "PHP", "MySQL"] },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechCorp Inc.", text: "Alex is one of the most talented engineers I've worked with. Their attention to detail and ability to deliver complex features on time is remarkable." },
  { name: "James Wilson", role: "Product Manager, StartupXYZ", text: "Working with Alex was a pleasure. They brought both technical excellence and a collaborative spirit to every project." },
  { name: "Priya Patel", role: "Design Lead, WebAgency", text: "Alex has a rare ability to bridge design and engineering beautifully. Every pixel-perfect implementation exceeded our expectations." },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-16 p-8 pb-20">
      <section className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-lg" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Alex Morgan</h1>
        <p className="text-lg text-blue-600 dark:text-blue-400">Full-Stack Developer & UI Engineer</p>
        <p className="max-w-2xl text-base text-muted-foreground">
          Building beautiful, scalable, and impactful web applications with modern technologies.
          Specializing in React, Next.js, and the TypeScript ecosystem.
        </p>
        <div className="flex gap-4">
          <Link href="https://github.com" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted dark:hover:text-zinc-100">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </Link>
          <Link href="https://linkedin.com" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted dark:hover:text-zinc-100">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </Link>
          <Link href="https://twitter.com" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted dark:hover:text-zinc-100">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </Link>
          <Link href="https://dribbble.com" className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted dark:hover:text-zinc-100">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.29zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/></svg>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold text-foreground">Skills</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
              <h3 className="mb-5 text-lg font-semibold text-foreground">{category}</h3>
              <div className="space-y-4">
                {skillList.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted dark:bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold text-foreground">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-blue-400 transition-colors group-hover:from-blue-200 group-hover:via-purple-200 group-hover:to-pink-200 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 dark:text-blue-600 dark:group-hover:from-blue-900 dark:group-hover:via-purple-900 dark:group-hover:to-pink-900">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-3 pt-3">
                  <Link href={project.live} className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </Link>
                  <Link href={project.github} className="flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    Source Code
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold text-foreground">Experience</h2>
        <div className="relative space-y-0">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-muted" />
          {experience.map((job, i) => (
            <div key={i} className="relative ml-10 pb-10 last:pb-0">
              <div className="absolute -left-10 mt-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-white text-muted-foreground/70 dark:border-border dark:bg-zinc-900">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
              </div>
              <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{job.role}</h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{job.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{job.date}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span key={t} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold text-foreground">Testimonials</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
              <div className="mb-4 flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground italic dark:text-muted-foreground/70">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold text-foreground">Get In Touch</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
              <h3 className="mb-4 text-base font-semibold text-foreground">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <svg className="h-5 w-5 shrink-0 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>alex@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <svg className="h-5 w-5 shrink-0 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
              <h3 className="mb-4 text-base font-semibold text-foreground">Availability</h3>
              <p className="text-sm text-green-600 dark:text-green-400">Available for freelance and full-time opportunities</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-5 text-base font-semibold text-foreground">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Your message"
                className="w-full resize-none rounded-lg border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-muted dark:text-zinc-100 dark:placeholder-zinc-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
