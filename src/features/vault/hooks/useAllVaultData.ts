import { VAULT_QUERY_KEYS } from "@/entities/vault/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VaultService } from "../services/vault.service";

export const useAllVaultData = () => {
  const { data: vaultsWithPrice } = useSuspenseQuery({
    queryKey: VAULT_QUERY_KEYS.allVaultData,
    queryFn: () => VaultService.getAllVaultData(),
    staleTime: 60000,
    refetchInterval: 60000,
  });

  return { allVaultData: vaultsWithPrice };
};
