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

function refundColor(pct: number) {
  if (pct >= 100)
    return {
      dot: "bg-green-500",
      badge: "bg-green-50 text-green-700 border-green-200",
    };
  if (pct <= 0)
    return {
      dot: "bg-red-400",
      badge: "bg-red-50 text-red-700 border-red-200",
    };
  return {
    dot: "bg-yellow-400",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };
}

function RuleList({ rules }: { rules: CancellationRule[] }) {
  return (
    <div className="rounded-lg border border-gray-200 divide-y divide-gray-100 overflow-hidden">
      {rules.map((rule, idx) => {
        const colors = refundColor(rule.refund_percentage);
        return (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 px-4 py-3 bg-white"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span
                className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${colors.dot}`}
              />
              <span className="text-sm text-font-main-sub">{rule.label}</span>
            </div>
            <span
              className={`self-start sm:self-auto shrink-0 max-w-full text-xs font-semibold px-2.5 py-1 rounded-lg border whitespace-normal leading-snug ${colors.badge}`}
            >
              {rule.description}
            </span>
          </div>
        );
      })}
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

      <div className="space-y-5">
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

        {policy.note && <p className="text-xs text-font-dim">{policy.note}</p>}
      </div>
    </div>
  );
}
