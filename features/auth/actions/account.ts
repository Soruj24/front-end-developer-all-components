"use server";

import { changePassword, revokeSession, updateProfile } from "../server/service";
import { auth } from "../server/auth";
import { changePasswordSchema, profileSchema } from "../schemas/account";
import type { AuthFormState } from "./types";

export async function updateProfileAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const session = await auth();
  if (!session?.user?.id) return { message: "Not signed in." };

  const parsed = profileSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, field: { name: String(formData.get("name") ?? "") } };
  }

  await updateProfile(session.user.id, { name: parsed.data.name });
  return { message: "Profile updated." };
}

export async function changePasswordAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const session = await auth();
  if (!session?.user?.id) return { message: "Not signed in." };

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, message: "Please fix the highlighted fields." };
  }

  const changed = await changePassword(
    session.user.id,
    parsed.data.currentPassword,
    parsed.data.newPassword
  );
  if (!changed) return { message: "Current password is incorrect." };
  return { message: "Password updated." };
}

export async function revokeSessionAction(sessionId: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) return;
  await revokeSession(sessionId, session.user.id);
}