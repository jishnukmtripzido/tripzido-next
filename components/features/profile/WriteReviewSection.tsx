"use client";

import { useEffect, useState } from "react";
import StarRatingInput from "./StarRatingInput";
import {
  getBookingReview,
  submitBookingReview,
  updateBookingReview,
  deleteBookingReview,
} from "@/actions/bookings.actions";
import type { BookingReview, ReviewCriterion } from "@/types/booking.types";

const CRITERIA: { key: ReviewCriterion; label: string }[] = [
  { key: "VEHICLE_CONDITION", label: "Vehicle & Mechanical Condition" },
  { key: "CLEANLINESS", label: "Cleanliness & Hygiene" },
  { key: "VENDOR_BEHAVIOR", label: "Vendor Communication & Behavior" },
  { key: "HANDOVER_PROCESS", label: "Pickup & Return Experience" },
  { key: "VALUE_FOR_MONEY", label: "Value for Money" },
];

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function StarDisplay({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-200"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

interface Props {
  bookingId: number;
  vehicleName: string;
}

export default function WriteReviewSection({ bookingId, vehicleName }: Props) {
  const [loading, setLoading] = useState(true);
  const [existingReview, setExistingReview] = useState<BookingReview | null>(
    null,
  );
  const [formOpen, setFormOpen] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getBookingReview(bookingId)
      .then((review) => {
        if (cancelled) return;
        setExistingReview(review);
        if (review) {
          const initial: Record<string, number> = {};
          (review.ratings ?? []).forEach((r) => {
            initial[r.criterion] = r.score;
          });
          setScores(initial);
          setReviewText(review.review_text ?? "");
        }
      })
      .catch(() => {
        // Supplementary feature — fail quietly, customer can still try to write one.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  // A review row can exist in the database (e.g. a stray/legacy row)
  // with zero ratings and no text. From the customer's point of view
  // that's not a real review — it should look and behave exactly like
  // "no review yet", not like something they wrote. hasContent is the
  // single source of truth for which view renders; existingReview
  // itself is still used separately to decide POST vs PATCH on submit,
  // since a row already existing means POST would hit "already_reviewed".
  const existingRatings = existingReview?.ratings ?? [];
  const hasContent =
    existingRatings.length > 0 ||
    (existingReview?.review_text ?? "").trim().length > 0;
  const isReviewed = existingReview !== null && hasContent;

  const ratedCount = Object.keys(scores).length;
  const canSubmit = ratedCount > 0 && !submitting;

  async function handleSubmit() {
    setError(null);
    if (ratedCount === 0) {
      setError("Please rate at least one thing before submitting.");
      return;
    }
    setSubmitting(true);
    const ratings = Object.entries(scores).map(([criterion, score]) => ({
      criterion: criterion as ReviewCriterion,
      score,
    }));

    let result = existingReview
      ? await updateBookingReview(bookingId, reviewText, ratings)
      : await submitBookingReview(bookingId, reviewText, ratings);

    // Self-heals a stale-client scenario: the frontend thought a
    // review row already existed and tried PATCH, but the backend has
    // no matching row (e.g. it was deleted elsewhere, or local state
    // was stale) — retry once via POST instead of leaving the customer
    // stuck on a confusing "not found" error for what is, to them, a
    // normal first-time submission. Scoped tightly to the "not found"
    // message so it never masks a genuinely different error (like
    // "You can only review a completed booking.").
    if (
      !result.success &&
      existingReview &&
      result.message?.toLowerCase().includes("not found")
    ) {
      result = await submitBookingReview(bookingId, reviewText, ratings);
    }

    setSubmitting(false);

    if (!result.success || !result.data) {
      setError(result.message ?? "Something went wrong. Please try again.");
      return;
    }
    setExistingReview(result.data);
    setFormOpen(false);
  }

  async function handleDelete() {
    setDeleteError(null);
    setDeleting(true);

    const result = await deleteBookingReview(bookingId);

    setDeleting(false);

    if (!result.success) {
      setDeleteError(
        result.message ?? "Unable to delete review. Please try again.",
      );
      return;
    }

    setExistingReview(null);
    setScores({});
    setReviewText("");
    setConfirmDelete(false);
  }

  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 sm:p-8 animate-pulse">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
        <div className="h-4 w-full bg-gray-100 rounded" />
      </div>
    );
  }

  // ── Already reviewed — summary view ───────────────────────────────
  if (isReviewed && !formOpen) {
    const ratings = existingRatings;
    const avg =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        : null;

    return (
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Your Review</h3>
            {avg !== null && (
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarDisplay key={s} filled={s <= Math.round(avg)} />
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  {avg.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {!confirmDelete && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="text-sm font-semibold text-gray-700 border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                Edit Review
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-sm font-semibold text-red-600 border border-red-200 rounded-md px-4 py-2 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {confirmDelete && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-red-700">
              Delete this review? This can&rsquo;t be undone.
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setConfirmDelete(false);
                  setDeleteError(null);
                }}
                disabled={deleting}
                className="text-sm font-semibold text-gray-600 border border-gray-200 bg-white rounded-md px-4 py-2 hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        )}

        {deleteError && (
          <p className="text-sm text-red-600 mt-3">{deleteError}</p>
        )}

        {existingReview?.review_text?.trim() && (
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
            &ldquo;{existingReview.review_text}&rdquo;
          </p>
        )}

        {existingReview?.moderation_status === "PENDING" && (
          <p className="text-xs text-amber-600 mt-3">
            Your review is awaiting moderation and will appear publicly once
            approved.
          </p>
        )}

        {ratings.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {ratings.map((r) => (
              <span
                key={r.criterion}
                className="text-[11px] bg-gray-50 border border-gray-200 text-gray-500 rounded-full px-2.5 py-1"
              >
                {r.criterion_label}: {r.score}/5
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── No review yet (or an empty/stray row) — collapsed CTA ─────────
  if (!isReviewed && !formOpen) {
    return (
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            How was your ride?
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Share your experience with the {vehicleName} to help other riders.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="shrink-0 bg-brand-yellow hover:bg-[#e6ac00] text-black font-semibold px-5 py-2.5 rounded-md transition-colors"
        >
          Add Review
        </button>
      </div>
    );
  }

  // ── Form (create or edit) ─────────────────────────────────────────
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-gray-900">
          {isReviewed ? "Edit Your Review" : "Add a Review"}
        </h3>
        <button
          type="button"
          onClick={() => setFormOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {CRITERIA.map(({ key, label }) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2"
          >
            <span className="text-sm text-gray-700">{label}</span>
            <StarRatingInput
              value={scores[key] ?? 0}
              onChange={(score) =>
                setScores((prev) => ({ ...prev, [key]: score }))
              }
              size="md"
              disabled={submitting}
            />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <label
          htmlFor="review_text"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tell us more (optional)
        </label>
        <textarea
          id="review_text"
          rows={4}
          maxLength={1000}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          disabled={submitting}
          placeholder="How was the vehicle, the pickup, the vendor..."
          className="w-full text-sm border border-gray-200 rounded-md p-3 resize-none focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 disabled:bg-gray-50"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {reviewText.length}/1000
        </p>
      </div>

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => setFormOpen(false)}
          disabled={submitting}
          className="text-sm font-semibold text-gray-600 border border-gray-200 rounded-md px-5 py-2.5 hover:bg-gray-50 transition-colors disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="text-sm font-semibold bg-brand-yellow hover:bg-[#e6ac00] text-black rounded-md px-5 py-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting
            ? "Submitting..."
            : isReviewed
              ? "Update Review"
              : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
