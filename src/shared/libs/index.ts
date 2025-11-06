import { ENV } from "../config";
import { BaseApiClient } from "./api.libs";

export { preloadTokenIcon, preloadWalletIcon } from "./image-preload.libs";
export { tcm } from "./styles.libs";
export const coinGeckoApiClient = new BaseApiClient({
  baseURL: ENV.COINGECKO_BASE_URL,
});
