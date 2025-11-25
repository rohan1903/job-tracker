export default function DashboardLoading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-5">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

