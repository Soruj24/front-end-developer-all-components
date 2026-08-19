"use client";
import { useState } from "react";
import { Lock, Mail, User, Eye, EyeOff, Shield } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { LOGIN_CARD_SOURCE } from "./login-card-source";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border bg-background p-6 shadow-sm">
      <div className="text-center mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><Lock className="w-6 h-6 text-primary" /></div><h2 className="text-lg font-semibold text-foreground">Welcome back</h2><p className="text-sm text-muted-foreground">Sign in to your account</p></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> <input className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> <input className="w-full pl-9 pr-10 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" type={showPassword ? "text" : "password"} placeholder="Enter your password" /> <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
        </div>
        <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Sign In</button>
      </div>
    </div>
  );
}

function SocialLogin() {
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border bg-background p-6 shadow-sm">
      <div className="text-center mb-6"><h2 className="text-lg font-semibold text-foreground">Sign in</h2><p className="text-sm text-muted-foreground">Choose your preferred method</p></div>
      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">
          <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Continue with GitHub
        </button>
        <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#1DA1F2] text-white text-sm font-medium hover:bg-[#1a8cd8] transition-colors">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          Continue with Twitter
        </button>
      </div>
    </div>
  );
}

function MagicLink() {
  const [sent, setSent] = useState(false);
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border bg-background p-6 shadow-sm">
      <div className="text-center mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><Mail className="w-6 h-6 text-primary" /></div><h2 className="text-lg font-semibold text-foreground">Magic Link</h2><p className="text-sm text-muted-foreground">Sign in with your email</p></div>
      {sent ? (
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3"><Mail className="w-6 h-6 text-green-600 dark:text-green-400" /></div>
          <p className="text-sm text-muted-foreground">Check your email for the magic link.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Email</label><input className="px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" /></div>
          <button onClick={() => setSent(true)} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Send Magic Link</button>
        </div>
      )}
    </div>
  );
}

function TwoFactor() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border bg-background p-6 shadow-sm">
      <div className="text-center mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><Shield className="w-6 h-6 text-primary" /></div><h2 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h2><p className="text-sm text-muted-foreground">Enter the 6-digit code from your authenticator app</p></div>
      <div className="flex gap-2 justify-center mb-4">
        {code.map((digit, i) => (
          <input key={i} type="text" maxLength={1} value={digit} onChange={e => handleChange(i, e.target.value)} className="w-10 h-12 text-center text-lg font-mono rounded-lg border bg-background outline-none focus:ring-2 focus:ring-ring" />
        ))}
      </div>
      <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Verify</button>
    </div>
  );
}

function RememberMe() {
  const [remember, setRemember] = useState(true);
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Email</label><input className="px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" /></div>
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Password</label><input className="px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" type="password" placeholder="Enter your password" /></div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded border-gray-300" /> Remember me</label>
          <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
        </div>
        <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Sign In</button>
      </div>
    </div>
  );
}

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border bg-background p-6 shadow-sm">
      <div className="text-center mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><Lock className="w-6 h-6 text-primary" /></div><h2 className="text-lg font-semibold text-foreground">Reset Password</h2><p className="text-sm text-muted-foreground">Enter your email to receive a reset link</p></div>
      {sent ? (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">If an account exists with that email, you will receive a password reset link.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Email</label><input className="px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" /></div>
          <button onClick={() => setSent(true)} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Send Reset Link</button>
          <a href="#" className="text-center text-sm text-primary hover:underline">Back to sign in</a>
        </div>
      )}
    </div>
  );
}

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border bg-background p-6 shadow-sm">
      <div className="text-center mb-6"><div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"><User className="w-6 h-6 text-primary" /></div><h2 className="text-lg font-semibold text-foreground">Create Account</h2><p className="text-sm text-muted-foreground">Get started for free</p></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> <input className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="John Doe" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> <input className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> <input className="w-full pl-9 pr-10 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-ring" type={showPassword ? "text" : "password"} placeholder="Create a password" /> <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
          <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
        </div>
        <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Create Account</button>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <a href="#" className="text-primary hover:underline">Sign in</a></p>
      </div>
    </div>
  );
}

export default function LoginCardPage() {
  return (
    <ComponentDocPage name="Login Card" category="Forms" description="A login form card component with email/password fields, social login buttons, and validation states.">
      <PreviewPanel filename="login-card.tsx"><LoginForm /></PreviewPanel>
      <SourceCodeViewer source={LOGIN_CARD_SOURCE} filename="components/ui/LoginCard/LoginCard.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Social Login" description="Sign in with Google, GitHub, or Twitter." code={`<LoginCard socialProviders={["google", "github", "twitter"]} />`}><SocialLogin /></ExampleBlock>
        <ExampleBlock title="Magic Link" description="Passwordless email sign-in flow." code={`<LoginCard mode="magic-link" />`}><MagicLink /></ExampleBlock>
        <ExampleBlock title="Two-Factor" description="6-digit authenticator code verification." code={`<LoginCard twoFactor />`}><TwoFactor /></ExampleBlock>
        <ExampleBlock title="Remember Me" description="Session persistence option with forgot-password link." code={`<LoginCard rememberMe />`}><RememberMe /></ExampleBlock>
        <ExampleBlock title="Forgot Password" description="Email-based password reset flow." code={`<LoginCard mode="forgot-password" />`}><ForgotPassword /></ExampleBlock>
        <ExampleBlock title="Signup" description="Create-account form with validation hint." code={`<LoginCard mode="signup" />`}><SignupForm /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}