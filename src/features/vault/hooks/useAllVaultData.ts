import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { QUERY_STALE_TIME } from "@/shared/config";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VaultDataService } from "../services";

export const useAllVaultData = () => {
  const { data: vaultsWithPrice } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.allVaultData,
    queryFn: () => VaultDataService.getAllVaultData(),
    staleTime: QUERY_STALE_TIME.MEDIUM,
    refetchOnWindowFocus: false,
  });

  return { allVaultData: vaultsWithPrice };
};
