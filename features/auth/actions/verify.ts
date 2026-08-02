"use server";

import { consumeEmailVerification, findUserByEmail, setEmailVerificationToken } from "../server/service";
import { generateToken, hashToken } from "../server/tokens";
import { getMailer } from "../server/mail";
import { consumeRateLimit, AUTH_LIMITS } from "../server/rate-limit";
import { actionClientIp, appUrl } from "../server/url";
import { verifyEmailSchema } from "../schemas/verify";
import type { AuthFormState } from "./types";

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "expired" | "missing" };

export async function verifyEmail(token: string): Promise<VerifyResult> {
  if (!token) return { ok: false, reason: "missing" };
  const consumed = await consumeEmailVerification(token);
  if (!consumed) return { ok: false, reason: "expired" };
  return { ok: true };
}

export async function resendVerification(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const parsed = verifyEmailSchema.safeParse({ email });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, field: { email }, message: "Please fix the highlighted fields." };
  }

  const ip = await actionClientIp();
  const limit = consumeRateLimit(`verify:${ip}:${email.toLowerCase()}`, AUTH_LIMITS.resendVerification);
  if (!limit.allowed) {
    return { message: "Too many requests. Try again later." };
  }

  const user = await findUserByEmail(parsed.data.email);
  if (user && !user.emailVerified) {
    const token = generateToken();
    await setEmailVerificationToken(parsed.data.email, hashToken(token));
    const verifyUrl = await appUrl(`/verify-email?token=${token}`);
    await getMailer().send({
      to: parsed.data.email,
      subject: "Verify your email — Component Library",
      text: `Hi ${user.name},\n\nConfirm your email to unlock publishing:\n${verifyUrl}\n\nIf you didn't request this, you can ignore this email.`,
    });
  }

  return { message: "If that address exists and is unverified, a new link is on its way." };
}