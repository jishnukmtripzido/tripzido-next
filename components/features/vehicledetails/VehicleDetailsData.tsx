// components/features/vehicledetails/VehicleDetailsData.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import SearchModifyBar from "@/components/features/vehicledetails/SearchModifyBar";
import Breadcrumbs from "@/components/features/vehicledetails/Breadcrumbs";
import VehicleHeader from "@/components/features/vehicledetails/VehicleHeader";
import ThingsToRemember from "@/components/features/vehicledetails/ThingsToRemember";
import TermsAndConditions from "@/components/features/vehicledetails/TermsAndConditions";
import PickupLocation from "@/components/features/vehicledetails/PickupLocation";
import BookingWidget from "@/components/features/vehicledetails/BookingWidget";
import CancellationPolicy from "@/components/features/vehicledetails/CancellationPolicy";
import Reviews from "@/components/features/vehicledetails/Reviews";
import {
  CancellationPolicySkeleton,
  ReviewsSkeleton,
} from "@/components/features/vehicledetails/Skeletons";
import { PackageSelectionProvider } from "@/contexts/PackageSelectionContext";
import type { VehicleDetailsSearchParams } from "@/types/vehicleDetails.types";
import { getVehicleDetailsApi } from "@/services/vehicleDetails.service";

interface Props {
  id: string;
  searchParams: Partial<VehicleDetailsSearchParams>;
}

/**
 * Isolates the slow getVehicleDetailsApi await (and the notFound()
 * branch that depends on it) behind its own async server component,
 * so Suspense in page.tsx can stream a full skeleton immediately and
 * swap this in once the fetch resolves.
 *
 * Required-param validation (location_id, location_name, pickup,
 * dropoff, city_id) stays in page.tsx since that's a synchronous,
 * fetch-free check — no reason to delay it behind Suspense.
 *
 * Body below is unchanged from the original page.tsx — same
 * components, same props, same nested Cancellation/Reviews Suspense
 * boundaries.
 */
export default async function VehicleDetailsData({ id, searchParams }: Props) {
  const {
    location_id,
    location_name,
    pickup,
    dropoff,
    city_id,
    reviews_page,
    package_id,
  } = searchParams;

  // location_name/pickup/dropoff/city_id presence is already validated
  // in page.tsx before this component is even rendered, but
  // location_id/location_name are re-destructured here since
  // getVehicleDetailsApi needs them directly.
  const vehicle = await getVehicleDetailsApi({
    vehicle_id: id,
    location_id: location_id!,
    location_name: location_name!,
    pickup_datetime: pickup!,
    dropoff_datetime: dropoff!,
    city_id: city_id!,
    package_id,
  }).catch(() => null);

  if (!vehicle) notFound();

  const bookingWidgetProps = {
    fareDetails: vehicle.fare_details,
    payAtPickupEnabled: vehicle.pay_at_pickup_enabled,
    pickup: pickup!,
    dropoff: dropoff!,
    vehicleId: Number(id),
    locationId: Number(location_id),
    isAvailable: vehicle.is_available,
    availabilityMessage: vehicle.availability_message,
  };

  return (
    <>
      <SearchModifyBar
        locationName={location_name!}
        pickup={pickup!}
        dropoff={dropoff!}
        cityId={Number(city_id ?? 0)}
        vehicleTypeId={vehicle.vehicle_type_id}
      />
      <div className="min-h-screen">
        <PackageSelectionProvider
          packages={vehicle.packages}
          defaultPackageId={vehicle.selected_package_id}
        >
          <main className="xl:mx-[80.5px] mx-auto px-4 xl:px-0 pb-4 md:py-4 xl:py-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-5 order-1 lg:order-none">
              <Breadcrumbs
                locationName={location_name!}
                vehicleName={vehicle.name}
              />
              <VehicleHeader
                name={vehicle.name}
                makeYear={vehicle.make_year}
                images={vehicle.images}
                primaryImage={vehicle.primary_image}
                seats={vehicle.seats}
                fuelCapacityLitres={vehicle.fuel_capacity_litres}
                cc={vehicle.cc}
                kmLimitPerDay={vehicle.km_limit_per_day}
                topSpeedKmph={vehicle.top_speed_kmph}
                mileageKmpl={vehicle.mileage_kmpl}
                kerbWeightKg={vehicle.kerb_weight_kg}
                availableCount={vehicle.available_count}
                pickupLocationName={location_name!}
              />

              {/* Mobile booking widget */}
              <div className="block lg:hidden">
                <BookingWidget {...bookingWidgetProps} />
              </div>

              <ThingsToRemember policies={vehicle.policies} />
              <div className="lg:border-t lg:border-gray-200" />
              <TermsAndConditions terms={vehicle.terms_and_conditions} />
              <div className="lg:border-t lg:border-gray-200" />

              {/* Cancellation policy — streams in independently */}
              <Suspense fallback={<CancellationPolicySkeleton />}>
                <CancellationPolicy vehicleId={Number(id)} />
              </Suspense>

              <div className="lg:border-t lg:border-gray-200" />
              <PickupLocation location={vehicle.pickup_location} />

              {/* Reviews — streams in independently */}
              <Suspense fallback={<ReviewsSkeleton />}>
                <Reviews
                  vehicleId={Number(id)}
                  page={reviews_page ? Number(reviews_page) : 1}
                />
              </Suspense>
            </div>

            {/* Right Column — desktop sticky */}
            <div className="lg:col-span-4 relative hidden lg:block">
              <div className="sticky top-[40px]">
                <BookingWidget {...bookingWidgetProps} />
              </div>
            </div>
          </main>
        </PackageSelectionProvider>
      </div>
    </>
  );
}
