"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCancellationPreview,
  cancelBooking,
} from "@/actions/bookings.actions";
import {
  CANCELLATION_REASONS,
  type CancellationPreview,
  type CancellationReasonCode,
} from "@/types/booking.types";

type CancelBookingButtonProps = {
  bookingId: number;
};

export default function CancelBookingButton({
  bookingId,
}: CancelBookingButtonProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<CancellationPreview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const [reasonCode, setReasonCode] = useState<CancellationReasonCode>(
    CANCELLATION_REASONS[0].value,
  );
  const [reasonText, setReasonText] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    let isMounted = true;
    setIsLoadingPreview(true);
    setPreviewError(null);

    getCancellationPreview(bookingId).then((result) => {
      if (!isMounted) return;
      setIsLoadingPreview(false);
      if (result.success && result.data) {
        setPreview(result.data);
      } else {
        setPreviewError(
          result.message ?? "Unable to load cancellation details.",
        );
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isModalOpen, bookingId]);

  const openModal = () => {
    setCancelError(null);
    setReasonCode(CANCELLATION_REASONS[0].value);
    setReasonText("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isCancelling) return;
    setIsModalOpen(false);
    setPreview(null);
  };

  const handleConfirmCancel = async () => {
    setCancelError(null);

    if (reasonCode === "OTHER" && reasonText.trim().length === 0) {
      setCancelError("Please tell us a bit more when selecting 'Other'.");
      return;
    }

    setIsCancelling(true);
    const result = await cancelBooking(
      bookingId,
      reasonCode,
      reasonText.trim(),
    );
    setIsCancelling(false);

    if (!result.success) {
      setCancelError(result.message ?? "Unable to cancel booking.");
      return;
    }

    setIsModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 text-sm font-semibold rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
      >
        Cancel Booking
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Cancel this booking?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              This can&apos;t be undone. Here&apos;s what you&apos;ll get back.
            </p>

            {isLoadingPreview && (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
                <div className="h-4 w-1/2 bg-gray-100 rounded" />
              </div>
            )}

            {previewError && !isLoadingPreview && (
              <p className="text-sm text-red-600">{previewError}</p>
            )}

            {preview && !isLoadingPreview && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-2 mb-5">
                <Row
                  label="Amount Paid"
                  value={`₹ ${preview.paid_amount.toFixed(2)}`}
                />
                <Row
                  label="Refund"
                  value={`${preview.refund_percentage}% — ₹ ${preview.refundable_amount.toFixed(2)}`}
                  emphasize
                />
                <Row
                  label="Non-refundable"
                  value={`₹ ${preview.forfeited_amount.toFixed(2)}`}
                />
              </div>
            )}

            {preview &&
              preview.policy_rules.length > 0 &&
              !isLoadingPreview && (
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Refund Schedule
                  </p>
                  <div className="space-y-1.5">
                    {preview.policy_rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-xs px-3 py-2 rounded-md bg-gray-50 border border-gray-100"
                      >
                        <span className="text-gray-600">{rule.label}</span>
                        <span className="font-semibold text-gray-900">
                          {rule.refund_percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                  {preview.policy_note && (
                    <p className="text-xs text-gray-400 mt-2">
                      {preview.policy_note}
                    </p>
                  )}
                </div>
              )}

            {preview && !isLoadingPreview && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why are you cancelling?
                  </label>
                  <select
                    value={reasonCode}
                    onChange={(e) =>
                      setReasonCode(e.target.value as CancellationReasonCode)
                    }
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
                  >
                    {CANCELLATION_REASONS.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                {reasonCode === "OTHER" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tell us more
                    </label>
                    <textarea
                      value={reasonText}
                      onChange={(e) => setReasonText(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
                    />
                  </div>
                )}

                {cancelError && (
                  <p className="text-sm text-red-600">{cancelError}</p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                disabled={isCancelling}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelling || isLoadingPreview || !preview}
                className="px-4 py-2 text-sm font-semibold rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isCancelling ? "Cancelling..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span
        className={
          emphasize ? "font-bold text-gray-900" : "font-medium text-gray-700"
        }
      >
        {value}
      </span>
    </div>
  );
}
