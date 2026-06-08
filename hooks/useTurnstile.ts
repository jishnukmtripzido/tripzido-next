// hooks/useTurnstile.ts
"use client";

import { useState, useEffect, useRef } from "react";

export function useTurnstile(isActive: boolean) {
  const [token, setToken] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const widgetId = useRef<string | null>(null);

  const updateToken = (t: string | null) => {
    tokenRef.current = t;
    setToken(t);
  };

  // mount when active
  useEffect(() => {
    if (!isActive) return;

    const mount = () => {
      const container = document.getElementById("cf-turnstile-container");
      if (!container || !window.turnstile || widgetId.current) return;

      container.innerHTML = "";
      widgetId.current = window.turnstile.render(container, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
        callback: (t: string) => updateToken(t),
        "expired-callback": () => updateToken(null),
        "error-callback": () => updateToken(null),
        theme: "light",
        size: "normal",
      });
    };

    const timer = setTimeout(mount, 300);
    return () => clearTimeout(timer);
  }, [isActive]);

  // cleanup when inactive
  useEffect(() => {
    if (!isActive) {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
      updateToken(null);
    }
  }, [isActive]);

  const reset = () => {
    updateToken(null);
    if (window.turnstile && widgetId.current) {
      window.turnstile.reset(widgetId.current);
    }
  };

  return { token, tokenRef, reset };
}
