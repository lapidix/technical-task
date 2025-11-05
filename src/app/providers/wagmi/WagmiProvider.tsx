"use client";

import { wagmiConfig } from "@/shared/config";
import { WagmiProvider as WagmiProviderBase } from "wagmi";

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiProviderBase config={wagmiConfig}>{children}</WagmiProviderBase>;
}
