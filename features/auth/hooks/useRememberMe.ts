import { useCallback, useSyncExternalStore } from "react";

const EMAIL_KEY = "cl-remember-email";
const REMEMBER_KEY = "cl-remember";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function persistRemembered(email: string, remember: boolean) {
  try {
    if (remember && email) localStorage.setItem(EMAIL_KEY, email);
    else localStorage.removeItem(EMAIL_KEY);
    localStorage.setItem(REMEMBER_KEY, remember ? "1" : "0");
  } catch {
    // ignore
  }
  notify();
}

export function useRememberMe() {
  const email = useSyncExternalStore(
    subscribe,
    () => read(EMAIL_KEY) ?? "",
    () => ""
  );
  const remember = useSyncExternalStore(
    subscribe,
    () => read(REMEMBER_KEY) === "1",
    () => false
  );
  const persist = useCallback(
    (email: string, remember: boolean) => persistRemembered(email, remember),
    []
  );

  return { email, remember, persist };
}
