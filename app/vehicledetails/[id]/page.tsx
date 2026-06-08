import SearchModifyBar from "@/components/layout/SearchModifyBar";
import Breadcrumbs from "@/components/features/vehicledetails/Breadcrumbs";
import VehicleHeader from "@/components/features/vehicledetails/VehicleHeader";
import ThingsToRemember from "@/components/features/vehicledetails/ThingsToRemember";
import VehicleFeatures from "@/components/features/vehicledetails/VehicleFeatures";
import TermsAndConditions from "@/components/features/vehicledetails/TermsAndConditions";
import PickupLocation from "@/components/features/vehicledetails/PickupLocation";
import BookingWidget from "@/components/features/vehicledetails/BookingWidget";

export default function VehicleDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <SearchModifyBar />
      <div className="min-h-screen bg-white flex items-center justify-center">
        <main className="max-w-6xl mx-auto px-4 xl:px-0 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-10">
            <Breadcrumbs />
            <VehicleHeader />
            <VehicleFeatures />
            <ThingsToRemember />

            <TermsAndConditions />
            <PickupLocation location="Wayanad" />
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4 relative">
            <BookingWidget />
          </div>
        </main>
      </div>
    </>
  );
}
