

// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import CityPickerModal from "@/components/search/CityPickerModal";
// import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
// import TimePickerModal from "@/components/search/TimePickerModal";
// import DatePickerDropdown from "@/components/search/DatePickerDropdown";
// import TimePickerDropdown from "@/components/search/TimePickerDropdown";
// import { City } from "@/types/city";
// import { searchSchema } from "@/lib/validations/searchSchema";
// import { searchVehiclesAction } from "@/actions/searchVehicles";
// import { FieldError } from "../ui/FieldError";

// function getDefaults() {
//   const now = new Date();
//   const pickup = new Date(now);
//   pickup.setHours(now.getHours() + 2, 0, 0, 0);
//   const dropoff = new Date(pickup);
//   dropoff.setDate(dropoff.getDate() + 1);
//   return { pickup, dropoff };
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

// // "time" replaces the two separate "pickup-time" | "dropoff-time" modal types
// type ModalType = "city" | "date" | "time" | null;
// type DropdownType = "date" | "pickup-time" | "dropoff-time" | null;

// export interface SelectedCity { id: number; name: string; }
// interface SearchWidgetProps { cities: City[]; citiesError: string | null; }

// export default function SearchWidget({ cities, citiesError }: SearchWidgetProps) {
//   const defaults = getDefaults();
//   const router = useRouter();

//   const [openModal, setOpenModal] = useState<ModalType>(null);
//   const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

//   const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
//   const [dateRange, setDateRange] = useState<DateRange>({ start: defaults.pickup, end: defaults.dropoff });
//   const [pickupTime, setPickupTime] = useState({ hour: defaults.pickup.getHours(), minute: 0 });
//   const [dropoffTime, setDropoffTime] = useState({ hour: defaults.dropoff.getHours(), minute: 0 });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState<string | null>(null);

//   const pickupDateRef = useRef<HTMLDivElement>(null);
//   const dropoffDateRef = useRef<HTMLDivElement>(null);
//   const pickupTimeRef = useRef<HTMLDivElement>(null);
//   const dropoffTimeRef = useRef<HTMLDivElement>(null);

//   function handleDateSelect(range: DateRange) {
//     setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
//     setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
//   }

//   /** Real-time update while user is picking dates in the dropdown */
//   function handleDateChange(range: DateRange) {
//     setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
//     setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
//   }

//   async function handleSearch(e: React.FormEvent) {
//     e.preventDefault();
//     setServerError(null);
//     setOpenDropdown(null);

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

//       router.push(
//         `/searchresult?city=${selectedCity!.id}&pickup=${pickup_datetime.toISOString()}&dropoff=${dropoff_datetime.toISOString()}`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   function toggleDropdown(type: DropdownType) {
//     setOpenDropdown(prev => prev === type ? null : type);
//   }

//   return (
//     <>
//       <section className="relative z-20 px-4 lg:px-8 -mt-12 mx-auto xl:mx-[121.5px] xl:px-0">
//         <form onSubmit={handleSearch} noValidate>
//           <div className="bg-white rounded-md shadow-2xl sm:shadow-xl p-4 border border-gray-400">
//             <div className="flex flex-wrap md:flex-nowrap items-end gap-2">

//               {/* ── City ── */}
//               <div className="relative w-full md:flex-1 min-w-0">
//                 <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
//                 <TriggerButton
//                   onClick={() => setOpenModal("city")}
//                   disabled={!!citiesError}
//                   hasError={!!errors.city_id}
//                 >
//                   <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                     <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   </svg>
//                   <span className="flex-1 text-sm font-medium text-gray-900 truncate">
//                     {citiesError ? "Failed to load" : selectedCity?.name ?? "Select a city"}
//                   </span>
//                 </TriggerButton>
//                 <FieldError message={errors.city_id} />
//               </div>

//               <div className="grid grid-cols-2 gap-2 w-full md:contents">

//                 {/* ── Pick-up date ── */}
//                 <div ref={pickupDateRef} className="relative w-full md:w-[130px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
//                   {/* Mobile */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("date")} hasError={!!errors.pickup_datetime}>
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.start)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("date")}
//                       hasError={!!errors.pickup_datetime}
//                       active={openDropdown === "date"}
//                     >
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.start)}</span>
//                     </TriggerButton>
//                     {openDropdown === "date" && (
//                       <DatePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(range) => { handleDateSelect(range); setOpenDropdown(null); }}
//                         onDateChange={handleDateChange}
//                         initialRange={dateRange}
//                       />
//                     )}
//                   </div>
//                   <FieldError message={errors.pickup_datetime} />
//                 </div>

//                 {/* ── Pick-up time ── */}
//                 <div ref={pickupTimeRef} className="relative w-full md:w-[120px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
//                   {/* Mobile — opens combined time modal */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("time")}>
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("pickup-time")}
//                       active={openDropdown === "pickup-time"}
//                     >
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
//                     </TriggerButton>
//                     {openDropdown === "pickup-time" && (
//                       <TimePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(h, m) => { setPickupTime({ hour: h, minute: m }); setOpenDropdown(null); }}
//                         selectedHour={pickupTime.hour}
//                         selectedMinute={pickupTime.minute}
//                         label="Pick-up time"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {/* ── Drop-off date ── */}
//                 <div ref={dropoffDateRef} className="relative w-full md:w-[130px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
//                   {/* Mobile */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("date")} hasError={!!errors.dropoff_datetime}>
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.end)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("date")}
//                       hasError={!!errors.dropoff_datetime}
//                       active={openDropdown === "date"}
//                     >
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.end)}</span>
//                     </TriggerButton>
//                     {/* Dropdown anchors on pickup date cell; this just acts as a visual trigger */}
//                   </div>
//                   <FieldError message={errors.dropoff_datetime} />
//                 </div>

//                 {/* ── Drop-off time ── */}
//                 <div ref={dropoffTimeRef} className="relative w-full md:w-[120px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
//                   {/* Mobile — opens same combined time modal */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("time")}>
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("dropoff-time")}
//                       active={openDropdown === "dropoff-time"}
//                     >
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
//                     </TriggerButton>
//                     {openDropdown === "dropoff-time" && (
//                       <TimePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(h, m) => { setDropoffTime({ hour: h, minute: m }); setOpenDropdown(null); }}
//                         selectedHour={dropoffTime.hour}
//                         selectedMinute={dropoffTime.minute}
//                         label="Drop-off time"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* ── Search button ── */}
//               <div className="shrink-0 w-full md:w-auto">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full md:w-auto bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 sm:py-3 px-5 rounded-md transition-colors whitespace-nowrap hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? "Searching..." : "Search"}
//                 </button>
//               </div>
//             </div>

//             {serverError && (
//               <p className="text-xs text-red-500 mt-2 ml-1">{serverError}</p>
//             )}
//           </div>
//         </form>
//       </section>

//       {/* ── Mobile-only modals ── */}
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

//       {/* Combined pick-up + drop-off time modal (mobile only) */}
//       <TimePickerModal
//         isOpen={openModal === "time"}
//         onClose={() => setOpenModal(null)}
//         onSelectBoth={(pickup, dropoff) => {
//           setPickupTime(pickup);
//           setDropoffTime(dropoff);
//         }}
//         initialPickupHour={pickupTime.hour}
//         initialPickupMinute={pickupTime.minute}
//         initialDropoffHour={dropoffTime.hour}
//         initialDropoffMinute={dropoffTime.minute}
//         pickupDate={dateRange.start}
//         dropoffDate={dateRange.end}
//       />
//     </>
//   );
// }

// /* ── Shared sub-components ── */

// function CalendarIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//     </svg>
//   );
// }

// function ClockIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//     </svg>
//   );
// }

// function TriggerButton({
//   onClick,
//   children,
//   disabled = false,
//   hasError = false,
//   active = false,
// }: {
//   onClick: () => void;
//   children: React.ReactNode;
//   disabled?: boolean;
//   hasError?: boolean;
//   active?: boolean;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={disabled}
//       className={`w-full flex items-center justify-between border rounded-md p-3 sm:p-3 bg-white transition-colors text-left hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
//         ${hasError
//           ? "border-red-300 hover:border-red-400"
//           : active
//             ? "border-[#ffc107] ring-2 ring-[#ffc107]/30"
//             : "border-gray-300 hover:border-[#ffc107]"
//         }`}
//     >
//       <div className="flex items-center min-w-0 flex-1">{children}</div>
//     </button>
//   );
// }










// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import CityPickerModal from "@/components/search/CityPickerModal";
// import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
// import TimePickerModal from "@/components/search/TimePickerModal";
// import DatePickerDropdown from "@/components/search/DatePickerDropdown";
// import TimePickerDropdown from "@/components/search/TimePickerDropdown";
// import { City } from "@/types/city";
// import { searchSchema } from "@/lib/validations/searchSchema";
// import { searchVehiclesAction } from "@/actions/searchVehicles";
// import { FieldError } from "../ui/FieldError";

// function getDefaults() {
//   const now = new Date();
//   const pickup = new Date(now);
//   pickup.setHours(now.getHours() + 2, 0, 0, 0);
//   const dropoff = new Date(pickup);
//   dropoff.setDate(dropoff.getDate() + 1);
//   return { pickup, dropoff };
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

// // "time" replaces the two separate "pickup-time" | "dropoff-time" modal types
// type ModalType = "city" | "date" | "time" | null;
// type DropdownType = "date" | "pickup-time" | "dropoff-time" | null;

// export interface SelectedCity { id: number; name: string; }
// interface SearchWidgetProps { cities: City[]; citiesError: string | null; }

// export default function SearchWidget({ cities, citiesError }: SearchWidgetProps) {
//   const defaults = getDefaults();
//   const router = useRouter();

//   const [openModal, setOpenModal] = useState<ModalType>(null);
//   const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

//   const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
//   const [dateRange, setDateRange] = useState<DateRange>({ start: defaults.pickup, end: defaults.dropoff });
//   const [pickupTime, setPickupTime] = useState({ hour: defaults.pickup.getHours(), minute: 0 });
//   const [dropoffTime, setDropoffTime] = useState({ hour: defaults.dropoff.getHours(), minute: 0 });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState<string | null>(null);

//   const pickupDateRef = useRef<HTMLDivElement>(null);
//   const dropoffDateRef = useRef<HTMLDivElement>(null);
//   const pickupTimeRef = useRef<HTMLDivElement>(null);
//   const dropoffTimeRef = useRef<HTMLDivElement>(null);

//   function handleDateSelect(range: DateRange) {
//     setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
//     setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
//   }

//   /** Real-time update while user is picking dates in the dropdown */
//   function handleDateChange(range: DateRange) {
//     setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
//     setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
//   }

//   async function handleSearch(e: React.FormEvent) {
//     e.preventDefault();
//     setServerError(null);
//     setOpenDropdown(null);

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

//       router.push(
//         `/searchresult?city=${selectedCity!.id}&pickup=${pickup_datetime.toISOString()}&dropoff=${dropoff_datetime.toISOString()}`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   function toggleDropdown(type: DropdownType) {
//     setOpenDropdown(prev => prev === type ? null : type);
//   }

//   return (
//     <>
//       <section className="relative z-20 px-4 lg:px-8 -mt-12 mx-auto xl:mx-[121.5px] xl:px-0">
//         <form onSubmit={handleSearch} noValidate>
//           {/* <div className="bg-white rounded-md shadow-2xl sm:shadow-xl p-4 border border-gray-400"> */}
//           <div className="rounded-md p-4 border border-gray-400 sm:border-gray-300/90" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
           
//            {/* <div
//   className="rounded-xl p-4 border border-white/35 overflow-hidden"
//   style={{
//     background: 'rgba(255,255,255,0.18)',
//     backdropFilter: 'blur(16px)',
//     WebkitBackdropFilter: 'blur(16px)',
//   }}
// > */}
//             <div className="flex flex-wrap md:flex-nowrap items-end gap-2">

//               {/* ── City ── */}
//               <div className="relative w-full md:flex-1 min-w-0">
//                 <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
//                 <TriggerButton
//                   onClick={() => setOpenModal("city")}
//                   disabled={!!citiesError}
//                   hasError={!!errors.city_id}
//                 >
//                   <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                     <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   </svg>
//                   <span className="flex-1 text-sm font-medium text-gray-900 truncate">
//                     {citiesError ? "Failed to load" : selectedCity?.name ?? "Select a city"}
//                   </span>
//                 </TriggerButton>
//                 <FieldError message={errors.city_id} />
//               </div>

//               <div className="grid grid-cols-2 gap-2 w-full md:contents">

//                 {/* ── Pick-up date ── */}
//                 <div ref={pickupDateRef} className="relative w-full md:w-[130px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
//                   {/* Mobile */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("date")} hasError={!!errors.pickup_datetime}>
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.start)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("date")}
//                       hasError={!!errors.pickup_datetime}
//                       active={openDropdown === "date"}
//                     >
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.start)}</span>
//                     </TriggerButton>
//                     {openDropdown === "date" && (
//                       <DatePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(range) => { handleDateSelect(range); setOpenDropdown(null); }}
//                         onDateChange={handleDateChange}
//                         initialRange={dateRange}
//                       />
//                     )}
//                   </div>
//                   <FieldError message={errors.pickup_datetime} />
//                 </div>

//                 {/* ── Pick-up time ── */}
//                 <div ref={pickupTimeRef} className="relative w-full md:w-[120px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
//                   {/* Mobile — opens combined time modal */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("time")}>
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("pickup-time")}
//                       active={openDropdown === "pickup-time"}
//                     >
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
//                     </TriggerButton>
//                     {openDropdown === "pickup-time" && (
//                       <TimePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(h, m) => { setPickupTime({ hour: h, minute: m }); setOpenDropdown(null); }}
//                         selectedHour={pickupTime.hour}
//                         selectedMinute={pickupTime.minute}
//                         label="Pick-up time"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {/* ── Drop-off date ── */}
//                 <div ref={dropoffDateRef} className="relative w-full md:w-[130px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
//                   {/* Mobile */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("date")} hasError={!!errors.dropoff_datetime}>
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.end)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("date")}
//                       hasError={!!errors.dropoff_datetime}
//                       active={openDropdown === "date"}
//                     >
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatDate(dateRange.end)}</span>
//                     </TriggerButton>
//                     {/* Dropdown anchors on pickup date cell; this just acts as a visual trigger */}
//                   </div>
//                   <FieldError message={errors.dropoff_datetime} />
//                 </div>

//                 {/* ── Drop-off time ── */}
//                 <div ref={dropoffTimeRef} className="relative w-full md:w-[120px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
//                   {/* Mobile — opens same combined time modal */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("time")}>
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("dropoff-time")}
//                       active={openDropdown === "dropoff-time"}
//                     >
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
//                     </TriggerButton>
//                     {openDropdown === "dropoff-time" && (
//                       <TimePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(h, m) => { setDropoffTime({ hour: h, minute: m }); setOpenDropdown(null); }}
//                         selectedHour={dropoffTime.hour}
//                         selectedMinute={dropoffTime.minute}
//                         label="Drop-off time"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* ── Search button ── */}
//               <div className="shrink-0 w-full md:w-auto">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full md:w-auto bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 sm:py-3 px-5 rounded-md transition-colors whitespace-nowrap hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? "Searching..." : "Search"}
//                 </button>
//               </div>
//             </div>

//             {serverError && (
//               <p className="text-xs text-red-500 mt-2 ml-1">{serverError}</p>
//             )}
//           </div>
//         </form>
//       </section>

//       {/* ── Mobile-only modals ── */}
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

//       {/* Combined pick-up + drop-off time modal (mobile only) */}
//       <TimePickerModal
//         isOpen={openModal === "time"}
//         onClose={() => setOpenModal(null)}
//         onSelectBoth={(pickup, dropoff) => {
//           setPickupTime(pickup);
//           setDropoffTime(dropoff);
//         }}
//         initialPickupHour={pickupTime.hour}
//         initialPickupMinute={pickupTime.minute}
//         initialDropoffHour={dropoffTime.hour}
//         initialDropoffMinute={dropoffTime.minute}
//         pickupDate={dateRange.start}
//         dropoffDate={dateRange.end}
//       />

      
//     </>
//   );
// }

// /* ── Shared sub-components ── */

// function CalendarIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//     </svg>
//   );
// }

// function ClockIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//     </svg>
//   );
// }

// function TriggerButton({
//   onClick,
//   children,
//   disabled = false,
//   hasError = false,
//   active = false,
// }: {
//   onClick: () => void;
//   children: React.ReactNode;
//   disabled?: boolean;
//   hasError?: boolean;
//   active?: boolean;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={disabled}
//       className={`w-full flex items-center justify-between border rounded-md p-3 sm:p-3 bg-white transition-colors text-left hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
//         ${hasError
//           ? "border-red-300 hover:border-red-400"
//           : active
//             ? "border-[#ffc107] ring-2 ring-[#ffc107]/30"
//             : "border-gray-300 hover:border-[#ffc107]"
//         }`}

//     >
//       <div className="flex items-center min-w-0 flex-1">{children}</div>

   
//     </button>
//   );
// }



// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import CityPickerModal from "@/components/search/CityPickerModal";
// import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
// import TimePickerModal from "@/components/search/TimePickerModal";
// import DatePickerDropdown from "@/components/search/DatePickerDropdown";
// import TimePickerDropdown from "@/components/search/TimePickerDropdown";
// import { City } from "@/types/city";
// import { searchSchema } from "@/lib/validations/searchSchema";
// import { searchVehiclesAction } from "@/actions/searchVehicles";
// import { FieldError } from "../ui/FieldError";

// function getDefaults() {
//   const now = new Date();
//   const pickup = new Date(now);
//   pickup.setHours(now.getHours() + 2, 0, 0, 0);
//   const dropoff = new Date(pickup);
//   dropoff.setDate(dropoff.getDate() + 1);
//   return { pickup, dropoff };
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

// type ModalType = "city" | "date" | "time" | null;
// type DropdownType = "date" | "pickup-time" | "dropoff-time" | null;

// export interface SelectedCity { id: number; name: string; }
// interface SearchWidgetProps { cities: City[]; citiesError: string | null; }

// export default function SearchWidget({ cities, citiesError }: SearchWidgetProps) {
//   const defaults = getDefaults();
//   const router = useRouter();

//   const [openModal, setOpenModal] = useState<ModalType>(null);
//   const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

//   const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
//   const [dateRange, setDateRange] = useState<DateRange>({ start: defaults.pickup, end: defaults.dropoff });
//   const [pickupTime, setPickupTime] = useState({ hour: defaults.pickup.getHours(), minute: 0 });
//   const [dropoffTime, setDropoffTime] = useState({ hour: defaults.dropoff.getHours(), minute: 0 });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState<string | null>(null);

//   const pickupDateRef = useRef<HTMLDivElement>(null);
//   const dropoffDateRef = useRef<HTMLDivElement>(null);
//   const pickupTimeRef = useRef<HTMLDivElement>(null);
//   const dropoffTimeRef = useRef<HTMLDivElement>(null);

//   function handleDateSelect(range: DateRange) {
//     setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
//     setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
//   }

//   function handleDateChange(range: DateRange) {
//     setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
//     setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
//   }

//   async function handleSearch(e: React.FormEvent) {
//     e.preventDefault();
//     setServerError(null);
//     setOpenDropdown(null);

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

//       router.push(
//         `/searchresult?city=${selectedCity!.id}&pickup=${pickup_datetime.toISOString()}&dropoff=${dropoff_datetime.toISOString()}`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   function toggleDropdown(type: DropdownType) {
//     setOpenDropdown(prev => prev === type ? null : type);
//   }

//   return (
//     <>
//       <section className="relative z-20 px-4 lg:px-8 -mt-12 mx-auto xl:mx-[121.5px] xl:px-0">
//         <form onSubmit={handleSearch} noValidate>
//           <div
//             className="rounded-md p-4 border border-white/40"
//             style={{
//               // background: 'rgba(0,0,0,0.52)',
//               background: 'rgba(0,0,0,0.21)',
//               backdropFilter: 'blur(16px)',
//               WebkitBackdropFilter: 'blur(16px)',
//             }}
//           >
//             <div className="flex flex-wrap md:flex-nowrap items-end gap-2">

//               {/* ── City ── */}
//               <div className="relative w-full md:flex-1 min-w-0">
//                 <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Select City</label>
//                 <TriggerButton
//                   onClick={() => setOpenModal("city")}
//                   disabled={!!citiesError}
//                   hasError={!!errors.city_id}
//                 >
//                   <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                     <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   </svg>
//                   <span className="flex-1 text-sm font-medium text-gray-900 truncate">
//                     {citiesError ? "Failed to load" : selectedCity?.name ?? "Select a city"}
//                   </span>
//                 </TriggerButton>
//                 <FieldError message={errors.city_id} />
//               </div>

//               <div className="grid grid-cols-2 gap-2 w-full md:contents">

//                 {/* ── Pick-up date ── */}
//                 <div ref={pickupDateRef} className="relative w-full md:w-[130px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Pick-up date</label>
//                   {/* Mobile */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("date")} hasError={!!errors.pickup_datetime}>
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatDate(dateRange.start)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("date")}
//                       hasError={!!errors.pickup_datetime}
//                       active={openDropdown === "date"}
//                     >
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatDate(dateRange.start)}</span>
//                     </TriggerButton>
//                     {openDropdown === "date" && (
//                       <DatePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(range) => { handleDateSelect(range); setOpenDropdown(null); }}
//                         onDateChange={handleDateChange}
//                         initialRange={dateRange}
//                       />
//                     )}
//                   </div>
//                   <FieldError message={errors.pickup_datetime} />
//                 </div>

//                 {/* ── Pick-up time ── */}
//                 <div ref={pickupTimeRef} className="relative w-full md:w-[120px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Time</label>
//                   {/* Mobile */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("time")}>
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("pickup-time")}
//                       active={openDropdown === "pickup-time"}
//                     >
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
//                     </TriggerButton>
//                     {openDropdown === "pickup-time" && (
//                       <TimePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(h, m) => { setPickupTime({ hour: h, minute: m }); setOpenDropdown(null); }}
//                         selectedHour={pickupTime.hour}
//                         selectedMinute={pickupTime.minute}
//                         label="Pick-up time"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {/* ── Drop-off date ── */}
//                 <div ref={dropoffDateRef} className="relative w-full md:w-[130px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Drop-off date</label>
//                   {/* Mobile */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("date")} hasError={!!errors.dropoff_datetime}>
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatDate(dateRange.end)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("date")}
//                       hasError={!!errors.dropoff_datetime}
//                       active={openDropdown === "date"}
//                     >
//                       <CalendarIcon />
//                       <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatDate(dateRange.end)}</span>
//                     </TriggerButton>
//                   </div>
//                   <FieldError message={errors.dropoff_datetime} />
//                 </div>

//                 {/* ── Drop-off time ── */}
//                 <div ref={dropoffTimeRef} className="relative w-full md:w-[120px] md:shrink-0">
//                   <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Time</label>
//                   {/* Mobile */}
//                   <div className="md:hidden">
//                     <TriggerButton onClick={() => setOpenModal("time")}>
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
//                     </TriggerButton>
//                   </div>
//                   {/* Desktop */}
//                   <div className="hidden md:block">
//                     <TriggerButton
//                       onClick={() => toggleDropdown("dropoff-time")}
//                       active={openDropdown === "dropoff-time"}
//                     >
//                       <ClockIcon />
//                       <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
//                     </TriggerButton>
//                     {openDropdown === "dropoff-time" && (
//                       <TimePickerDropdown
//                         isOpen
//                         onClose={() => setOpenDropdown(null)}
//                         onSelect={(h, m) => { setDropoffTime({ hour: h, minute: m }); setOpenDropdown(null); }}
//                         selectedHour={dropoffTime.hour}
//                         selectedMinute={dropoffTime.minute}
//                         label="Drop-off time"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* ── Search button ── */}
//               <div className="shrink-0 w-full md:w-auto">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full md:w-auto bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 sm:py-3 px-5 rounded-md transition-colors whitespace-nowrap hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? "Searching..." : "Search"}
//                 </button>
//               </div>
//             </div>

//             {serverError && (
//               <p className="text-xs text-red-400 mt-2 ml-1">{serverError}</p>
//             )}
//           </div>
//         </form>
//       </section>

//       {/* ── Mobile-only modals ── */}
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
//         isOpen={openModal === "time"}
//         onClose={() => setOpenModal(null)}
//         onSelectBoth={(pickup, dropoff) => {
//           setPickupTime(pickup);
//           setDropoffTime(dropoff);
//         }}
//         initialPickupHour={pickupTime.hour}
//         initialPickupMinute={pickupTime.minute}
//         initialDropoffHour={dropoffTime.hour}
//         initialDropoffMinute={dropoffTime.minute}
//         pickupDate={dateRange.start}
//         dropoffDate={dateRange.end}
//       />
//     </>
//   );
// }

// /* ── Shared sub-components ── */

// function CalendarIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//     </svg>
//   );
// }

// function ClockIcon() {
//   return (
//     <svg className="w-4 h-4 text-gray-400 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//     </svg>
//   );
// }

// function TriggerButton({
//   onClick,
//   children,
//   disabled = false,
//   hasError = false,
//   active = false,
// }: {
//   onClick: () => void;
//   children: React.ReactNode;
//   disabled?: boolean;
//   hasError?: boolean;
//   active?: boolean;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={disabled}
//       className={`w-full flex items-center justify-between rounded-md p-3 sm:p-3 border bg-white transition-colors text-left hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
//         ${hasError
//           ? "border-red-300 hover:border-red-400"
//           : active
//             ? "border-[#ffc107] ring-2 ring-[#ffc107]/30"
//             : "border-gray-300 hover:border-[#ffc107]"
//         }`}
//     >
//       <div className="flex items-center min-w-0 flex-1">{children}</div>
//     </button>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CityPickerModal from "@/components/search/CityPickerModal";
import DatePickerModal, { DateRange } from "@/components/search/DatePickerModal";
import TimePickerModal from "@/components/search/TimePickerModal";
import DatePickerDropdown from "@/components/search/DatePickerDropdown";
import TimePickerDropdown from "@/components/search/TimePickerDropdown";
import { City } from "@/types/city";
import { searchSchema } from "@/lib/validations/searchSchema";
import { searchVehiclesAction } from "@/actions/searchVehicles";
import { FieldError } from "../ui/FieldError";

function getDefaults() {
  const now = new Date();
  const pickup = new Date(now);
  pickup.setHours(now.getHours() + 2, 0, 0, 0);
  const dropoff = new Date(pickup);
  dropoff.setDate(dropoff.getDate() + 1);
  return { pickup, dropoff };
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

type ModalType = "city" | "date" | "time" | null;
type DropdownType = "date" | "pickup-time" | "dropoff-time" | null;

export interface SelectedCity { id: number; name: string; }
interface SearchWidgetProps { cities: City[]; citiesError: string | null; }

export default function SearchWidget({ cities, citiesError }: SearchWidgetProps) {
  const defaults = getDefaults();
  const router = useRouter();

  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({ start: defaults.pickup, end: defaults.dropoff });
  const [pickupTime, setPickupTime] = useState({ hour: defaults.pickup.getHours(), minute: 0 });
  const [dropoffTime, setDropoffTime] = useState({ hour: defaults.dropoff.getHours(), minute: 0 });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const pickupDateRef = useRef<HTMLDivElement>(null);
  const dropoffDateRef = useRef<HTMLDivElement>(null);
  const pickupTimeRef = useRef<HTMLDivElement>(null);
  const dropoffTimeRef = useRef<HTMLDivElement>(null);

  function handleDateSelect(range: DateRange) {
    setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
    setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
  }

  function handleDateChange(range: DateRange) {
    setDateRange(range.end < range.start ? { start: range.start, end: range.start } : range);
    setErrors(e => ({ ...e, dropoff_datetime: "", pickup_datetime: "" }));
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setOpenDropdown(null);

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
    setIsLoading(true);

    try {
      const response = await searchVehiclesAction({
        city_id: selectedCity!.id,
        city_name: selectedCity!.name,
        pickup_datetime,
        dropoff_datetime,
      });

      if (!response.success) {
        if (response.errors) setErrors(response.errors);
        if (response.message) setServerError(response.message);
        return;
      }

      router.push(
        `/searchresult?city=${selectedCity!.id}&pickup=${pickup_datetime.toISOString()}&dropoff=${dropoff_datetime.toISOString()}`
      );
    } finally {
      setIsLoading(false);
    }
  }

  function toggleDropdown(type: DropdownType) {
    setOpenDropdown(prev => prev === type ? null : type);
  }

  return (
    <>
      <section className="relative z-20 px-4 lg:px-8 -mt-12 mx-auto xl:mx-[121.5px] xl:px-0">
        <form onSubmit={handleSearch} noValidate>

          {/* ── Mobile: light frosted glass ── */}
          <div
            className="md:hidden rounded-md p-4 border border-gray-400/70"
            style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <MobileFields
              citiesError={citiesError}
              errors={errors}
              selectedCity={selectedCity}
              dateRange={dateRange}
              pickupTime={pickupTime}
              dropoffTime={dropoffTime}
              isLoading={isLoading}
              serverError={serverError}
              setOpenModal={setOpenModal}
            />
          </div>

          {/* ── Desktop (md+): dark frosted glass ── */}
          <div
            className="hidden md:block rounded-md p-4 border border-white/30"
            style={{
              background: 'rgba(0,0,0,0.52)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex flex-nowrap items-end gap-2">

              {/* City */}
              <div className="relative flex-1 min-w-0">
                <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Select City</label>
                <TriggerButton
                  onClick={() => setOpenModal("city")}
                  disabled={!!citiesError}
                  hasError={!!errors.city_id}
                  dark
                >
                  <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span className="flex-1 text-sm font-medium text-gray-900 truncate">
                    {citiesError ? "Failed to load" : selectedCity?.name ?? "Select a city"}
                  </span>
                </TriggerButton>
                <FieldError message={errors.city_id} />
              </div>

              {/* Pick-up date */}
              <div ref={pickupDateRef} className="relative w-[130px] shrink-0">
                <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Pick-up date</label>
                <TriggerButton
                  onClick={() => toggleDropdown("date")}
                  hasError={!!errors.pickup_datetime}
                  active={openDropdown === "date"}
                  dark
                >
                  <CalendarIcon dark />
                  <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatDate(dateRange.start)}</span>
                </TriggerButton>
                {openDropdown === "date" && (
                  <DatePickerDropdown
                    isOpen
                    onClose={() => setOpenDropdown(null)}
                    onSelect={(range) => { handleDateSelect(range); setOpenDropdown(null); }}
                    onDateChange={handleDateChange}
                    initialRange={dateRange}
                  />
                )}
                <FieldError message={errors.pickup_datetime} />
              </div>

              {/* Pick-up time */}
              <div ref={pickupTimeRef} className="relative w-[120px] shrink-0">
                <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Time</label>
                <TriggerButton
                  onClick={() => toggleDropdown("pickup-time")}
                  active={openDropdown === "pickup-time"}
                  dark
                >
                  <ClockIcon dark />
                  <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
                </TriggerButton>
                {openDropdown === "pickup-time" && (
                  <TimePickerDropdown
                    isOpen
                    onClose={() => setOpenDropdown(null)}
                    onSelect={(h, m) => { setPickupTime({ hour: h, minute: m }); setOpenDropdown(null); }}
                    selectedHour={pickupTime.hour}
                    selectedMinute={pickupTime.minute}
                    label="Pick-up time"
                  />
                )}
              </div>

              {/* Drop-off date */}
              <div ref={dropoffDateRef} className="relative w-[130px] shrink-0">
                <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Drop-off date</label>
                <TriggerButton
                  onClick={() => toggleDropdown("date")}
                  hasError={!!errors.dropoff_datetime}
                  active={openDropdown === "date"}
                  dark
                >
                  <CalendarIcon dark />
                  <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatDate(dateRange.end)}</span>
                </TriggerButton>
                <FieldError message={errors.dropoff_datetime} />
              </div>

              {/* Drop-off time */}
              <div ref={dropoffTimeRef} className="relative w-[120px] shrink-0">
                <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">Time</label>
                <TriggerButton
                  onClick={() => toggleDropdown("dropoff-time")}
                  active={openDropdown === "dropoff-time"}
                  dark
                >
                  <ClockIcon dark />
                  <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
                </TriggerButton>
                {openDropdown === "dropoff-time" && (
                  <TimePickerDropdown
                    isOpen
                    onClose={() => setOpenDropdown(null)}
                    onSelect={(h, m) => { setDropoffTime({ hour: h, minute: m }); setOpenDropdown(null); }}
                    selectedHour={dropoffTime.hour}
                    selectedMinute={dropoffTime.minute}
                    label="Drop-off time"
                  />
                )}
              </div>

              {/* Search button */}
              <div className="shrink-0">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 px-5 rounded-md transition-colors whitespace-nowrap hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {serverError && (
              <p className="text-xs text-red-400 mt-2 ml-1">{serverError}</p>
            )}
          </div>

        </form>
      </section>

      {/* ── Modals (shared, mobile-triggered) ── */}
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
        isOpen={openModal === "time"}
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
    </>
  );
}

/* ── Mobile fields (light theme) ── */
function MobileFields({
  citiesError, errors, selectedCity, dateRange, pickupTime, dropoffTime,
  isLoading, serverError, setOpenModal,
}: {
  citiesError: string | null;
  errors: Record<string, string>;
  selectedCity: { id: number; name: string } | null;
  dateRange: { start: Date; end: Date };
  pickupTime: { hour: number; minute: number };
  dropoffTime: { hour: number; minute: number };
  isLoading: boolean;
  serverError: string | null;
  setOpenModal: (m: "city" | "date" | "time" | null) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* City */}
      <div className="relative w-full">
        <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Select City</label>
        <TriggerButton onClick={() => setOpenModal("city")} disabled={!!citiesError} hasError={!!errors.city_id}>
          <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="flex-1 text-sm font-medium text-gray-900 truncate">
            {citiesError ? "Failed to load" : selectedCity?.name ?? "Select a city"}
          </span>
        </TriggerButton>
        <FieldError message={errors.city_id} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Pick-up date */}
        <div className="relative w-full">
          <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Pick-up date</label>
          <TriggerButton onClick={() => setOpenModal("date")} hasError={!!errors.pickup_datetime}>
            <CalendarIcon />
            <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatDate(dateRange.start)}</span>
          </TriggerButton>
          <FieldError message={errors.pickup_datetime} />
        </div>

        {/* Pick-up time */}
        <div className="relative w-full">
          <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
          <TriggerButton onClick={() => setOpenModal("time")}>
            <ClockIcon />
            <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatTime(pickupTime.hour, pickupTime.minute)}</span>
          </TriggerButton>
        </div>

        {/* Drop-off date */}
        <div className="relative w-full">
          <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Drop-off date</label>
          <TriggerButton onClick={() => setOpenModal("date")} hasError={!!errors.dropoff_datetime}>
            <CalendarIcon />
            <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatDate(dateRange.end)}</span>
          </TriggerButton>
          <FieldError message={errors.dropoff_datetime} />
        </div>

        {/* Drop-off time */}
        <div className="relative w-full">
          <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">Time</label>
          <TriggerButton onClick={() => setOpenModal("time")}>
            <ClockIcon />
            <span className="text-sm font-medium whitespace-nowrap text-gray-900">{formatTime(dropoffTime.hour, dropoffTime.minute)}</span>
          </TriggerButton>
        </div>
      </div>

      {/* Search button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#ffc107] hover:bg-yellow-500 text-black font-semibold py-3 px-5 rounded-md transition-colors whitespace-nowrap hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>

      {serverError && (
        <p className="text-xs text-red-500 mt-1 ml-1">{serverError}</p>
      )}
    </div>
  );
}

/* ── Icons ── */
function CalendarIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg className={`w-4 h-4 mr-1 shrink-0 ${dark ? "text-gray-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg className={`w-4 h-4 mr-1 shrink-0 ${dark ? "text-gray-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

/* ── TriggerButton ── */
function TriggerButton({
  onClick,
  children,
  disabled = false,
  hasError = false,
  active = false,
  dark = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  hasError?: boolean;
  active?: boolean;
  dark?: boolean;
}) {
  const base = "w-full flex items-center justify-between rounded-md p-3 border transition-colors text-left hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

  const darkStyles = hasError
    ? "bg-white border-red-400 hover:border-red-300"
    : active
      ? "bg-white border-[#ffc107] ring-2 ring-[#ffc107]/30"
      : "bg-white border-white/20 hover:border-[#ffc107]";

  const lightStyles = hasError
    ? "bg-white border-red-300 hover:border-red-400"
    : active
      ? "bg-white border-[#ffc107] ring-2 ring-[#ffc107]/30"
      : "bg-white border-gray-300 hover:border-[#ffc107]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${dark ? darkStyles : lightStyles}`}
    >
      <div className="flex items-center min-w-0 flex-1">{children}</div>
    </button>
  );
}