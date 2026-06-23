// import ImageGallery from "./ImageGallery";
// import VehicleFeatures from "./VehicleFeatures";

// interface Props {
//   name: string;
//   makeYear: number;
//   images: string[];
//   primaryImage: string;
//   seats: number;
//   fuelCapacityLitres: number;
//   cc: number;
//   kmLimitPerDay: number | null;
//   topSpeedKmph: number | string | null;
//   mileageKmpl: number | string | null;
//   kerbWeightKg: number | string | null;
//   availableCount: number;
//   pickupLocationName: string;
// }

// export default function VehicleHeader({
//   name,
//   makeYear,
//   images,
//   primaryImage,
//   availableCount,
//   pickupLocationName,
//   cc,
//   seats,
//   fuelCapacityLitres,
//   kmLimitPerDay,
//   topSpeedKmph,
//   mileageKmpl,
//   kerbWeightKg,
// }: Props) {
//   const allImages = images?.length ? images : [primaryImage];

//   return (
//     <div className="bg-white  pb-6 border-b border-gray-200 mb-4 md:mb-8">
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-gray-200" />
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Left Side: Images */}
//         <div className="w-full md:w-6/12">
//           <ImageGallery images={allImages} />
//         </div>

//         {/* Right Side: Details & Features */}
//         <div className="w-full md:w-7/12 flex flex-col justify-start">
//           {/* Availability tag */}
//           {availableCount > 0 ? (
//             <div className="flex items-center gap-2 mb-3">
//               {availableCount && availableCount > 0 && (
//                 <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded">
//                   {availableCount} Bike{availableCount !== 1 ? "s" : ""}{" "}
//                   Available
//                 </span>
//               )}
//             </div>
//           ) : (
//             <></>
//           )}

//           {/* Title and Make Year */}
//           <div className="mb-2">
//             <h1 className="text-2xl  font-bold text-font-main-sub inline-block mr-2">
//               {name}
//             </h1>
//             <p className="text-font-main-sub text-sm mt-1">
//               Make Year: {makeYear}
//             </p>
//           </div>

//           {/* Specs */}
//           <VehicleFeatures
//             seats={seats}
//             topSpeed={topSpeedKmph}
//             fuelCapacity={fuelCapacityLitres}
//             mileageKmpl={mileageKmpl}
//             cc={cc}
//             kerbWeightKg={kerbWeightKg}
//             kmLimitPerDay={kmLimitPerDay}
//           />

//           {/* Pickup location */}
//           <div className="mt-8 pt-4 hidden md:block border-t border-gray-100">
//             <h3 className="text-base font-semibold text-font-main-sub">
//               {pickupLocationName} Pickup
//             </h3>
//             <p className="text-sm text-font-main-sub mt-1">
//               Exact location provided after booking
//             </p>
//           </div>

//           <p className="text-xs text-font-dim mt-4  hidden md:block">
//             *Images are for representation purposes only.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  topSpeedKmph: number | string | null;
  mileageKmpl: number | string | null;
  kerbWeightKg: number | string | null;
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
  cc,
  seats,
  fuelCapacityLitres,
  kmLimitPerDay,
  topSpeedKmph,
  mileageKmpl,
  kerbWeightKg,
}: Props) {
  const allImages = images?.length ? images : [primaryImage];

  return (
    <div className="bg-white pb-6 border-b border-gray-200 mb-4 md:mb-8 relative">
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-gray-200" />

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex flex-col md:hidden pt-7">
        {/* Availability tag */}
        {availableCount > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded">
              {availableCount} Bike{availableCount !== 1 ? "s" : ""} Available
            </span>
          </div>
        )}

        {/* Title and Make Year */}
        <div className="mb-4">
          <h1 className="text-[20px] font-bold text-font-main-sub leading-snug">
            {name}
          </h1>
          <p className="text-font-main-sub text-[13px] mt-0.5">
            Make Year: {makeYear}
          </p>
        </div>

        {/* Side-by-Side Specs & Image Grid */}
        <div className="grid grid-cols-[1fr_200px] gap-2 items-start mb-2">
          {/* Left: Specs */}
          <div className="min-w-0">
            <VehicleFeatures
              seats={seats}
              topSpeed={topSpeedKmph}
              fuelCapacity={fuelCapacityLitres}
              mileageKmpl={mileageKmpl}
              cc={cc}
              kerbWeightKg={kerbWeightKg}
              kmLimitPerDay={kmLimitPerDay}
            />
          </div>

          {/* Right: ImageGallery */}
          <div className="flex flex-col justify-start -mt-2">
            <ImageGallery images={allImages} />
          </div>
        </div>

        {/* Pickup location */}
        <div className="mt-4 pt-4 border-t border-gray-100 hidden md:inline-block">
          <h3 className="text-[14px] font-semibold text-font-main-sub">
            {pickupLocationName} Pickup
          </h3>
          <p className="text-[12px] text-font-dim mt-0.5">
            Exact location provided after booking
          </p>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (Unchanged) ── */}
      <div className="hidden md:flex flex-row gap-8">
        {/* Left Side: Images */}
        <div className="w-6/12">
          <ImageGallery images={allImages} />
        </div>

        {/* Right Side: Details & Features */}
        <div className="w-7/12 flex flex-col justify-start">
          {/* Availability tag */}
          {availableCount > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded">
                {availableCount} Bike{availableCount !== 1 ? "s" : ""} Available
              </span>
            </div>
          )}

          {/* Title and Make Year */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-font-main-sub inline-block mr-2">
              {name}
            </h1>
            <p className="text-font-main-sub text-sm mt-1">
              Make Year: {makeYear}
            </p>
          </div>

          {/* Specs */}
          <VehicleFeatures
            seats={seats}
            topSpeed={topSpeedKmph}
            fuelCapacity={fuelCapacityLitres}
            mileageKmpl={mileageKmpl}
            cc={cc}
            kerbWeightKg={kerbWeightKg}
            kmLimitPerDay={kmLimitPerDay}
          />

          {/* Pickup location */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            <h3 className="text-base font-semibold text-font-main-sub">
              {pickupLocationName} Pickup
            </h3>
            <p className="text-sm text-font-main-sub mt-1">
              Exact location provided after booking
            </p>
          </div>

          <p className="text-xs text-font-dim mt-4">
            *Images are for representation purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
