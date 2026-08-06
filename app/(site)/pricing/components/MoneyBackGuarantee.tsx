export function MoneyBackGuarantee() {
  return (
    <div className="mx-auto flex max-w-sm items-center gap-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6 dark:border-emerald-600 dark:bg-emerald-950">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">30-Day Money-Back Guarantee</h3>
        <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">Not satisfied? Get a full refund within 30 days. No questions asked.</p>
      </div>
    </div>
  );
}
