"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/actions/profile.actions";
import type { Profile } from "@/types/profile.types";
import EditFieldModal from "./EditFieldModal";

type EditableField = "name" | "email" | "address" | null;

export default function BasicDetails() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingField, setEditingField] = useState<EditableField>(null);

  useEffect(() => {
    let isMounted = true;
    getProfile().then((data) => {
      if (isMounted) {
        setProfile(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (
    field: "name" | "email" | "address",
    value: string,
  ) => {
    const result = await updateProfile({ [field]: value });
    if (result.success && result.data) {
      setProfile(result.data);
    }
    return { success: result.success, message: result.message };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-pulse space-y-8">
          <div className="h-5 w-1/3 bg-gray-100 rounded" />
          <div className="h-5 w-1/2 bg-gray-100 rounded" />
          <div className="h-5 w-1/4 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          Couldn&apos;t load your profile. Please try logging in again.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* User Details */}
          <div className="lg:col-span-2 divide-y divide-gray-100">
            <DetailRow
              icon={<UserGlyph />}
              label="Name"
              value={profile.name || "Not Provided"}
              editable
              onEdit={() => setEditingField("name")}
            />

            <DetailRow
              icon={<MailGlyph />}
              label="Email"
              value={profile.email || "Not Provided"}
              editable
              onEdit={() => setEditingField("email")}
            />

            <div className="flex justify-between items-start py-5">
              <div className="flex gap-3">
                <div className="mt-0.5 text-gray-300 shrink-0">
                  <PhoneGlyph />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Mobile Number
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-base font-semibold text-gray-900">
                      {profile.mobile_number}
                    </p>
                    {profile.mobile_verified && (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                        <CheckGlyph />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <DetailRow
              icon={<PinGlyph />}
              label="Address"
              value={profile.address || "Not Provided"}
              editable
              onEdit={() => setEditingField("address")}
            />
          </div>

          {/* Privacy Context Banner */}
          <div className="lg:col-span-1 space-y-5">
            <InfoCard
              icon={<ShieldGlyph />}
              text="Details Tripzido uses to verify your identity can't be changed. Some personal details can be edited, but we may ask you to verify your identity the next time you book or create a listing."
            />
            <InfoCard
              icon={<LockGlyph />}
              text="Personal info that you've shared with us, like email, address and options to manage it. This info is private to you."
            />
          </div>
        </div>
      </div>

      {editingField && (
        <EditFieldModal
          label={
            editingField === "name"
              ? "Name"
              : editingField === "email"
                ? "Email"
                : "Address"
          }
          initialValue={
            editingField === "name"
              ? profile.name
              : editingField === "email"
                ? profile.email || ""
                : profile.address
          }
          inputType={editingField === "email" ? "email" : "text"}
          onClose={() => setEditingField(null)}
          onSave={(value) => handleSave(editingField, value)}
        />
      )}
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <p className="text-sm text-gray-500 mt-1">
        Manage your basic details and contact information.
      </p>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  editable,
  onEdit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editable?: boolean;
  onEdit?: () => void;
}) {
  return (
    <div className="flex justify-between items-center gap-3 py-5 group">
      <div className="flex gap-3 min-w-0">
        <div className="mt-0.5 text-gray-300 shrink-0">{icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-base font-semibold text-gray-900 truncate">
            {value}
          </p>
        </div>
      </div>
      {editable && (
        <button
          onClick={onEdit}
          className="text-sm font-semibold text-brand-yellow hover:text-[#e6ac00] transition-colors underline-offset-4 group-hover:underline shrink-0"
        >
          Edit
        </button>
      )}
    </div>
  );
}

function InfoCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
      <div className="flex gap-3 items-start">
        <div className="text-gray-400 mt-0.5">{icon}</div>
        <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// ── Field icons ────────────────────────────────────────────────────────

function UserGlyph() {
  return (
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
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function MailGlyph() {
  return (
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
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PhoneGlyph() {
  return (
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
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function PinGlyph() {
  return (
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
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function ShieldGlyph() {
  return (
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
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function LockGlyph() {
  return (
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
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
