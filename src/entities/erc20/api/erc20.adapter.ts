import { ENV } from "@/shared/config";
import { coinGeckoApiClient } from "@/shared/libs/index";

export const erc20CoinGeckoApi = (apiClient: typeof coinGeckoApiClient) => ({
  fetchTokenPrice: async (coinGeckoId: string) => {
    const response = await apiClient.get<Record<string, { usd: number }>>(
      `/simple/price?ids=${coinGeckoId}&vs_currencies=usd`,
      {
        headers: {
          "x-cg-demo-api-key": ENV.COINGECKO_API_KEY,
        },
      }
    );
    return response.data;
  },
  fetchMultipleTokenPrices: async (tokenIds: string) => {
    const response = await apiClient.get<Record<string, { usd: number }>>(
      `/simple/price?ids=${tokenIds}&vs_currencies=usd`,
      {
        headers: {
          "x-cg-demo-api-key": ENV.COINGECKO_API_KEY,
        },
      }
    );
    return response.data;
  },
});
