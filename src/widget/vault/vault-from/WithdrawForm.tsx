"use client";

import { VaultBase } from "@/entities/vault/types";
import { useTokenUsdPrice } from "@/features/erc20/hooks";
import { useVaultBalance } from "@/features/vault/hooks";
import { VaultService } from "@/features/vault/services";
import { useWalletConnection } from "@/shared/hooks";
import { formatAmount } from "@/shared/libs";
import { NetworkIcon } from "@/shared/ui/icons/network";
import { useState } from "react";
import { NumberPad } from "./NumberPad";
import { VaultInformation } from "./VaultInformation";

interface WithdrawFormProps {
  vault: VaultBase;
}

export const WithdrawForm = ({ vault }: WithdrawFormProps) => {
  const { price: tokenPrice } = useTokenUsdPrice(vault.coinGeckoId);
  const { address } = useWalletConnection();
  const { balance: vaultBalance, refetchBalance: refetchVaultBalance } =
    useVaultBalance(vault.vaultAddress, vault.decimals, address);

  const [amount, setAmount] = useState("0");

  const handleNumberClick = (num: string) => {
    if (num === ".") {
      if (!amount.includes(".")) {
        const newAmount = amount + num;
        setAmount(newAmount);
      }
    } else {
      const newAmount = amount === "0" ? num : amount + num;
      setAmount(newAmount);
    }
  };

  const handleBackspace = () => {
    const newAmount = amount.length > 1 ? amount.slice(0, -1) : "0";
    setAmount(newAmount);
  };

  const handleUseMax = () => {
    const balanceStr = vaultBalance.toString();
    setAmount(balanceStr);
  };

  const handleWithdraw = async () => {
    if (!address) {
      alert("Please connect wallet.");
      return;
    }

    try {
      const hash = await VaultService.withdrawFromVault(
        vault.vaultAddress,
        amount,
        vault.decimals,
        address
      );
      alert(`✅ ${amount} ${vault.symbol} Withdraw Success!\n${hash}`);
      setAmount("0");
      refetchVaultBalance();
    } catch (error) {
      console.error("Withdraw error:", error);
      alert("❌ Withdraw Fail: " + (error as Error).message);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Top Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Token Info */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">Withdraw</h1>
            <NetworkIcon icon={vault.icon} className="w-8 h-8" />
            <span className="text-2xl font-bold">{vault.symbol}</span>
          </div>
          <div className="text-gray-400 text-sm">
            Withdrawable:{" "}
            <span className="text-white font-medium" suppressHydrationWarning>
              {vaultBalance}
            </span>
          </div>
        </div>

        {/* Vault Info */}
        <VaultInformation
          vault={vault}
          vaultBalance={vaultBalance}
          tokenPrice={tokenPrice}
        />

        {/* Amount Input */}
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-5xl font-bold w-full">
              {formatAmount(amount)}
            </div>
            <div className="text-2xl text-gray-500">
              ~$
              {(parseFloat(amount || "0") * tokenPrice).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </div>
          </div>
          <button
            onClick={handleUseMax}
            className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded"
            suppressHydrationWarning>
            Use Max {vaultBalance} {vault.symbol}
          </button>
        </div>
      </div>
      {/* Fixed Bottom Section */}
      <div className="">
        {/* Action Button */}
        <div className="flex py-4 px-6 mb-6 space-x-3">
          <button
            onClick={handleWithdraw}
            disabled={parseFloat(amount || "0") <= 0}
            className="w-full bg-[#D4FF00] text-black font-bold py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
            Withdraw
          </button>
        </div>

        {/* Number Pad */}
        <NumberPad
          onNumberClick={handleNumberClick}
          onBackspace={handleBackspace}
        />
      </div>
    </div>
  );
};
