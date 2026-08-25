"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  navItems,
  stats,
  projects,
  skills,
  experiences,
  testimonials,
  contactInfo,
  Navbar,
  HeroSection,
  ProjectsSection,
  SkillsSection,
  ExperienceSection,
  TestimonialsSection,
  ContactSection,
  Footer,
} from "@/features/portfolio";

const installCommand = `npx component-library@latest add portfolio`;

const usageCode = `import {
  Navbar, HeroSection, ProjectsSection, SkillsSection,
  ExperienceSection, TestimonialsSection, ContactSection, Footer
} from "@/features/portfolio";

<Navbar items={navItems} />
<HeroSection stats={stats} />
<ProjectsSection projects={projects} />`;

export default function PortfolioPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Portfolio
          </h1>
          <Badge variant="primary">7 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Full portfolio page with navbar, hero, projects, skills, experience,
          testimonials, and contact form.
        </p>
      </header>

      {/* Examples */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>
        <p className="text-sm text-muted-foreground">
          Complete portfolio with all sections from hero to contact.
        </p>
        <div className="min-h-screen bg-black rounded-lg border border-border overflow-hidden">
          <Navbar items={navItems} />
          <HeroSection stats={stats} />
          <ProjectsSection projects={projects} />
          <SkillsSection skills={skills} />
          <ExperienceSection experiences={experiences} />
          <TestimonialsSection testimonials={testimonials} />
          <ContactSection contact={contactInfo} />
          <Footer />
        </div>
      </section>
    </div>
  );
}
