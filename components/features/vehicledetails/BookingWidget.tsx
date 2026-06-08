"use client"; // This component needs interactivity for selections

import Link from "next/link";

export default function BookingWidget() {
  return (
    <div className="sticky top-8 bg-white border border-gray-200 rounded-md  p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Select Package</h3>

      <div className="relative mb-6">
        <select className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-medium">
          <option>Daily Package (₹ 499 per Day)</option>
          <option>Weekly Package (₹ 3000 per Week)</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 mb-4">Fare Details</h3>

      <div className="space-y-3 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span>Rent Amount</span>
          <span className="font-medium text-gray-900">₹ 998.00</span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-medium text-gray-900">₹ 998.00</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>
            Remaining Rent{" "}
            <span className="text-xs">(To be paid at pickup)</span>
          </span>
          <span>₹ 798.40</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Advance Payment</span>
          <span>₹ 199.60</span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-gray-900">Amount Payable Today</span>
        <span className="text-xl font-bold text-gray-900">₹ 199.60</span>
      </div>

      <div className="bg-green-50 text-green-700 text-xs font-medium px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        Refundable Deposit - ₹0 (To be paid at pickup)
      </div>

      <Link
        href="/checkout"
        className="w-full inline-block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl transition duration-200"
      >
        Book Now
      </Link>

      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Cancellation Policy
        </a>
      </div>
    </div>
  );
}
