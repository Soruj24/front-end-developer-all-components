import * as React from "react";

export function useTooltipState(initial: boolean = false) {
  return React.useState(initial);
}

export function useTooltipDelay(
  openDelay: number,
  closeDelay: number,
  onOpen: () => void,
  onClose: () => void,
) {
  const openTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const scheduleOpen = React.useCallback(() => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(onOpen, openDelay);
  }, [openDelay, onOpen]);

  const scheduleClose = React.useCallback(() => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(onClose, closeDelay);
  }, [closeDelay, onClose]);

  return { scheduleOpen, scheduleClose };
}
