"use client";

import { createContext, useContext } from "react";

export type DrawerMode = "filter" | "sort" | null;

interface DrawerModeContextValue {
  drawerMode: DrawerMode;
  setDrawerMode: (mode: DrawerMode) => void;
}

/**
 * Bridges drawer-open state (owned by SearchResultsShell, since the
 * Filter/Sort trigger buttons are static chrome that renders before
 * vehicle data arrives) to MobileFilterDrawer's actual content (owned
 * by SearchResultsClient, since filters/options come from
 * useVehicleFilters(bikes) which only exists once vehicles resolve).
 *
 * Without this, drawerMode would have to be prop-drilled across the
 * Suspense boundary in page.tsx, which Suspense boundaries don't
 * support cleanly for client state — context is the right tool here.
 */
const DrawerModeContext = createContext<DrawerModeContextValue | null>(null);

export function DrawerModeProvider({
  value,
  children,
}: {
  value: DrawerModeContextValue;
  children: React.ReactNode;
}) {
  return (
    <DrawerModeContext.Provider value={value}>
      {children}
    </DrawerModeContext.Provider>
  );
}

export function useDrawerMode() {
  const ctx = useContext(DrawerModeContext);
  if (!ctx) {
    throw new Error(
      "useDrawerMode must be used within a DrawerModeProvider (rendered by SearchResultsShell)",
    );
  }
  return ctx;
}
