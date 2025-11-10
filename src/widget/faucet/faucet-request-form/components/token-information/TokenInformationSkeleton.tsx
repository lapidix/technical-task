export const TokenInformationSkeleton = () => {
  return (
    <div className="px-2 py-2 space-y-2">
      <div className="h-4 w-32 bg-[#3A3D3A] rounded animate-pulse" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-[#3A3D3A] rounded animate-pulse" />
          <div className="h-3 w-24 bg-[#3A3D3A] rounded animate-pulse" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-[#3A3D3A] rounded animate-pulse" />
          <div className="h-3 w-32 bg-[#3A3D3A] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
