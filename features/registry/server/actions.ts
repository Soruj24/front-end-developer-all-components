"use server";

import { isAuthenticated } from "./auth";
import { componentInputSchema, setStatusActionSchema, firstIssue } from "./validation";
import {
  createComponent,
  updateComponent,
  deleteComponent,
  duplicateComponent,
  setPublishStatus,
  getAdminComponentRows,
  type AdminComponentInput,
  type AdminComponentRow,
  type SetStatusAction,
} from "./service";

export type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

async function guard(): Promise<boolean> {
  return isAuthenticated();
}

function message(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export async function createComponentAction(
  input: AdminComponentInput
): Promise<ActionResult<AdminComponentRow>> {
  if (!(await guard())) return { ok: false, error: "Unauthorized." };
  const parsed = componentInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  try {
    const row = await createComponent(parsed.data);
    return { ok: true, data: row };
  } catch (error) {
    return { ok: false, error: message(error, "Failed to create component.") };
  }
}

export async function updateComponentAction(
  id: string,
  patch: AdminComponentInput
): Promise<ActionResult<AdminComponentRow>> {
  if (!(await guard())) return { ok: false, error: "Unauthorized." };
  const parsed = componentInputSchema.safeParse(patch);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  try {
    const row = await updateComponent(id, parsed.data);
    return { ok: true, data: row };
  } catch (error) {
    return { ok: false, error: message(error, "Failed to update component.") };
  }
}

export async function deleteComponentAction(id: string): Promise<ActionResult> {
  if (!(await guard())) return { ok: false, error: "Unauthorized." };
  try {
    await deleteComponent(id);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: message(error, "Failed to delete component.") };
  }
}

export async function duplicateComponentAction(slug: string): Promise<ActionResult<AdminComponentRow>> {
  if (!(await guard())) return { ok: false, error: "Unauthorized." };
  try {
    const row = await duplicateComponent(slug);
    return { ok: true, data: row };
  } catch (error) {
    return { ok: false, error: message(error, "Failed to duplicate component.") };
  }
}

export async function setPublishStatusAction(
  id: string,
  action: SetStatusAction
): Promise<ActionResult<AdminComponentRow>> {
  if (!(await guard())) return { ok: false, error: "Unauthorized." };
  const parsed = setStatusActionSchema.safeParse(action);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };
  try {
    await setPublishStatus(id, parsed.data);
    const rows = await getAdminComponentRows();
    const row = rows.find((r) => r.id === id);
    return row ? { ok: true, data: row } : { ok: true };
  } catch (error) {
    return { ok: false, error: message(error, "Failed to update status.") };
  }
}

export async function refreshRowsAction(): Promise<ActionResult<AdminComponentRow[]>> {
  if (!(await guard())) return { ok: false, error: "Unauthorized." };
  try {
    const rows = await getAdminComponentRows();
    return { ok: true, data: rows };
  } catch (error) {
    return { ok: false, error: message(error, "Failed to load components.") };
  }
}
