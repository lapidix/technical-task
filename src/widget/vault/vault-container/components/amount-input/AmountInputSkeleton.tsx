export const AmountInputSkeleton = () => {
  return (
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
  );
};
