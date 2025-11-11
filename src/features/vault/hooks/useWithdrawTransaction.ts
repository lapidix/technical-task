import { VaultTransactionService } from "@/features/vault/services";
import { wagmiConfig } from "@/shared/config/wagmi.config";
import { TX_CONFIG } from "@/shared/constants";
import { useToast } from "@/shared/hooks";
import {
  formatReceiptRevertedMessage,
  formatTransactionErrorMessage,
  getErrorMessageConfig,
} from "@/shared/libs";
import { RefreshIcon } from "@/shared/ui/icons/common";
import { useState } from "react";
import { waitForTransactionReceipt } from "wagmi/actions";

interface UseWithdrawTransactionParams {
  vaultAddress: `0x${string}`;
  decimals: number;
  symbol: string;
  address: `0x${string}` | undefined;
  onSuccess?: () => void;
}

export const useWithdrawTransaction = ({
  vaultAddress,
  decimals,
  symbol,
  address,
  onSuccess,
}: UseWithdrawTransactionParams) => {
  const { showToast } = useToast();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async (amount: string, vaultBalance: number) => {
    if (!address) {
      showToast("Please connect wallet.", "WARNING");
      return;
    }

    setIsWithdrawing(true);
    let hash: `0x${string}` | undefined;

    try {
      hash = await VaultTransactionService.withdrawFromVault(
        vaultAddress,
        amount,
        decimals,
        address
      );

      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash,
        confirmations: TX_CONFIG.CONFIRMATIONS,
        pollingInterval: TX_CONFIG.POLLING_INTERVAL,
        timeout: TX_CONFIG.TIMEOUT,
      });

      if (receipt.status === "success") {
        showToast(
          `✅ ${amount} ${symbol} Withdraw Success!\n\n🔗 Tx Hash:\n${hash}`,
          "SUCCESS",
          { duration: 8000 }
        );
        onSuccess?.();
      } else {
        const revertReason =
          (receipt as unknown as { revertReason: string }).revertReason ||
          "Unknown reason";

        const errorMessage = formatReceiptRevertedMessage(hash, revertReason, {
          amount,
          symbol,
          balance: vaultBalance,
        });

        showToast(errorMessage, "ERROR", {
          duration: 12000,
          action: {
            label: "Retry",
            icon: RefreshIcon,
            onClick: () => handleWithdraw(amount, vaultBalance),
          },
        });
      }
    } catch (error) {
      const errorMessage = formatTransactionErrorMessage(error, hash);
      const errorConfig = getErrorMessageConfig(error);

      showToast(errorMessage, "ERROR", {
        duration: 10000,
        action: {
          label: errorConfig.action,
          icon: RefreshIcon,
          onClick: () => handleWithdraw(amount, vaultBalance),
        },
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  return { handleWithdraw, isWithdrawing };
};
