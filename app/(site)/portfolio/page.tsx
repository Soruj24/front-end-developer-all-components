"use client";

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

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar items={navItems} />
      <HeroSection stats={stats} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experiences} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection contact={contactInfo} />
      <Footer />
    </div>
  );
}
