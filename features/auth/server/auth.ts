import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { headers } from "next/headers";
import { authConfig } from "./config";
import { loginSchema } from "../schemas";
import { createDeviceSession, markLogin, recordLoginEvent, validateCredentials, parseDevice } from "./service";
import { generateToken } from "./tokens";
import type { UserRole } from "../types/role";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        let remember = false;
        try {
          const form = await request?.formData();
          remember = form?.get("remember") === "on";
        } catch {
          // ignore
        }
        const parsed = loginSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (!parsed.success) return null;
        const user = await validateCredentials(
          parsed.data.email,
          parsed.data.password
        );
        if (!user) return null;
        return { id: user.id, name: user.name, email: user.email, remember };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role?: string }).role ?? "member";
        token.emailVerified = Boolean((user as { emailVerified?: boolean }).emailVerified);
        token.remember = Boolean((user as { remember?: boolean }).remember);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as UserRole) ?? "member";
        (session.user as { emailVerified: boolean }).emailVerified = Boolean(token.emailVerified);
        session.user.remember = Boolean(token.remember);
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      const id = user.id ?? (user as { id?: string }).id;
      if (!id) return;
      try {
        const h = await headers();
        const forwarded = h.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0]!.trim() : (h.get("x-real-ip") ?? "unknown");
        const userAgent = h.get("user-agent") ?? undefined;

        await Promise.all([
          markLogin(id, ip),
          recordLoginEvent({ userId: id, ip, userAgent, method: "credentials", status: "success" }),
          createDeviceSession({
            userId: id,
            token: generateToken(),
            ip,
            userAgent,
            device: userAgent ? await parseDevice(userAgent) : undefined,
          }),
        ]);
      } catch (error) {
        console.error("[auth] sign-in audit failed:", error);
      }
    },
  },
});