export const VAULT_QUERY_KEYS = {
  tokenPrices: ["token-prices"],
  vaultAPR: ["vaultAPR"],
  vaultBalance: (address?: string) =>
    ["vaultBalance", address || "disconnected"] as const,
  vaultTotalAssets: ["vaultTotalAssets"],
} as const;
