export function CertificatePreview() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Certificate Preview</h3>
      <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-border bg-gradient-to-br from-zinc-50 to-white p-6 text-center dark:border-border dark:from-zinc-900 dark:to-zinc-800">
        <svg className="mb-2 h-10 w-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
        <p className="text-sm font-medium text-foreground">Certificate of Completion</p>
        <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Earned upon 100% completion</p>
        <button className="mt-3 rounded-xl bg-amber-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-700">View Preview</button>
      </div>
    </div>
  );
}
