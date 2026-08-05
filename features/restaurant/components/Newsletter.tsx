export function Newsletter() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-8 text-white">
      <div className="mx-auto max-w-md text-center">
        <h3 className="mb-2 text-xl font-bold">Get $5 Off Your Next Order</h3>
        <p className="mb-4 text-sm text-white/80">Subscribe for exclusive deals, new menu alerts, and a welcome discount.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="your@email.com" className="flex-1 rounded-lg px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder-zinc-400" />
          <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50">Subscribe</button>
        </div>
      </div>
    </div>
  );
}
