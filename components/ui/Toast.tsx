"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onDismiss: () => void;
  /** Auto-dismiss delay in ms. Defaults to 5000 (5 seconds). */
  duration?: number;
  variant?: "error" | "success" | "info";
}

const VARIANT_STYLES: Record<
  NonNullable<ToastProps["variant"]>,
  { container: string; icon: string; dismiss: string }
> = {
  error: {
    container: "bg-red-50 border-red-200 text-red-600",
    icon: "text-red-500",
    dismiss: "text-red-400 hover:text-red-600",
  },
  success: {
    container: "bg-green-50 border-green-200 text-green-700",
    icon: "text-green-600",
    dismiss: "text-green-400 hover:text-green-600",
  },
  info: {
    container: "bg-gray-50 border-gray-200 text-gray-700",
    icon: "text-gray-500",
    dismiss: "text-gray-400 hover:text-gray-600",
  },
};

/**
 * Fixed-position toast notification. Renders itself only while mounted
 * by the parent (parent controls visibility via conditional render on
 * `message`), and auto-calls `onDismiss` after `duration` ms — the
 * timer restarts whenever `message` changes, so a new error while one
 * is already showing gets its own full 5 seconds.
 */
export default function Toast({
  message,
  onDismiss,
  duration = 5000,
  variant = "error",
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm px-4 sm:px-0"
    >
      <div
        className={`flex items-start gap-2 border text-sm font-medium rounded-lg shadow-lg px-4 py-3 ${styles.container}`}
      >
        <svg
          className={`w-5 h-5 shrink-0 mt-0.5 ${styles.icon}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <p className="flex-1">{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={`shrink-0 transition-colors ${styles.dismiss}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
