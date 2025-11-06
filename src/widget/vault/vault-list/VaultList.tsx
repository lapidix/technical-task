import { VAULT_QUERY_KEYS } from "@/entities/vault/api";
import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { VaultListItem } from "@/entities/vault/ui";
import { useVaultData } from "@/features/vault/hooks";
import { VaultService } from "@/features/vault/services";
import { QUERY_STALE_TIME } from "@/shared/config";
import { SHARED_QUERY_KEYS } from "@/shared/constants";
import { preloadTokenIcon } from "@/shared/libs";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useMemo } from "react";

export const VaultList = () => {
  const { vaultData } = useVaultData();

  const [{ data: tokenPrices }] = useSuspenseQueries({
    queries: [
      {
        queryKey: VAULT_QUERY_KEYS.tokenPrices,
        queryFn: VaultService.getTokenPrices,
        staleTime: 60 * 1000,
        refetchInterval: 60 * 1000,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      {
        queryKey: SHARED_QUERY_KEYS.images.token,
        queryFn: async () => {
          // 모든 vault 아이콘을 병렬로 preload
          await Promise.all(
            SUPPORTED_VAULTS.map((vault) => preloadTokenIcon(vault.id))
          );
          return true;
        },
        staleTime: QUERY_STALE_TIME.LONG,
      },
    ],
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
