export type VaultBase = {
  id: string;
  name: string;
  symbol: string;
  tokenAddress: `0x${string}`;
  vaultAddress: `0x${string}`;
  decimals: number;
  coinGeckoId: string;
};

export type VaultEntity = VaultBase & {
  price: number;
  apr: number;
  myBalance: number;
  totalAssets: number;
};
