export function FreeTrial() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-white p-8 text-center shadow-sm dark:border-blue-600 dark:from-blue-950 dark:to-zinc-900">
      <svg className="mx-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423z" />
      </svg>
      <h3 className="mt-3 text-xl font-bold">Start Your 14-Day Free Trial</h3>
      <p className="mt-2 text-sm text-muted-foreground">Full access. No commitment. Cancel anytime.</p>
      <div className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">14 days free</div>
      <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Start Free Trial</button>
      <p className="mt-2 text-xs text-muted-foreground/70">No credit card required</p>
    </div>
  );
}
