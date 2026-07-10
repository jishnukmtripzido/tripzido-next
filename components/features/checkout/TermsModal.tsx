"use client";

import { useState } from "react";

interface VendorTerms {
  title: string;
  items: string[];
}

interface PlatformTerms {
  title: string;
  contentHtml: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  payError: string | null;
  vendorTerms: VendorTerms | null;
  platformTerms: PlatformTerms | null;
  termsLoading: boolean;
  termsError: string | null;
}

export default function TermsModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  payError,
  vendorTerms,
  platformTerms,
  termsLoading,
  termsError,
}: Props) {
  const [accepted, setAccepted] = useState(false);

  if (!isOpen) return null;

  const canAccept = !termsLoading && !termsError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
        <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            Terms and Conditions
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="text-gray-800 hover:text-gray-900 text-xl leading-none disabled:opacity-50"
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto space-y-6 text-sm text-gray-700">
          {termsLoading && <p className="text-gray-500">Loading terms…</p>}

          {termsError && !termsLoading && (
            <p className="text-red-500">{termsError}</p>
          )}

          {!termsLoading && !termsError && vendorTerms && (
            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                {vendorTerms.title}
              </h3>
              <ul className="list-disc pl-5 space-y-1.5">
                {vendorTerms.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {!termsLoading && !termsError && platformTerms && (
            <section>
              <h3 className="font-semibold text-gray-900 mb-2">
                {platformTerms.title}
              </h3>
              {/*
                LegalDocument.content is admin-authored HTML/Markdown from
                Django, the same trust boundary as any CMS-driven block on
                the site — not user input. Still sanitize (e.g. DOMPurify)
                before shipping, in case an admin account is ever
                compromised or a future editor allows pasting raw HTML.
              */}
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: platformTerms.contentHtml }}
              />
            </section>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 shrink-0">
          {payError && <p className="text-sm text-red-500 mb-3">{payError}</p>}

          <label className="flex items-start gap-3 mb-4 cursor-pointer group">
            <input
              type="checkbox"
              className="w-5 h-5 mt-0.5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 cursor-pointer disabled:opacity-50"
              checked={accepted}
              disabled={!canAccept}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              I accept the terms and conditions
            </span>
          </label>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!accepted || !canAccept || isSubmitting}
              className={`flex-1 py-3 rounded-xl font-bold transition ${
                accepted && canAccept && !isSubmitting
                  ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
