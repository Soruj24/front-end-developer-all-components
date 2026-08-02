import { redirect } from "next/navigation";
import { auth } from "@/features/auth";
import { AccountShell } from "@/features/auth/components/account";
import { toPublicUser, findUserById } from "@/features/auth/server/service";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await findUserById(session.user.id);
  if (!user) redirect("/login");

  return <AccountShell user={toPublicUser(user)}>{children}</AccountShell>;
}