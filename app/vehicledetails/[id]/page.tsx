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
import type {
  VehicleDetailsSearchParams,
  VehicleDetailsResponse,
} from "@/types/vehicleDetails.types";
import { getVehicleDetailsApi } from "@/services/vehicleDetails.service";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Partial<VehicleDetailsSearchParams>>;
}

export default async function VehicleDetailsPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { location_id, location_name, pickup, dropoff, city_id, reviews_page } =
    await searchParams;

  if (!location_id || !location_name || !pickup || !dropoff || !city_id)
    notFound();

  const vehicle = await getVehicleDetailsApi({
    vehicle_id: id,
    location_id,
    location_name,
    pickup_datetime: pickup,
    dropoff_datetime: dropoff,
    city_id: city_id,
  }).catch(() => null);
  if (!vehicle) notFound();

  const bookingWidgetProps = {
    packages: vehicle.packages,
    fareDetails: vehicle.fare_details,
    payAtPickupEnabled: vehicle.pay_at_pickup_enabled,
    pickup,
    dropoff,
    vehicleId: Number(id),
    locationId: Number(location_id),
  };

  return (
    <>
      <SearchModifyBar
        locationName={location_name}
        pickup={pickup}
        dropoff={dropoff}
        cityId={Number(city_id ?? 0)}
      />
      <div className="min-h-screen">
        <main className="xl:mx-[80.5px] mx-auto px-4 xl:px-0 pb-4 md:py-4  xl:py-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-5 order-1 lg:order-none">
            <Breadcrumbs
              locationName={location_name}
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
              pickupLocationName={location_name}
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
      </div>
    </>
  );
}
