export const VaultInformationSkeleton = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="h-7 w-10 bg-[#2A2D2A] rounded animate-pulse" />
        <div className="w-5 h-5 bg-[#2A2D2A] rounded-full animate-pulse" />
        <div className="h-7 w-32 bg-[#2A2D2A] rounded animate-pulse" />
      </div>
      <div className="h-4 w-48 bg-[#2A2D2A] rounded animate-pulse" />
    </div>
  );
};
