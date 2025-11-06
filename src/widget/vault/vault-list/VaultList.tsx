import { VAULT_QUERY_KEYS } from "@/entities/vault/api";
import { VaultListItem } from "@/entities/vault/ui";
import { useVaultData } from "@/features/vault/hooks";
import { VaultService } from "@/features/vault/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const VaultList = () => {
  const { vaultData } = useVaultData();

  const { data: tokenPrices } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.tokenPrices,
    queryFn: VaultService.getTokenPrices,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const vaultsWithPrice = useMemo(() => {
    return vaultData.map((vault) => ({
      ...vault,
      price: tokenPrices[vault.id] || 0,
    }));
  }, [vaultData, tokenPrices]);

  return (
    <div className="space-y-3">
      {vaultsWithPrice.map((vault) => (
        <VaultListItem key={vault.id} vault={vault} />
      ))}
    </div>
  );
};
