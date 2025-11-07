import { ERC20_ABI } from "@/entities/erc20/constants";
import { useWalletConnection } from "@/shared/hooks";
import { parseUnits } from "viem";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const useFaucet = (tokenAddress: `0x${string}`) => {
  const { address } = useWalletConnection();
  const { chain } = useAccount();

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const requestTokens = async (amount: string) => {
    if (!address || chain?.id !== baseSepolia.id) return;

    const amountInWei = parseUnits(amount, 18);
    writeContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "faucet",
      args: [address, amountInWei],
    });
  };

  return {
    requestTokens,
    isPending,
    isConfirming,
    isSuccess,
    hash,
  };
};
