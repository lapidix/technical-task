import { formatAmount, formatCompactNumber } from "@/shared/libs";

interface AmountInputProps {
  amount: string;
  tokenPrice: number;
  maxBalance: number;
  symbol: string;
  onOpenNumberPad: (e: React.MouseEvent) => void;
  onUseMax: () => void;
  onClear: () => void;
}

export const AmountInput = ({
  amount,
  tokenPrice,
  maxBalance,
  symbol,
  onOpenNumberPad,
  onUseMax,
  onClear,
}: AmountInputProps) => {
  return (
    <div className="px-4 pt-6 pb-1.5">
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={onOpenNumberPad}>
        <div className="text-4xl text-[#ECEFEC] font-medium w-full">
          {formatAmount(amount)}
        </div>
        <div className="text-2xl text-[#ECEFEC66]">
          ~${formatCompactNumber(parseFloat(amount || "0") * tokenPrice)}
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <button
          onClick={onUseMax}
          className="text-xs font-medium text-[#9DA59D] bg-[#ECEFEC1F] px-2 py-1.5 rounded"
          suppressHydrationWarning>
          Use Max {maxBalance.toLocaleString()} {symbol}
        </button>
        <button
          onClick={onClear}
          className="text-xs font-medium text-[#9DA59D] bg-[#ECEFEC1F] px-2 py-1.5 rounded"
          suppressHydrationWarning>
          Clear
        </button>
      </div>
    </div>
  );
};
