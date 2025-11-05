// Contract addresses on Base Sepolia
export const CONTRACTS = {
  // ERC-20 Tokens
  BTC: '0x1cd5282989188818db1422a5a14244bc690a400c',
  USDT: '0x0866b8dea93e8db261a23a6ffef8d089a6886208',
  USDC: '0xdc0aeb396f79dfbedbe9c72dceda5d6d9295c085',
  
  // ERC-4626 Vaults
  BTC_VAULT: '0x194956e5805f85502ab05bcb1106cbe0252cd868',
  USDT_VAULT: '0x69a7b931d874a0ef05a377c73cee3e530b0b1c58',
  USDC_VAULT: '0x815c0eb6846c0ca9da7c41aa93f60fe5277114d0',
} as const

export type ContractAddress = typeof CONTRACTS[keyof typeof CONTRACTS]
