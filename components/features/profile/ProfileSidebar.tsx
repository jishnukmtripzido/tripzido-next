"use client";

import { TabType } from "./ProfileContainer";

type ProfileSidebarProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

export default function ProfileSidebar({
  activeTab,
  setActiveTab,
}: ProfileSidebarProps) {
  const tabs = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "bookings", label: "Bookings", icon: CalendarIcon },
    // { id: "coins", label: "Go Coins", icon: WalletIcon },
  ] as const;

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden sticky top-24">
      {/* User Header */}
      <div className="flex flex-col items-center p-8 border-b border-gray-50">
        <div className="w-24 h-24 rounded-full bg-amber-100 border-4 border-white shadow-md flex items-center justify-center mb-4 overflow-hidden">
          {/* Placeholder for Avatar matching GoWheelo screenshot */}
          <svg
            className="w-16 h-16 text-[#ffc107] mt-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">jishnu km</h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 text-sm font-medium transition-all duration-200 border-l-4 ${
                isActive
                  ? "bg-amber-50 text-black border-[#ffc107]"
                  : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-[#ffc107]" : "text-gray-400"}`}
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// Simple internal SVG components for the sidebar
const UserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
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
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 13a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v8z"
    />
  </svg>
);
