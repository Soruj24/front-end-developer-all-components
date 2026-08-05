import type { Quiz } from "../types";

interface QuizSectionProps {
  quizzes: Quiz[];
}

export function QuizSection({ quizzes }: QuizSectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Quiz Challenges</h2>
      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="rounded-xl border border-border p-4 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-medium text-foreground">{quiz.title}</h3>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${quiz.difficulty === "Easy" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : quiz.difficulty === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"}`}>{quiz.difficulty}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-muted-foreground/70">
              <span>{quiz.questions} questions</span>
              <span>{quiz.timeLimit}</span>
              <span>{quiz.passRate}% pass rate</span>
            </div>
            <button className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Start Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
}
