export default function SearchLoading() {
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 shadow-md animate-pulse">
            <div className="w-full h-40 bg-gray-200 rounded-md mb-2" />
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }