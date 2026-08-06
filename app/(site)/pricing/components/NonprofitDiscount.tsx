export function NonprofitDiscount() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border-2 border-teal-400 bg-gradient-to-br from-teal-50 to-white p-8 text-center shadow-sm dark:border-teal-600 dark:from-teal-950 dark:to-zinc-900">
      <svg className="mx-auto h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
      <h3 className="mt-3 text-xl font-bold">50% Off for Nonprofits</h3>
      <p className="mt-2 text-sm text-muted-foreground">Verified nonprofit organizations receive 50% off all paid plans.</p>
      <p className="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">Pro was $29 → now $14.50/mo</p>
      <button className="mt-6 w-full rounded-xl bg-teal-500 py-3 text-sm font-bold text-white transition hover:bg-teal-600">Verify Nonprofit</button>
    </div>
  );
}
