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
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Faucet</h1>
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
