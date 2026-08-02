export interface AuthFormState {
  errors?: Record<string, string[]>;
  field?: { name?: string; username?: string; email?: string };
  message?: string;
}