import Skeleton from "@/components/ui/Skeleton";

export default function AccountLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading account">
      <div className="rounded-lg border border-border/60 bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" width={56} height={56} />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border/60 bg-surface p-5 shadow-sm"
          >
            <Skeleton variant="text" width="50%" />
            <div className="mt-2">
              <Skeleton variant="text" width="70%" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border/60 bg-surface p-5 shadow-sm">
        <Skeleton variant="text" width="30%" />
        <div className="mt-4 flex flex-col gap-3">
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="75%" />
          <Skeleton variant="text" width="85%" />
        </div>
      </div>
    </div>
  );
}
