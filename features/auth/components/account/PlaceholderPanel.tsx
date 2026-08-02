export function PlaceholderPanel({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        <svg
          className="h-6 w-6 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
      </span>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
