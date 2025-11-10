export const TokenSelectorSkeleton = () => {
  return (
    <div className="px-2 py-2">
      <div className="h-4 w-24 bg-[#3A3D3A] rounded animate-pulse mb-3" />
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-[#3A3D3A] bg-[#3A3D3A]/30">
            <div className="mb-2 flex justify-center">
              <div className="w-8 h-8 bg-[#3A3D3A] rounded-full animate-pulse" />
            </div>
            <div className="h-5 w-16 bg-[#3A3D3A] rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};
