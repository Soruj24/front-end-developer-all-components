interface SectionCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ title, icon, children, className = "" }: SectionCardProps) {
  return (
    <div className={`rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 ${className}`}>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
      </div>
      {children}
    </div>
  );
}
