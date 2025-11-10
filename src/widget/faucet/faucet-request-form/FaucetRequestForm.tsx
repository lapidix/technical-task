"use client";

import { ERC20_QUERY_KEYS } from "@/entities/erc20/constants";
import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { useFaucet, useTokenBalance } from "@/features/erc20/hooks";
import { useWalletConnection } from "@/shared/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import {
  AmountInput,
  BalanceDisplay,
  TokenInformation,
  TokenInformationSkeleton,
  TokenSelector,
  TransactionStatus,
} from "./components";

export const FaucetRequestForm = () => {
  const queryClient = useQueryClient();
  const { address } = useWalletConnection();
  const [selectedToken, setSelectedToken] = useState(SUPPORTED_VAULTS[0]);
  const [amount, setAmount] = useState("100");

  const { balance, refetchBalance } = useTokenBalance(
    selectedToken.tokenAddress,
    selectedToken.decimals
  );

  const invalidateTokenBalance = async () => {
    console.log("[FaucetForm] Refetching token balance...");
    await queryClient.refetchQueries({
      queryKey: ERC20_QUERY_KEYS.userTokenBalance(
        selectedToken.tokenAddress,
        address
      ),
    });
    console.log("[FaucetForm] Token balance refetched successfully");
  };

  const { requestTokens, isPending, isConfirming, isSuccess, hash } = useFaucet(
    selectedToken.tokenAddress
  );

  const handleSubmit = () => {
    requestTokens(amount);
  };

  const handleTokenSelect = (token: (typeof SUPPORTED_VAULTS)[0]) => {
    setSelectedToken(token);
    setTimeout(() => refetchBalance(), 100);
  };

  return (
    <div className="bg-black rounded-xl py-4 space-y-6">
      <BalanceDisplay symbol={selectedToken.symbol} balance={balance} />

      <TokenSelector
        selectedToken={selectedToken}
        onSelect={handleTokenSelect}
      />

      <AmountInput
        amount={amount}
        onChange={setAmount}
        symbol={selectedToken.symbol}
      />

      <div className="px-4">
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || Number(amount) > 1000}
          className="w-full bg-[#E6F5AA] hover:bg-[#D4E699] disabled:bg-[#3A3D3A] disabled:cursor-not-allowed text-[#17330D] disabled:text-[#8C938C] text-lg font-medium py-2 rounded-lg transition-colors">
          {isPending || isConfirming
            ? "Processing..."
            : Number(amount) > 1000
            ? `Can't request more than 1000 ${selectedToken.symbol}`
            : "Request"}
        </button>
      </div>

      <TransactionStatus
        isSuccess={isSuccess}
        hash={hash}
        onRefreshBalance={invalidateTokenBalance}
      />

      <Suspense key={selectedToken.id} fallback={<TokenInformationSkeleton />}>
        <TokenInformation token={selectedToken} />
      </Suspense>
    </div>
  );
};
