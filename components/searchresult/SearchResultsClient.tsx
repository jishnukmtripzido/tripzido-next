// "use client";

// import { useState, useEffect } from "react";
// import BikeCard from "./BikeCard";
// import FilterSidebar from "./FilterSidebar";
// import FilterSortBar from "./FilterSortBar";
// import MobileFilterDrawer from "./MobileFilterDrawer";
// import MobileSearchBar from "./MobileSearchBar";
// import MobileSearchDrawer from "./MobileSearchDrawer";
// import SearchResultHeader from "./SearchResultHeader";
// import SearchResultHeaderSmallScreen from "./SearchResultHeaderSmallScreen";

// const BIKES = [
//   { id: 1, name: "Royal Enfield Himalayan", specs: "411cc · Adventure · Manual", rating: 4.8, reviewCount: 124, price: 1299, imageUrl: "https://media.publit.io/file/bike-T.png", badge: { text: "Most booked", color: "yellow" as const }, extras: ["Free helmet", "Fuel incl."] },
//   { id: 2, name: "Honda Activa 6G", specs: "110cc · Scooter · Automatic", rating: 4.2, reviewCount: 87, price: 499, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", badge: { text: "Best value", color: "green" as const }, extras: ["Free helmet", "Storage box"] },
//   { id: 3, name: "Royal Enfield Classic 350", specs: "349cc · Cruiser · Manual", rating: 4.6, reviewCount: 201, price: 899, imageUrl: "https://media.publit.io/file/bike-T.png", badge: { text: "Top rated", color: "blue" as const }, extras: ["Free helmet", "Roadside assist"] },
//   { id: 4, name: "Bajaj Pulsar NS200", specs: "199.5cc · Naked · Manual", rating: 4.1, reviewCount: 65, price: 649, imageUrl: "https://media.publit.io/file/bike-T.png", extras: ["Free helmet"] },
//   { id: 5, name: "Royal Enfield Thunderbird", specs: "349cc · Cruiser · Manual", rating: 4.7, reviewCount: 203, price: 999, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Iconic ride"] },
//   { id: 6, name: "TVS Apache RTR 160", specs: "159.7cc · Street · Manual", rating: 3.9, reviewCount: 42, price: 549, imageUrl: "https://media.publit.io/file/bike-T.png", extras: ["Free helmet"] },
//   { id: 7, name: "Honda CB Shine", specs: "124.7cc · Commuter · Manual", rating: 4.0, reviewCount: 58, price: 399, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Free cancellation"] },
//   { id: 8, name: "Yamaha MT-15", specs: "155cc · Naked · Manual", rating: 4.5, reviewCount: 93, price: 799, imageUrl: "https://media.publit.io/file/bike-T.png", badge: { text: "Popular", color: "yellow" as const }, extras: ["Free helmet", "Fuel incl."] },
//   { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
// ];

// const SORT_OPTIONS = [
//   { value: "recommended", label: "Recommended" },
//   { value: "price_asc", label: "Price: Low to High" },
//   { value: "price_desc", label: "Price: High to Low" },
//   { value: "top_rated", label: "Top rated" },
//   { value: "most_popular", label: "Most popular" },
// ];

// export default function SearchResultsClient() {
//   const [drawerMode, setDrawerMode] = useState<"filter" | "sort" | null>(null);
//   const [sortValue, setSortValue] = useState("recommended");
//   const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const THRESHOLD = 10;
//     const onScroll = () => setScrolled(window.scrollY > THRESHOLD);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const sortedBikes = [...BIKES].sort((a, b) => {
//     if (sortValue === "price_asc") return a.price - b.price;
//     if (sortValue === "price_desc") return b.price - a.price;
//     if (sortValue === "top_rated") return b.rating - a.rating;
//     return 0;
//   });

//   const sortLabel = SORT_OPTIONS.find((o) => o.value === sortValue)?.label ?? "Recommended";

//   return (
//     <>
//       {/* Mobile only — white header with logo */}
//       <SearchResultHeaderSmallScreen />

//       {/* Desktop only — yellow header with overlapping search widget */}
//       <SearchResultHeader
//         city="Wayanad"
//         pickupDate="Thu, May 7"
//         dropoffDate="Fri, May 8"
//         pickupTime="10:00 AM"
//         dropoffTime="10:00 AM"
//       />

//       {/* Mobile compact search pill */}
//       <MobileSearchBar
//         city="Wayanad"
//         pickupDate="Thu, May 7"
//         dropoffDate="Fri, May 8"
//         pickupTime="10:00 AM"
//         dropoffTime="10:00 AM"
//         onModify={() => setSearchDrawerOpen(true)}
//         visible={!scrolled}
//       />

//       {/* Mobile Filter + Sort bar */}
//       <FilterSortBar
//         onFilterClick={() => setDrawerMode("filter")}
//         onSortClick={() => setDrawerMode("sort")}
//         scrolled={scrolled}
//       />

//       {/* Main layout — outer div carries the full-width background */}
//       <div className="bg-[#FAFBFD] min-h-screen">
//         <div className="mx-auto px-4 pt-5 pb-6 xl:mx-[121.5px] xl:px-0 flex gap-6 items-start">
//           <aside className="hidden lg:block w-64 shrink-0  top-[130px] self-start">
//             <FilterSidebar />
//           </aside>

//           <div className="flex-1 min-w-0">
//             <div className="hidden md:flex items-center justify-between mb-4 flex-wrap gap-3">
//               <h1 className="font-medium text-black text-lg ">
//                 <span className="text-lg  ">{BIKES.length}</span> Bikes Available
//               </h1>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
//                 <div className="relative">
//                   <select
//                     value={sortValue}
//                     onChange={(e) => setSortValue(e.target.value)}
//                     className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm font-normal bg-white focus:outline-none focus:ring-2 focus:ring-[#ffc107] cursor-pointer"
//                   >
//                     {SORT_OPTIONS.map((opt) => (
//                       <option key={opt.value} value={opt.value}>{opt.label}</option>
//                     ))}
//                   </select>
//                   <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div className="md:hidden flex items-center justify-between mb-3">
//               <p className="text-sm font-medium text-black">
//                 <span className="font-semibold text-black">{BIKES.length}</span> Bikes · {sortLabel}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//               {sortedBikes.map((bike) => (
//                 <BikeCard key={bike.id} {...bike} />
//               ))}
//             </div>

//             <div className="mt-8 flex items-center justify-center gap-1">
//               <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center cursor-pointer">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                 </svg>
//               </button>
//               {[1, 2, 3, 4].map((p) => (
//                 <button key={p} className={`w-9 h-9 rounded-lg border text-sm font-medium cursor-pointer transition-colors ${p === 1 ? "bg-[#ffc107] border-[#ffc107] text-black" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
//                   {p}
//                 </button>
//               ))}
//               <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center cursor-pointer">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <MobileFilterDrawer
//         isOpen={drawerMode !== null}
//         onClose={() => setDrawerMode(null)}
//         mode={drawerMode ?? "filter"}
//         sortValue={sortValue}
//         onSortChange={setSortValue}
//       />

//       <MobileSearchDrawer
//         isOpen={searchDrawerOpen}
//         onClose={() => setSearchDrawerOpen(false)}
//       />
//     </>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import FilterSidebar from "./FilterSidebar";
import FilterSortBar from "./FilterSortBar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import MobileSearchBar from "./MobileSearchBar";
import MobileSearchDrawer from "./MobileSearchDrawer";
import SearchResultHeader from "./SearchResultHeader";
import SearchResultHeaderSmallScreen from "./SearchResultHeaderSmallScreen";

const BIKES = [
  { id: 1, name: "Royal Enfield Himalayan", specs: "411cc · Adventure · Manual", rating: 4.8, reviewCount: 124, price: 1299, imageUrl: "https://media.publit.io/file/bike-T.png", badge: { text: "Most booked", color: "yellow" as const }, extras: ["Free helmet", "Fuel incl."] },
  { id: 2, name: "Honda Activa 6G", specs: "110cc · Scooter · Automatic", rating: 4.2, reviewCount: 87, price: 499, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", badge: { text: "Best value", color: "green" as const }, extras: ["Free helmet", "Storage box"] },
  { id: 3, name: "Royal Enfield Classic 350", specs: "349cc · Cruiser · Manual", rating: 4.6, reviewCount: 201, price: 899, imageUrl: "https://media.publit.io/file/bike-T.png", badge: { text: "Top rated", color: "blue" as const }, extras: ["Free helmet", "Roadside assist"] },
  { id: 4, name: "Bajaj Pulsar NS200", specs: "199.5cc · Naked · Manual", rating: 4.1, reviewCount: 65, price: 649, imageUrl: "https://media.publit.io/file/bike-T.png", extras: ["Free helmet"] },
  { id: 5, name: "Royal Enfield Thunderbird", specs: "349cc · Cruiser · Manual", rating: 4.7, reviewCount: 203, price: 999, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Iconic ride"] },
  { id: 6, name: "TVS Apache RTR 160", specs: "159.7cc · Street · Manual", rating: 3.9, reviewCount: 42, price: 549, imageUrl: "https://media.publit.io/file/bike-T.png", extras: ["Free helmet"] },
  { id: 7, name: "Honda CB Shine", specs: "124.7cc · Commuter · Manual", rating: 4.0, reviewCount: 58, price: 399, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Free cancellation"] },
  { id: 8, name: "Yamaha MT-15", specs: "155cc · Naked · Manual", rating: 4.5, reviewCount: 93, price: 799, imageUrl: "https://media.publit.io/file/bike-T.png", badge: { text: "Popular", color: "yellow" as const }, extras: ["Free helmet", "Fuel incl."] },
  { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
   { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
    { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
     { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
      { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
       { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
        { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
         { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
          { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
           { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
            { id: 9, name: "Suzuki Access 125", specs: "124cc · Scooter · Automatic", rating: 4.3, reviewCount: 76, price: 449, imageUrl: "https://media.publit.io/file/ChatGPT-Image-May-5-2026-08-47-30-PM.png", extras: ["Free helmet", "Storage box"] },
            
];

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "top_rated", label: "Top rated" },
  { value: "most_popular", label: "Most popular" },
];

export default function SearchResultsClient() {
  const [drawerMode, setDrawerMode] = useState<"filter" | "sort" | null>(null);
  const [sortValue, setSortValue] = useState("recommended");
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // CHANGE: track which card has its dropdown open so we can elevate its z-index
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  useEffect(() => {
    const THRESHOLD = 10;
    const onScroll = () => setScrolled(window.scrollY > THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sortedBikes = [...BIKES].sort((a, b) => {
    if (sortValue === "price_asc") return a.price - b.price;
    if (sortValue === "price_desc") return b.price - a.price;
    if (sortValue === "top_rated") return b.rating - a.rating;
    return 0;
  });

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortValue)?.label ?? "Recommended";

  return (
    <>
      {/* Mobile only — white header with logo */}
      <SearchResultHeaderSmallScreen />

      {/* Desktop only — yellow header with overlapping search widget */}
      <SearchResultHeader
        city="Wayanad"
        pickupDate="Thu, May 7"
        dropoffDate="Fri, May 8"
        pickupTime="10:00 AM"
        dropoffTime="10:00 AM"
      />

      {/* Mobile compact search pill */}
      <MobileSearchBar
        city="Wayanad"
        pickupDate="Thu, May 7"
        dropoffDate="Fri, May 8"
        pickupTime="10:00 AM"
        dropoffTime="10:00 AM"
        onModify={() => setSearchDrawerOpen(true)}
        visible={!scrolled}
      />

      {/* Mobile Filter + Sort bar */}
      <FilterSortBar
        onFilterClick={() => setDrawerMode("filter")}
        onSortClick={() => setDrawerMode("sort")}
        scrolled={scrolled}
      />

      {/* Main layout — outer div carries the full-width background */}
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="mx-auto px-4 pt-5 pb-6 xl:mx-[121.5px] xl:px-0 flex gap-6 items-start">
          <aside className="hidden lg:block w-64 shrink-0 top-[130px] self-start">
            <FilterSidebar />
          </aside>

          <div className="flex-1 min-w-0">
            <div className="hidden md:flex items-center justify-between mb-4 flex-wrap gap-3">
              <h1 className="font-medium text-black text-xl">
                <span className="text-xl">{BIKES.length}</span> vehicles available
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                    className="appearance-none border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm font-normal bg-white focus:outline-none focus:ring-1 focus:ring-[#ffc107] focus:border-1 cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:hidden flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-black">
                <span className="font-semibold text-black">{BIKES.length}</span> Bikes · {sortLabel}
              </p>
            </div>

            {/*
              CHANGE 1: added `items-start` so grid rows don't stretch cards to equal height
              (equal height caused overflow clipping between rows).
              CHANGE 2: wrapped each BikeCard in a div whose z-index is elevated when
              its dropdown is active — this makes it paint above all sibling cards.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
              {sortedBikes.map((bike) => (
                <div
                  key={bike.id}
                  style={{ zIndex: activeCardId === bike.id ? 10 : 0, position: "relative" }}
                >
                  <BikeCard
                    {...bike}
                    onDropdownOpenChange={(open) =>
                      setActiveCardId(open ? bike.id : null)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-1">
              <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
              {[1, 2, 3, 4].map((p) => (
                <button key={p} className={`w-9 h-9 rounded-lg border text-sm font-medium cursor-pointer transition-colors ${p === 1 ? "bg-[#ffc107] border-[#ffc107] text-black" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
                  {p}
                </button>
              ))}
              <button className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        isOpen={drawerMode !== null}
        onClose={() => setDrawerMode(null)}
        mode={drawerMode ?? "filter"}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <MobileSearchDrawer
        isOpen={searchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
      />
    </>
  );
}