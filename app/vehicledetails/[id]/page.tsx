// app/vehicledetails/[id]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import VehicleDetailsData from "@/components/features/vehicledetails/VehicleDetailsData";
import VehicleDetailsSkeleton from "@/components/features/vehicledetails/VehicleDetailsSkeletons";
import type { VehicleDetailsSearchParams } from "@/types/vehicleDetails.types";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Partial<VehicleDetailsSearchParams>>;
}

export default async function VehicleDetailsPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const { location_id, location_name, pickup, dropoff, city_id } =
    resolvedSearchParams;

  // Required-param check stays here, synchronous and fetch-free —
  // no reason to delay a 404 behind Suspense when we already know
  // from the URL alone that the page can't render.
  if (!location_id || !location_name || !pickup || !dropoff || !city_id)
    notFound();

  return (
    <Suspense fallback={<VehicleDetailsSkeleton />}>
      {/*
        VehicleDetailsData is an async server component that awaits
        getVehicleDetailsApi and calls notFound() if the vehicle isn't
        found. That slow fetch + its dependent notFound() branch now
        streams under this boundary instead of blocking the whole
        route — the skeleton paints immediately, the real content
        swaps in once the fetch resolves.
      */}
      <VehicleDetailsData id={id} searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
