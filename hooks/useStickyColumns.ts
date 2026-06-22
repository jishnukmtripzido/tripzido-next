// hooks/useStickyColumns.ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to a sentinel element (placed just above the
 * two-column layout). When that sentinel scrolls off the top of the
 * viewport the hook returns `true`, telling the layout to switch into
 * "sticky columns" mode where sidebar and grid scroll independently.
 */
export function useStickyColumns() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // sentinel has left the top of the viewport → activate sticky mode
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        // Fire as soon as the sentinel's top edge crosses the viewport top
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { sentinelRef, isSticky };
}
