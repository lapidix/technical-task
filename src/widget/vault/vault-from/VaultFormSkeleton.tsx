"use client";

export const VaultFormSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Mode Tabs Skeleton */}
      <div className="px-6 py-4">
        <div className="flex gap-2 bg-gray-900 rounded-lg p-1">
          <div className="flex-1 h-10 bg-gray-800 rounded-md animate-pulse" />
          <div className="flex-1 h-10 bg-gray-800 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Top Content Skeleton */}
      <div className="flex-1 overflow-y-auto">
        {/* Token Info Skeleton */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-32 bg-gray-800 rounded animate-pulse" />
            <div className="w-8 h-8 bg-gray-800 rounded-full animate-pulse" />
            <div className="h-8 w-24 bg-gray-800 rounded animate-pulse" />
          </div>
          <div className="h-4 w-48 bg-gray-800 rounded animate-pulse mt-2" />
        </div>

        {/* Vault Info Skeleton */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-8 bg-gray-800 rounded animate-pulse" />
            <div className="w-6 h-6 bg-gray-800 rounded-full animate-pulse" />
            <div className="h-6 w-40 bg-gray-800 rounded animate-pulse" />
          </div>
          <div className="h-4 w-56 bg-gray-800 rounded animate-pulse mt-2" />
        </div>

        {/* Amount Input Skeleton */}
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="h-16 flex-1 bg-gray-800 rounded animate-pulse" />
            <div className="h-8 w-32 bg-gray-800 rounded animate-pulse ml-4" />
          </div>
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Fixed Bottom Section Skeleton */}
      <div className="border-t border-gray-800">
        {/* Action Button Skeleton */}
        <div className="px-6 mb-6">
          <div className="w-full h-14 bg-gray-800 rounded-lg animate-pulse" />
        </div>

        {/* Number Pad Skeleton */}
        <div className="px-6">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
