import { SupportWalletType } from "../types";

export const SUPPORTED_WALLETS: SupportWalletType[] = [
  {
    id: "metamask",
    name: "MetaMask",
    installUrl: "https://metamask.io/download/",
    icon: "metamask",
  },
  {
    id: "okx",
    name: "OKX Wallet",
    installUrl: "https://www.okx.com/web3",
    icon: "okx",
  },
  {
    id: "backpack",
    name: "Backpack",
    installUrl: "https://backpack.app/download/",
    icon: "backpack",
  },
] as const;
