import type {
  CancellationPolicy as CancellationPolicyType,
  CancellationRule,
} from "@/services/vehicleDetails.service";
import { getCancellationPolicyCached } from "@/lib/cache";

const MOCK_CANCELLATION_POLICY: CancellationPolicyType = {
  full_payment_rules: [
    {
      hours_before_pickup: 72,
      refund_percentage: 75,
      label: "More than 72 hours before pickup",
      description: "75% refund of advance payment.",
    },
    {
      hours_before_pickup: 24,
      refund_percentage: 25,
      label: "24 – 72 hours before pickup",
      description: "25% refund of advance payment.",
    },
    {
      hours_before_pickup: 0,
      refund_percentage: 0,
      label: "Less than 24 hours before pickup",
      description: "No refund.",
    },
  ],
  partial_payment_rules: [
    {
      hours_before_pickup: 0,
      refund_percentage: 0,
      label: "Any time before pickup",
      description: "No refund — the advance payment is non-refundable.",
    },
  ],
  note: "Refunds are processed within 5–7 business days to the original payment method.",
};

interface Props {
  vehicleId: number;
}

function RuleList({ rules }: { rules: CancellationRule[] }) {
  return (
    <div className="space-y-3">
      {rules.map((rule, idx) => (
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
    </div>
  );
}

export default async function CancellationPolicy({ vehicleId }: Props) {
  let policy: CancellationPolicyType;

  try {
    policy = await getCancellationPolicyCached(vehicleId);
  } catch {
    policy = MOCK_CANCELLATION_POLICY;
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Cancellation Policy
      </h2>

      <div className="space-y-5 bg-white">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Full Payment Bookings
          </h3>
          <RuleList rules={policy.full_payment_rules} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Partial Payment Bookings
          </h3>
          <RuleList rules={policy.partial_payment_rules} />
        </div>

        {policy.note && (
          <p className="text-xs text-font-dim pl-5">{policy.note}</p>
        )}
      </div>
    </div>
  );
}
