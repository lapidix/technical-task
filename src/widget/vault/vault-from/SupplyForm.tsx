"use client";

import { VaultBase } from "@/entities/vault/types";
import { useTokenBalance, useTokenUsdPrice } from "@/features/erc20/hooks";
import { ERC20Service } from "@/features/erc20/services";
import { useVaultBalance } from "@/features/vault/hooks";
import { VaultService } from "@/features/vault/services";
import { useSequentialTransactions, useWalletConnection } from "@/shared/hooks";
import { formatAmount } from "@/shared/libs";
import { NetworkIcon } from "@/shared/ui/icons/network";
import { useState } from "react";
import { NumberPad } from "./NumberPad";
import { VaultInformation } from "./VaultInformation";

interface SupplyFormProps {
  vault: VaultBase;
}

export const SupplyForm = ({ vault }: SupplyFormProps) => {
  console.log(vault.decimals);
  const { balance: tokenBalance, refetchBalance: refetchTokenBalance } =
    useTokenBalance(vault.tokenAddress, vault.decimals);
  const { price: tokenPrice } = useTokenUsdPrice(vault.coinGeckoId);
  const { address } = useWalletConnection();
  const { balance: vaultBalance, refetchBalance: refetchVaultBalance } =
    useVaultBalance(vault.vaultAddress, vault.decimals, address);

  const [amount, setAmount] = useState("0");

  // 순차 트랜잭션 실행 (Approve + Deposit)
  const {
    execute: executeApproveAndDeposit,
    isExecuting,
    currentStep,
  } = useSequentialTransactions({
    onSuccess: () => {
      alert(`✅ ${amount} ${vault.symbol} Supply completed!`);
      setAmount("0");
      refetchTokenBalance();
      refetchVaultBalance();
    },
    onError: (error) => {
      alert("❌ Fail Transaction: " + error.message);
    },
  });

  // 진행 상황 표시
  const getButtonText = () => {
    if (!isExecuting) return "Approve + Deposit";
    if (currentStep === 0) return "Approving... (1/2)";
    if (currentStep === 1) return "Depositing... (2/2)";
    return "Processing...";
  };

  // * NumberPad handlers
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

  // * NumberPad handlers
  const handleBackspace = () => {
    const newAmount = amount.length > 1 ? amount.slice(0, -1) : "0";
    setAmount(newAmount);
  };

  // * NumberPad handlers
  const handleUseMaxBalance = () => {
    const balanceStr = tokenBalance.toString();
    setAmount(balanceStr);
  };

  const handleApprove = async () => {
    if (!address) {
      alert("Please connect wallet.");
      return;
    }

    try {
      const hash = await ERC20Service.approveToken(
        vault.tokenAddress,
        vault.vaultAddress,
        amount,
        vault.decimals
      );
      alert("✅ Approve Success!\n" + hash);
    } catch (error) {
      console.error("Approve error:", error);
      alert("❌ Approve Fail: " + (error as Error).message);
    }
  };

  const handleDeposit = async () => {
    if (!address) {
      alert("Please connect wallet.");
      return;
    }

    try {
      const hash = await VaultService.depositToVault(
        vault.vaultAddress,
        amount,
        vault.decimals,
        address
      );
      alert(`✅ ${amount} ${vault.symbol} Deposit Success!\n${hash}`);
      setAmount("0");
      refetchTokenBalance();
      refetchVaultBalance();
    } catch (error) {
      console.error("Deposit error:", error);
      alert("❌ Deposit Fail: " + (error as Error).message);
    }
  };

  const handleApproveAndDeposit = async () => {
    if (!address) {
      alert("Please connect wallet.");
      return;
    }

    await executeApproveAndDeposit([
      // Step 1: Approve
      async () => {
        return await ERC20Service.approveToken(
          vault.tokenAddress,
          vault.vaultAddress,
          amount,
          vault.decimals
        );
      },
      // Step 2: Deposit (Approve 완료 후 자동 실행)
      async () => {
        return await VaultService.depositToVault(
          vault.vaultAddress,
          amount,
          vault.decimals,
          address
        );
      },
    ]);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Top Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Token Info */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">Supply</h1>
            <NetworkIcon icon={vault.icon} className="w-8 h-8" />
            <span className="text-2xl font-bold">{vault.symbol}</span>
          </div>
          <div className="text-gray-400 text-sm">
            Wallet Balance:{" "}
            <span className="text-white font-medium" suppressHydrationWarning>
              {tokenBalance.toLocaleString()}
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
            onClick={handleUseMaxBalance}
            className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded"
            suppressHydrationWarning>
            Use Balance {tokenBalance.toLocaleString()} {vault.symbol}
          </button>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="">
        {/* Action Buttons */}
        <div className="flex py-4 px-6 mb-6 space-x-3">
          <button
            onClick={handleApprove}
            disabled={parseFloat(amount || "0") <= 0 || isExecuting}
            className="w-full bg-yellow-600 text-white font-bold py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700 transition-colors">
            Approve
          </button>
          <button
            onClick={handleDeposit}
            disabled={parseFloat(amount || "0") <= 0 || isExecuting}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors">
            Deposit
          </button>
          <button
            onClick={handleApproveAndDeposit}
            disabled={parseFloat(amount || "0") <= 0 || isExecuting}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
            {getButtonText()}
          </button>
        </div>

        {/* Number Pad */}
      </div>
      <NumberPad
        onNumberClick={handleNumberClick}
        onBackspace={handleBackspace}
      />
    </div>
  );
};
