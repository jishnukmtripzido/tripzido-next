export default function TermsAndConditions() {
  const terms = [
    "One Day will be considered from 9 am to 9 am.",
    "Documents Required: Aadhar Card and Driving License.",
    "One Original Govt Address Proof has to be submitted during pickup and will be returned during drop.",
    "Fuel Charges are not included in the security deposit or rent.",
  ];

  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Terms & Conditions
      </h2>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <ul className="space-y-3 text-sm text-gray-600">
          {terms.map((term, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
