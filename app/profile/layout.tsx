import ProfileSidebar from "@/components/features/profile/ProfileSidebar";
import Header from "@/components/layout/Header";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Full-width header — sits outside the constrained content
          wrapper so it stretches edge-to-edge like the rest of the site */}
      <Header
        logoWidth={4}
        logoHeight={4}
        logoTextSize="xl"
        linkIconsSize={4}
        headerLgScreenMx="xl:mx-[80.5px] xl:px-0"
        headerValues=" w-full  py-2 border-b border-gray-100 text-gray-900 shadow-sm md:shadow-none"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation — shared across every /profile/* route */}
          <div className="w-full md:w-1/4 md:min-w-[280px]">
            <ProfileSidebar />
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4">{children}</div>
        </div>
      </main>
    </>
  );
}
