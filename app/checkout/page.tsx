import OrderSummary from "@/components/features/checkout/OrderSummary";
import FareDetails from "@/components/features/checkout/FareDetails";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col overflow-x-hidden mb-10">
      <main className="xl:mx-[80.5px] flex-grow mx-auto px-4 lg:px-0 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-8">
            <OrderSummary />
          </div>

          {/* Right Column: Fare Details & Payment */}
          {/* FIX: Removed 'sticky top-8' from this div */}
          <div className="lg:col-span-4">
            <FareDetails />
          </div>
        </div>
      </main>
    </div>
  );
}
