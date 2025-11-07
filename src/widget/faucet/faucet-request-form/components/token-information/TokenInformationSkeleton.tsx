export const TokenInformationSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-24 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-32 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
