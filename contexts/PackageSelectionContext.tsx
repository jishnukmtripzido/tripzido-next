"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { VehiclePackage } from "@/types/vehicleDetails.types";

interface PackageSelectionContextValue {
  packages: VehiclePackage[];
  selectedPackageId: number;
  setSelectedPackageId: (id: number) => void;
  selectedPackage: VehiclePackage | undefined;
}

const PackageSelectionContext =
  createContext<PackageSelectionContextValue | null>(null);

interface ProviderProps {
  packages: VehiclePackage[];
  defaultPackageId?: number | null;
  children: ReactNode;
}

export function PackageSelectionProvider({
  packages,
  defaultPackageId,
  children,
}: ProviderProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<number>(
    defaultPackageId ?? packages[0]?.id ?? 0,
  );
  const selectedPackage = packages.find((p) => p.id === selectedPackageId);

  return (
    <PackageSelectionContext.Provider
      value={{
        packages,
        selectedPackageId,
        setSelectedPackageId,
        selectedPackage,
      }}
    >
      {children}
    </PackageSelectionContext.Provider>
  );
}

export function useSelectedPackage() {
  const ctx = useContext(PackageSelectionContext);
  if (!ctx) {
    throw new Error(
      "useSelectedPackage must be used within a PackageSelectionProvider",
    );
  }
  return ctx;
}
