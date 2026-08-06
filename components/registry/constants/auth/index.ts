import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const authSignIn: RegistryEntry = entry({
    id: "auth-sign-in",
    title: "Sign In Form",
    description: "A complete sign-in form with email/password, social logins, and validation.",
    source: `export default function AuthSignIn() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-6 flex border-b border-border">
        <button className="flex-1 border-b-2 border-blue-600 pb-3 text-sm font-medium text-blue-600">Sign In</button>
        <button className="flex-1 pb-3 text-sm font-medium text-muted-foreground">Sign Up</button>
      </div>
      <form className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Password</label>
          <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted" />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" className="rounded border-border text-blue-600" /> Remember me
          </label>
          <button type="button" className="text-sm text-blue-600 hover:underline">Forgot password?</button>
        </div>
        <button type="submit" className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white hover:bg-muted dark:bg-foreground dark:text-background">Sign In</button>
      </form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-muted-foreground dark:bg-zinc-900">or continue with</span></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground">Google</button>
        <button className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground">GitHub</button>
      </div>
    </div>
  );
}`,
  });

export const authSignUp: RegistryEntry = entry({
    id: "auth-sign-up",
    title: "Sign Up Form",
    description: "A registration form with password strength indicator and validation.",
    source: `export default function AuthSignUp() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">Create Account</h2>
        <p className="mt-1 text-sm text-muted-foreground">Fill in the details to get started</p>
      </div>
      <form className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Full Name</label>
          <input type="text" placeholder="John Doe" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Password</label>
          <input type="password" placeholder="Create a password" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted" />
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[60%] rounded-full bg-yellow-500" />
          </div>
          <p className="mt-0.5 text-xs text-yellow-500">Password strength: Medium</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Confirm Password</label>
          <input type="password" placeholder="Repeat password" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted" />
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="mt-0.5 rounded border-border text-blue-600" />
          I agree to the Terms of Service and Privacy Policy
        </label>
        <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Create Account</button>
      </form>
    </div>
  );
}`,
  });

export const authPasswordReset: RegistryEntry = entry({
    id: "auth-password-reset",
    title: "Password Reset",
    description: "A two-step password reset flow with email input and confirmation.",
    source: `export default function AuthPasswordReset() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2"/></svg>
        </div>
        <h2 className="text-xl font-semibold">Reset Password</h2>
        <p className="mt-1 text-sm text-muted-foreground">Enter your email and we'll send you a reset link</p>
      </div>
      <form className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Email address</label>
          <input type="email" placeholder="you@example.com" className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted" />
        </div>
        <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Send Reset Link</button>
        <button type="button" className="text-center text-sm text-blue-600 hover:underline">Back to login</button>
      </form>
    </div>
  );
}`,
  });

export const authTwoFactor: RegistryEntry = entry({
    id: "auth-two-factor",
    title: "Two-Factor Authentication",
    description: "A 2FA verification form with 6-digit code input.",
    source: `export default function AuthTwoFactor() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40">
          <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2"/></svg>
        </div>
        <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
        <p className="mt-1 text-sm text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
      </div>
      <div className="flex justify-center gap-2 mb-6">
        {[0,1,2,3,4,5].map((i) => (
          <input key={i} type="text" inputMode="numeric" maxLength={1} className="h-12 w-11 rounded-lg border border-border bg-white text-center text-lg font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted" />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <button type="button" className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Verify</button>
        <button type="button" className="text-center text-sm text-muted-foreground hover:text-foreground">Send code via SMS instead</button>
        <button type="button" className="text-center text-sm text-blue-600 hover:underline">Back to login</button>
      </div>
    </div>
  );
}`,
  });

export const authLocked: RegistryEntry = entry({
    id: "auth-locked",
    title: "Account Locked",
    description: "An account lockout screen with countdown timer.",
    source: `export default function AuthLocked() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900/50 dark:bg-zinc-900">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
          <svg className="h-7 w-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2"/></svg>
        </div>
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Account Temporarily Locked</h2>
        <div className="mt-2 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-300">Your account has been locked due to too many failed login attempts.</p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Lockout period remaining</p>
          <p className="mt-1 text-2xl font-bold">2:00</p>
        </div>
        <button type="button" className="mt-4 text-sm font-medium text-blue-600 hover:underline">Reset password</button>
      </div>
    </div>
  );
}`,
  });

export const authMagicLink: RegistryEntry = entry({
    id: "auth-magic-link",
    title: "Magic Link",
    description: "A magic link email verification screen.",
    source: `export default function AuthMagicLink() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-blue-200 bg-white p-6 shadow-sm dark:border-blue-900/50 dark:bg-zinc-900">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
          <svg className="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/><polyline points="22,6 12,13 2,6" strokeWidth="2"/></svg>
        </div>
        <h2 className="text-xl font-semibold">Check your email</h2>
        <p className="mt-2 text-sm text-muted-foreground">We sent a magic link to <span className="font-medium">your@email.com</span></p>
        <p className="mt-1 text-xs text-muted-foreground/70">Click the link in the email to sign in instantly</p>
        <div className="mt-6 text-sm text-muted-foreground">
          Didn't receive the email? <button type="button" className="font-medium text-blue-600 hover:underline">Resend</button>
        </div>
        <button type="button" className="mt-4 text-sm font-medium text-blue-600 hover:underline">Back to login</button>
      </div>
    </div>
  );
}`,
  });

export const authSessionExpired: RegistryEntry = entry({
    id: "auth-session-expired",
    title: "Session Expired",
    description: "A session expiration warning screen.",
    source: `export default function AuthSessionExpired() {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-900/50 dark:bg-zinc-900">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
          <svg className="h-7 w-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"/><polyline points="12 6 12 12 16 14" strokeWidth="2"/></svg>
        </div>
        <h2 className="text-xl font-semibold">Your session has expired</h2>
        <p className="mt-2 text-sm text-muted-foreground">For your security, your session timed out due to inactivity.</p>
        <div className="mt-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
          Any unsaved changes may have been lost.
        </div>
        <button type="button" className="mt-6 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white hover:bg-muted dark:bg-foreground dark:text-background">Sign in again</button>
      </div>
    </div>
  );
}`,
  });

export const auth: RegistryEntry[] = [
  authSignIn,
  authSignUp,
  authPasswordReset,
  authTwoFactor,
  authLocked,
  authMagicLink,
  authSessionExpired,
];
