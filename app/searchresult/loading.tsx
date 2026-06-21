// app/(search)/searchresult/loading.tsx

/**
 * Route-level fallback shown only for the brief window before the
 * static shell (header, search bar, filter/sort bar) reaches the
 * browser. Once the shell streams in, SearchResultsLoading takes
 * over as the Suspense fallback for the data-dependent part — this
 * file should rarely be visible for more than a flash.
 */
export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#ffc107] border-t-transparent animate-spin" />
        <span className="text-sm text-gray-400 font-medium">Loading…</span>
      </div>
    </div>
  );
}
