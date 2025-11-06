import { VaultListItemSkeleton } from "@/entities/vault/ui/vault-list-item/VaultListItemSkeleton";

export const VaultListSkeleton = () => {
  return (
    <div className="space-y-3">
      <VaultListItemSkeleton />
      <VaultListItemSkeleton />
      <VaultListItemSkeleton />
    </div>
  );
};
