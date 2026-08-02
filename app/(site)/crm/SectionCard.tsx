export function SectionCard({ title, description, children, className = "" }: { title: string; description?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900 ${className}`}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">{description}</p>}
      </div>
      {children}
    </div>
  );
}