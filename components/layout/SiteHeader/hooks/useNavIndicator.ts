"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { NavIndicatorStyle } from "../types/header.types";

export function useNavIndicator() {
  const [indicator, setIndicator] = useState<NavIndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const registerItem = useCallback((key: string, element: HTMLAnchorElement | null) => {
    if (element) {
      itemRefs.current.set(key, element);
    } else {
      itemRefs.current.delete(key);
    }
  }, []);

  const updateIndicator = useCallback((key: string) => {
    const nav = navRef.current;
    const item = itemRefs.current.get(key);

    if (!nav || !item) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setIndicator({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  }, []);

  const hideIndicator = useCallback(() => {
    setIndicator((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseLeave = () => hideIndicator();
    nav.addEventListener("mouseleave", handleMouseLeave);
    return () => nav.removeEventListener("mouseleave", handleMouseLeave);
  }, [hideIndicator]);

  return {
    navRef,
    indicator,
    registerItem,
    updateIndicator,
    hideIndicator,
  };
}
