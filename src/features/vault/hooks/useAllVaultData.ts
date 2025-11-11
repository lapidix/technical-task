import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { QUERY_STALE_TIME } from "@/shared/config";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VaultService } from "../services/vault.service";

export const useAllVaultData = () => {
  const { data: vaultsWithPrice } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.allVaultData,
    queryFn: () => VaultService.getAllVaultData(),
    staleTime: QUERY_STALE_TIME.MEDIUM,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });

  return { allVaultData: vaultsWithPrice };
};
