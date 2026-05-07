"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface A11yContextValue {
  enabled: boolean;
  toggle: () => void;
}

const A11yContext = createContext<A11yContextValue>({
  enabled: false,
  toggle: () => {},
});

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnabled(localStorage.getItem("a11y") === "1");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (enabled) {
      html.setAttribute("data-a11y-text", "large");
      html.setAttribute("data-a11y-contrast", "high");
      html.setAttribute("data-a11y-font", "dyslexia");
      html.setAttribute("data-a11y-motion", "reduced");
    } else {
      ["data-a11y-text", "data-a11y-contrast", "data-a11y-font", "data-a11y-motion"].forEach(
        (attr) => html.removeAttribute(attr)
      );
    }
    localStorage.setItem("a11y", enabled ? "1" : "0");
  }, [enabled, mounted]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return (
    <A11yContext.Provider value={{ enabled, toggle }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(A11yContext);
}
