import type { DefaultSession } from "next-auth";
import type { UserRole } from "./role";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      emailVerified: boolean;
      remember?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: UserRole;
    emailVerified?: boolean;
    remember?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    emailVerified?: boolean;
    remember?: boolean;
  }
}