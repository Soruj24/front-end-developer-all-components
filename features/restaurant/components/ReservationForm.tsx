export function ReservationForm() {
  return (
    <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Reservations</h3>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Date</label>
            <input type="date" defaultValue="2026-08-01" className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100" />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Time</label>
            <select className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100">
              {["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Guests</label>
          <select className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => <option key={g}>{g} {g === 1 ? "Guest" : "Guests"}</option>)}
          </select>
        </div>
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Book a Table</button>
      </div>
    </div>
  );
}
