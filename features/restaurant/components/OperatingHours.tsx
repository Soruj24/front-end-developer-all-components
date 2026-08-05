interface OperatingHoursProps {
  hours: { day: string; hours: string }[];
}

export function OperatingHoursSection({ hours }: OperatingHoursProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-foreground">Operating Hours</h3>
      <div className="flex flex-wrap gap-3">
        {hours.map((oh) => (
          <div key={oh.day} className="flex items-center gap-4 rounded-xl border border-border bg-white px-5 py-3 dark:border-border dark:bg-zinc-900">
            <svg className="h-5 w-5 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-foreground">{oh.day}</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{oh.hours}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
