export const VAULT_QUERY_KEYS = {
  userVaultBalance: (vaultAddress: string, userAddress?: string) =>
    [
      "user-vault-balance",
      vaultAddress,
      userAddress || "disconnected",
    ] as const,

  allVaultTotalSupply: ["all-vault-total-supply"],
  currentVaultAPY: (vaultId: string) => ["current-vault-apy", vaultId] as const,
  myTotalSupply: (address?: string) =>
    ["my-total-supply", address || "disconnected"] as const,
  myTotalAPY: (address?: string) =>
    ["my-total-apy", address || "disconnected"] as const,
  myVaultsCount: (address?: string) =>
    ["my-vaults-count", address || "disconnected"] as const,
  allVaultData: ["all-vault-data"] as const,
} as const;
