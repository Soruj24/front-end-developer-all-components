import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/features/auth";
import { SectionPanel } from "@/features/auth/components/account";
import { listLoginEvents } from "@/features/auth/server/service";

export const metadata: Metadata = {
  title: "Login history",
  description: "Recent sign-in activity on your account.",
};

const METHOD_LABELS: Record<string, string> = {
  credentials: "Email & password",
  google: "Google",
  github: "GitHub",
  microsoft: "Microsoft",
  gitlab: "GitLab",
  magic: "Magic link",
  passkey: "Passkey",
};

export default async function AccountHistory() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const events = await listLoginEvents(session.user.id, 100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Login history</h1>
        <p className="text-sm text-muted-foreground">Review recent sign-in attempts on your account.</p>
      </div>

      <SectionPanel title={`${events.length} events`} subtitle="Retained for 90 days.">
        {events.length === 0 && (
          <p className="text-sm text-muted-foreground">No sign-in activity yet.</p>
        )}
        <ul className="flex flex-col divide-y divide-border">
          {events.map((event) => (
            <li key={String(event._id)} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    event.status === "success" ? "bg-emerald-500" : "bg-danger"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {event.status === "success" ? "Signed in" : "Failed sign-in"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {METHOD_LABELS[event.method] ?? event.method} · {event.ip ?? "Unknown IP"}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {event.createdAt ? new Date(event.createdAt).toLocaleString() : ""}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-xl bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
          Something look wrong?{" "}
          <Link href="/account/security" className="font-medium text-foreground underline underline-offset-2">
            Change your password
          </Link>{" "}
          and review your active sessions.
        </div>
      </SectionPanel>
    </div>
  );
}