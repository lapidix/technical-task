interface TransactionError {
  shortMessage?: string;
  message?: string;
  cause?: { reason?: string };
}

// * Parse transaction error (e.g. User rejected, Insufficient balance, etc.)
const parseTransactionError = (error: unknown): string => {
  const errorObj = error as TransactionError;

  return (
    errorObj.cause?.reason ||
    errorObj.shortMessage ||
    errorObj.message ||
    "Unknown error"
  );
};

// * Get user-friendly error message (e.g. User rejected, Insufficient balance, etc.)
const getUserFriendlyError = (
  rawReason: string,
  hasHash: boolean = false
): string => {
  if (
    rawReason.includes("not in safe 256-bit") ||
    rawReason.includes("uint256")
  ) {
    return "Invalid amount: Number is too large";
  }

  if (rawReason.includes("insufficient")) {
    return "Insufficient balance";
  }

  if (
    rawReason.includes("User rejected") ||
    rawReason.includes("User denied")
  ) {
    return "User cancelled the transaction";
  }

  if (rawReason.includes("not found") || rawReason.includes("Not found")) {
    return hasHash
      ? "Transaction not found on blockchain\n\nPossible causes:\n" +
          "- Transaction was rejected by the network\n" +
          "- Invalid transaction parameters\n" +
          "- Network congestion or RPC issues\n" +
          "- Wrong network selected"
      : "Transaction not found";
  }

  return rawReason;
};

// * Format receipt reverted message (e.g. Transaction Reverted: Insufficient vault balance)
export const formatReceiptRevertedMessage = (
  hash: `0x${string}`,
  revertReason: string,
  context?: {
    amount?: string;
    symbol?: string;
    balance?: number;
  }
): string => {
  let message = "❌ Transaction Reverted\n\n" + `Reason: ${revertReason}\n\n`;

  if (context) {
    message += "Possible causes:\n";
    if (context.balance !== undefined && context.symbol) {
      message += `- Insufficient vault balance (You have: ${context.balance.toLocaleString()} ${
        context.symbol
      })\n`;
    }
    if (context.amount && context.symbol) {
      message += `- Trying to withdraw: ${context.amount} ${context.symbol}\n`;
    }
    message += "- Contract restrictions\n";
    message += "- Slippage or price impact\n\n";
  }

  message += `🔗 Tx Hash:\n${hash}`;

  return message;
};

// * Format transaction error message (e.g. Transaction Reverted: Insufficient vault balance)
export const formatTransactionErrorMessage = (
  error: unknown,
  hash?: `0x${string}`
): string => {
  const rawReason = parseTransactionError(error);
  const userFriendlyReason = getUserFriendlyError(rawReason, !!hash);

  if (hash) {
    return (
      "❌ Transaction Failed\n\n" +
      `${userFriendlyReason}\n\n` +
      `🔗 Tx Hash:\n${hash}\n\n` +
      `📝 Technical Details:\n${rawReason}`
    );
  } else {
    return (
      "⚠️ Transaction Rejected\n\n" +
      `${userFriendlyReason}` +
      (userFriendlyReason !== rawReason ? `\n\n📝 Details:\n${rawReason}` : "")
    );
  }
};
