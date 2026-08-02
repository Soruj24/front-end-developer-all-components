import NextAuth from "next-auth";
import { authConfig } from "@/features/auth/server/config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/account/:path*", "/login", "/register"],
};