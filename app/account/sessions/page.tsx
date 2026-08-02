import type { Metadata } from "next";
import { auth } from "@/features/auth";
import { SectionPanel } from "@/features/auth/components/account";
import { listSessions } from "@/features/auth/server/service";
import { RevokeSessionButton } from "@/features/auth/components/account/RevokeSessionButton";

export const metadata: Metadata = {
  title: "Sessions",
  description: "Review and revoke active sessions.",
};

export default async function AccountSessions() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const sessions = await listSessions(session.user.id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Active sessions</h1>
        <p className="text-sm text-muted-foreground">Devices signed into your account.</p>
      </div>

      <SectionPanel title={`${sessions.length} active`} subtitle="Sessions expire after 30 days of inactivity.">
        {sessions.length === 0 && (
          <p className="text-sm text-muted-foreground">No active sessions.</p>
        )}
        <ul className="flex flex-col divide-y divide-border">
          {sessions.map((item) => (
            <li key={String(item._id)} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <path d="M3 9h18m-6 7h3" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.device ?? "Unknown device"}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.ip ?? "Unknown IP"} · Last active{" "}
                    {item.lastSeenAt ? new Date(item.lastSeenAt).toLocaleString() : "—"}
                  </p>
                </div>
              </div>
              <RevokeSessionButton sessionId={String(item._id)} />
            </li>
          ))}
        </ul>
      </SectionPanel>
    </div>
  );
}