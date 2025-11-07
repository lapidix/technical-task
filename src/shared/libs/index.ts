import { ENV } from "../config";
import { BaseApiClient } from "./api.libs";

export { formatAmount, formatCompactNumber } from "./format.libs";
export { tcm } from "./styles.libs";
export const coinGeckoApiClient = new BaseApiClient({
  baseURL: ENV.COINGECKO_BASE_URL,
});
