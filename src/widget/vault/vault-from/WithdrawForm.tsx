"use client";

import { VaultBase } from "@/entities/vault/types";
import { useTokenUsdPrice } from "@/features/erc20/hooks";
import { useVaultBalance } from "@/features/vault/hooks";
import { VaultService } from "@/features/vault/services";
import { wagmiConfig } from "@/shared/config/wagmi.config";
import { useToast, useWalletConnection } from "@/shared/hooks";
import {
  formatAmount,
  formatCompactNumber,
  formatReceiptRevertedMessage,
  formatTransactionErrorMessage,
} from "@/shared/libs";
import { NUMBER_PAD_HEIGHT, useNumberPadStore } from "@/shared/store";
import { RefreshIcon } from "@/shared/ui/icons/common";
import { NetworkIcon } from "@/shared/ui/icons/network";
import { useEffect, useState } from "react";
import { waitForTransactionReceipt } from "wagmi/actions";

interface WithdrawFormProps {
  vault: VaultBase;
}

export const WithdrawForm = ({ vault }: WithdrawFormProps) => {
  const { showToast } = useToast();

  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const { price: tokenPrice } = useTokenUsdPrice(vault.coinGeckoId);
  const { address } = useWalletConnection();
  const { balance: vaultBalance, refetchBalance: refetchVaultBalance } =
    useVaultBalance(vault.vaultAddress, vault.decimals, address);

  const invalidateBalances = async () => {
    console.log("[WithdrawForm] Refetching vault balance...");
    await refetchVaultBalance();
    console.log("[WithdrawForm] Vault balance refetched successfully");
  };

  const {
    amount,
    open,
    close,
    clear,
    setAmount: handleSetAmount,
    setMaxAmount,
    setDisabled,
  } = useNumberPadStore();

  // maxAmount와 disabled 상태 동기화
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
    handleSetAmount(balanceStr);
  };

  const handleWithdraw = async () => {
    if (!address) {
      showToast("Please connect wallet.", "WARNING");
      return;
    }

    setIsWithdrawing(true);
    let hash: `0x${string}` | undefined;

    try {
      hash = await VaultService.withdrawFromVault(
        vault.vaultAddress,
        amount,
        vault.decimals + 9,
        address
      );

      // 트랜잭션 confirm 대기
      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash,
        confirmations: 1,
        pollingInterval: 1000,
        timeout: 60_000,
      });

      if (receipt.status === "success") {
        showToast(
          `✅ ${amount} ${vault.symbol} Withdraw Success!\n\n🔗 Tx Hash:\n${hash}`,
          "SUCCESS",
          { duration: 8000 }
        );
        handleClear();
        // Refetch all related queries after successful transaction
        setTimeout(async () => {
          await invalidateBalances();
        }, 2000);
      } else {
        // Transaction was sent but reverted
        const revertReason =
          (receipt as unknown as { revertReason: string }).revertReason ||
          "Unknown reason";

        const errorMessage = formatReceiptRevertedMessage(hash, revertReason, {
          amount,
          symbol: vault.symbol,
          balance: vaultBalance,
        });

        showToast(errorMessage, "ERROR", {
          duration: 12000,
          action: {
            label: (
              <span className="flex items-center gap-1.5">
                <RefreshIcon className="w-3.5 h-3.5" />
                Retry
              </span>
            ),
            onClick: handleWithdraw,
          },
        });
      }
    } catch (error) {
      const errorMessage = formatTransactionErrorMessage(error, hash);

      showToast(errorMessage, "ERROR", {
        duration: 10000,
        action: {
          label: (
            <span className="flex items-center gap-1.5">
              <RefreshIcon className="w-3.5 h-3.5" />
              Retry
            </span>
          ),
          onClick: handleWithdraw,
        },
      });
    } finally {
      setIsWithdrawing(false);
    }
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
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-xl text-[#C2C8C2] font-medium">Withdraw</h1>
              <div className="flex items-center gap-x-1">
                <NetworkIcon icon={vault.icon} className="w-5 h-5" />
                <span className="text-xl font-medium">{vault.symbol}</span>
              </div>
            </div>

            <div className="text-[#8C938C] font-medium text-sm">
              Withdrawable:{" "}
              <span
                className="text-[#DFE2DF] font-medium"
                suppressHydrationWarning>
                {vaultBalance.toLocaleString()}
              </span>
            </div>
          </div>
          {/* Vault Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#C2C8C2] text-xl font-medium">From</span>
              <div className="flex items-center gap-x-1">
                <NetworkIcon icon={vault.icon} className="w-5 h-5" />
                <span className="text-xl font-medium">
                  {vault.symbol} Multiply
                </span>
              </div>
            </div>
            <div className="text-[#8C938C] font-medium text-sm">
              My Supplied:{" "}
              <span
                className="text-[#DFE2DF] font-medium"
                suppressHydrationWarning>
                $
                {(vaultBalance * tokenPrice).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-gray-500" suppressHydrationWarning>
                  {vaultBalance.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {vault.symbol}-MV
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="px-4 pt-6 pb-1.5">
          <div
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={handleOpenNumberPad}>
            <div className="text-4xl text-[#ECEFEC] font-medium w-full">
              {formatAmount(amount)}
            </div>
            <div className="text-2xl text-[#ECEFEC66]">
              ~$
              {formatCompactNumber(parseFloat(amount || "0") * tokenPrice)}
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button
              onClick={handleUseMax}
              className="text-xs font-medium text-[#9DA59D] bg-[#ECEFEC1F] px-2 py-1.5 rounded"
              suppressHydrationWarning>
              Use Max {vaultBalance.toLocaleString()} {vault.symbol}
            </button>
            <button
              onClick={handleClear}
              className="text-xs font-medium text-[#9DA59D] bg-[#ECEFEC1F] px-2 py-1.5 rounded"
              suppressHydrationWarning>
              Clear
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div
          className="flex py-4 px-4 gap-3"
          onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleWithdraw}
            disabled={parseFloat(amount || "0") <= 0 || isWithdrawing}
            className="w-full bg-[#E6F5AA] text-lg text-[#17330D] font-medium py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4E699] transition-colors">
            {isWithdrawing ? "Withdrawing..." : "Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
};
