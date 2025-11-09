import { erc20CoinGeckoApiAdapter } from "@/entities/erc20/api";
import { ERC20_ABI } from "@/entities/erc20/constants";
import { wagmiConfig } from "@/shared/config/wagmi.config";

import { formatUnits, parseUnits } from "viem";
import { readContract, writeContract } from "wagmi/actions";

export class ERC20Service {
  static async getBalance(
    tokenAddress: `0x${string}`,
    ownerAddress: `0x${string}`,
    decimals: number
  ): Promise<number> {
    const balance = await readContract(wagmiConfig, {
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [ownerAddress],
    });
    const balanceString = formatUnits(balance, decimals);
    return Number(balanceString);
  }

  static async getTokenPrice(coinGeckoId: string): Promise<number> {
    try {
      const response = await erc20CoinGeckoApiAdapter.fetchTokenPrice(
        coinGeckoId
      );

      return response[coinGeckoId]?.usd || 0;
    } catch (error) {
      console.error(`Error fetching token price for ${coinGeckoId}:`, error);
      throw error;
    }
  }

  static async approveToken(
    tokenAddress: `0x${string}`,
    spenderAddress: `0x${string}`,
    amount: string,
    decimals: number
  ): Promise<`0x${string}`> {
    try {
      const approveAmount = parseUnits(amount, decimals);

      const hash = await writeContract(wagmiConfig, {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [spenderAddress, approveAmount],
      });

      return hash;
    } catch (error) {
      console.error("Error approving token:", error);
      throw error;
    }
  }

  static async getMultipleTokenPrices(
    coinGeckoIds: string[]
  ): Promise<Record<string, number>> {
    try {
      const ids = coinGeckoIds.join(",");
      const data = await erc20CoinGeckoApiAdapter.fetchMultipleTokenPrices(ids);

      const prices: Record<string, number> = {};
      coinGeckoIds.forEach((id) => {
        prices[id] = data[id]?.usd || 0;
      });

      return prices;
    } catch (error) {
      console.error("Error fetching token prices:", error);
      throw error;
    }
  }
}
