import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { useSuspenseQueries } from "@tanstack/react-query";
import { VaultService } from "../services/vault.service";

export const useMainOverViewData = (address?: `0x${string}`) => {
  const [
    { data: totalSupply },
    { data: myTotalSupply },
    { data: myTotalAPY },
    { data: myVaultsCount },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: VAULT_QUERY_KEYS.allVaultTotalSupply,
        queryFn: VaultService.getAllVaultTotalSupply,
        staleTime: 60000,
        refetchInterval: 60000,
      },
      {
        queryKey: VAULT_QUERY_KEYS.myTotalSupply(address),
        queryFn: () => {
          if (!address) return 0;
          return VaultService.getMyTotalSupply(address);
        },
        staleTime: 30000,
      },
      {
        queryKey: VAULT_QUERY_KEYS.myTotalAPY(address),
        queryFn: () => {
          if (!address) return 0;
          return VaultService.getMyTotalAPY(address);
        },
        staleTime: 30000,
      },
      {
        queryKey: VAULT_QUERY_KEYS.myVaultsCount(address),
        queryFn: () => {
          if (!address) return 0;
          return VaultService.getMyVaultsCount(address);
        },
        staleTime: 30000,
      },
    ],
  });

  return {
    totalSupply,
    myTotalSupply,
    myTotalAPY,
    myVaultsCount,
  };
};
