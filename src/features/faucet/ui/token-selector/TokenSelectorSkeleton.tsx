export const TokenSelectorSkeleton = () => {
  return (
    <div>
      <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-3" />
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border-2 border-gray-700 bg-gray-800">
            <div className="mb-2 flex justify-center">
              <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
            </div>
            <div className="h-5 w-16 bg-gray-700 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};
