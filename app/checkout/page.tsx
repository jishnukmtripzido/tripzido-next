import OrderSummary from "@/components/features/checkout/OrderSummary";
import FareDetails from "@/components/features/checkout/FareDetails";

export default function CheckoutPage() {
  return (
    <div className=" min-h-screen font-sans text-gray-800 flex flex-col overflow-x-hidden mb-10">
      {/* FIX: Removed xl:mx-[80.5px] 
        Added max-w-7xl and mx-auto to contain the grid safely 
      */}
      <main className="flex-grow max-w-6xl mx-auto px-4 lg:px-0 py-4 w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Summary</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-8">
            <OrderSummary />
          </div>

          {/* Right Column: Fare Details & Payment */}
          <div className="lg:col-span-4 sticky top-8">
            <FareDetails />
          </div>
        </div>
      </main>
    </div>
  );
}
