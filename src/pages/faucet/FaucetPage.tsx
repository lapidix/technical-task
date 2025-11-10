"use client";

import { FaucetRequestForm } from "@/widget/faucet/faucet-request-form";
import { Header } from "@/widget/header";

export const FaucetPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-2xl mx-auto px-4 py-2">
        <Header />
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium text-gray-50 ">Faucet</h1>
          <p className="text-gray-400">
            Get test tokens for Base Sepolia testnet.
          </p>
        </div>

        <FaucetRequestForm />
      </main>
    </div>
  );
};
