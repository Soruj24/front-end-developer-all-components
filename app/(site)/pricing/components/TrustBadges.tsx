export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {["PCI Compliant", "SOC 2 Type II", "99.9% Uptime SLA", "GDPR Compliant", "HIPAA Eligible", "ISO 27001"].map((badge) => (
        <div key={badge} className="flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2 text-sm font-medium shadow-sm dark:border-border dark:bg-zinc-900">
          <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          {badge}
        </div>
      ))}
    </div>
  );
}
