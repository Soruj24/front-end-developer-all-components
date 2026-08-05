"use client";

import { useState } from "react";
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

export default function LMSPage() {
  const { activeCategory, setActiveCategory, filteredCourses } = useCourseFilter();
  const [selectedLesson, setSelectedLesson] = useState(4);
  const progress = 42;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=600&fit=crop')] bg-cover bg-center opacity-15" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">12,000+ learners worldwide</span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Master new skills online</h1>
            <p className="mt-4 text-lg text-white/80">Learn from world-class instructors. Build real projects. Advance your career.</p>
          </div>
          <div className="flex gap-4">
            <button className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-xl transition-colors hover:bg-indigo-50">Explore Courses</button>
            <button className="rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">View Learning Paths</button>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:px-8">
        <LMSStats />
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        {/* Courses */}
        <div>
          <div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Popular Courses</h2><p className="mt-1 text-sm text-muted-foreground">{filteredCourses.length} courses available</p></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>

        {/* Curriculum & Video */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CourseCurriculum lessons={LESSONS} selectedLesson={selectedLesson} onSelectLesson={setSelectedLesson} progress={progress} course={COURSES[0]} />
          </div>
          <VideoPlayer title={LESSONS[selectedLesson - 1]?.title || "No lesson selected"} duration={LESSONS[selectedLesson - 1]?.duration || "0:00"} />
        </div>

        {/* Instructor & Schedule */}
        <div className="grid gap-6 lg:grid-cols-2">
          <InstructorCard instructor={INSTRUCTOR} />
          <CourseSchedule />
        </div>

        {/* Quizzes, Resources, Reviews */}
        <div className="grid gap-6 lg:grid-cols-3">
          <QuizSection quizzes={QUIZZES} />
          <ResourceLibrary resources={RESOURCES} />
          <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Student Reviews</h2>
            <div className="space-y-4">
              {REVIEWS.map((review) => <ReviewCard key={review.id} review={review} />)}
            </div>
          </div>
        </div>

        {/* Forum & Assignments */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ForumSection posts={FORUM_POSTS} />
          <AssignmentSection assignments={ASSIGNMENTS} />
        </div>

        {/* Leaderboard & Badges */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Leaderboard entries={LEADERBOARD} />
          <BadgeGrid badges={BADGES} />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LiveClass />
          <StudyPlan />
          <SkillAssessment />
          <GradeBook />
        </div>

        {/* Certificate & More */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CertificatePreview />
          <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Peer Review</h3>
            <div className="rounded-xl border border-border bg-muted/40 p-4 dark:border-border dark:bg-muted">
              <p className="text-sm font-medium text-foreground">Pending Reviews</p>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">2 submissions awaiting feedback</p>
              <button className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Review Now</button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Mentorship</h3>
            <div className="flex items-start gap-3">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Mentor" className="h-10 w-10 shrink-0 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-foreground">Dr. Robert Kim</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Staff Engineer at Google</p>
                <p className="mt-1 text-xs text-muted-foreground">Available for 1:1 sessions</p>
              </div>
            </div>
            <button className="mt-3 w-full rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Book Session</button>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Workshop</h3>
            <p className="text-sm font-medium text-foreground">Building with Next.js 15</p>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Aug 20, 2026 · 2:00 PM EST</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>24 spots remaining</span>
            </div>
            <button className="mt-3 w-full rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">Register Now</button>
          </div>
        </div>

        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
