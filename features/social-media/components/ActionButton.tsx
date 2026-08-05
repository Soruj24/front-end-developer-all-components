interface ActionButtonProps {
  icon: "like" | "comment" | "share" | "bookmark";
  count?: number;
  filled?: boolean;
  onClick?: () => void;
}

export function ActionButton({ icon, count, filled, onClick }: ActionButtonProps) {
  const icons = {
    like: (
      <svg className={`h-5 w-5 ${filled ? "text-red-500" : "text-zinc-500 dark:text-zinc-400"}`} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    comment: (
      <svg className="h-5 w-5 text-zinc-500 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    share: (
      <svg className="h-5 w-5 text-zinc-500 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    bookmark: (
      <svg className={`h-5 w-5 ${filled ? "text-blue-500" : "text-zinc-500 dark:text-zinc-400"}`} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
  };

  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-blue-500 dark:text-zinc-400 ${icon === "like" ? "hover:text-red-500" : ""} ${icon === "share" ? "hover:text-green-500" : ""}`}>
      {icons[icon]}
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}
