import ImageGallery from "./ImageGallery";
import VehicleFeatures from "./VehicleFeatures";

interface Props {
  name: string;
  makeYear: number;
  images: string[];
  primaryImage: string;
  seats: number;
  fuelCapacityLitres: number;
  cc: number;
  kmLimitPerDay: number | null;
  topSpeedKmph: number;
  mileageKmpl: number;
  kerbWeightKg: number;
  availableCount: number;
  pickupLocationName: string;
}

export default function VehicleHeader({
  name,
  makeYear,
  images,
  primaryImage,
  availableCount,
  pickupLocationName,
}: Props) {
  const allImages = images?.length ? images : [primaryImage];

  return (
    <div className="bg-white  pb-6 border-b border-gray-200 mb-4 md:mb-8">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-gray-200" />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Images */}
        <div className="w-full md:w-5/12">
          <ImageGallery images={allImages} />
        </div>

        {/* Right Side: Details & Features */}
        <div className="w-full md:w-7/12 flex flex-col justify-start">
          {/* Availability tag */}
          <div className="flex items-center gap-2 mb-3">
            {availableCount > 0 && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded">
                {availableCount} Bike{availableCount !== 1 ? "s" : ""} Available
              </span>
            )}
          </div>

          {/* Title and Make Year */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900 inline-block mr-2">
              {name}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Make Year: {makeYear}</p>
          </div>

          {/* Specs */}
          <VehicleFeatures />

          {/* Pickup location */}
          <div className="mt-8 pt-4 hidden md:block border-t border-gray-100">
            <h3 className="text-base font-medium text-gray-900">
              {pickupLocationName} Pickup
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Exact location provided after booking
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-4  hidden md:block">
            *Images are for representation purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
