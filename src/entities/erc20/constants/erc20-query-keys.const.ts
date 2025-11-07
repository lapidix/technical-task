export const ERC20_QUERY_KEYS = {
  userTokenBalance: (tokenAddress: string, userAddress?: string) =>
    [
      "user-token-balance",
      tokenAddress,
      userAddress || "disconnected",
    ] as const,
  tokenPrice: (coinGeckoId: string) => ["tokenPrice", coinGeckoId] as const,
};
