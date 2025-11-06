import { ENV } from "../config/env.config";
import { BaseApiClient } from "./api.libs";

export { tcm } from "./styles.libs";
export const coinGeckoApiClient = new BaseApiClient({
  baseURL: ENV.COINGECKO_BASE_URL,
});
