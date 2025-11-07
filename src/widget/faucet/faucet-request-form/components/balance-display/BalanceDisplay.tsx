interface BalanceDisplayProps {
  symbol: string;
  balance?: number | bigint;
}

export const BalanceDisplay = ({ symbol, balance }: BalanceDisplayProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Current {symbol} Balance</span>
        <div className="flex items-center gap-2">
          <>
            <span className="text-2xl font-bold text-white">
              {balance ? (Number(balance) / 1e18).toFixed(2) : "0.00"}
            </span>
            <span className="text-gray-400">{symbol}</span>
          </>
        </div>
      </div>
    </div>
  );
};
