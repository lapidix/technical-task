import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { QUERY_STALE_TIME } from "@/shared/config";
import { useSuspenseQueries } from "@tanstack/react-query";
import { VaultAggregateService } from "../services";

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
        queryFn: VaultAggregateService.getAllVaultTotalSupply,
        staleTime: QUERY_STALE_TIME.MEDIUM,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: VAULT_QUERY_KEYS.myTotalSupply(address),
        queryFn: () => {
          if (!address) return 0;
          return VaultAggregateService.getMyTotalSupply(address);
        },
        refetchOnWindowFocus: false,
      },
      {
        queryKey: VAULT_QUERY_KEYS.myTotalAPY(address),
        queryFn: () => {
          if (!address) return 0;
          return VaultAggregateService.getMyTotalAPY(address);
        },
        refetchOnWindowFocus: false,
      },
      {
        queryKey: VAULT_QUERY_KEYS.myVaultsCount(address),
        queryFn: () => {
          if (!address) return 0;
          return VaultAggregateService.getMyVaultsCount(address);
        },
        refetchOnWindowFocus: false,
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
