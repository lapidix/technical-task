"use client";

import { SUPPORTED_VAULTS } from "@/entities/vault/constants";
import { useFaucet, useTokenBalance } from "@/features/erc20/hooks";
import { useState } from "react";
import {
  AmountInput,
  BalanceDisplay,
  TokenInformation,
  TokenSelector,
  TransactionStatus,
} from "./components";

export const FaucetRequestForm = () => {
  const [selectedToken, setSelectedToken] = useState(SUPPORTED_VAULTS[0]);
  const [amount, setAmount] = useState("100");

  const { balance, refetchBalance } = useTokenBalance(
    selectedToken.tokenAddress,
    selectedToken.decimals
  );

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
    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
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

      <button
        onClick={handleSubmit}
        disabled={isPending || isConfirming || Number(amount) > 1000}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors">
        {isPending || isConfirming
          ? "Processing..."
          : Number(amount) > 1000
          ? `Can't request more than 1000 ${selectedToken.symbol}`
          : "Request"}
      </button>

      <TransactionStatus
        isSuccess={isSuccess}
        hash={hash}
        onRefreshBalance={refetchBalance}
      />

      <TokenInformation token={selectedToken} />
    </div>
  );
};
