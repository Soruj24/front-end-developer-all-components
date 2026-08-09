"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { AlertDialogProps } from "./AlertDialog.types";
import { ALERT_DIALOG_STYLES } from "./AlertDialog.constants";

export function AlertDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  icon,
  children,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmVariant = "default",
  onCancel,
  onConfirm,
  disabled = false,
  trigger,
}: AlertDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open! : internalOpen;

  const handleConfirm = () => {
    onConfirm?.();
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleCancel();
  };

  if (trigger) {
    return (
      <div>
        <div
          onClick={() => {
            if (!isControlled) setInternalOpen(true);
            onOpenChange?.(true);
          }}
          className="inline-block cursor-pointer"
        >
          {trigger}
        </div>
        {renderDialog(
          isOpen,
          title,
          description,
          icon,
          children,
          cancelText,
          confirmText,
          confirmVariant,
          handleCancel,
          handleConfirm,
          handleKeyDown,
          disabled,
        )}
      </div>
    );
  }

  return renderDialog(
    isOpen,
    title,
    description,
    icon,
    children,
    cancelText,
    confirmText,
    confirmVariant,
    handleCancel,
    handleConfirm,
    handleKeyDown,
    disabled,
  );
}

function renderDialog(
  isOpen: boolean,
  title: React.ReactNode,
  description: React.ReactNode | undefined,
  icon: React.ReactNode | undefined,
  children: React.ReactNode | undefined,
  cancelText: string,
  confirmText: string,
  confirmVariant: "default" | "destructive",
  handleCancel: () => void,
  handleConfirm: () => void,
  handleKeyDown: (e: React.KeyboardEvent) => void,
  disabled: boolean,
) {
  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-desc"
      onKeyDown={handleKeyDown}
    >
      <div
        data-state="open"
        className={ALERT_DIALOG_STYLES.overlay}
        onClick={handleCancel}
      />
      <div data-state="open" className={ALERT_DIALOG_STYLES.content}>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          {icon && (
            <div className="flex justify-center sm:justify-start">
              {icon}
            </div>
          )}
          <h2 id="alert-dialog-title" className={ALERT_DIALOG_STYLES.title}>
            {title}
          </h2>
          {description && (
            <p id="alert-dialog-desc" className={ALERT_DIALOG_STYLES.description}>
              {description}
            </p>
          )}
        </div>
        {children}
        <div className={ALERT_DIALOG_STYLES.actions}>
          <button
            type="button"
            onClick={handleCancel}
            className={ALERT_DIALOG_STYLES.cancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={disabled}
            className={cn(
              confirmVariant === "destructive"
                ? ALERT_DIALOG_STYLES.destructive
                : ALERT_DIALOG_STYLES.confirm,
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
