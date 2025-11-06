export const VaultOverviewSkeleton = () => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="h-10 w-32 bg-gray-800 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>

      {/* View My Vaults Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-6 w-40 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* My Stats Skeleton */}
      <div className="bg-gray-900 rounded-2xl p-6 grid grid-cols-2 gap-8">
        <div>
          <div className="h-5 w-32 bg-gray-800 rounded animate-pulse mb-2" />
          <div className="h-9 w-40 bg-gray-700 rounded animate-pulse" />
        </div>
        <div>
          <div className="h-5 w-32 bg-gray-800 rounded animate-pulse mb-2" />
          <div className="h-9 w-40 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
