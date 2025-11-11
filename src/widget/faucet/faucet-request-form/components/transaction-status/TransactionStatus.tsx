import { useEffect } from "react";

interface TransactionStatusProps {
  isSuccess: boolean;
  error?: Error | null;
  hash?: `0x${string}`;
  onRefreshBalance: () => void;
}

export const TransactionStatus = ({
  isSuccess,
  error,
  hash,
  onRefreshBalance,
}: TransactionStatusProps) => {
  useEffect(() => {
    if (isSuccess && hash) {
      setTimeout(() => {
        onRefreshBalance();
      }, 2000);
    }
  }, [isSuccess, hash, onRefreshBalance]);
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
        <p className="text-red-500 font-medium mb-2">❌ Transaction Failed</p>
        <p className="text-sm text-gray-300">{error.message}</p>
      </div>
    );
  }

  if (isSuccess && hash) {
    return (
      <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
        <p className="text-green-500 font-medium">
          ✅ Tokens sent successfully!
        </p>
        <a
          href={`https://sepolia.basescan.org/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:underline mt-2 block">
          View Transaction →
        </a>
        <button
          onClick={onRefreshBalance}
          className="mt-3 text-sm text-blue-400 hover:underline">
          Refresh Balance 🔄
        </button>
      </div>
    );
  }

  return null;
};
