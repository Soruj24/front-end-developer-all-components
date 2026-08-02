import { connectAuthDb } from "./db";
import { hashToken, isExpired } from "./tokens";
import { UserModel, AccountSessionModel, LoginEventModel } from "./models";
import type { UserDoc, AccountSessionDoc, LoginEventDoc } from "./models";
import type { AuthMethod, LoginEventStatus, PublicUser, UserRole } from "../types/role";
import { hashPassword, verifyPassword } from "./password";

export interface NewUser {
  name: string;
  username?: string;
  email: string;
  password: string;
  role?: UserRole;
}

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function toPublicUser(user: UserDoc): PublicUser {
  return {
    id: String(user._id),
    name: user.name,
    username: user.username ?? undefined,
    email: user.email,
    role: user.role ?? "member",
    emailVerified: Boolean(user.emailVerified),
    avatarUrl: user.avatarUrl ?? null,
  };
}

export async function findUserByEmail(email: string): Promise<UserDoc | null> {
  await connectAuthDb();
  return UserModel.findOne({ email: email.toLowerCase().trim() });
}

export async function findUserById(id: string): Promise<UserDoc | null> {
  await connectAuthDb();
  return UserModel.findById(id);
}

export async function findUserByUsername(username: string): Promise<UserDoc | null> {
  await connectAuthDb();
  return UserModel.findOne({ username: username.toLowerCase().trim() });
}

export async function createUser(input: NewUser): Promise<PublicUser> {
  await connectAuthDb();
  const passwordHash = await hashPassword(input.password);
  const doc = await UserModel.create({
    name: input.name.trim(),
    username: input.username?.toLowerCase().trim(),
    email: input.email.toLowerCase().trim(),
    passwordHash,
    role: input.role ?? "member",
    emailVerified: false,
    twoFactorEnabled: false,
  });
  return toPublicUser(doc);
}

export async function validateCredentials(
  email: string,
  password: string
): Promise<PublicUser | null> {
  await connectAuthDb();
  const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
  if (!user || user.status !== "active") return null;
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;
  return toPublicUser(user);
}

export async function setEmailVerificationToken(
  email: string,
  tokenHash: string
): Promise<void> {
  await connectAuthDb();
  await UserModel.updateOne(
    { email: email.toLowerCase().trim() },
    {
      $set: {
        emailVerificationTokenHash: tokenHash,
        emailVerificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    }
  );
}

export async function consumeEmailVerification(token: string): Promise<boolean> {
  await connectAuthDb();
  const tokenHash = hashToken(token);
  const user = await UserModel.findOne({ emailVerificationTokenHash: tokenHash });
  if (!user || isExpired(user.emailVerificationExpiresAt)) return false;
  await UserModel.updateOne(
    { _id: user._id },
    {
      $set: {
        emailVerified: true,
        emailVerificationTokenHash: null,
        emailVerificationExpiresAt: null,
      },
    }
  );
  return true;
}

export async function setResetPasswordToken(
  email: string,
  tokenHash: string
): Promise<boolean> {
  await connectAuthDb();
  const result = await UserModel.updateOne(
    { email: email.toLowerCase().trim(), status: "active" },
    {
      $set: {
        resetPasswordTokenHash: tokenHash,
        resetPasswordExpiresAt: new Date(Date.now() + 30 * 60 * 1000),
      },
    }
  );
  return result.modifiedCount > 0;
}

export async function consumeResetPassword(
  token: string,
  newPassword: string
): Promise<PublicUser | null> {
  await connectAuthDb();
  const tokenHash = hashToken(token);
  const user = await UserModel.findOne({ resetPasswordTokenHash: tokenHash });
  if (!user || isExpired(user.resetPasswordExpiresAt)) return null;
  const passwordHash = await hashPassword(newPassword);
  await UserModel.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordHash,
        resetPasswordTokenHash: null,
        resetPasswordExpiresAt: null,
      },
    }
  );
  return toPublicUser(await UserModel.findById(user._id).exec() as UserDoc);
}

export async function updateProfile(
  userId: string,
  patch: { name?: string; avatarUrl?: string | null }
): Promise<PublicUser | null> {
  await connectAuthDb();
  const doc = await UserModel.findByIdAndUpdate(
    userId,
    { $set: { ...patch } },
    { new: true }
  );
  return doc ? toPublicUser(doc) : null;
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  await connectAuthDb();
  const user = await UserModel.findById(userId);
  if (!user) return false;
  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) return false;
  const passwordHash = await hashPassword(newPassword);
  await UserModel.updateOne({ _id: user._id }, { $set: { passwordHash } });
  return true;
}

export async function markLogin(userId: string, ip?: string): Promise<void> {
  await connectAuthDb();
  await UserModel.updateOne(
    { _id: userId },
    { $set: { lastLoginAt: new Date(), lastLoginIp: ip ?? null } }
  );
}

export async function recordLoginEvent(input: {
  userId: string;
  ip?: string;
  userAgent?: string;
  method: AuthMethod;
  status: LoginEventStatus;
}): Promise<void> {
  await connectAuthDb();
  await LoginEventModel.create({
    userId: input.userId,
    ip: input.ip ?? "unknown",
    userAgent: input.userAgent,
    method: input.method,
    status: input.status,
  });
}

export async function listLoginEvents(
  userId: string,
  limit = 50
): Promise<LoginEventDoc[]> {
  await connectAuthDb();
  return LoginEventModel.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}

export async function createDeviceSession(input: {
  userId: string;
  token: string;
  ip?: string;
  userAgent?: string;
  device?: string;
}): Promise<void> {
  await connectAuthDb();
  await AccountSessionModel.create({
    userId: input.userId,
    tokenHash: hashToken(input.token),
    ip: input.ip ?? "unknown",
    userAgent: input.userAgent,
    device: input.device,
    expiresAt: new Date(Date.now() + SESSION_TTL_MS),
  });
}

export async function listSessions(userId: string): Promise<AccountSessionDoc[]> {
  await connectAuthDb();
  return AccountSessionModel.find({
    userId,
    revokedAt: null,
    expiresAt: { $gt: new Date() },
  })
    .sort({ lastSeenAt: -1 })
    .lean();
}

export async function revokeSession(sessionId: string, userId: string): Promise<void> {
  await connectAuthDb();
  await AccountSessionModel.updateOne(
    { _id: sessionId, userId },
    { $set: { revokedAt: new Date() } }
  );
}

export function parseDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  const os = ua.includes("win")
    ? "Windows"
    : ua.includes("mac")
      ? "macOS"
      : ua.includes("linux")
        ? "Linux"
        : ua.includes("android")
          ? "Android"
          : ua.includes("iphone") || ua.includes("ios")
            ? "iOS"
            : "Unknown OS";
  const browser = ua.includes("edg/")
    ? "Edge"
    : ua.includes("chrome")
      ? "Chrome"
      : ua.includes("firefox")
        ? "Firefox"
        : ua.includes("safari")
          ? "Safari"
          : "Browser";
  return `${os} · ${browser}`;
}