export const EMAIL_CARD_EXAMPLE = `<EmailCard subject="New project assignment" preview="You have been assigned..." time="2m" />`;

export const NOTIFICATION_BADGE_EXAMPLE = `<div className="relative">
  <Bell className="h-8 w-8" />
  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{count}</span>
</div>`;

export const MAIL_LIST_EXAMPLE = `<div className="overflow-hidden rounded-lg border">
  {emails.map((e) => (
    <div onClick={() => setSelectedId(e.id)}>{e.from}</div>
  ))}
</div>`;

export const SEND_BUTTON_EXAMPLE = `<button disabled={status !== "idle"} className="rounded-lg px-6 py-3 font-medium transition-all">
  {status === "sent" ? "Sent!" : "Send Email"}
</button>`;

export const UNREAD_COUNT_EXAMPLE = `<span className="inline-flex items-center rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-white">
  {unreadCount}
</span>`;

export const NEWSLETTER_EXAMPLE = `<input type="email" placeholder="you@example.com" className="rounded-lg border px-3 py-2 text-sm" />
<button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Subscribe</button>`;

export const MAIL_FILTER_EXAMPLE = `<button onClick={() => setFilter("unread")} className="rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all">
  Unread
</button>`;

export const PLAYGROUND_EXAMPLE = `<EmailCard subject="New project assignment" preview="You have been assigned..." time="2m" />`;
