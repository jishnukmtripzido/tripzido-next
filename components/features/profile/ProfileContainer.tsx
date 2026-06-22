"use client";

import { useState } from "react";
import BookingsList from "./BookingsList";
import ProfileSidebar from "./ProfileSidebar";
import BasicDetails from "./BasicDetails";

export type TabType = "profile" | "bookings" | "coins";

export default function ProfileContainer() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-1/4 md:min-w-[280px]">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="w-full md:w-3/4">
        {activeTab === "profile" && <BasicDetails />}
        {activeTab === "bookings" && <BookingsList />}
        {activeTab === "coins" && (
          <div className="bg-white rounded-md p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-[400px]">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-brand-yellow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Go Coins</h2>
            <p className="text-gray-500 mt-2">
              You currently have 0 Go Coins available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
