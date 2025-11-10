export const VaultListItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between py-1.5 px-2 mb-4 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 bg-[#2A2D2A] rounded-full animate-pulse" />
        <div>
          <div className="h-6 w-32 bg-[#2A2D2A] rounded animate-pulse mb-1" />
          <div className="h-4 w-24 bg-[#1A1D1A] rounded animate-pulse" />
        </div>
      </div>

      <div className="h-7 w-16 bg-[#2A2D2A] rounded animate-pulse" />
    </div>
  );
};
