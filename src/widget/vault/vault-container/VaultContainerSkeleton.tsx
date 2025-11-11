export const VaultContainerSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Scrollable Content Skeleton */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 flex flex-col gap-8">
          {/* Token Info Skeleton */}
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="h-7 w-20 bg-[#2A2D2A] rounded animate-pulse" />
              <div className="w-5 h-5 bg-[#2A2D2A] rounded-full animate-pulse" />
              <div className="h-7 w-16 bg-[#2A2D2A] rounded animate-pulse" />
            </div>
            <div className="h-4 w-40 bg-[#2A2D2A] rounded animate-pulse" />
          </div>

          {/* Vault Info Skeleton */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-7 w-10 bg-[#2A2D2A] rounded animate-pulse" />
              <div className="w-5 h-5 bg-[#2A2D2A] rounded-full animate-pulse" />
              <div className="h-7 w-32 bg-[#2A2D2A] rounded animate-pulse" />
            </div>
            <div className="h-4 w-48 bg-[#2A2D2A] rounded animate-pulse" />
          </div>
        </div>

        {/* Amount Input Skeleton */}
        <div className="px-4 pt-6 pb-1.5">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 flex-1 bg-[#2A2D2A] rounded animate-pulse" />
            <div className="h-8 w-24 bg-[#2A2D2A] rounded animate-pulse ml-4" />
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-7 w-40 bg-[#2A2D2A] rounded animate-pulse" />
            <div className="h-7 w-16 bg-[#2A2D2A] rounded animate-pulse" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col py-2 px-4 gap-3">
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-[#2A2D2A] rounded-lg animate-pulse" />
            <div className="flex-1 h-10 bg-[#2A2D2A] rounded-lg animate-pulse" />
          </div>
          <div className="w-full h-10 bg-[#2A2D2A] rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};
