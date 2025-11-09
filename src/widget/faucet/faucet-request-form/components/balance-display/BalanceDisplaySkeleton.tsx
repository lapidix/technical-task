export const BalanceDisplaySkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
