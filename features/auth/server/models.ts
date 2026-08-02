import mongoose, { Schema, type Model } from "mongoose";
import { USER_ROLES, type AuthMethod, type LoginEventStatus, type UserRole } from "../types/role";

export interface UserDoc {
  _id: unknown;
  name: string;
  username?: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
  role: UserRole;
  status: "active" | "suspended" | "deleted";
  emailVerified: boolean;
  emailVerificationTokenHash?: string | null;
  emailVerificationExpiresAt?: Date | null;
  resetPasswordTokenHash?: string | null;
  resetPasswordExpiresAt?: Date | null;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string | null;
  recoveryCodes?: string[] | null;
  lastLoginAt?: Date | null;
  lastLoginIp?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    avatarUrl: String,
    role: { type: String, enum: USER_ROLES, default: "member" },
    status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    emailVerified: { type: Boolean, default: false },
    emailVerificationTokenHash: String,
    emailVerificationExpiresAt: Date,
    resetPasswordTokenHash: String,
    resetPasswordExpiresAt: Date,
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: String,
    recoveryCodes: { type: [String], default: null },
    lastLoginAt: Date,
    lastLoginIp: String,
  },
  { timestamps: true }
);

export interface AccountSessionDoc {
  _id: unknown;
  userId: unknown;
  tokenHash: string;
  ip?: string;
  userAgent?: string;
  device?: string;
  createdAt: Date;
  lastSeenAt: Date;
  expiresAt: Date;
  revokedAt?: Date | null;
}

const accountSessionSchema = new Schema<AccountSessionDoc>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  tokenHash: { type: String, required: true, unique: true },
  ip: String,
  userAgent: String,
  device: String,
  createdAt: { type: Date, default: Date.now },
  lastSeenAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  revokedAt: Date,
});
accountSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export interface LoginEventDoc {
  _id: unknown;
  userId: unknown;
  ip?: string;
  userAgent?: string;
  method: AuthMethod;
  status: LoginEventStatus;
  createdAt: Date;
}

const loginEventSchema = new Schema<LoginEventDoc>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  ip: String,
  userAgent: String,
  method: { type: String, enum: ["credentials", "google", "github", "microsoft", "gitlab", "magic", "passkey"], required: true },
  status: { type: String, enum: ["success", "failed"], required: true },
  createdAt: { type: Date, default: Date.now },
});
loginEventSchema.index({ userId: 1, createdAt: -1 });
loginEventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

function typedModel<T>(name: string, schema: Schema<T>): Model<T> {
  return (mongoose.models[name] ??
    mongoose.model<T>(name, schema)) as Model<T>;
}

export const UserModel = typedModel<UserDoc>("User", userSchema);
export const AccountSessionModel = typedModel<AccountSessionDoc>("AccountSession", accountSessionSchema);
export const LoginEventModel = typedModel<LoginEventDoc>("LoginEvent", loginEventSchema);