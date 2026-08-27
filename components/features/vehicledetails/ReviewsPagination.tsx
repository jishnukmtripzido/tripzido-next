"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function ReviewsPagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("reviews_page", String(page));
    router.push(`${pathname}?${params.toString()}#reviews`, { scroll: false });
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-font-main-sub disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-300 cursor-pointer"
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((page, idx) => {
        const prevPage = pages[idx - 1];
        const showEllipsis = prevPage != null && page - prevPage > 1;
        return (
          <div key={page} className="flex items-center gap-1.5">
            {showEllipsis && (
              <span className="text-font-dim text-sm px-1">…</span>
            )}
            <button
              onClick={() => goToPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                page === currentPage
                  ? "bg-brand-yellow text-black"
                  : "border border-gray-200 text-font-main-sub hover:border-gray-300"
              }`}
            >
              {page}
            </button>
          </div>
        );
      })}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-font-main-sub disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-300 cursor-pointer"
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}
