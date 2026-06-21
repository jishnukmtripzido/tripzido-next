import Header from "@/components/layout/Header";

export default function Loading() {
  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#ffc107] border-t-transparent animate-spin" />
          <span className="text-sm text-gray-400 font-medium">Loading…</span>
        </div>
      </div>
    </>
  );
}
