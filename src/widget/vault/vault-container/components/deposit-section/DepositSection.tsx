"use client";

import { VaultBase } from "@/entities/vault/types";
import {
  useApproveTransaction,
  useTokenBalance,
  useTokenUsdPrice,
} from "@/features/erc20/hooks";
import { ERC20Service } from "@/features/erc20/services";
import { useDepositTransaction, useVaultBalance } from "@/features/vault/hooks";
import { VaultTransactionService } from "@/features/vault/services";
import {
  useSequentialTransactions,
  useToast,
  useWalletConnection,
} from "@/shared/hooks";
import { getErrorMessageConfig } from "@/shared/libs";
import { NUMBER_PAD_HEIGHT, useNumberPadStore } from "@/shared/store";
import { RefreshIcon } from "@/shared/ui/icons/common";
import { useEffect } from "react";
import { AmountInput, TokenInformation, VaultInformation } from "..";

interface DepositSectionProps {
  vault: VaultBase;
}

export const DepositSection = ({ vault }: DepositSectionProps) => {
  const { balance: tokenBalance, refetchBalance: refetchTokenBalance } =
    useTokenBalance(vault.tokenAddress, vault.decimals);
  const { price: tokenPrice } = useTokenUsdPrice(vault.coinGeckoId);
  const { address } = useWalletConnection();
  const { balance: vaultBalance, refetchBalance: refetchVaultBalance } =
    useVaultBalance(vault.vaultAddress, vault.decimals, address);
  const { showToast } = useToast();

  const invalidateBalances = async () => {
    await Promise.all([refetchTokenBalance(), refetchVaultBalance()]);
  };

  const { handleApprove, isApproving } = useApproveTransaction({
    tokenAddress: vault.tokenAddress,
    spenderAddress: vault.vaultAddress,
    decimals: vault.decimals,
    address,
  });

  const { handleDeposit, isDepositing } = useDepositTransaction({
    vaultAddress: vault.vaultAddress,
    decimals: vault.decimals,
    symbol: vault.symbol,
    address,
    onSuccess: () => {
      clear();
      setTimeout(async () => {
        await invalidateBalances();
      }, 2000);
    },
  });

  const { amount, open, close, clear, setAmount, setMaxAmount, setDisabled } =
    useNumberPadStore();

  useEffect(() => {
    setMaxAmount(Number(tokenBalance));
  }, [tokenBalance, setMaxAmount]);

  useEffect(() => {
    setDisabled(isApproving || isDepositing);
  }, [isApproving, isDepositing, setDisabled]);

  const handleOpenNumberPad = (e: React.MouseEvent) => {
    e.stopPropagation();
    open("deposit", Number(tokenBalance));
  };

  const {
    execute: executeApproveAndDeposit,
    isExecuting,
    currentStep,
  } = useSequentialTransactions({
    onSuccess: () => {
      showToast(`${amount} ${vault.symbol} Deposit completed!`, "SUCCESS");
      clear();
      setTimeout(async () => {
        await invalidateBalances();
      }, 2000);
    },
    onError: (error) => {
      console.error("[SupplyForm] Transaction failed:", error);
      const errorConfig = getErrorMessageConfig(error);
      showToast(errorConfig.message, "ERROR", {
        duration: 10000,
        action: {
          label: errorConfig.action,
          icon: RefreshIcon,
          onClick: handleApproveAndDeposit,
        },
      });
    },
  });

  const getButtonText = () => {
    if (!isExecuting) return "Approve + Deposit";
    if (currentStep === 0) return "Approving... (1/2)";
    if (currentStep === 1) return "Depositing... (2/2)";
    return "Processing...";
  };

  const handleUseMaxBalance = () => {
    const balanceStr = tokenBalance.toString();
    setAmount(balanceStr);
  };

  const onApprove = () => {
    handleApprove(amount);
  };

  const onDeposit = () => {
    handleDeposit(amount, Number(tokenBalance));
  };

  const handleApproveAndDeposit = async () => {
    if (!address) {
      showToast("Please connect wallet.", "WARNING");
      return;
    }

    await executeApproveAndDeposit([
      async () => {
        return await ERC20Service.approveToken(
          vault.tokenAddress,
          vault.vaultAddress,
          amount,
          vault.decimals
        );
      },
      async () => {
        return await VaultTransactionService.depositToVault(
          vault.vaultAddress,
          amount,
          vault.decimals,
          address
        );
      },
    ]);
  };

  return (
    <section
      aria-label="Deposit to vault"
      className="flex flex-col flex-1 overflow-hidden"
      onClick={close}>
      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: `${NUMBER_PAD_HEIGHT}px` }}>
        <div className="px-4 py-2 flex flex-col gap-8">
          {/* Token Info */}
          <TokenInformation
            vault={vault}
            tokenBalance={Number(tokenBalance)}
            isSupply={true}
          />

          {/* Vault Info */}
          <VaultInformation
            vault={vault}
            vaultBalance={vaultBalance}
            tokenPrice={tokenPrice}
            isSupply={true}
          />
        </div>

        {/* Amount Input */}
        <AmountInput
          amount={amount}
          tokenPrice={tokenPrice}
          maxBalance={Number(tokenBalance)}
          symbol={vault.symbol}
          onOpenNumberPad={handleOpenNumberPad}
          onUseMax={handleUseMaxBalance}
          onClear={clear}
        />

        {/* Action Buttons */}
        <div
          className="flex flex-col py-2 px-4 gap-3"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2">
            <button
              onClick={onApprove}
              disabled={
                parseFloat(amount || "0") <= 0 ||
                isExecuting ||
                isApproving ||
                isDepositing
              }
              className="flex-1 bg-[#3A3D3A] text-lg text-[#ECEFEC] font-medium py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A4D4A] transition-colors">
              {isApproving ? "Approving..." : "Approve"}
            </button>
            <button
              onClick={onDeposit}
              disabled={
                parseFloat(amount || "0") <= 0 ||
                isExecuting ||
                isApproving ||
                isDepositing
              }
              className="flex-1 bg-[#3A3D3A] text-lg text-[#ECEFEC] font-medium py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A4D4A] transition-colors">
              {isDepositing ? "Depositing..." : "Deposit"}
            </button>
          </div>
          <button
            onClick={handleApproveAndDeposit}
            disabled={
              parseFloat(amount || "0") <= 0 ||
              isExecuting ||
              isApproving ||
              isDepositing
            }
            className="w-full bg-[#E6F5AA] text-lg text-[#17330D] font-medium py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4E699] transition-colors">
            {getButtonText()}
          </button>
        </div>
      </div>
    </section>
  );
};
