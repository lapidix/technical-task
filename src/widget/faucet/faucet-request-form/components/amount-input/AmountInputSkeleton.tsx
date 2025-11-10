export const AmountInputSkeleton = () => {
  return (
    <div className="px-2 py-2">
      <div className="h-4 w-28 bg-[#3A3D3A] rounded animate-pulse mb-3" />
      <div className="h-12 w-full bg-transparent rounded-lg border border-[#3A3D3A] animate-pulse" />
      <div className="h-3 w-48 bg-[#3A3D3A] rounded animate-pulse mt-2" />
    </div>
  );
};
