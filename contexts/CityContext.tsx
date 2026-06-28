"use client";

import { createContext, useContext, useState } from "react";
import type { City } from "@/types/locations.types";

interface CityContextValue {
  selectedCityId: number;
  selectedCityName: string;
  setSelectedCity: (city: City) => void;
}

const CityContext = createContext<CityContextValue | null>(null);

export function CityProvider({
  children,
  initialCityId,
  initialCityName,
}: {
  children: React.ReactNode;
  initialCityId: number;
  initialCityName: string;
}) {
  const [selectedCityId, setSelectedCityId] = useState(initialCityId);
  const [selectedCityName, setSelectedCityName] = useState(initialCityName);

  function setSelectedCity(city: City) {
    setSelectedCityId(city.id);
    setSelectedCityName(city.name);
  }

  return (
    <CityContext.Provider
      value={{ selectedCityId, selectedCityName, setSelectedCity }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCityContext() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error("useCityContext must be used within CityProvider");
  return ctx;
}
