export default function ProfileLoading() {
  return (
    <div className="animate-pulse flex flex-col md:flex-row gap-8">
      {/* Sidebar Skeleton */}
      <div className="w-full md:w-1/4 bg-white rounded-2xl h-[400px] shadow-sm border border-gray-100"></div>
      {/* Content Skeleton */}
      <div className="w-full md:w-3/4 space-y-6">
        <div className="h-12 w-48 bg-gray-200 rounded-lg"></div>
        <div className="bg-white rounded-2xl h-[500px] shadow-sm border border-gray-100"></div>
      </div>
    </div>
  );
}
