"use client";

import { ENV } from "@/shared/config/env.config";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  backpackWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";

// * Custom wallet list including Backpack
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        backpackWallet,
        rainbowWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: ENV.NEXT_PUBLIC_WALLETCONNECT_APP_NAME,
    projectId: ENV.WALLETCONNECT_PROJECT_ID,
  }
);

// * Base Sepolia 네트워크 설정 with RainbowKit + Backpack
export const wagmiConfig = createConfig({
  connectors,
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

export type Config = typeof wagmiConfig;
