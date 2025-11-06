"use client";

import {
  AmountInputSkeleton,
  BalanceDisplaySkeleton,
  TokenInformationSkeleton,
  TokenSelectorSkeleton,
} from "@/features/faucet/ui";
export const FaucetRequestFormSkeleton = () => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
      <BalanceDisplaySkeleton />

      <TokenSelectorSkeleton />

      <AmountInputSkeleton />
      <div className="h-14 w-full bg-gray-700 rounded-lg animate-pulse" />

      <TokenInformationSkeleton />
    </div>
  );
};
