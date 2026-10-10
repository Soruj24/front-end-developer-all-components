import { ApiError } from "@/lib/api/api-errors";
import { withLatency } from "@/lib/api/api-mock";

/** Demo session returned by the mock auth API. Token is fake by design. */
export interface MockSession {
  token: string;
  user: { id: string; name: string; email: string };
}

export interface SignInInput {
  email: string;
  password: string;
}

/**
 * Clearly-labeled demo account. Mock only — accepts exactly these
 * credentials so success and failure paths are both demonstrable.
 */
export const DEMO_CREDENTIALS = {
  email: "ada@example.dev",
  password: "demo-password-123",
} as const;

const DEMO_SESSION: MockSession = {
  token: "DEMO.eyJzdWIiOiJ1c2VyXzQyIn0.mock-signature",
  user: { id: "user_42", name: "Ada Lovelace", email: DEMO_CREDENTIALS.email },
};

/**
 * Mock sign-in: validates against the demo account after a short delay.
 * Wrong credentials reject with a 401 ApiError (user-safe message).
 * Accepts an AbortSignal so unmounted/duplicate submits can cancel.
 */
export async function mockSignIn(input: SignInInput, signal?: AbortSignal): Promise<MockSession> {
  await withLatency(700, signal);
  const emailOk = input.email.trim().toLowerCase() === DEMO_CREDENTIALS.email;
  const passwordOk = input.password === DEMO_CREDENTIALS.password;
  if (!emailOk || !passwordOk) {
    throw new ApiError("http", "Incorrect email or password. Hint: use the demo account shown below.", 401);
  }
  return DEMO_SESSION;
}

/** Mock password-reset request: always "succeeds" after a delay (demo). */
export async function mockRequestPasswordReset(email: string, signal?: AbortSignal): Promise<{ sentTo: string }> {
  await withLatency(500, signal);
  const target = email.trim() || DEMO_CREDENTIALS.email;
  return { sentTo: target };
}
