// import { notFound } from "next/navigation";
// import SearchModifyBar from "@/components/features/vehicledetails/SearchModifyBar";
// import Breadcrumbs from "@/components/features/vehicledetails/Breadcrumbs";
// import VehicleHeader from "@/components/features/vehicledetails/VehicleHeader";
// import ThingsToRemember from "@/components/features/vehicledetails/ThingsToRemember";
// import TermsAndConditions from "@/components/features/vehicledetails/TermsAndConditions";
// import PickupLocation from "@/components/features/vehicledetails/PickupLocation";
// import BookingWidget from "@/components/features/vehicledetails/BookingWidget";
// import type {
//   VehicleDetailsSearchParams,
//   VehicleDetailsResponse,
// } from "@/types/vehicleDetails.types";
// // import { getVehicleDetailsApi } from "@/services/vehicleDetails.service";

// interface Props {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<Partial<VehicleDetailsSearchParams>>;
// }

// const MOCK_VEHICLE: VehicleDetailsResponse = {
//   id: 2,
//   name: "Yamaha Fascino",
//   make_year: 2023,
//   transmission_type: "SEMI_AUTO",
//   fuel_type: "PETROL",
//   seats: 2,
//   cc: 113,
//   mileage_kmpl: 50,
//   top_speed_kmph: 85,
//   fuel_capacity_litres: 5.2,
//   kerb_weight_kg: 103,
//   km_limit_per_day: null,
//   images: [
//     "https://gowheelo.com/_next/image?url=https%3A%2F%2Fstatic.gowheelo.com%2Fuploads%2Fold%2Fbike%2FYamaha-Fascino.png&w=640&q=75",
//     "https://media.publit.io/file/cool-motorcycle-studio-1.jpg",
//     "https://media.publit.io/file/cool-motorcycle-indoors-1.jpg",
//   ],
//   primary_image:
//     "https://gowheelo.com/_next/image?url=https%3A%2F%2Fstatic.gowheelo.com%2Fuploads%2Fold%2Fbike%2FYamaha-Fascino.png&w=640&q=75",
//   available_count: 7,
//   packages: [
//     {
//       id: 1,
//       name: "Daily Package",
//       price_per_day: 499,
//       label: "Daily Package (₹ 499 per Day)",
//     },
//   ],
//   fare_details: {
//     rent_amount: 998,
//     total: 998,
//     remaining_rent: 798.4,
//     advance_payment: 199.6,
//     refundable_deposit: 0,
//   },
//   pickup_location: {
//     id: 1,
//     location_name: "Wayanad",
//     exact_address_revealed_after_booking: true,
//     operating_hours: "9:00 AM - 10:00 PM",
//     latitude: 11.6,
//     longitude: 76.2,
//   },
//   policies: {
//     security_deposit: 0,
//     distance_limit: "No Limit",
//     late_penalty_per_hour: 100,
//     location_timings: "9:00 AM - 10:00 PM",
//     excess_charge: "N/A",
//   },
//   terms_and_conditions: [
//     "One Day will be considered from 9 am to 9 am.",
//     "Documents Required: Aadhar Card and Driving License.",
//     "One Original Govt Address Proof has to be submitted during pickup and will be returned during drop.",
//     "Fuel Charges are not included in the security deposit or rent.",
//   ],
//   pay_at_pickup_enabled: true,
// };

// export default async function VehicleDetailsPage({
//   params,
//   searchParams,
// }: Props) {
//   const { id } = await params;
//   const { location_id, location_name, pickup, dropoff } = await searchParams;

//   if (!location_id || !location_name || !pickup || !dropoff) notFound();

//   // const vehicle = await getVehicleDetailsApi({
//   //   vehicle_id: id,
//   //   location_id,
//   //   location_name,
//   //   pickup_datetime: pickup,
//   //   dropoff_datetime: dropoff,
//   // }).catch(() => null);
//   // if (!vehicle) notFound();

//   const vehicle = MOCK_VEHICLE;

//   return (
//     <>
//       <SearchModifyBar
//         locationName={location_name}
//         pickup={pickup}
//         dropoff={dropoff}
//       />
//       <div className="min-h-screen bg-white">
//         <main className="xl:mx-[80.5px] mx-auto px-4 xl:px-0 py-4 xl:py-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-8 space-y-5 order-1 lg:order-none">
//             <Breadcrumbs
//               locationName={location_name}
//               vehicleName={vehicle.name}
//             />
//             <VehicleHeader
//               name={vehicle.name}
//               makeYear={vehicle.make_year}
//               images={vehicle.images}
//               primaryImage={vehicle.primary_image}
//               seats={vehicle.seats}
//               fuelCapacityLitres={vehicle.fuel_capacity_litres}
//               cc={vehicle.cc}
//               kmLimitPerDay={vehicle.km_limit_per_day}
//               topSpeedKmph={vehicle.top_speed_kmph}
//               mileageKmpl={vehicle.mileage_kmpl}
//               kerbWeightKg={vehicle.kerb_weight_kg}
//               availableCount={vehicle.available_count}
//               pickupLocationName={location_name}
//             />

//             {/* Booking Widget — mobile only */}
//             <div className="block lg:hidden">
//               <BookingWidget
//                 packages={vehicle.packages}
//                 fareDetails={vehicle.fare_details}
//                 payAtPickupEnabled={vehicle.pay_at_pickup_enabled}
//                 pickup={pickup}
//                 dropoff={dropoff}
//                 vehicleId={Number(id)}
//                 locationId={Number(location_id)}
//               />
//             </div>

//             <ThingsToRemember policies={vehicle.policies} />
//             <div className="lg:border-t lg:border-gray-200" />
//             <TermsAndConditions terms={vehicle.terms_and_conditions} />
//             <div className="lg:border-t lg:border-gray-200" />
//             <PickupLocation location={vehicle.pickup_location} />
//           </div>

//           {/* Right Column — desktop sticky */}
//           <div className="lg:col-span-4 relative hidden lg:block">
//             <div className="">
//               <BookingWidget
//                 packages={vehicle.packages}
//                 fareDetails={vehicle.fare_details}
//                 payAtPickupEnabled={vehicle.pay_at_pickup_enabled}
//                 pickup={pickup}
//                 dropoff={dropoff}
//                 vehicleId={Number(id)}
//                 locationId={Number(location_id)}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

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
// import { getVehicleDetailsApi } from "@/services/vehicleDetails.service";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Partial<VehicleDetailsSearchParams>>;
}

const MOCK_VEHICLE: VehicleDetailsResponse = {
  id: 2,
  name: "Yamaha Fascino",
  make_year: 2023,
  transmission_type: "SEMI_AUTO",
  fuel_type: "PETROL",
  seats: 2,
  cc: 113,
  mileage_kmpl: 50,
  top_speed_kmph: 85,
  fuel_capacity_litres: 5.2,
  kerb_weight_kg: 103,
  km_limit_per_day: null,
  images: [
    "https://gowheelo.com/_next/image?url=https%3A%2F%2Fstatic.gowheelo.com%2Fuploads%2Fold%2Fbike%2FYamaha-Fascino.png&w=640&q=75",
    "https://media.publit.io/file/cool-motorcycle-studio-1.jpg",
    "https://media.publit.io/file/cool-motorcycle-indoors-1.jpg",
  ],
  primary_image:
    "https://gowheelo.com/_next/image?url=https%3A%2F%2Fstatic.gowheelo.com%2Fuploads%2Fold%2Fbike%2FYamaha-Fascino.png&w=640&q=75",
  available_count: 7,
  packages: [
    {
      id: 1,
      name: "Daily Package",
      price_per_day: 499,
      label: "Daily Package (₹ 499 per Day)",
    },
  ],
  fare_details: {
    rent_amount: 998,
    total: 998,
    remaining_rent: 798.4,
    advance_payment: 199.6,
    refundable_deposit: 0,
  },
  pickup_location: {
    id: 1,
    location_name: "Wayanad",
    exact_address_revealed_after_booking: true,
    operating_hours: "9:00 AM - 10:00 PM",
    latitude: 11.6,
    longitude: 76.2,
  },
  policies: {
    security_deposit: 0,
    distance_limit: "No Limit",
    late_penalty_per_hour: 100,
    location_timings: "9:00 AM - 10:00 PM",
    excess_charge: "N/A",
  },
  terms_and_conditions: [
    "One Day will be considered from 9 am to 9 am.",
    "Documents Required: Aadhar Card and Driving License.",
    "One Original Govt Address Proof has to be submitted during pickup and will be returned during drop.",
    "Fuel Charges are not included in the security deposit or rent.",
  ],
  pay_at_pickup_enabled: true,
};

export default async function VehicleDetailsPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { location_id, location_name, pickup, dropoff, city_id } =
    await searchParams;

  if (!location_id || !location_name || !pickup || !dropoff) notFound();

  // const vehicle = await getVehicleDetailsApi({
  //   vehicle_id: id,
  //   location_id,
  //   location_name,
  //   pickup_datetime: pickup,
  //   dropoff_datetime: dropoff,
  // }).catch(() => null);
  // if (!vehicle) notFound();

  const vehicle = MOCK_VEHICLE;

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
      <div className="min-h-screen bg-white">
        <main className="xl:mx-[80.5px] mx-auto px-4 xl:px-0 py-4 xl:py-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
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
            <div className="lg:border-t lg:border-gray-200" />

            {/* Reviews — streams in independently */}
            <Suspense fallback={<ReviewsSkeleton />}>
              <Reviews vehicleId={Number(id)} />
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
