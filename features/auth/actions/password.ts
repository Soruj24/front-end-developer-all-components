"use server";

import { AuthError } from "next-auth";
import { forgotPasswordSchema, resetPasswordSchema } from "../schemas/password";
import { signIn } from "../server/auth";
import { consumeResetPassword, findUserByEmail, setResetPasswordToken } from "../server/service";
import { generateToken, hashToken } from "../server/tokens";
import { getMailer } from "../server/mail";
import { consumeRateLimit, AUTH_LIMITS } from "../server/rate-limit";
import { actionClientIp, appUrl } from "../server/url";
import { ACCOUNT_HOME } from "../constants";
import type { AuthFormState } from "./types";

export async function forgotPassword(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const parsed = forgotPasswordSchema.safeParse({ email });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, field: { email }, message: "Please fix the highlighted fields." };
  }

  const ip = await actionClientIp();
  const limit = consumeRateLimit(`forgot:${ip}:${email.toLowerCase()}`, AUTH_LIMITS.forgotPassword);
  if (!limit.allowed) {
    return { message: "Too many requests. Try again in a few minutes." };
  }

  const user = await findUserByEmail(parsed.data.email);
  if (user && user.status === "active") {
    const token = generateToken();
    await setResetPasswordToken(parsed.data.email, hashToken(token));
    const resetUrl = await appUrl(`/reset-password?token=${token}`);
    await getMailer().send({
      to: parsed.data.email,
      subject: "Reset your password — Component Library",
      text: `Hi ${user.name},\n\nReset your password within 30 minutes:\n${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`,
    });
  }

  return { message: "If that address exists, a reset link is on its way." };
}

export async function resetPassword(
  token: string,
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, message: "Please fix the highlighted fields." };
  }

  const user = await consumeResetPassword(token, parsed.data.password);
  if (!user) {
    return { message: "This reset link is invalid or has expired. Request a new one." };
  }

  try {
    await signIn("credentials", {
      email: user.email,
      password: parsed.data.password,
      redirectTo: ACCOUNT_HOME,
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) return { message: "Something went wrong. Please try again." };
    throw error;
  }
}