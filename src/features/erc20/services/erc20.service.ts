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
    try {
      const balance = await readContract(wagmiConfig, {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [ownerAddress],
      });
      const balanceString = formatUnits(balance, decimals);
      return Number(balanceString);
    } catch (error) {
      console.error(`Failed to get balance for ${tokenAddress}:`, error);
      throw new Error(
        `Failed to fetch token balance: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  static async getTokenPrice(coinGeckoId: string): Promise<number> {
    try {
      const response = await erc20CoinGeckoApiAdapter.fetchTokenPrice(
        coinGeckoId
      );

      const price = response[coinGeckoId]?.usd;
      if (price === undefined) {
        console.warn(`Price not found for ${coinGeckoId}, returning 0`);
        return 0;
      }
      return price;
    } catch (error) {
      console.error(`Failed to fetch token price for ${coinGeckoId}:`, error);
      throw new Error(
        `Failed to fetch ${coinGeckoId} price: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
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
      console.error(`Failed to approve ${amount} tokens:`, error);
      throw new Error(
        `Token approval failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
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
        const price = data[id]?.usd;
        if (price === undefined) {
          console.warn(`Price not found for ${id}, using 0`);
        }
        prices[id] = price || 0;
      });

      return prices;
    } catch (error) {
      console.error(
        `Failed to fetch prices for [${coinGeckoIds.join(", ")}]:`,
        error
      );
      throw new Error(
        `Failed to fetch multiple token prices: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
