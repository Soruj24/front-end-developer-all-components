interface VideoPlayerProps {
  title: string;
  duration: string;
}

export function VideoPlayer({ title, duration }: VideoPlayerProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Video Player</h2>
      <div className="mb-3 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800">
        <svg className="h-16 w-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Now Playing</span>
        <span className="text-muted-foreground dark:text-muted-foreground/70">{title}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground/70">
        <span>0:00</span>
        <div className="mx-3 h-1.5 flex-1 rounded-full bg-muted"><div className="h-full w-1/3 rounded-full bg-blue-500" /></div>
        <span>{duration}</span>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button className="rounded-full p-2.5 text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" /></svg></button>
        <button className="rounded-full bg-blue-600 p-4 text-white shadow-lg transition-transform hover:scale-105"><svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg></button>
        <button className="rounded-full p-2.5 text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" /></svg></button>
      </div>
    </div>
  );
}
