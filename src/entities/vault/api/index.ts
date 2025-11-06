import { coinGeckoApiClient } from "@/shared/libs";
import { vaultApi } from "./vault.adapter";

export const vaultApiAdapter = vaultApi(coinGeckoApiClient);
export { VAULT_QUERY_KEYS } from "./vault-query-key";
