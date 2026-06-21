"use client";

export default function BasicDetails() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your basic details and contact information.
        </p>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* User Details Form Grid */}
          <div className="lg:col-span-2 space-y-8">
            <DetailRow label="Name" value="jishnu km" editable />

            <div className="border-t border-gray-100 pt-6">
              <DetailRow
                label="Email"
                value="jishnukm2010@gmail.com"
                editable
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Mobile Number
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-base font-semibold text-gray-900">
                      (+91) 9048820586
                    </p>
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <DetailRow label="Address" value="Not Provided" editable />
            </div>
          </div>

          {/* Privacy Context Banner (Moved to sidebar column for better layout) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex gap-3 items-start">
                <div className="text-gray-400 mt-0.5">
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
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Details Tripzido uses to verify your identity can't be
                  changed. Some personal details can be edited, but we may ask
                  you to verify your identity the next time you book or create a
                  listing.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex gap-3 items-start">
                <div className="text-gray-400 mt-0.5">
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
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Personal info that you've shared with us, like email, address
                  and options to manage it. This info is private to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable component for the data rows
function DetailRow({
  label,
  value,
  editable,
}: {
  label: string;
  value: string;
  editable?: boolean;
}) {
  return (
    <div className="flex justify-between items-center group">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
      </div>
      {editable && (
        <button className="text-sm font-semibold text-[#ffc107] hover:text-[#e6ac00] transition-colors underline-offset-4 group-hover:underline">
          Edit
        </button>
      )}
    </div>
  );
}
