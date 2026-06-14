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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1">
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
        <div className="md:col-span-2 bg-gray-200 rounded-xl h-48 flex items-center justify-center overflow-hidden relative">
          {/* <img
             src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png"
         
            alt={`Map showing ${location.location_name}`}
            className="w-full h-full object-cover opacity-70"
          /> */}
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
