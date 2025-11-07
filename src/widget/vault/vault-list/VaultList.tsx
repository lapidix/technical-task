"use client";
import { VaultListItem } from "@/entities/vault/ui";
import { useAllVaultData } from "@/features/vault/hooks";

export const VaultList = () => {
  const { allVaultData } = useAllVaultData();

  return (
    <div className="space-y-3">
      {allVaultData.map((vault) => (
        <VaultListItem key={vault.id} vault={vault} />
      ))}
    </div>
  );
};
