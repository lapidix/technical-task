import { Vault } from "../types/vault.types";

export const VAULTS: Vault[] = [
  {
    id: "usdt",
    name: "USDT Vault",
    symbol: "USDT",
    tokenAddress: "0x0866b8dea93e8db261a23a6ffef8d089a6886208",
    vaultAddress: "0x69a7b931d874a0ef05a377c73cee3e530b0b1c58",
    icon: "💵",
    color: "bg-teal-500",
  },
  {
    id: "btc",
    name: "BTC Vault",
    symbol: "BTC",
    tokenAddress: "0x1cd5282989188818db1422a5a14244bc690a400c",
    vaultAddress: "0x194956e5805f85502ab05bcb1106cbe0252cd868",
    icon: "₿",
    color: "bg-orange-500",
  },
  {
    id: "usdc",
    name: "USDC Vault",
    symbol: "USDC",
    tokenAddress: "0xdc0aeb396f79dfbedbe9c72dceda5d6d9295c085",
    vaultAddress: "0x815c0eb6846c0ca9da7c41aa93f60fe5277114d0",
    icon: "💎",
    color: "bg-blue-500",
  },
];
