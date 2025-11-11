export const TokenInformationSkeleton = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1.5">
        <div className="h-7 w-20 bg-[#2A2D2A] rounded animate-pulse" />
        <div className="w-5 h-5 bg-[#2A2D2A] rounded-full animate-pulse" />
        <div className="h-7 w-16 bg-[#2A2D2A] rounded animate-pulse" />
      </div>
      <div className="h-4 w-40 bg-[#2A2D2A] rounded animate-pulse" />
    </div>
  );
};
