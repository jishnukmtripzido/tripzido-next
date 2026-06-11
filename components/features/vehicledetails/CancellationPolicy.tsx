// components/features/vehicledetails/CancellationPolicy.tsx
import { getCancellationPolicyApi } from "@/services/vehicleDetails.service";
import type { CancellationPolicy as CancellationPolicyType } from "@/services/vehicleDetails.service";

const MOCK_CANCELLATION_POLICY: CancellationPolicyType = {
  rules: [
    {
      hours_before_pickup: 48,
      refund_percentage: 100,
      label: "More than 48 hours before pickup",
      description: "Full refund of advance payment.",
    },
    {
      hours_before_pickup: 24,
      refund_percentage: 50,
      label: "24 – 48 hours before pickup",
      description: "50% refund of advance payment.",
    },
    {
      hours_before_pickup: 0,
      refund_percentage: 0,
      label: "Less than 24 hours before pickup",
      description: "No refund.",
    },
  ],
  note: "Refunds are processed within 5–7 business days to the original payment method.",
};

interface Props {
  vehicleId: number;
}

export default async function CancellationPolicy({ vehicleId }: Props) {
  let policy: CancellationPolicyType;

  try {
    policy = await getCancellationPolicyApi(vehicleId);
  } catch {
    policy = MOCK_CANCELLATION_POLICY;
  }

  return (
    <div className="mb-8 ">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Cancellation Policy
      </h2>
      <div className="border border-gray-200 lg:border-none rounded-md p-6 lg:p-0 space-y-3 bg-white">
        {policy.rules.map((rule, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div
              className={`mt-1.5 shrink-0 w-2 h-2 rounded-full ${
                rule.refund_percentage === 100
                  ? "bg-green-500"
                  : rule.refund_percentage === 0
                    ? "bg-red-400"
                    : "bg-yellow-400"
              }`}
            />
            <div className="text-sm">
              <span className="font-medium text-font-main-sub">
                {rule.label} :{" "}
              </span>
              <span className="text-font-main-sub">{rule.description}</span>
            </div>
          </div>
        ))}
        {policy.note && (
          <p className="text-xs text-font-dim mt-2 pl-5">{policy.note}</p>
        )}
      </div>
    </div>
  );
}
