import { NetworkIconType } from "@/shared/ui/icons/network";

export type VaultBase = {
  id: SupportedVaultId;
  name: string;
  symbol: string;
  tokenAddress: `0x${string}`;
  vaultAddress: `0x${string}`;
  decimals: number;
  coinGeckoId: string;
  icon: NetworkIconType;
};

export type VaultEntity = VaultBase & {
  price: number;
  apr: number;
  myBalance: number;
  totalAssets: number;
};

export type SupportedVaultId = "usdt" | "btc" | "usdc";
