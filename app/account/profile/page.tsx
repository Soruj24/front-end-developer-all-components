import type { Metadata } from "next";
import { auth } from "@/features/auth";
import { SectionPanel, ProfileForm } from "@/features/auth/components/account";
import { findUserById, toPublicUser } from "@/features/auth/server/service";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile.",
};

export default async function AccountProfile() {
  const session = await auth();
  const user = session?.user?.id ? await findUserById(session.user.id) : null;
  const profile = user ? toPublicUser(user) : null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">How you appear across the platform.</p>
      </div>

      <SectionPanel title="Account details" subtitle="Your public identity.">
        <ProfileForm name={profile?.name ?? ""} />
      </SectionPanel>

      <SectionPanel title="Email address" subtitle="Used to sign in and receive notifications.">
        <p className="text-sm text-foreground">{profile?.email ?? ""}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {profile?.emailVerified
            ? "Verified — you can publish and use creator tools."
            : "Not verified — check your inbox or resend the link from Security."}
        </p>
      </SectionPanel>
    </div>
  );
}