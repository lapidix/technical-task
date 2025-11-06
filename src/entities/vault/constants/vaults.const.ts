import { VaultBase } from "../types/vault.types";

export const SUPPORTED_VAULTS: VaultBase[] = [
  {
    id: "usdt",
    name: "USDT Vault",
    symbol: "USDT",
    tokenAddress: "0x0866b8dea93e8db261a23a6ffef8d089a6886208",
    vaultAddress: "0x69a7b931d874a0ef05a377c73cee3e530b0b1c58",
    decimals: 6,
    coinGeckoId: "tether",
  },
  {
    id: "btc",
    name: "BTC Vault",
    symbol: "BTC",
    tokenAddress: "0x1cd5282989188818db1422a5a14244bc690a400c",
    vaultAddress: "0x194956e5805f85502ab05bcb1106cbe0252cd868",
    decimals: 18,
    coinGeckoId: "bitcoin",
  },
  {
    id: "usdc",
    name: "USDC Vault",
    symbol: "USDC",
    tokenAddress: "0xdc0aeb396f79dfbedbe9c72dceda5d6d9295c085",
    vaultAddress: "0x815c0eb6846c0ca9da7c41aa93f60fe5277114d0",
    decimals: 6,
    coinGeckoId: "usd-coin",
  },
];
