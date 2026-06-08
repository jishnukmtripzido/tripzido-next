import SearchModifyBar from "@/components/layout/SearchModifyBar";
import Breadcrumbs from "@/components/features/vehicledetails/Breadcrumbs";
import VehicleHeader from "@/components/features/vehicledetails/VehicleHeader";
import VehicleFeatures from "@/components/features/vehicledetails/VehicleFeatures";
import ThingsToRemember from "@/components/features/vehicledetails/ThingsToRemember";
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
        <main className="xl:mx-[80.5px] mx-auto px-4 xl:px-0 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-5 order-1 lg:order-none">
            <Breadcrumbs />
            <VehicleHeader />

            {/* Booking Widget — visible only on small screens, sits after VehicleHeader */}
            <div className="block lg:hidden">
              <BookingWidget />
            </div>

            <VehicleFeatures />
            <ThingsToRemember />
            <TermsAndConditions />
            <PickupLocation location="Wayanad" />
          </div>

          {/* Right Column: Sticky Booking Widget — hidden on small screens */}
          <div className="lg:col-span-4 relative hidden lg:block">
            <BookingWidget />
          </div>
        </main>
      </div>
    </>
  );
}
