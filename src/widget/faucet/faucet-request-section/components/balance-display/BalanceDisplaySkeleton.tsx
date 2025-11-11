export const BalanceDisplaySkeleton = () => {
  return (
    <div className="px-2 py-2">
      <div className="h-4 w-32 bg-[#3A3D3A] rounded animate-pulse mb-1" />
      <div className="flex items-center gap-2">
        <div className="h-8 w-24 bg-[#3A3D3A] rounded animate-pulse" />
        <div className="h-6 w-16 bg-[#3A3D3A] rounded animate-pulse" />
      </div>
    </div>
  );
};
