import { coinGeckoApiClient } from "@/shared/libs";
import { erc20CoinGeckoApi } from "./erc20.adapter";

export const erc20CoinGeckoApiAdapter = erc20CoinGeckoApi(coinGeckoApiClient);
