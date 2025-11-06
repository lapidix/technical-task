export const VAULT_QUERY_KEYS = {
  tokenPrices: ["token-prices"],
  vaultAPR: ["vault-apr"],
  vaultBalance: (address?: string) =>
    ["vault-balance", address || "disconnected"] as const,
  vaultTotalAssets: ["vault-total-assets"],
} as const;
