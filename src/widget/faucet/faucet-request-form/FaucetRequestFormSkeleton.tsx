"use client";

import {
  AmountInputSkeleton,
  BalanceDisplaySkeleton,
  TokenInformationSkeleton,
  TokenSelectorSkeleton,
} from "./components";
export const FaucetRequestFormSkeleton = () => {
  return (
    <div className="bg-black rounded-xl py-2 space-y-2">
      <BalanceDisplaySkeleton />

      <TokenSelectorSkeleton />

      <AmountInputSkeleton />
      <div className="h-14 w-full bg-[#2A2D2A] rounded-lg animate-pulse" />

      <TokenInformationSkeleton />
    </div>
  );
};
