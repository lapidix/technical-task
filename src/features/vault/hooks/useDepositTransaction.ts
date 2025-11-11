import { VaultTransactionService } from "@/features/vault/services";
import { wagmiConfig } from "@/shared/config/wagmi.config";
import { useToast } from "@/shared/hooks";
import {
  formatReceiptRevertedMessage,
  formatTransactionErrorMessage,
} from "@/shared/libs";
import { RefreshIcon } from "@/shared/ui/icons/common";
import { useState } from "react";
import { waitForTransactionReceipt } from "wagmi/actions";

interface UseDepositTransactionParams {
  vaultAddress: `0x${string}`;
  decimals: number;
  symbol: string;
  address: `0x${string}` | undefined;
  onSuccess?: () => void;
}

export const useDepositTransaction = ({
  vaultAddress,
  decimals,
  symbol,
  address,
  onSuccess,
}: UseDepositTransactionParams) => {
  const { showToast } = useToast();
  const [isDepositing, setIsDepositing] = useState(false);

  const handleDeposit = async (amount: string, tokenBalance: number) => {
    if (!address) {
      showToast("Please connect wallet.", "WARNING");
      return;
    }

    setIsDepositing(true);
    let hash: `0x${string}` | undefined;

    try {
      hash = await VaultTransactionService.depositToVault(
        vaultAddress,
        amount,
        decimals,
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
          `✅ ${amount} ${symbol} Deposit Success!\n\n🔗 Tx Hash:\n${hash}`,
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
          balance: tokenBalance,
        });

        showToast(errorMessage, "ERROR", {
          duration: 12000,
          action: {
            label: "Retry",
            icon: RefreshIcon,
            onClick: () => handleDeposit(amount, tokenBalance),
          },
        });
      }
    } catch (error) {
      const errorMessage = formatTransactionErrorMessage(error, hash);

      showToast(errorMessage, "ERROR", {
        duration: 10000,
        action: {
          label: "Retry",
          icon: RefreshIcon,
          onClick: () => handleDeposit(amount, tokenBalance),
        },
      });
    } finally {
      setIsDepositing(false);
    }
  };

  return { handleDeposit, isDepositing };
};
