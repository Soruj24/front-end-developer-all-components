import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config shared with `proxy.ts`.
 *
 * Providers are intentionally empty here — the proxy only needs to decrypt the
 * session JWT for optimistic checks, never to touch the database. The full
 * config (with the Credentials provider) lives in `./auth`.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isOnAccount = nextUrl.pathname.startsWith("/account");

      if (isOnAccount) {
        return isLoggedIn;
      }

      if (
        isLoggedIn &&
        (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
      ) {
        return Response.redirect(new URL("/account", nextUrl));
      }

      return true;
    },
  },
};