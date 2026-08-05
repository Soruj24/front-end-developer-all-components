import type { Course } from "../types";
import { StarRating } from "./StarRating";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
      <div className="relative h-44 overflow-hidden">
        <img src={course.image} alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-foreground backdrop-blur-sm">{course.category}</span>
        <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">{course.level}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>
        <div className="flex items-center gap-2">
          <img src={course.instructorAvatar} alt={course.instructor} className="h-6 w-6 rounded-full object-cover" />
          <span className="text-sm text-muted-foreground dark:text-muted-foreground/70">{course.instructor}</span>
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={course.rating} />
          <span className="text-xs text-muted-foreground">{course.rating}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-muted-foreground/70">
          <span>{course.duration}</span>
          <span>{course.lessons} lessons</span>
          <span>{course.students.toLocaleString()} students</span>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3 dark:border-border">
          <span className="text-lg font-bold text-foreground">{course.price}</span>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Enroll Now</button>
        </div>
      </div>
    </div>
  );
}
