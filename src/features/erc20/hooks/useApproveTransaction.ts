import { ERC20Service } from "@/features/erc20/services";
import { wagmiConfig } from "@/shared/config/wagmi.config";
import { TX_CONFIG } from "@/shared/constants";
import { useToast } from "@/shared/hooks";
import {
  formatReceiptRevertedMessage,
  formatTransactionErrorMessage,
} from "@/shared/libs";
import { RefreshIcon } from "@/shared/ui/icons/common";
import { useState } from "react";
import { waitForTransactionReceipt } from "wagmi/actions";

interface UseApproveTransactionParams {
  tokenAddress: `0x${string}`;
  spenderAddress: `0x${string}`;
  decimals: number;
  address: `0x${string}` | undefined;
  onSuccess?: () => void;
}

export const useApproveTransaction = ({
  tokenAddress,
  spenderAddress,
  decimals,
  address,
  onSuccess,
}: UseApproveTransactionParams) => {
  const { showToast } = useToast();
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async (amount: string) => {
    if (!address) {
      showToast("Please connect wallet.", "WARNING");
      return;
    }

    setIsApproving(true);
    let hash: `0x${string}` | undefined;

    try {
      hash = await ERC20Service.approveToken(
        tokenAddress,
        spenderAddress,
        amount,
        decimals
      );

      const receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash,
        confirmations: TX_CONFIG.CONFIRMATIONS,
        pollingInterval: TX_CONFIG.POLLING_INTERVAL,
        timeout: TX_CONFIG.TIMEOUT,
      });

      if (receipt.status === "success") {
        showToast(`✅ Approve Success!\n\n🔗 Tx Hash:\n${hash}`, "SUCCESS", {
          duration: 8000,
        });
        onSuccess?.();
      } else {
        const revertReason =
          (receipt as unknown as { revertReason: string }).revertReason ||
          "Unknown reason";

        const errorMessage = formatReceiptRevertedMessage(hash, revertReason);

        showToast(errorMessage, "ERROR", {
          duration: 12000,
          action: {
            label: "Retry",
            icon: RefreshIcon,
            onClick: () => handleApprove(amount),
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
          onClick: () => handleApprove(amount),
        },
      });
    } finally {
      setIsApproving(false);
    }
  };

  return { handleApprove, isApproving };
};
