import type { Instructor } from "../types";
import { StarRating } from "./StarRating";

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Instructor Profile</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Top Rated</span>
      </div>
      <div className="flex items-start gap-4">
        <img src={instructor.avatar} alt={instructor.name} className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{instructor.name}</h3>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{instructor.title} · {instructor.experience}</p>
          <p className="mt-2 text-sm text-muted-foreground">{instructor.bio}</p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground"><StarRating rating={instructor.rating} /> {instructor.rating}</span>
            <span className="text-muted-foreground">📚 {instructor.courses} courses</span>
            <span className="text-muted-foreground">👥 {instructor.students} students</span>
          </div>
        </div>
      </div>
    </div>
  );
}
