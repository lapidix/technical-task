// * Formatter for amounts (e.g. 1,000,000 -> 1,000,000.00)
export const formatAmount = (
  amount: string,
  options?: Intl.NumberFormatOptions
): string => {
  if (!amount || amount === "0" || amount === "") {
    return "0.00";
  }

  const defaultOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
    ...options,
  };

  return parseFloat(amount).toLocaleString("en-US", defaultOptions);
};

// * Formatter for compact numbers (e.g. 1,000,000,000 -> 1B, 1,000,000 -> 1M, 1,000 -> 1K)
export const formatCompactNumber = (value: number): string => {
  if (value === 0) return "0";

  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (absValue >= 1_000_000_000) {
    return `${sign}${(absValue / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    return `${sign}${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    return `${sign}${(absValue / 1_000).toFixed(2)}K`;
  }

  return `${sign}${absValue.toFixed(2)}`;
};
