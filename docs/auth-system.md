# Component Registry — Authentication System

**Platform:** AI Component Registry (1000+ components, 500+ blocks, 300+ templates)
**Design language:** premium, developer-first, original — informed by the *principles* of GitHub, Vercel, Linear, Notion, and Supabase (no UI copied)
**Stack:** Next.js 16 (App Router) · React 19 · Auth.js v5 (`next-auth@beta`) · MongoDB (Mongoose) · TypeScript · Tailwind v4
**Status:** Phase 1 foundation implemented — see §10.

---

## 1. Design

### 1.1 Product principles

1. **Anonymous by default.** Browsing, reading, searching, previewing, and copying are zero-friction. Auth is an upgrade, never a toll booth.
2. **Progressive sign-in.** Start with email + password. OAuth, magic link, and passkeys layer on without changing the mental model.
3. **Developer-first tone.** Copy is precise, calm, and direct — no marketing fluff on auth screens. Errors state the fix, not the problem.
4. **One identity, many roles.** A single account scales from Member → Creator → Moderator → Admin → Super Admin. Role is a property, not a product.
5. **Security that shows.** 2FA, sessions, and login history are *visible surfaces* in the account UI, not hidden config — this builds trust.

### 1.2 Visual language

- **Surfaces:** transparent glass (`bg-background/60` + `backdrop-blur`) over a soft radial gradient; elevation via `border` + one faint shadow, never heavy cards.
- **Typography:** Geist Sans / Geist Mono. Big relaxed headings (`tracking-tight`), mono for tokens/codes/identifiers.
- **Color:** OKLCH tokens from the platform design system (`--primary`, `--background`, `--foreground`, `--muted`, `--border`). Success = green, danger = red, brand = primary. No decorative gradients on forms.
- **Motion:** fast and restrained — `cubic-bezier(0.16,1,0.3,1)`, `active:scale-[0.98]`, loading spinners only for real work. Respect `prefers-reduced-motion`.
- **Signature motif:** the split auth frame (brand canvas left, form right) with the platform monogram `CL` as the recurring identity mark.

### 1.3 Auth screens

| Screen | Route | Purpose |
|---|---|---|
| Login | `/login` | email/password, OAuth, magic link, passkey |
| Register | `/register` | name/email/password + terms |
| Verify email | `/verify-email?token=` | confirm ownership of address |
| Forgot password | `/forgot-password` | request reset link |
| Reset password | `/reset-password?token=` | set new password |
| Account | `/account/*` | profile, security, sessions, history, dashboard |

### 1.4 Interaction details

- Password fields: visibility toggle, strength meter on register (letter + number + 8 chars).
- Buttons: primary submits full-width on mobile, fixed width on desktop; OAuth buttons are secondary with brand glyphs.
- Errors: inline per-field text under the input, plus a single alert banner for form-level failures (rate limit, invalid credentials).
- The login screen is never multi-page: OAuth/social sits below the divider, magic link and passkey are inline secondary options.

---

## 2. Authentication Flow

### 2.1 Public vs. authenticated surface

```
PUBLIC (no account)                AUTHENTICATED (account required)
─────────────────────              ─────────────────────────────────
Browse components                  Publish / edit / delete components
Read documentation                AI Component Generator
Search                             Visual Component Builder
Live previews                      Playground save
Copy component code               Bookmarks · Collections · Comments
Read API documentation            Likes · Follow creators
                                   Creator Dashboard · Admin Panel
                                   API keys · CLI login · Registry publishing
```

### 2.2 Register (email + password)

```
[Register form] → validate (zod) → duplicate email? ──► inline error
        │
        ▼
create User (role: member, emailVerified: false, bcrypt hash)
        │
        ▼
issue verification token (HMAC) → send "Verify your email" mail
        │
        ▼
sign in (JWT) → redirect /account
        │
        ▼
/account shows "Confirm your email" banner until verified
```

### 2.3 Login

```
[Login form] → rate-limit (email+ip) ──► 429 → "Too many attempts, retry in Ns"
        │
        ▼
validate credentials (bcrypt compare)
        │
        ├─ fail ─► "Invalid email or password." (generic, no enumeration) → record LoginEvent(status: failed)
        ▼ success
write LoginEvent(success) · create AccountSession(device) · update lastLoginAt
        │
        ▼
JWT issued → redirect /account
```

### 2.4 Email verification

```
Email link: /verify-email?token=…  → verifyEmail(token)
        │
        ├─ valid + unexpired ─► emailVerified = true, clear token → success panel
        ├─ expired ─► resend flow (new token, old invalidated)
        └─ invalid ─► error panel + "Resend" form
```

### 2.5 Forgot / reset password

```
[Forgot form] → always "If that address exists, a reset link is on its way."
        │
        ▼
issue reset token (HMAC, 30 min TTL) → send mail
        │
[Reset form?token=…] → validate token → new password (zod) → re-hash → sign in
```

### 2.6 Planned (Phase 2+)

- **Magic link:** `POST /auth/magic` issues a short-lived single-use token emailed to the user → `/auth/callback` exchanges it for a session. Reuses the verification-token machinery.
- **Passkeys (WebAuthn):** credential ID + public key stored per user; challenge/response through the auth route; transport via `navigator.credentials`.
- **OAuth (Google / GitHub / Microsoft / GitLab):** Auth.js providers with `AUTH_<PROVIDER>_ID/SECRET`; account linking on first sign-in; `LoginEvent(method: oauth)`.
- **2FA (TOTP):** `twoFactorSecret` + `recoveryCodes` already on the User schema; the login flow adds a second "Enter your code" step before the JWT is issued.

---

## 3. Database Schema (MongoDB / Mongoose)

### 3.1 `users`

```
_id                 ObjectId
name                String        required
email               String        required · unique · lowercase
passwordHash        String        required (bcrypt, cost 12)
avatarUrl           String        optional
role                String        enum[guest,member,creator,moderator,admin,super_admin] · default member
status              String        enum[active,suspended,deleted] · default active

emailVerified               Boolean  default false
emailVerificationTokenHash  String   optional (HMAC)
emailVerificationExpiresAt  Date     optional

resetPasswordTokenHash      String   optional (HMAC)
resetPasswordExpiresAt      Date     optional

twoFactorEnabled   Boolean  default false
twoFactorSecret    String   optional (encrypted TOTP secret)
recoveryCodes      String[] optional

lastLoginAt        Date     optional
lastLoginIp        String   optional
createdAt / updatedAt       timestamps
```

### 3.2 `accountSessions` (device management / refresh-token-ready)

```
_id         ObjectId
userId      ObjectId → users  · index
tokenHash   String   unique · HMAC of opaque refresh token
ip          String
userAgent   String
device      String   (parsed: "macOS · Chrome")
createdAt   Date
lastSeenAt  Date
expiresAt   Date      (TTL index)
revokedAt   Date      optional
```

### 3.3 `loginEvents` (login history / audit)

```
_id         ObjectId
userId      ObjectId → users  · index
ip          String
userAgent   String
method      String   enum[credentials,google,github,microsoft,gitlab,magic,passkey]
status      String   enum[success,failed]
createdAt   Date     (TTL 90 days)
```

Indexes: `{ userId: 1, createdAt: -1 }` for history listing; `{ expiresAt: 1 }` TTL on sessions.

---

## 4. API Endpoints

Auth.js owns the `[...nextauth]` catch-all; product endpoints are server actions or route handlers as marked.

```
/auth/[...nextauth]            handlers (signin, callback, signout, session, csrf)
/auth/magic          POST      request magic link                       [Phase 2]
/auth/callback       GET       consume magic link                       [Phase 2]
/auth/webauthn/options POST    passkey registration/assertion options   [Phase 2]
/auth/webauthn/verify POST     passkey credential verify                [Phase 2]

/account            GET        overview (stats + quick links)          server action + query
/account/profile    PATCH      update name/avatar
/account/security   PATCH      change password, manage 2FA             [Phase 2 for 2FA]
/account/sessions   GET/DELETE list & revoke devices
/account/history    GET        paginated login history
/account/api-keys   CRUD       scoped API keys                         [Phase 2]
/account/collections CRUD      collections of components               [Phase 2]
```

**Error contract:** actions return `{ errors?: Record<string,string[]>, message?, field? }`; HTTP routes return `{ error: { code, message, details? } }`. Auth failures never reveal whether an email exists.

---

## 5. UI Wireframes

### 5.1 Split auth frame (login)

```
┌─────────────────────────────────────────────┬───────────────────────────────┐
│  ◆ CL   Component Library                   │   Welcome back               │
│                                             │   Sign in to continue.       │
│  Build faster with a library                │                               │
│  that scales with you.                      │   ┌────────────────────────┐ │
│                                             │   │ Email    you@example… │ │
│  ✓ Curated components                       │   └────────────────────────┘ │
│  ✓ Copy-paste friendly                      │   Password      [Forgot?]   │
│  ✓ Always current                           │   ┌────────────────────────┐ │
│                                             │   │ ••••••••               │ │
│  (gradient canvas, hidden < lg)             │   └────────────────────────┘ │
│                                             │   [ ⚠ Invalid credentials. ] │
│                                             │   [      Sign in        → ]  │
│                                             │   ── or continue with ──     │
│                                             │   [Google][GitHub][MS][GitLab]│
│                                             │   Magic link · Passkey       │
│                                             │   Don't have an account?     │
│                                             │   Create one                 │
└─────────────────────────────────────────────┴───────────────────────────────┘
```

### 5.2 Verify email

```
┌──────────────────────────────┐
│          [ ✓ mail icon ]     │
│   Confirm your email         │
│   We sent a link to you@….   │
│   ┌────────────────────────┐ │
│   │  Verify email address  │ │
│   └────────────────────────┘ │
│   Didn't get it? Resend in 30s│
│   ← Back to login            │
└──────────────────────────────┘
```

### 5.3 Account shell (sidebar + content)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ CL · Component Library                 ◆ search     🔔  ◐  [ Avatar ▾ ] │
├──────────┬───────────────────────────────────────────────────────────────┤
│ ◆ Overview│  Overview                                                    │
│ 👤 Profile│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                        │
│ 🔒 Security│ │Downloads││Likes ││Collections││ Followers│  KPI cards     │
│ 💻 Sessions│  └──────┘ └──────┘ └──────┘ └──────┘                        │
│ 🕑 History │  Quick links: My Components · Bookmarks · API Keys          │
│ ──────────│  Verify-email banner (dismissible, if unverified)            │
│ 📦 My Comps│                                                                │
│ 🗂 Collections                                                     │
│ ⭐ Bookmarks│   (role badge: Member · Creator · Admin)                   │
│ ⬇ Downloads│                                                               │
│ 🔑 API Keys│                                                               │
│ ⚙ Settings│                                                               │
│ 🔔 Notifications│                                                             │
│ 🔗 Connected│                                                               │
└──────────┴───────────────────────────────────────────────────────────────┘
```

### 5.4 Security page

```
Security
┌────────────────────────────────────────┐
│ Email verification        [Confirmed ✓]│
│ ────────────────────────────────────── │
│ Password                              │
│ •••••••••••  [Change password]        │
│ ────────────────────────────────────── │
│ Two-factor authentication   [Enable]  │  → "Available in Phase 2"
│ ────────────────────────────────────── │
│ Active sessions (2)        [View all] │
│ ────────────────────────────────────── │
│ Login history (recent 5)   [View all] │
└────────────────────────────────────────┘
```

---

## 6. Folder Structure

```
features/auth/
├── index.ts                      public barrel
├── actions.ts                    login · register · logout            (implemented)
├── actions/
│   ├── verify.ts                 verifyEmail · resendVerification     (implemented)
│   ├── password.ts               forgotPassword · resetPassword       (implemented)
│   └── account.ts                updateProfile · revokeSession        (implemented)
├── schemas/
│   ├── index.ts                  login · register                     (implemented)
│   ├── verify.ts                 verify + resend                      (implemented)
│   └── password.ts               forgot + reset                       (implemented)
├── types/
│   ├── next-auth.d.ts            session/JWT augmentation             (implemented)
│   └── role.ts                   Role · PermissionKey                 (implemented)
├── constants/
│   └── roles.ts                  role rank + permissions matrix       (implemented)
├── server/
│   ├── auth.ts                   NextAuth init (events, callbacks)    (implemented)
│   ├── config.ts                 edge-safe authConfig (proxy)         (implemented)
│   ├── db.ts                     mongoose connect                     (implemented)
│   ├── models.ts                 users · accountSessions · loginEvents(implemented)
│   ├── service.ts                query/mutation data layer            (implemented)
│   ├── password.ts               bcrypt hash/verify                   (implemented)
│   ├── tokens.ts                 HMAC tokens + expiry                 (implemented)
│   ├── mail.ts                   mailer interface (console dev)       (implemented)
│   ├── rate-limit.ts             fixed-window limiter                 (implemented)
│   └── roles.ts                  hasRole() · requireRole()            (implemented)
├── components/
│   ├── AuthShell.tsx             split auth frame                     (implemented)
│   ├── LoginForm.tsx / RegisterForm.tsx                               (implemented)
│   ├── ForgotPasswordForm.tsx / ResetPasswordForm.tsx                 (implemented)
│   ├── ResendVerificationForm.tsx                                     (implemented)
│   └── account/
│       ├── AccountShell.tsx      sidebar + topbar                     (implemented)
│       ├── AccountNav.tsx        nav with active state                (implemented)
│       ├── VerifyBanner.tsx      dismissible verify CTA               (implemented)
│       ├── SectionPanel.tsx      shared content frame                 (implemented)
│       └── PlaceholderPanel.tsx  "coming in Phase 2" panel            (implemented)

app/(auth)/                      login · register · verify-email · forgot-password · reset-password
app/(account)/                   account shell + profile · security · sessions · history · placeholders
proxy.ts                         route protection                      (implemented)
```

---

## 7. Roles & Permissions Matrix

```
Role          Browse  Comment  Publish  Edit/Delete own  Moderate  Manage users  Manage platform
──────        ──────  ───────  ───────  ───────────────  ────────  ────────────  ──────────────
Guest         ✓       –        –        –                –         –             –
Member        ✓       ✓        –        –                –         –             –
Creator       ✓       ✓        ✓        ✓                –         –             –
Moderator     ✓       ✓        ✓        ✓                ✓         –             –
Admin         ✓       ✓        ✓        ✓                ✓         ✓             –
Super Admin   ✓       ✓        ✓        ✓                ✓         ✓             ✓
```

Permission keys (`features/auth/constants/roles.ts`): `comment`, `publish`, `edit_own`, `delete_own`, `moderate`, `manage_users`, `manage_platform`, `manage_registry`, `use_ai_tools`, `manage_api_keys`.

---

## 8. Security Model

- **Passwords:** bcrypt cost 12; never stored in plaintext; verified constant-time via `bcrypt.compare`.
- **Tokens:** 32-byte random, stored as HMAC-SHA256 hashes; TTLs enforced on consume (verification 24 h, reset 30 min).
- **Sessions:** JWT (Auth.js) with 30-day max age for the active cookie; opaque device-session rows for management; session JWT revalidated server-side with `auth()`.
- **Rate limiting:** fixed-window limiter (60 s window) on login (email+ip), register (ip), forgot-password (email+ip). Swappable for Redis at scale.
- **Enumeration resistance:** login and forgot-password return identical messages regardless of whether the account exists.
- **Brute-force:** account lockout after N failures (login limiter) + optional 2FA (Phase 2).
- **Cookies:** `httpOnly`, `sameSite:lax`, `secure` in production, `path:/`.

---

## 9. API Contract Notes

- Server actions accept `(prevState, formData)` and return `{ errors?, field?, message? }` for `useActionState` — no full-page reloads.
- All mutations re-check authorization server-side; UI gating is cosmetic only.
- `auth()` (server) is the only session read path in server components; the proxy only does optimistic cookie checks.
- New sign-in records one `loginEvent` and one `accountSession` (device) per successful authentication.

---

## 10. Production-Ready Implementation Plan

### Phase 0 — Foundations ✅ *implemented*
Auth.js v5 + Credentials, JWT sessions, bcrypt, MongoDB `users`, `/login` `/register` with split auth frame, `proxy.ts` protection, type augmentation, header sign-in link.

### Phase 1 — Account foundation ✅ *implemented*
Role model + permissions matrix; email verification (tokens + mailer + `/verify-email`); forgot/reset password (`/forgot-password`, `/reset-password`); `accountSessions` + `loginEvents` models with sign-in recording; rate limiting on auth actions; account shell (`/account`) with overview, profile, security, sessions, history, and placeholder sections.

### Phase 2 — Identity providers & 2FA  [~2 weeks]
- OAuth: Google, GitHub, Microsoft, GitLab via Auth.js providers; account linking; `LoginEvent(method)`.
- Magic link + Passkeys (WebAuthn) endpoints.
- TOTP 2FA: enable/verify/recovery-codes UI; two-step login flow; enforce on sensitive routes.
- Refresh tokens: rotate `accountSessions` tokens with the JWT; device revocation actually kills sessions.

### Phase 3 — Creator & platform surfaces  [~3 weeks]
- Creator dashboard (my components/collections/analytics); publish/edit/delete gating via permission matrix.
- Bookmarks, collections, comments, likes, follows as collections with role checks.
- API keys (scoped, hashed, list/rotate/revoke) and CLI login flow.

### Phase 4 — Admin & hardening  [~2 weeks]
- Admin panel user management (roles, suspension, impersonation-safe audit), role matrix UI.
- Redis rate limiting, session revocation broadcast, audit log export, Playwright e2e across auth flows, accessibility + Lighthouse gates.

### Definition of done (per feature)
Server-side authorization ✓ · rate-limited ✓ · enumerated-safe ✓ · dark mode ✓ · keyboard navigable ✓ · lint/tsc/build clean ✓ · e2e covered (Phase 4) ✓.

---

## Appendix — Auth screen copy

| Context | Copy |
|---|---|
| Login title | "Welcome back" |
| Register title | "Create your account" |
| Verify banner | "Confirm your email to unlock publishing." |
| Invalid credentials | "Invalid email or password." |
| Forgot sent | "If that address exists, a reset link is on its way." |
| Rate limited | "Too many attempts. Try again in 0:32." |
