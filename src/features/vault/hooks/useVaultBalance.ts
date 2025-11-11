import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { QUERY_STALE_TIME } from "@/shared/config";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VaultTransactionService } from "../services";

export const useVaultBalance = (
  vaultAddress: `0x${string}`,
  decimals: number,
  address?: `0x${string}`
) => {
  const { data: balance, refetch: refetchBalance } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.userVaultBalance(vaultAddress, address),
    queryFn: async () => {
      if (!address) return 0;
      return VaultTransactionService.getUserVaultBalance(
        vaultAddress,
        address,
        decimals
      );
    },
    staleTime: QUERY_STALE_TIME.MEDIUM,
    retry: 3,
  });

  return {
    balance,
    refetchBalance,
  };
};
