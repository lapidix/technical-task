import { ERC20_QUERY_KEYS } from "@/entities/erc20/constants";
import { useWalletConnection } from "@/shared/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ERC20Service } from "../services";

export const useTokenBalance = (
  tokenAddress: `0x${string}`,
  decimals: number
) => {
  const { address } = useWalletConnection();

  const { data: balance, refetch: refetchBalance } = useSuspenseQuery({
    queryKey: ERC20_QUERY_KEYS.userTokenBalance(tokenAddress, address),
    queryFn: async () => {
      if (!address) {
        return BigInt(0);
      }
      return ERC20Service.getBalance(tokenAddress, address, decimals);
    },
  });

  return {
    balance,
    refetchBalance,
  };
};
