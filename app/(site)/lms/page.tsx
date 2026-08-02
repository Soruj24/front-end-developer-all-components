"use client";

import { useState } from "react";

const courses = [
  { id: 1, title: "React Mastery: From Zero to Production", instructor: "Sarah Chen", students: 2847, rating: 4.8, level: "Intermediate", duration: "12 weeks", lessons: 48, price: "$79.99", image: "bg-gradient-to-br from-blue-500 to-cyan-500", category: "Frontend" },
  { id: 2, title: "Python for Data Science", instructor: "James Wilson", students: 3912, rating: 4.7, level: "Beginner", duration: "10 weeks", lessons: 36, price: "$64.99", image: "bg-gradient-to-br from-green-500 to-emerald-600", category: "Data Science" },
  { id: 3, title: "Advanced TypeScript Patterns", instructor: "Priya Patel", students: 1856, rating: 4.9, level: "Advanced", duration: "8 weeks", lessons: 32, price: "$89.99", image: "bg-gradient-to-br from-purple-500 to-pink-500", category: "Frontend" },
  { id: 4, title: "UI/UX Design Fundamentals", instructor: "Alex Rivera", students: 4523, rating: 4.6, level: "Beginner", duration: "6 weeks", lessons: 24, price: "$54.99", image: "bg-gradient-to-br from-orange-400 to-red-500", category: "Design" },
  { id: 5, title: "Machine Learning Engineering", instructor: "Michael Brown", students: 2134, rating: 4.8, level: "Advanced", duration: "14 weeks", lessons: 56, price: "$99.99", image: "bg-gradient-to-br from-indigo-500 to-violet-600", category: "Data Science" },
  { id: 6, title: "DevOps & Cloud Infrastructure", instructor: "Emily Davis", students: 1678, rating: 4.5, level: "Intermediate", duration: "10 weeks", lessons: 40, price: "$74.99", image: "bg-gradient-to-br from-sky-500 to-blue-600", category: "Backend" },
];

const lessons = [
  { id: 1, title: "Introduction to React Components", duration: "14:32", completed: true },
  { id: 2, title: "State Management Fundamentals", duration: "22:15", completed: true },
  { id: 3, title: "Understanding the Virtual DOM", duration: "18:45", completed: true },
  { id: 4, title: "Hooks in Depth", duration: "31:20", completed: false },
  { id: 5, title: "Advanced Patterns & Composition", duration: "27:08", completed: false },
  { id: 6, title: "Testing React Applications", duration: "35:00", completed: false },
];

const categories = ["All", "Frontend", "Backend", "Data Science", "Design", "DevOps", "Mobile"];

const quizzes = [
  { id: 1, title: "React Basics Quiz", questions: 10, timeLimit: "15 min", difficulty: "Easy", passRate: 78 },
  { id: 2, title: "TypeScript Generics Challenge", questions: 8, timeLimit: "20 min", difficulty: "Hard", passRate: 52 },
  { id: 3, title: "Data Structures Assessment", questions: 12, timeLimit: "25 min", difficulty: "Medium", passRate: 65 },
];

const resources = [
  { id: 1, title: "React Cheatsheet PDF", type: "PDF", size: "2.4 MB" },
  { id: 2, title: "Project Starter Templates", type: "ZIP", size: "8.1 MB" },
  { id: 3, title: "Video Transcripts Bundle", type: "DOC", size: "1.3 MB" },
  { id: 4, title: "Practice Exercises Set 1", type: "Code", size: "456 KB" },
  { id: 5, title: "Reference Architecture Guide", type: "PDF", size: "3.7 MB" },
];

const reviews = [
  { id: 1, user: "Alice M.", rating: 5, text: "Best course I've ever taken. The instructor explains complex topics with ease.", date: "2 weeks ago" },
  { id: 2, user: "Bob K.", rating: 4, text: "Great content but could use more hands-on projects. Overall excellent value.", date: "1 month ago" },
  { id: 3, user: "Carol D.", rating: 5, text: "The curriculum is well structured and the assignments are challenging yet rewarding.", date: "3 weeks ago" },
  { id: 4, user: "David L.", rating: 4, text: "Perfect for intermediate developers looking to level up their skills.", date: "2 months ago" },
];

const forumPosts = [
  { id: 1, title: "Question about useState hook behavior", author: "NewDev22", replies: 5, time: "2h ago" },
  { id: 2, title: "Best practices for custom hooks?", author: "ReactPro", replies: 12, time: "5h ago" },
  { id: 3, title: "Help with useEffect cleanup", author: "Learner101", replies: 8, time: "1d ago" },
  { id: 4, title: "Performance optimization tips", author: "CodeMaster", replies: 15, time: "2d ago" },
];

const leaderboard = [
  { rank: 1, name: "TechNinja", points: 4850, badge: "Gold" },
  { rank: 2, name: "CodeWizard", points: 4620, badge: "Silver" },
  { rank: 3, name: "ByteMaster", points: 4390, badge: "Bronze" },
  { rank: 4, name: "DevGuru", points: 4150, badge: "None" },
  { rank: 5, name: "ScriptKid", points: 3980, badge: "None" },
];

const assignments = [
  { id: 1, title: "Build a Todo App", due: "2026-08-10", submissions: 42, status: "Graded" },
  { id: 2, title: "Redux Store Implementation", due: "2026-08-17", submissions: 35, status: "Pending" },
  { id: 3, title: "REST API Integration", due: "2026-08-24", submissions: 28, status: "Open" },
];

const badges = [
  { id: 1, name: "Quick Starter", emoji: "bg-gradient-to-br from-amber-300 to-orange-500", earned: true },
  { id: 2, name: "Perfect Score", emoji: "bg-gradient-to-br from-blue-400 to-indigo-500", earned: true },
  { id: 3, name: "Streak Master", emoji: "bg-gradient-to-br from-green-400 to-emerald-500", earned: true },
  { id: 4, name: "Helping Hand", emoji: "bg-gradient-to-br from-pink-400 to-rose-500", earned: false },
  { id: 5, name: "Course Complete", emoji: "bg-gradient-to-br from-purple-400 to-violet-500", earned: true },
  { id: 6, name: "Challenge Champ", emoji: "bg-gradient-to-br from-red-400 to-amber-500", earned: false },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "text-amber-400" : "text-muted-foreground"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function LMSPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLesson, setSelectedLesson] = useState(4);
  const [progress] = useState(42);

  const filteredCourses = activeCategory === "All" ? courses : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Learning Management System</h1>
        <p className="text-muted-foreground">Explore courses, track progress, and advance your skills.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
            <div className={`flex h-40 items-center justify-center ${course.image} text-white`}>
              <svg className="h-10 w-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{course.category}</span>
                <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{course.level}</span>
              </div>
              <h3 className="font-semibold text-foreground">{course.title}</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{course.instructor}</p>
              <div className="flex items-center gap-2">
                <StarRating rating={course.rating} />
                <span className="text-xs text-muted-foreground">{course.rating}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-muted-foreground/70">
                <span>{course.duration}</span>
                <span>{course.lessons} lessons</span>
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3 dark:border-border">
                <span className="text-lg font-bold text-foreground">{course.price}</span>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Enroll Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Course Curriculum</h2>
            <span className="text-sm text-blue-600 dark:text-blue-400">{progress}% complete</span>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="space-y-1">
            {lessons.map((lesson) => (
              <button key={lesson.id} onClick={() => setSelectedLesson(lesson.id)} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${selectedLesson === lesson.id ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground dark:hover:bg-muted"}`}>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${lesson.completed ? "bg-green-500 text-white" : "border border-border text-muted-foreground dark:border-border dark:text-muted-foreground/70"}`}>
                  {lesson.completed ? "✓" : lesson.id}
                </span>
                <span className="flex-1">{lesson.title}</span>
                <span className="text-xs text-muted-foreground/70">{lesson.duration}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Video Player</h2>
          <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-zinc-900">
            <svg className="h-14 w-14 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Now Playing</span>
            <span className="text-muted-foreground dark:text-muted-foreground/70">{lessons[selectedLesson - 1]?.title || "No lesson selected"}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground/70">
            <span>0:00</span>
            <div className="mx-3 h-1 flex-1 rounded-full bg-muted">
              <div className="h-full w-1/3 rounded-full bg-blue-500" />
            </div>
            <span>{lessons[selectedLesson - 1]?.duration || "0:00"}</span>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <button className="rounded-full p-2 text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" /></svg></button>
            <button className="rounded-full bg-blue-600 p-3 text-white"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg></button>
            <button className="rounded-full p-2 text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" /></svg></button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1,247</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Active Students</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">15,680</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Total Hours Watched</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">48</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Courses Available</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4.7</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Instructor Profile</h2>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Top Rated</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Sarah Chen</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">Senior Frontend Engineer · 8+ years experience</p>
              <p className="mt-2 text-sm text-muted-foreground">Passionate about teaching React, TypeScript, and modern web development. Author of 5 bestselling courses with over 12,000 students worldwide.</p>
              <div className="mt-3 flex gap-4 text-sm">
                <span className="text-muted-foreground">⭐ 4.8 avg rating</span>
                <span className="text-muted-foreground">📺 6 courses</span>
                <span className="text-muted-foreground">👥 12.4K students</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Course Schedule</h2>
            <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">Week 4 of 12</span>
          </div>
          <div className="space-y-2">
            {["Mon - Components & Props", "Tue - State & Events", "Wed - Hooks Workshop", "Thu - Project Lab", "Fri - Code Review", "Sat - Office Hours (Optional)"].map((day, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm dark:border-border">
                <span className="w-16 text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</span>
                <span className="flex-1 text-muted-foreground">{day}</span>
                {i < 2 ? <span className="text-xs text-green-600 dark:text-green-400">✓ Done</span> : <span className="text-xs text-blue-600 dark:text-blue-400">Upcoming</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Quiz Challenges</h2>
          <div className="space-y-3">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-medium text-foreground">{quiz.title}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${quiz.difficulty === "Easy" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : quiz.difficulty === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"}`}>{quiz.difficulty}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-muted-foreground/70">
                  <span>{quiz.questions} questions</span>
                  <span>{quiz.timeLimit}</span>
                  <span>{quiz.passRate}% pass rate</span>
                </div>
                <button className="mt-3 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Start Quiz</button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Resource Library</h2>
          <div className="space-y-2">
            {resources.map((res) => (
              <div key={res.id} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{res.type}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{res.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{res.size}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Student Reviews</h2>
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-3 last:border-0 dark:border-border">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{review.user}</span>
                  <span className="text-xs text-muted-foreground/70">{review.date}</span>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-1 text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Discussion Forum</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View All</button>
          </div>
          <div className="space-y-2">
            {forumPosts.map((post) => (
              <div key={post.id} className="flex items-start gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{post.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground dark:text-muted-foreground/70">
                    <span>by {post.author}</span>
                    <span>{post.replies} replies</span>
                    <span>{post.time}</span>
                  </div>
                </div>
                <svg className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Assignments</h2>
            <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">3 pending</span>
          </div>
          <div className="space-y-3">
            {assignments.map((asgn) => (
              <div key={asgn.id} className="flex items-center gap-4 rounded-lg border border-border px-4 py-3 dark:border-border">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted dark:bg-muted">
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{asgn.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Due: {asgn.due} · {asgn.submissions} submissions</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${asgn.status === "Graded" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : asgn.status === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"}`}>{asgn.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Leaderboard</h2>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div key={entry.rank} className="flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors hover:bg-muted/40 dark:hover:bg-muted">
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${entry.rank === 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : entry.rank === 2 ? "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground" : entry.rank === 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400" : "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70"}`}>{entry.rank}</span>
                <span className="flex-1 text-sm font-medium text-foreground">{entry.name}</span>
                <span className="text-sm font-semibold text-muted-foreground">{entry.points.toLocaleString()} pts</span>
                {entry.badge !== "None" && <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${entry.badge === "Gold" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : entry.badge === "Silver" ? "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground" : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"}`}>{entry.badge}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Achievement Badges</h2>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div key={badge.id} className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all ${badge.earned ? "border-border" : "border-dashed border-border opacity-50 dark:border-border"}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${badge.emoji} text-white text-lg font-bold shadow-sm`}>
                  {badge.earned ? "★" : "?"}
                </div>
                <span className="text-xs font-medium text-muted-foreground">{badge.name}</span>
                {badge.earned && <span className="text-[10px] text-green-600 dark:text-green-400">Earned</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="rounded-xl border border-border bg-gradient-to-br from-amber-50 to-orange-50 p-5 dark:border-border dark:from-amber-950/30 dark:to-orange-950/30">
          <div className="mb-2 flex items-center gap-2">
            <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            <h3 className="font-medium text-foreground">Announcement</h3>
          </div>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">New course materials added!</p>
          <p className="text-xs text-muted-foreground">Week 4 lecture slides and practice exercises are now available for download.</p>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Live Class</h3>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">LIVE NOW</span>
          </div>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">React Hooks Deep Dive</p>
          <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Sarah Chen · 45 min</p>
          <button className="mt-3 w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">Join Live</button>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Study Plan</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Daily goal</span>
              <span className="font-medium text-foreground">2 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">This week</span>
              <span className="font-medium text-green-600 dark:text-green-400">9.5 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Streak</span>
              <span className="font-medium text-amber-600 dark:text-amber-400">7 days 🔥</span>
            </div>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-3/4 rounded-full bg-green-500" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Notes</h3>
          <textarea placeholder="Take notes while you learn..." className="mb-3 min-h-[80px] w-full resize-none rounded-lg border border-border bg-white p-3 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500" />
          <div className="flex items-center justify-between text-xs text-muted-foreground/70">
            <span>Last saved: 2 min ago</span>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Save</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Bookmarks</h3>
            <span className="text-xs text-muted-foreground">12 saved</span>
          </div>
          <div className="space-y-2">
            {["Introduction to React", "State Management", "Custom Hooks Guide"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2 text-sm dark:bg-muted">
                <svg className="h-3.5 w-3.5 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View all bookmarks</button>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Completion Tracker</h3>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course Content</span>
                <span className="text-xs text-muted-foreground">42%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[42%] rounded-full bg-blue-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Assignments</span>
                <span className="text-xs text-muted-foreground">67%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[67%] rounded-full bg-green-500" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Quizzes</span>
                <span className="text-xs text-muted-foreground">25%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[25%] rounded-full bg-purple-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Skill Assessment</h3>
          <div className="space-y-2 text-sm">
            {[{ skill: "React", level: 85 }, { skill: "TypeScript", level: 70 }, { skill: "CSS", level: 90 }, { skill: "Node.js", level: 45 }].map((s) => (
              <div key={s.skill}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-muted-foreground">{s.skill}</span>
                  <span className="text-xs text-muted-foreground">{s.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${s.level >= 80 ? "bg-green-500" : s.level >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Take Full Assessment</button>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Grade Book</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Midterm Exam</span>
              <span className="font-medium text-green-600 dark:text-green-400">92/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Assignment 1</span>
              <span className="font-medium text-green-600 dark:text-green-400">48/50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Assignment 2</span>
              <span className="font-medium text-amber-600 dark:text-amber-400">38/50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Quiz Avg</span>
              <span className="font-medium text-foreground">86%</span>
            </div>
            <div className="border-t border-border pt-2 dark:border-border">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-foreground">Overall</span>
                <span className="text-blue-600 dark:text-blue-400">89.5% A-</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Certificate Preview</h3>
          <div className="flex flex-col items-center rounded-lg border-2 border-dashed border-border bg-gradient-to-br from-zinc-50 to-white p-5 text-center dark:border-border dark:from-zinc-900 dark:to-zinc-800">
            <svg className="mb-2 h-8 w-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Certificate of Completion</p>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Earned upon 100% completion</p>
            <button className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-700">View Preview</button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Peer Review</h3>
          <div className="rounded-lg border border-border bg-muted/40 p-3 dark:border-border dark:bg-muted">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Pending Reviews</p>
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">2 submissions awaiting your feedback</p>
            <button className="mt-3 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Review Now</button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Mentorship</h3>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-green-400 to-teal-500" />
            <div>
              <p className="text-sm font-medium text-foreground">Dr. Robert Kim</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Staff Engineer at Google</p>
              <p className="mt-1 text-xs text-muted-foreground">Available for 1:1 sessions</p>
            </div>
          </div>
          <button className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Book Session</button>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Workshop Signup</h3>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Building with Next.js 15</p>
          <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Aug 20, 2026 · 2:00 PM EST</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>24 spots remaining</span>
          </div>
          <button className="mt-3 w-full rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700">Register Now</button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Lab Exercise</h3>
          <div className="rounded-lg bg-muted/40 p-4 font-mono text-xs text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
            <p className="text-green-600 dark:text-green-400">// Challenge: Implement a custom hook</p>
            <p>function useLocalStorage&lt;T&gt;(</p>
            <p className="pl-4">key: string,</p>
            <p className="pl-4">initialValue: T</p>
            <p>): [T, (value: T) ={">"} void] {"{"}</p>
            <p className="text-blue-500 dark:text-blue-400">  // Your code here</p>
            <p>{"}"}</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Difficulty: Medium</span>
            <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700">Open Lab</button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Capstone Project</h3>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Full Stack Application</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Build and deploy a complete web app with React, Next.js, and a backend API.</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-green-600 dark:text-green-400">✓ Milestone 1/4</span>
                <span className="text-muted-foreground/70">·</span>
                <span className="text-amber-600 dark:text-amber-400">Due Aug 30</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Course Categories</h3>
          <div className="flex flex-wrap gap-2">
            {["Frontend", "Backend", "Full Stack", "Data Science", "DevOps", "Mobile", "Cloud", "Security", "AI/ML", "Design"].map((cat) => (
              <span key={cat} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-muted dark:text-muted-foreground dark:hover:bg-blue-900/40 dark:hover:text-blue-300 cursor-pointer">{cat}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
