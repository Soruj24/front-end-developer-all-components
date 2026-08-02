"use server";

import { AuthError } from "next-auth";
import { loginSchema, registerSchema } from "../schemas";
import { signIn } from "../server/auth";
import { createUser, findUserByEmail, findUserByUsername, recordLoginEvent, setEmailVerificationToken } from "../server/service";
import { generateToken, hashToken } from "../server/tokens";
import { getMailer } from "../server/mail";
import { consumeRateLimit, AUTH_LIMITS } from "../server/rate-limit";
import { actionClientIp, actionUserAgent, appUrl } from "../server/url";
import type { AuthFormState } from "./types";
import { ACCOUNT_HOME } from "../constants";

function genericError(type?: string): AuthFormState {
  if (type === "CredentialsSignin") {
    return { message: "Invalid email or password." };
  }
  return { message: "Something went wrong. Please try again." };
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const parsed = loginSchema.safeParse({ email, password: formData.get("password") });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, field: { email }, message: "Please fix the highlighted fields." };
  }

  const ip = await actionClientIp();
  const limit = consumeRateLimit(`login:${ip}:${email.toLowerCase()}`, AUTH_LIMITS.login);
  if (!limit.allowed) {
    return { message: `Too many attempts. Try again in ${Math.ceil(limit.retryAfterSec / 60)}m.` };
  }

  const remember = formData.get("remember") === "on";

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: ACCOUNT_HOME,
      remember: remember ? "on" : "off",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        const user = await findUserByEmail(parsed.data.email);
        if (user) {
          await recordLoginEvent({
            userId: String(user._id),
            method: "credentials",
            status: "failed",
            ip,
            userAgent: await actionUserAgent(),
          });
        }
        return { message: "Invalid email or password." };
      }
      return genericError(error.type);
    }
    throw error;
  }
}

export async function register(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "");
  const username = String(formData.get("username") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const terms = formData.get("terms") === "on";

  const parsed = registerSchema.safeParse({ name, username, email, password, terms });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, field: { name, username, email }, message: "Please fix the highlighted fields." };
  }
  if (password !== confirmPassword) {
    return { errors: { confirmPassword: ["Passwords do not match."] }, field: { name, username, email }, message: "Please fix the highlighted fields." };
  }

  const ip = await actionClientIp();
  const limit = consumeRateLimit(`register:${ip}`, AUTH_LIMITS.register);
  if (!limit.allowed) {
    return { message: "Too many sign-ups from this address. Try again later." };
  }

  const existing = await findUserByEmail(parsed.data.email);
  if (existing) {
    return { errors: { email: ["An account with this email already exists."] }, field: { name, username, email }, message: "Please fix the highlighted fields." };
  }

  const usernameTaken = await findUserByUsername(parsed.data.username);
  if (usernameTaken) {
    return { errors: { username: ["That username is already taken."] }, field: { name, username, email }, message: "Please fix the highlighted fields." };
  }

  await createUser({
    name: parsed.data.name,
    username: parsed.data.username,
    email: parsed.data.email,
    password: parsed.data.password,
  });

  const verificationToken = generateToken();
  await setEmailVerificationToken(parsed.data.email, hashToken(verificationToken));
  const verifyUrl = await appUrl(`/verify-email?token=${verificationToken}`);
  await getMailer().send({
    to: parsed.data.email,
    subject: "Verify your email — Component Library",
    text: `Hi ${name},\n\nConfirm your email to unlock publishing:\n${verifyUrl}\n\nIf you didn't create an account, you can ignore this email.`,
  });

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: ACCOUNT_HOME,
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) return genericError(error.type);
    throw error;
  }
}

export async function logout(): Promise<void> {
  const { signOut } = await import("../server/auth");
  await signOut({ redirectTo: "/" });
}

export async function signInWithProvider(
  provider: "github" | "google"
): Promise<{ error?: string } | undefined> {
  const id = process.env[`AUTH_${provider.toUpperCase()}_ID`];
  const secret = process.env[`AUTH_${provider.toUpperCase()}_SECRET`];
  if (!id || !secret) {
    const label = provider === "github" ? "GitHub" : "Google";
    return { error: `${label} sign-in is coming soon. Sign in with email to continue.` };
  }
  await signIn(provider, { redirectTo: ACCOUNT_HOME });
}