import type { Course, Lesson } from "../types";

interface CourseCurriculumProps {
  lessons: Lesson[];
  selectedLesson: number;
  onSelectLesson: (id: number) => void;
  progress: number;
  course: Course;
}

export function CourseCurriculum({ lessons, selectedLesson, onSelectLesson, progress, course }: CourseCurriculumProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Course Curriculum</h2>
        <span className="text-sm text-blue-600 dark:text-blue-400">{progress}% complete</span>
      </div>
      <div className="mb-4 h-2.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="space-y-1">
        {lessons.map((lesson) => (
          <button key={lesson.id} onClick={() => onSelectLesson(lesson.id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors ${selectedLesson === lesson.id ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "text-muted-foreground hover:bg-muted/40 dark:text-muted-foreground dark:hover:bg-muted"}`}>
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${lesson.completed ? "bg-green-500 text-white" : "border border-border text-muted-foreground dark:border-border dark:text-muted-foreground/70"}`}>{lesson.completed ? "✓" : lesson.id}</span>
            <span className="flex-1">{lesson.title}</span>
            <span className="text-xs text-muted-foreground/70">{lesson.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
