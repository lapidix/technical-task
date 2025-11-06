import { VAULT_QUERY_KEYS } from "@/entities/vault/api";
import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { useWalletConnection } from "@/shared/hooks";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { VaultService } from "../services/vault.service";

export const useVaultData = () => {
  const { address, isConnected } = useWalletConnection();

  const [{ data: aprData }, { data: balanceData }, { data: totalAssetsData }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: VAULT_QUERY_KEYS.vaultAPR,
          queryFn: VaultService.getVaultAPRs,
        },
        {
          queryKey: VAULT_QUERY_KEYS.vaultBalance(address),
          queryFn: async () => {
            if (!address || !isConnected) {
              return SUPPORTED_VAULTS.map(() => ({
                result: BigInt(0),
                status: "success" as const,
              }));
            }
            return VaultService.getVaultBalances(address);
          },
        },
        {
          queryKey: VAULT_QUERY_KEYS.vaultTotalAssets,
          queryFn: VaultService.getVaultTotalAssets,
        },
      ],
    });

  const vaultData = useMemo(() => {
    if (!aprData || !balanceData || !totalAssetsData) return [];

    return SUPPORTED_VAULTS.map((vault, index) => {
      const apr = aprData[index]?.result;
      const myBalance = balanceData[index]?.result;
      const totalAssets = totalAssetsData[index]?.result;

      const decimals = vault.decimals;
      const totalAssetsValue = totalAssets
        ? Number(totalAssets) / Math.pow(10, decimals)
        : 0;
      const myBalanceValue = myBalance
        ? Number(myBalance) / Math.pow(10, decimals)
        : 0;

      return {
        ...vault,
        apr: apr ? Number(apr) / 100 : 0,
        myBalance: myBalanceValue,
        totalAssets: totalAssetsValue,
      };
    });
  }, [aprData, balanceData, totalAssetsData]);

  return {
    vaultData,
  };
};
