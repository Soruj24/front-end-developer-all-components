export function StarRating({ size = "sm" }: { size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${cls} fill-yellow-400 text-yellow-400`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  const gradients = [
    "from-blue-400 to-purple-500",
    "from-emerald-400 to-cyan-500",
    "from-orange-400 to-pink-500",
    "from-indigo-400 to-violet-500",
    "from-rose-400 to-red-500",
    "from-teal-400 to-green-500",
  ];
  const idx = name.length % gradients.length;
  const sizeMap = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg" };
  return (
    <div className={`flex items-center justify-center rounded-full bg-gradient-to-br ${gradients[idx]} font-bold text-white ${sizeMap[size]}`}>
      {initials}
    </div>
  );
}

export function Badge({ label }: { label: string }) {
  const colors: Record<string, string> = {
    Startups: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Enterprise: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    Agencies: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  };
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${colors[label] || "bg-muted text-muted-foreground"}`}>
      {label}
    </span>
  );
}
