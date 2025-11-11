//* Format vault amount from bigint to number
export const formatVaultAmount = (
  amount: bigint | undefined,
  decimals: number
): number => {
  return amount ? Number(amount) / Math.pow(10, decimals) : 0;
};

//* Calculate vault value in USD
export const calculateVaultValue = (
  amount: bigint | undefined,
  decimals: number,
  price: number
): number => {
  const formattedAmount = formatVaultAmount(amount, decimals);
  return formattedAmount * price;
};

//* Calculate APY from APR (basis points)
export const calculateAPY = (aprBps: bigint | number): number => {
  const apr = Number(aprBps) / 10000;
  const apy = Math.pow(1 + apr / 365, 365) - 1;
  return apy;
};
