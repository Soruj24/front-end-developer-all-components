import { liveStreams } from "../constants/social-data";
import { Avatar } from "./Avatar";

export function LiveStreamSection() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Live Streams</h3>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {liveStreams.map((stream) => (
          <div key={stream.id} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 text-white">
            <div className="mb-6 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase">Live</span>
              <span className="flex items-center gap-1 text-xs text-zinc-300">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {stream.viewers}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Avatar user={stream.user} size="sm" />
              <div>
                <p className="text-sm font-medium">{stream.user.name}</p>
                <p className="text-xs text-zinc-400">{stream.category}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-zinc-200">{stream.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
