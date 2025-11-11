"use client";

import { VaultBase } from "@/entities/vault/types";
import { useTokenUsdPrice } from "@/features/erc20/hooks";
import {
  useVaultBalance,
  useWithdrawTransaction,
} from "@/features/vault/hooks";
import { useWalletConnection } from "@/shared/hooks";
import { NUMBER_PAD_HEIGHT, useNumberPadStore } from "@/shared/store";
import { useEffect } from "react";
import { AmountInput, TokenInformation, VaultInformation } from "../";

interface WithdrawSectionProps {
  vault: VaultBase;
}

export const WithdrawSection = ({ vault }: WithdrawSectionProps) => {
  const { price: tokenPrice } = useTokenUsdPrice(vault.coinGeckoId);
  const { address } = useWalletConnection();
  const { balance: vaultBalance, refetchBalance: refetchVaultBalance } =
    useVaultBalance(vault.vaultAddress, vault.decimals, address);

  const { amount, open, close, clear, setAmount, setMaxAmount, setDisabled } =
    useNumberPadStore();

  const { handleWithdraw, isWithdrawing } = useWithdrawTransaction({
    vaultAddress: vault.vaultAddress,
    decimals: vault.decimals,
    symbol: vault.symbol,
    address,
    onSuccess: () => {
      clear();
      setTimeout(async () => {
        await refetchVaultBalance();
      }, 2000);
    },
  });

  useEffect(() => {
    setMaxAmount(Number(vaultBalance));
  }, [vaultBalance, setMaxAmount]);

  useEffect(() => {
    setDisabled(isWithdrawing);
  }, [isWithdrawing, setDisabled]);

  const handleOpenNumberPad = (e: React.MouseEvent) => {
    e.stopPropagation();
    open("withdraw", Number(vaultBalance));
  };

  const handleClear = () => {
    clear();
  };

  const handleCloseNumberPad = () => {
    close();
  };

  const handleUseMax = () => {
    const balanceStr = vaultBalance.toString();
    setAmount(balanceStr);
  };

  const onWithdraw = () => {
    handleWithdraw(amount, vaultBalance);
  };

  return (
    <div
      className="flex flex-col flex-1 overflow-hidden"
      onClick={handleCloseNumberPad}>
      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: `${NUMBER_PAD_HEIGHT}px` }}>
        <div className="px-4 py-2 flex flex-col gap-8">
          {/* Token Info */}
          <TokenInformation
            vault={vault}
            tokenBalance={vaultBalance}
            isSupply={false}
          />

          {/* Vault Info */}
          <VaultInformation
            vault={vault}
            vaultBalance={vaultBalance}
            tokenPrice={tokenPrice}
            isSupply={false}
          />
        </div>

        {/* Amount Input */}
        <AmountInput
          amount={amount}
          tokenPrice={tokenPrice}
          maxBalance={vaultBalance}
          symbol={vault.symbol}
          onOpenNumberPad={handleOpenNumberPad}
          onUseMax={handleUseMax}
          onClear={handleClear}
        />

        {/* Action Button */}
        <div
          className="flex py-4 px-4 gap-3"
          onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onWithdraw}
            disabled={parseFloat(amount || "0") <= 0 || isWithdrawing}
            className="w-full bg-[#E6F5AA] text-lg text-[#17330D] font-medium py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4E699] transition-colors">
            {isWithdrawing ? "Withdrawing..." : "Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
};
