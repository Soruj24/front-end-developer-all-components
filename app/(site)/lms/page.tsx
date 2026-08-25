"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  useCourseFilter,
  COURSES,
  LESSONS,
  QUIZZES,
  RESOURCES,
  REVIEWS,
  FORUM_POSTS,
  LEADERBOARD,
  ASSIGNMENTS,
  BADGES,
  INSTRUCTOR,
  CourseCard,
  CategoryFilter,
  LMSStats,
  CourseCurriculum,
  VideoPlayer,
  InstructorCard,
  ReviewCard,
  Leaderboard,
  QuizSection,
  ResourceLibrary,
  ForumSection,
  AssignmentSection,
  BadgeGrid,
  LiveClass,
  StudyPlan,
  CourseSchedule,
  SkillAssessment,
  GradeBook,
  CertificatePreview,
  Newsletter,
  Footer,
} from "@/features/lms";

const installCommand = `npx component-library@latest add lms`;

const usageCode = `import { CourseCard, CourseCurriculum, VideoPlayer } from "@/features/lms";

<CourseCard course={course} />
<CourseCurriculum lessons={lessons} />
<VideoPlayer title="Lesson" duration="10:00" />`;

export default function LMSPage() {
  const { activeCategory, setActiveCategory, filteredCourses } = useCourseFilter();
  const [selectedLesson, setSelectedLesson] = useState(4);
  const progress = 42;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">LMS</h1>
          <Badge variant="primary">15 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Learning management system with courses, curriculum, quizzes, leaderboard, and certificates.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Hero & Stats</h3>
          <p className="text-sm text-muted-foreground">Hero banner with gradient background and key learning statistics.</p>
          <div className="rounded-lg border border-border bg-background overflow-hidden">
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
              <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 sm:py-24 lg:px-8">
                <div className="max-w-2xl">
                  <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">12,000+ learners worldwide</span>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Master new skills online</h1>
                  <p className="mt-4 text-lg text-white/80">Learn from world-class instructors. Build real projects. Advance your career.</p>
                </div>
              </div>
            </section>
            <div className="p-6">
              <LMSStats />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Course Cards</h3>
          <p className="text-sm text-muted-foreground">Filterable course grid with category filters.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Curriculum & Video</h3>
          <p className="text-sm text-muted-foreground">Course curriculum with lesson selection and video player.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CourseCurriculum lessons={LESSONS} selectedLesson={selectedLesson} onSelectLesson={setSelectedLesson} progress={progress} course={COURSES[0]} />
              </div>
              <VideoPlayer title={LESSONS[selectedLesson - 1]?.title || "No lesson selected"} duration={LESSONS[selectedLesson - 1]?.duration || "0:00"} />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
