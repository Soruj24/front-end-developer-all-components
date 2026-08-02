export const ACCOUNT_HOME = "/account";

export const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"] as const;

export const PROTECTED_ROUTES = ["/account"] as const;
