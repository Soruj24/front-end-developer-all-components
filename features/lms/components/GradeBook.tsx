export function GradeBook() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Grade Book</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Midterm Exam</span><span className="font-medium text-green-600 dark:text-green-400">92/100</span></div>
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Assignment 1</span><span className="font-medium text-green-600 dark:text-green-400">48/50</span></div>
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Assignment 2</span><span className="font-medium text-amber-600 dark:text-amber-400">38/50</span></div>
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Quiz Avg</span><span className="font-medium text-foreground">86%</span></div>
        <div className="border-t border-border pt-2 dark:border-border">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-foreground">Overall</span>
            <span className="text-blue-600 dark:text-blue-400">89.5% A-</span>
          </div>
        </div>
      </div>
    </div>
  );
}
