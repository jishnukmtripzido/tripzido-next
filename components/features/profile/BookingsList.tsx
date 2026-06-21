"use client";

import { useState } from "react";
import Image from "next/image"; // Assuming you use Next/Image for vehicles

type BookingTab = "Confirmed" | "Pending" | "Cancelled";

export default function BookingsList() {
  const [currentTab, setCurrentTab] = useState<BookingTab>("Pending");

  const tabs: BookingTab[] = ["Confirmed", "Pending", "Cancelled"];

  // Hardcoded identical content based on screenshot
  const bookings = [
    {
      id: "#122242",
      vehicle: "Yamaha Fascino",
      bookingDate: "Jun 8, 2026 12:45 PM",
      location: "Calangute Beach",
      startDate: "Jun 8, 2026 01:00 PM",
      endDate: "Jun 9, 2026 01:00 PM",
      duration: "1 Day",
      paid: "₹ 199.60",
      deposit: "₹ 0.00",
      image: "https://via.placeholder.com/150?text=Fascino", // Replace with real asset path
    },
    {
      id: "#116639",
      vehicle: "Suzuki Access 125",
      bookingDate: "Apr 21, 2026 02:33 PM",
      location: "Satellite",
      startDate: "Apr 23, 2026 03:00 PM",
      endDate: "Apr 24, 2026 02:00 PM",
      duration: "23 Hours",
      paid: "₹ 149.75",
      deposit: "₹ 1000.00",
      image: "https://via.placeholder.com/150?text=Access", // Replace with real asset path
    },
    {
      id: "#116281",
      vehicle: "Yamaha Fascino",
      bookingDate: "Apr 17, 2026 07:14 AM",
      location: "KSRTC Bus Stand Alappuha",
      startDate: "Apr 18, 2026 07:00 AM",
      endDate: "Apr 19, 2026 07:00 AM",
      duration: "1 Day",
      paid: "₹ 279.60",
      deposit: "₹ 4000.00",
      image: "https://via.placeholder.com/150?text=Fascino", // Replace with real asset path
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your past and upcoming rides.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Internal Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`px-6 py-4 text-sm font-semibold transition-all relative ${
                currentTab === tab
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
              {currentTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#ffc107] rounded-t-md" />
              )}
            </button>
          ))}
        </div>

        {/* Bookings Feed */}
        <div className="p-6 space-y-6">
          {currentTab === "Pending" &&
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col xl:flex-row gap-6 p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
              >
                {/* Vehicle Image */}
                <div className="w-full xl:w-48 h-32 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative border border-gray-100">
                  {/* Using standard img for hardcode, recommend next/image for prod */}
                  <img
                    src={booking.image}
                    alt={booking.vehicle}
                    className="object-contain h-full w-full p-2 mix-blend-multiply"
                  />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.vehicle}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Booking ID : {booking.id} | Booking Date :{" "}
                        {booking.bookingDate}
                      </p>
                      <p className="text-sm font-medium text-gray-700 mt-1">
                        Hub Details : {booking.location}
                      </p>
                    </div>
                    <button className="text-xs font-bold text-[#ffc107] hover:text-[#e6ac00] uppercase tracking-wider hidden sm:block">
                      View Details
                    </button>
                  </div>

                  {/* Trip Details Footer */}
                  <div className="mt-6 flex flex-wrap gap-4 items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex items-center text-xs md:text-sm font-medium text-gray-600 gap-2 md:gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {booking.startDate}
                      </div>
                      <span className="text-gray-300 hidden md:block">---</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                        {booking.duration}
                      </span>
                      <span className="text-gray-300 hidden md:block">---</span>
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {booking.endDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <p className="text-sm font-bold text-gray-900">
                        Paid : {booking.paid}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        Deposit : {booking.deposit}
                      </p>
                    </div>

                    {/* View Details Mobile */}
                    <button className="text-xs font-bold text-[#ffc107] hover:text-[#e6ac00] uppercase tracking-wider sm:hidden mt-2 w-full text-center">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Handle empty states for other tabs */}
          {(currentTab === "Confirmed" || currentTab === "Cancelled") && (
            <div className="text-center py-12 text-gray-500">
              No {currentTab.toLowerCase()} bookings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
