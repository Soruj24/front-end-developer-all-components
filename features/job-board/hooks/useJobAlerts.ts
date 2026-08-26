import { useState, useCallback } from "react";
import type { JobAlert } from "../types";

export function useJobAlerts() {
  const [alerts, setAlerts] = useState<JobAlert[]>([
    {
      id: "alert-1",
      query: "Senior Frontend Engineer",
      location: "San Francisco, CA",
      types: ["Full-Time"],
      levels: ["Senior"],
      salaryMin: 150,
      salaryMax: 300,
      frequency: "daily",
      createdAt: "2026-08-01",
      active: true,
    },
    {
      id: "alert-2",
      query: "Product Designer",
      location: "",
      types: ["Full-Time", "Contract"],
      levels: ["Mid", "Senior"],
      salaryMin: 100,
      salaryMax: 200,
      frequency: "weekly",
      createdAt: "2026-07-15",
      active: true,
    },
  ]);

  const addAlert = useCallback((alert: Omit<JobAlert, "id" | "createdAt" | "active">) => {
    setAlerts((prev) => [
      {
        ...alert,
        id: `alert-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
        active: true,
      },
      ...prev,
    ]);
  }, []);

  const removeAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }, []);

  const toggleAlert = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, active: !a.active } : a))
    );
  }, []);

  const updateAlert = useCallback((alertId: string, updates: Partial<JobAlert>) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, ...updates } : a))
    );
  }, []);

  return {
    alerts,
    activeAlertCount: alerts.filter((a) => a.active).length,
    addAlert,
    removeAlert,
    toggleAlert,
    updateAlert,
  };
}
