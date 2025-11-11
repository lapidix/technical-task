import { InformationIcon } from "@/shared/ui/icons/common";

export const VaultOverviewSkeleton = () => {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-end py-3">
            <h1 className="text-4xl font-medium self-end text-white">Vault</h1>
          </div>

          <div className="flex justify-center items-center gap-1.5 flex-shrink-0 border-[#2F332F] border px-2.5 py-2 rounded-3xl">
            <span className="text-[#8C938C] text-sm whitespace-nowrap">
              Total Supply
            </span>
            <div className="h-4 w-12 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <p className="text-gray-400 pr-4">
        Supply your tokens into a secure Vault to effortlessly earn optimized
        yield
      </p>

      {/* View My Vaults Skeleton */}
      <div className="flex items-center gap-1 mt-10 mb-4">
        <div className="h-7 w-40 bg-white/10 rounded animate-pulse" />
      </div>

      {/* My Stats Skeleton */}
      <div className="bg-[#1C1D1C] rounded-2xl p-4 flex justify-between gap-8">
        <div>
          <div className="flex items-center mb-2">
            <span className="text-gray-400 text-xs">My Total Supply</span>
            <InformationIcon className="w-3 h-3" />
          </div>
          <div className="h-7 w-32 bg-white/10 rounded animate-pulse" />
        </div>
        <div>
          <div className="flex items-center mb-2">
            <span className="text-gray-400 text-xs">My Total APY</span>
            <InformationIcon className="w-3 h-3" />
          </div>
          <div className="h-7 w-20 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
