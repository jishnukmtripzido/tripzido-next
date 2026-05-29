

// "use client";

// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";
// import CityPickerModal from "@/components/search/CityPickerModal";
// import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
// import TimePickerModal from "@/components/search/TimePickerModal";
// import { FieldError } from "@/components/ui/FieldError";
// import { City } from "@/types/city";
// import { searchSchema } from "@/lib/validations/searchSchema";
// import { searchVehiclesAction } from "@/actions/searchVehicles";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   cities: City[];
//   citiesError: string | null;
//   initialCityId: number | null;
//   initialCityName: string;
//   initialPickupDate: Date;
//   initialDropoffDate: Date;
//   initialPickupHour: number;
//   initialPickupMinute: number;
//   initialDropoffHour: number;
//   initialDropoffMinute: number;
// }

// function formatDate(d: Date) {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
// }

// function formatTime(h: number, m: number) {
//   const period = h >= 12 ? "PM" : "AM";
//   const h12 = h % 12 === 0 ? 12 : h % 12;
//   return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
// }

// function buildDatetime(date: Date, hour: number, minute: number): Date {
//   const d = new Date(date);
//   d.setHours(hour, minute, 0, 0);
//   return d;
// }

// type ModalType = "city" | "date" | "pickup-time" | "dropoff-time" | null;

// export default function MobileSearchDrawer({
//   isOpen, onClose,
//   cities, citiesError,
//   initialCityId, initialCityName,
//   initialPickupDate, initialDropoffDate,
//   initialPickupHour, initialPickupMinute,
//   initialDropoffHour, initialDropoffMinute,
// }: Props) {
//   const [mounted, setMounted] = useState(false);
//   const router = useRouter();

//   const [openModal, setOpenModal] = useState<ModalType>(null);
//   const [selectedCity, setSelectedCity] = useState<{ id: number; name: string } | null>(
//     initialCityId ? { id: initialCityId, name: initialCityName } : null
//   );
//   const [dateRange, setDateRange] = useState<DateRange>({
//     start: initialPickupDate,
//     end: initialDropoffDate,
//   });
//   const [pickupTime, setPickupTime] = useState({ hour: initialPickupHour, minute: initialPickupMinute });
//   const [dropoffTime, setDropoffTime] = useState({ hour: initialDropoffHour, minute: initialDropoffMinute });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState<string | null>(null);

//   useEffect(() => { setMounted(true); }, []);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   // Sync values when drawer opens
//   useEffect(() => {
//     if (isOpen) {
//       setSelectedCity(initialCityId ? { id: initialCityId, name: initialCityName } : null);
//       setDateRange({ start: initialPickupDate, end: initialDropoffDate });
//       setPickupTime({ hour: initialPickupHour, minute: initialPickupMinute });
//       setDropoffTime({ hour: initialDropoffHour, minute: initialDropoffMinute });
//       setErrors({});
//       setServerError(null);
//     }
//   }, [isOpen]);

//   function handleDateSelect(range: DateRange) {
//     setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
//     setErrors(e => ({ ...e, pickup_datetime: "", dropoff_datetime: "" }));
//   }

//   async function handleSearch() {
//     setServerError(null);

//     const pickup_datetime = buildDatetime(dateRange.start, pickupTime.hour, pickupTime.minute);
//     const dropoff_datetime = buildDatetime(dateRange.end, dropoffTime.hour, dropoffTime.minute);

//     const result = searchSchema.safeParse({
//       city_id: selectedCity?.id,
//       city_name: selectedCity?.name,
//       pickup_datetime,
//       dropoff_datetime,
//     });

//     if (!result.success) {
//       const fieldErrors: Record<string, string> = {};
//       for (const issue of result.error.issues) {
//         const key = issue.path[0] as string;
//         fieldErrors[key] = issue.message;
//       }
//       setErrors(fieldErrors);
//       return;
//     }

//     setErrors({});
//     setIsLoading(true);

//     try {
//       const response = await searchVehiclesAction({
//         city_id: selectedCity!.id,
//         city_name: selectedCity!.name,
//         pickup_datetime,
//         dropoff_datetime,
//       });

//       if (!response.success) {
//         if (response.errors) setErrors(response.errors);
//         if (response.message) setServerError(response.message);
//         return;
//       }

//       onClose();
//       router.push(
//         `/searchresult?city_id=${selectedCity!.id}&city_name=${encodeURIComponent(selectedCity!.name)}&pickup=${pickup_datetime.toISOString()}&dropoff=${dropoff_datetime.toISOString()}`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   if (!mounted || !isOpen) return null;

//   return createPortal(
//     <>
//       <div className="fixed inset-0 z-50 flex items-end justify-center">
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
//         <div className="relative z-10 w-full bg-white rounded-t-2xl shadow-2xl">

//           {/* Handle */}
//           <div className="flex justify-center pt-3 pb-1">
//             <div className="w-10 h-1 rounded-full bg-gray-300" />
//           </div>

//           {/* Header */}
//           <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
//             <h2 className="font-bold text-gray-900 text-base">Modify Search</h2>
//             <button
//               onClick={onClose}
//               className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//               </svg>
//             </button>
//           </div>

//           {/* Form fields */}
//           <div className="px-5 py-4 flex flex-col gap-3">

//             {/* City */}
//             <div className="relative">
//               <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
//               <button
//                 type="button"
//                 onClick={() => setOpenModal("city")}
//                 disabled={!!citiesError}
//                 className={`w-full flex items-center border rounded-lg p-3 bg-white transition-colors cursor-pointer disabled:opacity-60
//                   ${errors.city_id ? "border-red-500" : "border-gray-300 hover:border-[#ffc107]"}`}
//               >
//                 <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                 </svg>
//                 <span className="flex-1 text-sm font-medium text-gray-900 text-left">
//                   {citiesError ? "Failed to load" : selectedCity?.name ?? "Select a city"}
//                 </span>
//                 <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                 </svg>
//               </button>
//               <FieldError message={errors.city_id} />
//             </div>

//             {/* Dates + Times grid */}
//             <div className="grid grid-cols-2 gap-2">

//               {/* Pickup date */}
//               <div className="relative">
//                 <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
//                 <button
//                   type="button"
//                   onClick={() => setOpenModal("date")}
//                   className={`w-full flex items-center border rounded-lg p-3 bg-white transition-colors cursor-pointer
//                     ${errors.pickup_datetime ? "border-red-500" : "border-gray-300 hover:border-[#ffc107]"}`}
//                 >
//                   <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   </svg>
//                   <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.start)}</span>
//                 </button>
//                 <FieldError message={errors.pickup_datetime} />
//               </div>

//               {/* Pickup time */}
//               <div className="relative">
//                 <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
//                 <button
//                   type="button"
//                   onClick={() => setOpenModal("pickup-time")}
//                   className="w-full flex items-center border border-gray-300 rounded-lg p-3 bg-white hover:border-[#ffc107] transition-colors cursor-pointer"
//                 >
//                   <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   </svg>
//                   <span className="text-sm font-medium whitespace-nowrap">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
//                 </button>
//               </div>

//               {/* Dropoff date */}
//               <div className="relative">
//                 <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
//                 <button
//                   type="button"
//                   onClick={() => setOpenModal("date")}
//                   className={`w-full flex items-center border rounded-lg p-3 bg-white transition-colors cursor-pointer
//                     ${errors.dropoff_datetime ? "border-red-500" : "border-gray-300 hover:border-[#ffc107]"}`}
//                 >
//                   <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   </svg>
//                   <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.end)}</span>
//                 </button>
//                 <FieldError message={errors.dropoff_datetime} />
//               </div>

//               {/* Dropoff time */}
//               <div className="relative">
//                 <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
//                 <button
//                   type="button"
//                   onClick={() => setOpenModal("dropoff-time")}
//                   className="w-full flex items-center border border-gray-300 rounded-lg p-3 bg-white hover:border-[#ffc107] transition-colors cursor-pointer"
//                 >
//                   <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   </svg>
//                   <span className="text-sm font-medium whitespace-nowrap">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
//                 </button>
//               </div>
//             </div>

//             {serverError && <p className="text-xs text-red-500 ml-1">{serverError}</p>}

//             {/* Search button */}
//             <button
//               onClick={handleSearch}
//               disabled={isLoading}
//               className="w-full bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-4 rounded-xl text-base transition-colors cursor-pointer mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Searching..." : "Search"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <CityPickerModal
//         isOpen={openModal === "city"}
//         onClose={() => setOpenModal(null)}
//         onSelect={(city) => {
//           setSelectedCity({ id: city.id, name: city.name });
//           setErrors(e => ({ ...e, city_id: "" }));
//         }}
//         selectedCityId={selectedCity?.id ?? null}
//         cities={cities}
//         loading={false}
//         error={citiesError}
//       />
//       <DatePickerModal
//         isOpen={openModal === "date"}
//         onClose={() => setOpenModal(null)}
//         onSelect={handleDateSelect}
//         initialRange={dateRange}
//       />
//       <TimePickerModal
//           isOpen={openModal === "pickup-time" || openModal === "dropoff-time"}
//           onClose={() => setOpenModal(null)}
//           onSelectBoth={(pickup, dropoff) => {
//             setPickupTime(pickup);
//             setDropoffTime(dropoff);
//           }}
//           initialPickupHour={pickupTime.hour}
//           initialPickupMinute={pickupTime.minute}
//           initialDropoffHour={dropoffTime.hour}
//           initialDropoffMinute={dropoffTime.minute}
//           pickupDate={dateRange.start}
//           dropoffDate={dateRange.end}
//         />
//     </>,
//     document.body
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import CityPickerModal from "@/components/search/CityPickerModal";
import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
import TimePickerModal from "@/components/search/TimePickerModal";
import { FieldError } from "@/components/ui/FieldError";
import { City } from "@/types/city";
import { searchSchema } from "@/lib/validations/searchSchema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cities: City[];
  citiesError: string | null;
  initialCityId: number | null;
  initialCityName: string;
  initialPickupDate: Date;
  initialDropoffDate: Date;
  initialPickupHour: number;
  initialPickupMinute: number;
  initialDropoffHour: number;
  initialDropoffMinute: number;
}

function formatDate(d: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

function formatTime(h: number, m: number) {
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

function buildDatetime(date: Date, hour: number, minute: number): Date {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

type ModalType = "city" | "date" | "pickup-time" | "dropoff-time" | null;

export default function MobileSearchDrawer({
  isOpen, onClose,
  cities, citiesError,
  initialCityId, initialCityName,
  initialPickupDate, initialDropoffDate,
  initialPickupHour, initialPickupMinute,
  initialDropoffHour, initialDropoffMinute,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectedCity, setSelectedCity] = useState<{ id: number; name: string } | null>(
    initialCityId ? { id: initialCityId, name: initialCityName } : null
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    start: initialPickupDate,
    end: initialDropoffDate,
  });
  const [pickupTime, setPickupTime] = useState({ hour: initialPickupHour, minute: initialPickupMinute });
  const [dropoffTime, setDropoffTime] = useState({ hour: initialDropoffHour, minute: initialDropoffMinute });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Sync values when drawer opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCity(initialCityId ? { id: initialCityId, name: initialCityName } : null);
      setDateRange({ start: initialPickupDate, end: initialDropoffDate });
      setPickupTime({ hour: initialPickupHour, minute: initialPickupMinute });
      setDropoffTime({ hour: initialDropoffHour, minute: initialDropoffMinute });
      setErrors({});
    }
  }, [isOpen]);

  function handleDateSelect(range: DateRange) {
    setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
    setErrors(e => ({ ...e, pickup_datetime: "", dropoff_datetime: "" }));
  }

  function handleSearch() {
    const pickup_datetime = buildDatetime(dateRange.start, pickupTime.hour, pickupTime.minute);
    const dropoff_datetime = buildDatetime(dateRange.end, dropoffTime.hour, dropoffTime.minute);

    const result = searchSchema.safeParse({
      city_id: selectedCity?.id,
      city_name: selectedCity?.name,
      pickup_datetime,
      dropoff_datetime,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onClose();

    router.push(
      `/searchresult?city_id=${selectedCity!.id}&city_name=${encodeURIComponent(selectedCity!.name)}&pickup=${toISO(pickup_datetime)}&dropoff=${toISO(dropoff_datetime)}`
    );
  }

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
        <div className="relative z-10 w-full bg-white rounded-t-2xl shadow-2xl">

          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-gray-300" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-base">Modify Search</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* Form fields */}
          <div className="px-5 py-4 flex flex-col gap-3">

            {/* City */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
              <button
                type="button"
                onClick={() => setOpenModal("city")}
                disabled={!!citiesError}
                className={`w-full flex items-center border rounded-md p-4 bg-white transition-colors cursor-pointer disabled:opacity-60
                  ${errors.city_id ? "border-red-500" : "border-gray-300 hover:border-[#ffc107]"}`}
              >
                <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span className="flex-1 text-sm font-medium text-gray-900 text-left">
                  {citiesError ? "Failed to load" : selectedCity?.name ?? "Select a city"}
                </span>
                <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
              <FieldError message={errors.city_id} />
            </div>

            {/* Dates + Times grid */}
            <div className="grid grid-cols-2 gap-2">

              {/* Pickup date */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
                <button
                  type="button"
                  onClick={() => setOpenModal("date")}
                  className={`w-full flex items-center border rounded-md p-4 bg-white transition-colors cursor-pointer
                    ${errors.pickup_datetime ? "border-red-500" : "border-gray-300 hover:border-[#ffc107]"}`}
                >
                  <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.start)}</span>
                </button>
                <FieldError message={errors.pickup_datetime} />
              </div>

              {/* Pickup time */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
                <button
                  type="button"
                  onClick={() => setOpenModal("pickup-time")}
                  className="w-full flex items-center border border-gray-300  rounded-md p-4 bg-white hover:border-[#ffc107] transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span className="text-sm font-medium whitespace-nowrap">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
                </button>
              </div>

              {/* Dropoff date */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
                <button
                  type="button"
                  onClick={() => setOpenModal("date")}
                  className={`w-full flex items-center border  rounded-md p-4 bg-white transition-colors cursor-pointer
                    ${errors.dropoff_datetime ? "border-red-500" : "border-gray-300 hover:border-[#ffc107]"}`}
                >
                  <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.end)}</span>
                </button>
                <FieldError message={errors.dropoff_datetime} />
              </div>

              {/* Dropoff time */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
                <button
                  type="button"
                  onClick={() => setOpenModal("dropoff-time")}
                  className="w-full flex items-center border border-gray-300  rounded-md p-4 bg-white hover:border-[#ffc107] transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span className="text-sm font-medium whitespace-nowrap">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
                </button>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="w-full bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-4 rounded-xl text-base transition-colors cursor-pointer mt-1"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <CityPickerModal
        isOpen={openModal === "city"}
        onClose={() => setOpenModal(null)}
        onSelect={(city) => {
          setSelectedCity({ id: city.id, name: city.name });
          setErrors(e => ({ ...e, city_id: "" }));
        }}
        selectedCityId={selectedCity?.id ?? null}
        cities={cities}
        loading={false}
        error={citiesError}
      />
      <DatePickerModal
        isOpen={openModal === "date"}
        onClose={() => setOpenModal(null)}
        onSelect={handleDateSelect}
        initialRange={dateRange}
      />
      <TimePickerModal
        isOpen={openModal === "pickup-time" || openModal === "dropoff-time"}
        onClose={() => setOpenModal(null)}
        onSelectBoth={(pickup, dropoff) => {
          setPickupTime(pickup);
          setDropoffTime(dropoff);
        }}
        initialPickupHour={pickupTime.hour}
        initialPickupMinute={pickupTime.minute}
        initialDropoffHour={dropoffTime.hour}
        initialDropoffMinute={dropoffTime.minute}
        pickupDate={dateRange.start}
        dropoffDate={dateRange.end}
      />
    </>,
    document.body
  );
}