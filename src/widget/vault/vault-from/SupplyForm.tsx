"use client";

import { VaultBase } from "@/entities/vault/types";
import { useTokenBalance, useTokenUsdPrice } from "@/features/erc20/hooks";
import { ERC20Service } from "@/features/erc20/services";
import { useVaultBalance } from "@/features/vault/hooks";
import { VaultService } from "@/features/vault/services";
import { wagmiConfig } from "@/shared/config/wagmi.config";
import {
  createRetryAction,
  useNumberPad,
  useSequentialTransactions,
  useToast,
  useWalletConnection,
} from "@/shared/hooks";
import {
  formatAmount,
  formatCompactNumber,
  formatReceiptRevertedMessage,
  formatTransactionErrorMessage,
} from "@/shared/libs";
import { NetworkIcon } from "@/shared/ui/icons/network";
import { NumberPad } from "@/shared/ui/number-pad";
import { useState } from "react";
import { waitForTransactionReceipt } from "wagmi/actions";

interface SupplyFormProps {
  vault: VaultBase;
}

export const SupplyForm = ({ vault }: SupplyFormProps) => {
  const { balance: tokenBalance, refetchBalance: refetchTokenBalance } =
    useTokenBalance(vault.tokenAddress, vault.decimals);
  const { price: tokenPrice } = useTokenUsdPrice(vault.coinGeckoId);
  const { address } = useWalletConnection();
  const { balance: vaultBalance, refetchBalance: refetchVaultBalance } =
    useVaultBalance(vault.vaultAddress, vault.decimals, address);
  const { showToast } = useToast();

  const [isApproving, setIsApproving] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);

  const {
    amount,
    showNumberPad,
    handleNumberClick,
    handleBackspace,
    handleClear,
    handleSetAmount,
    handleCloseNumberPad,
    handleOpenNumberPad,
    NUMBER_PAD_HEIGHT,
  } = useNumberPad({
    disabled: isApproving || isDepositing,
    maxAmount: Number(tokenBalance),
  });

  const {
    execute: executeApproveAndDeposit,
    isExecuting,
    currentStep,
  } = useSequentialTransactions({
    onSuccess: () => {
      showToast(`${amount} ${vault.symbol} Supply completed!`, "SUCCESS");
      handleClear();
      refetchTokenBalance();
      refetchVaultBalance();
    },
    onError: (error) => {
      showToast("Fail Transaction: " + error.message, "ERROR");
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
    handleSetAmount(balanceStr);
  };

  const handleApprove = async () => {
    if (!address) {
      showToast("Please connect wallet.", "WARNING");
      return;
    }

    setIsApproving(true);
    let hash: `0x${string}` | undefined;

    try {
      hash = await ERC20Service.approveToken(
        vault.tokenAddress,
        vault.vaultAddress,
        amount,
        vault.decimals
      );

      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash,
        confirmations: 1,
        pollingInterval: 1000,
        timeout: 60_000,
      });

      if (receipt.status === "success") {
        showToast(`✅ Approve Success!\n\n🔗 Tx Hash:\n${hash}`, "SUCCESS", {
          duration: 8000,
        });
      } else {
        const revertReason =
          (receipt as unknown as { revertReason: string }).revertReason ||
          "Unknown reason";

        const errorMessage = formatReceiptRevertedMessage(hash, revertReason);

        showToast(errorMessage, "ERROR", {
          duration: 12000,
          action: createRetryAction(handleApprove),
        });
      }
    } catch (error) {
      const errorMessage = formatTransactionErrorMessage(error, hash);

      showToast(errorMessage, "ERROR", {
        duration: 10000,
        action: createRetryAction(handleApprove),
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleDeposit = async () => {
    if (!address) {
      showToast("Please connect wallet.", "WARNING");
      return;
    }

    setIsDepositing(true);
    let hash: `0x${string}` | undefined;

    try {
      hash = await VaultService.depositToVault(
        vault.vaultAddress,
        amount,
        vault.decimals,
        address
      );

      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash,
        confirmations: 1,
        pollingInterval: 1000,
        timeout: 60_000,
      });

      if (receipt.status === "success") {
        showToast(
          `✅ ${amount} ${vault.symbol} Deposit Success!\n\n🔗 Tx Hash:\n${hash}`,
          "SUCCESS",
          { duration: 8000 }
        );
        handleClear();
        refetchTokenBalance();
        refetchVaultBalance();
      } else {
        const revertReason =
          (receipt as unknown as { revertReason: string }).revertReason ||
          "Unknown reason";

        const errorMessage = formatReceiptRevertedMessage(hash, revertReason, {
          amount,
          symbol: vault.symbol,
          balance: Number(tokenBalance),
        });

        showToast(errorMessage, "ERROR", {
          duration: 12000,
          action: createRetryAction(handleDeposit),
        });
      }
    } catch (error) {
      const errorMessage = formatTransactionErrorMessage(error, hash);

      showToast(errorMessage, "ERROR", {
        duration: 10000,
        action: createRetryAction(handleDeposit),
      });
    } finally {
      setIsDepositing(false);
    }
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
          vault.decimals + 99
        );
      },
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
    <div
      className="flex flex-col flex-1 overflow-hidden"
      onClick={handleCloseNumberPad}>
      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          paddingBottom: showNumberPad ? `${NUMBER_PAD_HEIGHT}px` : "0",
          transition: "padding-bottom 0.3s ease-out",
          overscrollBehaviorY: "none",
        }}>
        <div className="px-4 py-2 flex flex-col gap-8">
          {/* Token Info */}
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-xl text-[#C2C8C2] font-medium">Supply</h1>
              <div className="flex items-center gap-x-1">
                <NetworkIcon icon={vault.icon} className="w-5 h-5" />
                <span className="text-xl font-medium">{vault.symbol}</span>
              </div>
            </div>

            <div className="text-[#8C938C] font-medium text-sm">
              Wallet Balance:{" "}
              <span
                className="text-[#DFE2DF] font-medium"
                suppressHydrationWarning>
                {tokenBalance.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Vault Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#C2C8C2] text-xl font-medium">To</span>
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
              onClick={handleUseMaxBalance}
              className="text-xs font-medium text-[#9DA59D] bg-[#ECEFEC1F] px-2 py-1.5 rounded"
              suppressHydrationWarning>
              Use Balance {tokenBalance.toLocaleString()} {vault.symbol}
            </button>
            <button
              onClick={handleClear}
              className="text-xs font-medium text-[#9DA59D] bg-[#ECEFEC1F] px-2 py-1.5 rounded"
              suppressHydrationWarning>
              Clear
            </button>
          </div>
        </div>

        {/* Action Buttons - 스크롤 영역 안으로 이동 */}
        <div
          className="flex flex-col py-2 px-4 gap-3"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2">
            <button
              onClick={handleApprove}
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
              onClick={handleDeposit}
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

      {/* Number Pad */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out"
        style={{
          transform: showNumberPad ? "translateY(0)" : "translateY(100%)",
          pointerEvents: showNumberPad ? "auto" : "none",
        }}
        onClick={(e) => e.stopPropagation()}>
        <NumberPad
          onNumberClick={handleNumberClick}
          onBackspace={handleBackspace}
        />
      </div>
    </div>
  );
};
