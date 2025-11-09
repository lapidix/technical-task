import { VaultListItemSkeleton } from "@/entities/vault/ui/vault-list-item/VaultListItemSkeleton";
import { SearchIcon } from "@/shared/ui/icons/common";

export const VaultListSkeleton = () => {
  return (
    <div>
      {/* Search Input Skeleton */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <SearchIcon className="w-5 h-5" />
        </div>
        <div className="w-full bg-[#1C1D1C] rounded-full py-3.5 pl-10 pr-4 animate-pulse" />
      </div>

      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-1 pt-4">
        <h2 className="text-sm font-medium text-[#8C938C]">Vault</h2>
        <h3 className="text-sm font-medium text-[#8C938C]">APY</h3>
      </div>

      {/* List Items Skeleton */}
      <div>
        <VaultListItemSkeleton />
        <VaultListItemSkeleton />
        <VaultListItemSkeleton />
      </div>
    </div>
  );
};
