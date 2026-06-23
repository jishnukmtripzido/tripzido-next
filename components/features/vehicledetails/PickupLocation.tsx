import type { VehiclePickupLocation } from "@/types/vehicleDetails.types";

interface Props {
  location: VehiclePickupLocation;
}

export default function PickupLocation({ location }: Props) {
  const apiKey = process.env.GOOGLEMAP_API_KEY;
  process.env.NODE_ENV;
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Pickup Location</h2>
      <div className="grid grid-cols-1  gap-6 items-start">
        <div className="">
          <p className="font-semibold text-font-main-sub text-base">
            {location.location_name}
          </p>
          {location.exact_address_revealed_after_booking && (
            <p className="text-sm text-green-700 mt-2">
              * Exact location will be provided after the booking is confirmed.
              *
            </p>
          )}
        </div>
        <div className=" bg-gray-200 rounded-xl h-48 flex items-center justify-center overflow-hidden relative">
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=800x400&markers=color:red%7C${location.latitude},${location.longitude}&key=${apiKey}`}
            alt={`Map showing ${location.location_name}`}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
