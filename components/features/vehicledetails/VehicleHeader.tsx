//

import ImageGallery from "./ImageGallery";
import VehicleFeatures from "./VehicleFeatures";

export default function VehicleHeader() {
  // Mock array of images uploaded by the vendor
  const vendorImages = [
    "https://gowheelo.com/_next/image?url=https%3A%2F%2Fstatic.gowheelo.com%2Fuploads%2Fold%2Fbike%2FYamaha-Fascino.png&w=640&q=75",
    "https://media.publit.io/file/cool-motorcycle-studio-1.jpg", // Placeholder for side view
    "https://media.publit.io/file/cool-motorcycle-indoors-1.jpg", // Placeholder for back view
  ];

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Images */}
        <div className="w-full md:w-5/12">
          <ImageGallery images={vendorImages} />
        </div>

        {/* Right Side: Details & Features */}
        <div className="w-full md:w-7/12 flex flex-col justify-start">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-900 text-white text-xs font-semibold px-2.5 py-1 rounded">
              Top Pick
            </span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded">
              7 Bikes Available
            </span>
          </div>

          {/* Title and Make Year */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900 inline-block mr-2">
              Yamaha Fascino
            </h1>
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">
              or similar scooter ⓘ
            </span>
            <p className="text-gray-500 text-sm mt-1">Make Year: 2023</p>
          </div>

          {/* Imported Features Component */}
          <VehicleFeatures />

          {/* Location Info (Matches Booking.com bottom section style) */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            <h3 className="text-base font-medium text-gray-900">
              Wayanad Pickup
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Exact location provided after booking • 9:00 AM - 10:00 PM
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            *Images are for representation purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
