import { wagmiConfig } from "@/shared/config/wagmi.config";
import { ERC20_ABI } from "@/shared/constants/abis.const";
import { useWalletConnection } from "@/shared/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { readContract } from "wagmi/actions";

// Query Keys
const FAUCET_QUERY_KEYS = {
  tokenBalance: (tokenAddress: string, userAddress?: string) =>
    ["tokenBalance", tokenAddress, userAddress || "disconnected"] as const,
};

export const useTokenBalance = (tokenAddress: `0x${string}`) => {
  const { address, isConnected } = useWalletConnection();

  const { data: balance, refetch: refetchBalance } = useSuspenseQuery({
    queryKey: FAUCET_QUERY_KEYS.tokenBalance(tokenAddress, address),
    queryFn: async () => {
      if (!address || !isConnected) {
        return BigInt(0);
      }

      return readContract(wagmiConfig, {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [address],
      });
    },
  });

  return {
    balance,
    refetchBalance,
  };
};
