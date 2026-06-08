interface PickupLocationProps {
  location?: string;
}

export default function PickupLocation({
  location = "Calangute Beach",
}: PickupLocationProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Pickup Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-1">
          <p className="font-semibold text-gray-900 text-base">{location}</p>
          <p className="text-sm text-gray-500 mt-2">
            Exact location will be provided after the booking is confirmed.
          </p>
        </div>
        <div className="md:col-span-2 bg-gray-200 rounded-xl h-48 flex items-center justify-center overflow-hidden relative">
          {/* Placeholder Map Image. 
            Replace this with an actual Google Maps iframe or a dynamic map component (like react-leaflet or @react-google-maps/api) in production.
          */}
          <img
            src="https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png"
            alt={`Map showing ${location}`}
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
