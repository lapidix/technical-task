interface BalanceDisplayProps {
  symbol: string;
  balance?: number | bigint;
}

export const BalanceDisplay = ({ symbol, balance }: BalanceDisplayProps) => {
  return (
    <div className="px-2 py-2">
      <div className="text-[#8C938C] font-medium text-sm mb-1">
        Current {symbol} Balance
      </div>
      <div className="flex items-center gap-2">
        <span
          className="text-2xl font-medium text-[#ECEFEC]"
          suppressHydrationWarning>
          {balance ? balance.toLocaleString() : "0.00"}
        </span>
        <span className="text-xl text-[#8C938C]">{symbol}</span>
      </div>
    </div>
  );
};
