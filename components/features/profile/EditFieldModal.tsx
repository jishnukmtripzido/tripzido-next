"use client";

import { useState } from "react";

type EditFieldModalProps = {
  label: string;
  initialValue: string;
  onClose: () => void;
  onSave: (value: string) => Promise<{ success: boolean; message: string }>;
  inputType?: "text" | "email";
};

export default function EditFieldModal({
  label,
  initialValue,
  onClose,
  onSave,
  inputType = "text",
}: EditFieldModalProps) {
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    setIsSaving(true);
    const result = await onSave(value.trim());
    setIsSaving(false);

    if (!result.success) {
      setError(result.message);
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Edit {label}</h3>

        <input
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ffc107]"
        />

        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || value.trim().length === 0}
            className="px-4 py-2 text-sm font-semibold rounded-md bg-[#ffc107] text-black hover:bg-[#e6ac00] transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
