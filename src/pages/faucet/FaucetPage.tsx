"use client";

import { useWalletConnection } from "@/shared/hooks";
import {
  FaucetRequestForm,
  FaucetRequestFormSkeleton,
} from "@/widget/faucet/faucet-request-form";
import {
  UnsupportedNetwork,
  WalletNotConnected,
} from "@/widget/faucet/faucet-request-form/components";
import { Header } from "@/widget/header";
import { Suspense } from "react";
import { useAccount } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const FaucetPage = () => {
  const { isConnected } = useWalletConnection();
  const { chain } = useAccount();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium text-gray-50 ">Faucet</h1>
          <p className="text-gray-400">
            Get test tokens for Base Sepolia testnet.
          </p>
        </div>

        {!isConnected ? (
          <WalletNotConnected />
        ) : chain?.id !== baseSepolia.id ? (
          <UnsupportedNetwork />
        ) : (
          <Suspense fallback={<FaucetRequestFormSkeleton />}>
            <FaucetRequestForm />
          </Suspense>
        )}
      </main>
    </div>
  );
};
