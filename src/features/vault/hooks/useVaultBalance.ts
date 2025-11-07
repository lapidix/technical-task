import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VaultService } from "../services";

export const useVaultBalance = (
  vaultAddress: `0x${string}`,
  decimals: number,
  address?: `0x${string}`
) => {
  const { data: balance, refetch: refetchBalance } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.userVaultBalance(vaultAddress, address),
    queryFn: async () => {
      if (!address) return 0;
      return VaultService.getUserVaultBalance(vaultAddress, address, decimals);
    },
  });

  return {
    balance,
    refetchBalance,
  };
};
